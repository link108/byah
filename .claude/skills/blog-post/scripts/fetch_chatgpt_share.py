#!/usr/bin/env python3
"""
Reconstruct a verbatim transcript from a chatgpt.com/share/... link.

WebFetch alone can't do this: the share page is client-rendered, so a
generic fetch only sees the <title> tag. The actual conversation ships as
a React Router "turbo-stream" payload embedded in an inline <script> tag
(a flat JSON array of values with index-based back-references, used to
de-duplicate repeated objects/strings in the serialized graph). This
script downloads the page, decodes that payload, and writes out the
user/assistant turns as Markdown.

Usage:
    python3 fetch_chatgpt_share.py <share-url> <output-path.md>
"""

import json
import re
import sys
import urllib.request


def fetch_html(url: str) -> str:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": (
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            )
        },
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.read().decode("utf-8", errors="replace")


def extract_stream_payload(html: str) -> list:
    """Find the enqueue(...) call carrying the main data payload and decode it as JSON."""
    scripts = re.findall(r"<script nonce=\"[^\"]*\">(.*?)</script>", html, re.S)
    candidates = []
    for s in scripts:
        for m in re.finditer(r"streamController\.enqueue\((\".*?\")\)", s, re.S):
            raw = m.group(1)
            try:
                unescaped = json.loads(raw)
                parsed = json.loads(unescaped)
                if isinstance(parsed, list):
                    candidates.append(parsed)
            except (json.JSONDecodeError, ValueError):
                continue
    if not candidates:
        raise RuntimeError(
            "No decodable streamController.enqueue(...) payload found. "
            "ChatGPT's page structure may have changed."
        )
    # The main data chunk is the largest array (others are small trailer chunks).
    return max(candidates, key=len)


def decode_turbo_stream(arr: list):
    """
    Resolve a turbo-stream flat array into a plain Python object.

    Encoding: arr[i] is either a leaf value, a list of indices, or a dict
    like {"_<keyIdx>": <valueIdx>, ...} where keyIdx/valueIdx are indices
    back into arr (negative values are sentinels for undefined/null).
    """
    memo = {}

    def is_ref_object(x):
        return isinstance(x, dict) and len(x) > 0 and all(re.match(r"^_\d+$", k) for k in x.keys())

    def resolve(i):
        if i in memo:
            return memo[i]
        if i < 0:
            return None
        val = arr[i]
        if is_ref_object(val):
            out = {}
            memo[i] = out
            for k, v in val.items():
                key = resolve(int(k[1:]))
                value = resolve(v) if isinstance(v, int) else v
                if isinstance(key, str):
                    out[key] = value
            return out
        if isinstance(val, list):
            out = []
            memo[i] = out
            for x in val:
                out.append(resolve(x) if isinstance(x, int) else x)
            return out
        memo[i] = val
        return val

    return resolve(0)


def find_share_data(root: dict) -> dict:
    loader_data = root.get("loaderData", {})
    for key, value in loader_data.items():
        if key.startswith("routes/share.") and isinstance(value, dict):
            server_response = value.get("serverResponse", {})
            data = server_response.get("data")
            if isinstance(data, dict) and "linear_conversation" in data:
                return data
    raise RuntimeError("Couldn't find the share route's conversation data in loaderData.")


def render_transcript(data: dict) -> str:
    lines = [f"Fetched via fetch_chatgpt_share.py\n", f"# {data.get('title', '(untitled)')}\n"]
    for node in data.get("linear_conversation", []):
        msg = node.get("message")
        if not msg:
            continue
        role = (msg.get("author") or {}).get("role")
        content = msg.get("content") or {}
        if role not in ("user", "assistant") or content.get("content_type") != "text":
            continue
        parts = content.get("parts") or []
        text = "\n".join(str(p) for p in parts if isinstance(p, str)).strip()
        if not text:
            continue
        label = "User" if role == "user" else "Assistant"
        lines.append(f"## {label}\n\n{text}\n")
    return "\n".join(lines)


def main():
    if len(sys.argv) != 3:
        print(__doc__)
        sys.exit(1)
    url, out_path = sys.argv[1], sys.argv[2]

    html = fetch_html(url)
    arr = extract_stream_payload(html)
    root = decode_turbo_stream(arr)
    data = find_share_data(root)
    transcript = render_transcript(data)

    with open(out_path, "w", encoding="utf-8") as f:
        f.write(f"Source: {url}\n" + transcript)

    print(f"Wrote {len(transcript)} chars to {out_path}")


if __name__ == "__main__":
    main()

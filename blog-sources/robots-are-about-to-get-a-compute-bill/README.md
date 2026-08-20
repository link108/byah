# Post: Robots Are About to Get a Compute Bill

Source: `chatgpt-2026-08-19-post-plan.md` — single-post idea (not a series): AI robotics doesn't make robots cheaper overall, it moves the cost from a huge upfront "teaching" bill (programming/integration) toward a smaller upfront bill plus a recurring "cost of cognition" (inference, compute, connectivity) paid every hour the robot operates.

The chat itself flagged a possible second post at the very end — robotics-driven demand for edge compute as its own market — not written, just gestured at in the closing section the way the source material did, without committing to it.

## Verification

Every load-bearing number in the draft was checked independently:

- IFR's 50-70% programming/integration cost share — confirmed (`ifr.org`, attributed to IFR General Secretary Dr. Susanne Bieller).
- NVIDIA Jetson AGX Thor developer kit specs/pricing — confirmed ($3,499 launch price, 128GB memory, 2,070 FP4 TFLOPS, 40-130W configurable power); also found that NVIDIA's own marketplace listed it closer to $5,500 as of mid-August 2026, so the draft notes both figures rather than only the (now stale) launch price.
- Agility Robotics' RoboFab (>10,000 Digit units/year, Salem, Oregon) — confirmed.
- Figure's BotQ (12,000 units/year initial capacity, ramped from 1 robot/day to 1 robot/hour by May 2026, target of 100,000 units/year) — confirmed, and the throughput-ramp detail (not in the source chat) was added since it's a stronger, more concrete illustration of the manufacturing-scale point than the chat had.
- Google DeepMind's Gemini Robotics On-Device — confirmed real and shipping (on-device VLA model, works offline, low-latency).

**Dropped**: the chat's claim that Figure has "described moving components from expensive machining toward stamping, injection molding, die casting" — couldn't independently verify this specific claim, so it's left out of the draft rather than repeated on the strength of the chat alone.

## Status

Drafted, `draft: true`, standalone post (no `series` field).

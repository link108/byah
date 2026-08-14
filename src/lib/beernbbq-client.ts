import { raterNameHeader, raterNameMaxLength } from "./rater";

const nameStorageKey = "beernbbq:name";

function getStoredName(): string | null {
  return window.localStorage.getItem(nameStorageKey);
}

function setStoredName(name: string) {
  window.localStorage.setItem(nameStorageKey, name);
}

function renderNameBanner(banner: HTMLElement) {
  const name = getStoredName();
  if (name) {
    banner.innerHTML = `<span>Rating as <strong>${escapeHtml(name)}</strong></span>`;
  } else {
    banner.innerHTML = `
      <form data-role="name-form" class="name-form">
        <input type="text" name="name" placeholder="Your name" maxlength="${raterNameMaxLength}" required />
        <button type="submit" class="link-pill">Save</button>
      </form>
    `;
    const form = banner.querySelector<HTMLFormElement>('[data-role="name-form"]');
    form?.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = form.elements.namedItem("name") as HTMLInputElement;
      const value = input.value.trim();
      if (!value) return;
      // Locked in on save - no UI to change it afterward (see setStoredName callers).
      setStoredName(value);
      renderNameBanner(banner);
    });
  }
}

function escapeHtml(value: string): string {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

function formatSummary(average: number, count: number): string {
  if (count === 0) return "No ratings yet";
  return `${average.toFixed(1)} ★ (${count})`;
}

async function submitRating(kind: "beer" | "item", id: string, score: number): Promise<unknown> {
  const name = getStoredName();
  if (!name) throw new Error("Enter your name first.");
  const path = kind === "beer" ? `/api/beernbbq/beers/${id}/rating` : `/api/beernbbq/items/${id}/rating`;
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json", [raterNameHeader]: name },
    body: JSON.stringify({ score })
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: "Something went wrong." }));
    throw new Error(body.error ?? "Something went wrong.");
  }
  return res.json();
}

function initRatingWidgets(root: ParentNode, nameBanner: HTMLElement) {
  root.querySelectorAll<HTMLElement>(".rate-widget").forEach((widget) => {
    const kind = widget.dataset.kind as "beer" | "item";
    const id = widget.dataset.id!;
    widget.addEventListener("click", async (event) => {
      const button = (event.target as HTMLElement).closest<HTMLButtonElement>("button[data-score]");
      if (!button) return;
      if (!getStoredName()) {
        nameBanner.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      const score = Number(button.dataset.score);
      try {
        const result = (await submitRating(kind, id, score)) as {
          averageRating: number;
          ratingCount: number;
        };
        const summary = widget.parentElement?.querySelector<HTMLElement>(".rate-summary");
        if (summary) summary.textContent = formatSummary(result.averageRating, result.ratingCount);
        widget.querySelectorAll("button[data-score]").forEach((btn) => {
          btn.classList.toggle("active", Number((btn as HTMLElement).dataset.score) <= score);
        });
      } catch (error) {
        alert(error instanceof Error ? error.message : "Something went wrong.");
      }
    });
  });
}

function initAddForms(root: ParentNode, nameBanner: HTMLElement) {
  root.querySelectorAll<HTMLFormElement>(".add-form").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const name = getStoredName();
      if (!name) {
        nameBanner.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      const kind = form.dataset.kind as "beer" | "food";
      const parentId = form.dataset.parentId!;
      const input = form.elements.namedItem("value") as HTMLInputElement;
      const value = input.value.trim();
      if (!value) return;

      const path =
        kind === "beer" ? `/api/beernbbq/breweries/${parentId}/beers` : `/api/beernbbq/teams/${parentId}/items`;
      const payload = kind === "beer" ? { name: value } : { label: value };

      try {
        const res = await fetch(path, {
          method: "POST",
          headers: { "Content-Type": "application/json", [raterNameHeader]: name },
          body: JSON.stringify(payload)
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({ error: "Something went wrong." }));
          throw new Error(body.error ?? "Something went wrong.");
        }
        window.location.reload();
      } catch (error) {
        alert(error instanceof Error ? error.message : "Something went wrong.");
      }
    });
  });
}

export function initBeernbbqPage() {
  const nameBanner = document.querySelector<HTMLElement>("[data-role='name-banner']");
  if (!nameBanner) return;
  renderNameBanner(nameBanner);
  initRatingWidgets(document, nameBanner);
  initAddForms(document, nameBanner);
}

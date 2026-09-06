// Remembers the guest's own email in this browser so "My reservations" can
// look itself up without asking every visit. Purely a convenience - the
// server is the source of truth, and this key holds nothing but an email
// address the guest already typed into a booking form.

const STORAGE_KEY = "byah.dinner-reservations.email";

export function getStoredGuestEmail(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setStoredGuestEmail(email: string): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, email);
  } catch {
    // Storage disabled/full - the lookup form still works, it just won't
    // remember next time.
  }
}

export function clearStoredGuestEmail(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing to clean up if storage isn't available.
  }
}

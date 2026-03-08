const COOKIE_KEY = "solara_cookie_consent";

export type ConsentStatus = "accepted" | "rejected" | "pending";

export function getConsentStatus(): ConsentStatus {
  const val = localStorage.getItem(COOKIE_KEY);
  if (val === "accepted") return "accepted";
  if (val === "rejected") return "rejected";
  return "pending";
}

export function hasConsent(): boolean {
  return getConsentStatus() === "accepted";
}

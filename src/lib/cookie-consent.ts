"use client";

import { useSyncExternalStore } from "react";

export type CookieConsentValue = "accepted" | "rejected";

const storageKey = "akapp-cookie-consent";
const changeEvent = "akapp-cookie-consent-change";
let memoryValue: CookieConsentValue | null = null;

function readCookieConsent(): CookieConsentValue | null {
  try {
    const value = window.localStorage.getItem(storageKey);
    return value === "accepted" || value === "rejected" ? value : memoryValue;
  } catch {
    return memoryValue;
  }
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(changeEvent, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(changeEvent, callback);
  };
}

export function useCookieConsent() {
  return useSyncExternalStore(subscribe, readCookieConsent, () => null);
}

export function saveCookieConsent(value: CookieConsentValue) {
  memoryValue = value;

  try {
    window.localStorage.setItem(storageKey, value);
  } catch {
    // The choice still applies to the current page when storage is unavailable.
  }

  window.dispatchEvent(new Event(changeEvent));
}

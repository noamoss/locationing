# Product Requirements Document (PRD)

## Product Name

Park & Find (working title)

## Problem Statement

People frequently forget where they parked their car, especially in unfamiliar areas, large parking lots, or dense urban environments. Existing solutions are often overly complex, require accounts, or rely on backend services that introduce friction, privacy concerns, and operational overhead.

## Product Vision

A minimal, privacy-first, front-end–only mobile experience that allows users to instantly mark where they parked their car and easily navigate back to it later. The product should be extremely simple, fast, and reliable, with no backend dependencies and no user accounts.

## Goals

* Enable users to save their parked car location in one tap
* Show the user their current location and their car location on a map
* Allow easy navigation back to the car via an external maps app
* Work fully offline after initial load
* Store all data locally on the device
* Be installable as a Progressive Web App (PWA)

## Non-Goals

* No backend services or cloud sync
* No user accounts or authentication
* No social features or sharing
* No analytics beyond optional client-side diagnostics

## Target Users

* Urban drivers
* Travelers and tourists
* Event attendees
* Anyone parking in large or unfamiliar areas

## User Stories

1. As a user, when I open the app, I want to immediately see a map centered on my current location.
2. As a first-time user, I want to mark where I parked my car with a single button.
3. As a returning user, I want to see both my current location and my parked car location on the map.
4. As a user, I want to tap a button and get navigation directions back to my car.
5. As a user, I want navigation to open in Google Maps instead of being handled inside the app.
6. As a user, I want to clear my saved parking location when I no longer need it.
7. As a user, I want all my data to stay on my device, with no backend involved.

## Core Features

### 1. Immediate Map View

* App opens directly to a map view
* Uses device geolocation to center the map on the user

### 2. Parked Car Marker

* Single "Mark Car Location" button
* Saves latitude, longitude, and timestamp locally

### 3. Dual Marker Display

* If a saved location exists:

  * Marker A: current user location
  * Marker B: parked car location

### 4. Navigation to Car

* Tap on car marker or CTA button
* Opens external navigation via Google Maps deep link

### 5. Clear Parking Location

* Simple "Clear" action
* Removes saved location from local storage

### 6. Progressive Web App Support

* Installable to home screen
* Fullscreen, app-like experience

## UX Principles

* Zero onboarding
* Minimal UI elements
* One primary action at any time
* Fast load time
* Clear visual hierarchy

## Technical Constraints

* Front-end only
* No backend or APIs beyond map and geolocation providers
* Local storage only (e.g., LocalStorage or IndexedDB)
* Deployed via Vercel

## Privacy & Security

* No personal data sent off-device
* Location data stored only locally
* Uses standard browser permission prompts for geolocation

## Success Metrics

* Time to first park action < 5 seconds
* Successful location retrieval rate
* PWA installation rate
* User retention (measured locally, optional)

## Open Questions

* Which map provider to use (Google Maps, Mapbox, OpenStreetMap)?
* Should the app support multiple saved locations in the future?
* Should dark mode be supported from day one?

## Summary

This product prioritizes simplicity, speed, and privacy. It is intentionally limited in scope to deliver maximum value with minimal complexity.

---

# Technical Specification

## 1. Architecture Overview

* **Type:** Front-end only (no backend services).
* **Hosting/Deployment:** Vercel.
* **Runtime:** Mobile-first web app, installable as a PWA.
* **Data Persistence:** Local-only storage on device.

### 1.1 High-Level Components

* **UI Layer:** React-based UI with a minimal state machine for app modes.
* **Location Layer:** Browser Geolocation API for current position.
* **Map Layer:** Map rendering and marker display.
* **Persistence Layer:** LocalStorage or IndexedDB abstraction.
* **Navigation Layer:** External deep link to Google Maps.

## 2. Recommended Tech Stack

### 2.1 Front-End

* **Framework:** Next.js (App Router) or Vite + React.

  * Prefer **Next.js** for Vercel-native optimizations and easy PWA integration.
* **Language:** TypeScript.
* **Styling:** Tailwind CSS.

### 2.2 Mapping

Choose one of:

* **Option A (Recommended):** MapLibre GL + OpenStreetMap tiles

  * Pros: no mandatory proprietary keys, strong performance.
  * Cons: requires tile provider selection and attribution.
* **Option B:** Google Maps JavaScript API

  * Pros: familiar UX, easy deep-link consistency.
  * Cons: requires API key + billing configuration.
* **Option C:** Mapbox GL JS

  * Pros: excellent UX, tooling.
  * Cons: API key + pricing.

> Implementation should abstract the map provider behind a thin adapter so swapping providers is low-cost.

### 2.3 PWA

* Use `next-pwa` (Next.js) or `vite-plugin-pwa` (Vite).
* Configure:

  * Web app manifest (name, icons, theme color)
  * Service worker caching for offline use

## 3. Functional Requirements and Implementation Details

### 3.1 App States

Define a small state machine:

* **Loading:** app boot + request location
* **NoCarSaved:** no stored car location; show current marker + “Mark Car Location” CTA
* **CarSaved:** stored car location exists; show current marker + car marker + “Navigate” and “Clear” actions
* **Error:** location permission denied or unavailable

### 3.2 Geolocation

* Use `navigator.geolocation.getCurrentPosition` on app open.
* Use **high accuracy** only if needed; default should minimize battery impact.
* Recommended options:

  * `enableHighAccuracy: false`
  * `timeout: 8000`
  * `maximumAge: 15000`

Error handling:

* Permission denied → show instructions and a retry action.
* Timeout/unavailable → show retry and allow manual refresh.

### 3.3 Data Model

Store a single record called `carLocation`:

```ts
// Stored locally on device
export type CarLocation = {
  lat: number;
  lng: number;
  accuracyMeters?: number;
  timestamp: number; // epoch ms
  label?: string; // optional for future (e.g., "Level 2")
};
```

### 3.4 Persistence

* Use LocalStorage for the single-record MVP.
* Consider IndexedDB if you expect future expansion (multiple cars/places).

Storage keys:

* `parkfind.carLocation` → JSON string of `CarLocation`
* `parkfind.version` → schema version

### 3.5 Map Rendering

Core requirements:

* Render a map centered at current location when available.
* Display markers:

  * **Current location marker** (always when geolocation succeeds)
  * **Car marker** (only when saved)
* Camera rules:

  * If no car saved: center on current location, moderate zoom.
  * If car saved: fit bounds to include both markers with padding.

### 3.6 Navigation Deep Link

* Use Google Maps deep link format:

  * `https://www.google.com/maps/dir/?api=1&destination=<lat>,<lng>&travelmode=walking`
* Trigger:

  * Tap on car marker popover action OR a primary “Navigate” button.
* Open behavior:

  * `window.open(url, "_blank", "noopener,noreferrer")`

### 3.7 Clear Memory

* Remove `parkfind.carLocation` from storage.
* Return UI state to **NoCarSaved**.

## 4. Non-Functional Requirements

### 4.1 Performance

* Target Time-to-Interactive under ~2 seconds on mid-range mobile.
* Keep bundle lean:

  * code split map provider
  * lazy-load map component after initial location retrieval

### 4.2 Offline

* Must work after first successful load.
* Cache:

  * app shell
  * JS/CSS
  * icons + manifest
* Note: map tiles may not be fully available offline unless specifically cached; acceptable for MVP.

### 4.3 Accessibility

* Buttons with clear labels.
* Sufficient contrast.
* Keyboard focus states for PWA use.

### 4.4 Privacy

* No telemetry by default.
* No location sent to any backend owned by the product.
* Map tile providers may receive IP/location implicitly; document in a short privacy note.

## 5. Observability and QA

### 5.1 Diagnostics (Optional)

* Client-side error boundary.
* Minimal console logging behind a `debug` flag.

### 5.2 Testing

* Unit tests for storage and state transitions.
* Lightweight integration tests for:

  * first run
  * saved car state
  * clear action
  * link generation

## 6. Deployment (Vercel)

* Use Vercel default Next.js pipeline.
* Configure environment variables for map API keys (if needed):

  * `NEXT_PUBLIC_MAPS_API_KEY`
* Enable HTTPS (default on Vercel).

## 7. Reference Implementation Snippets

### 7.1 Storage Utilities

```ts
const KEY = "parkfind.carLocation";

export function loadCarLocation(): CarLocation | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CarLocation;
  } catch {
    return null;
  }
}

export function saveCarLocation(loc: CarLocation) {
  localStorage.setItem(KEY, JSON.stringify(loc));
}

export function clearCarLocation() {
  localStorage.removeItem(KEY);
}
```

### 7.2 Google Maps Deep Link

```ts
export function buildGoogleMapsDirectionsUrl(dest: { lat: number; lng: number }) {
  const params = new URLSearchParams({
    api: "1",
    destination: `${dest.lat},${dest.lng}`,
    travelmode: "walking",
  });
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}
```

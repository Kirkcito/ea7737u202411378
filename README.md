# UrbanFit Sports Center Management Platform

## Overview
Web application for UrbanFit Sports Centers to manage reservations, check the current weather at each sports center
and follow the occupancy of its facilities. Each sports center offers one activity type and has a maximum capacity.

## Authorship
- **Author:** Quiliano Motta Kirk Douglas (U202411378)

## Features
- Toolbar with the custom UrbanFit logo, the platform title and EN | ES language select buttons.
- Sidenav navigation with Home and New Reservation.
- Home (`/home`) with the "My Sports Centers" grid list: reservations per sports center, Total Participants and
  Available Capacity, showing "Empty" when a center has no reservations.
- New Reservation (`/reservations/new`) reactive form: the sports center is selected by activity type, the current
  temperature is queried from Open-Meteo, and participants must be greater than zero and fit in the available capacity,
  which is recalculated with fresh reservations before saving.
- Page not found view for unsupported routes, with a button to go back to Home.
- English (default) and Spanish user interface.

## Stack
- Angular 22.2 with standalone components, Angular Router and Angular Signals.
- Angular Material (orange pre-built palette).
- HttpClient for the fake API and the Open-Meteo Weather API.
- ngx-translate (`@ngx-translate/core`, `@ngx-translate/http-loader`).
- json-server 0.17.4 as fake API.
- Domain-Driven Design with the `shared`, `sports-centers` and `weather` bounded contexts.

## Configuration
API base URLs and paths are defined in `src/environments/environment.development.ts` and `src/environments/environment.ts`.

Start the fake API:

```bash
cd server
json-server --watch db.json
```

Start the application in another terminal:

```bash
npm install
ng serve
```

Open `http://localhost:4200/`.

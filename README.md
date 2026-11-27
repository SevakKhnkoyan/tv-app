# TV App

A desktop-oriented streaming interface prototype built with React and TypeScript. It explores media browsing, animated navigation and video previews using a bundled movie catalog.

**[Live demo](https://tv-app-phi-three.vercel.app/)**

## Features

- Featured title panel with artwork, description, release year, rating and duration.
- Trending carousel with mouse-wheel navigation.
- Delayed title selection and muted, looping video previews where a video URL is available.
- Recently selected title moved to the front of the trending list, with its ID stored in session storage.
- Expandable animated sidebar with active menu styling.

## Engineering highlights

- React 18 and TypeScript for typed components and movie models.
- Redux Toolkit and RTK Query for state and a mock API backed by local JSON.
- Swiper for the carousel, Framer Motion for navigation animation and React Player for video previews.
- Tailwind CSS and Ant Design for styling and UI controls.

## Run locally

```bash
npm ci
npm start
```

Open http://localhost:3000 in your browser. No separate backend is required.

| Command | Purpose |
| --- | --- |
| `npm start` | Development server |
| `npm run build` | Production build |
| `npm test` | Create React App test runner |

## Source layout

```text
src/
  app/          Redux store
  components/   Featured video, sidebar and carousel
  data/         Bundled movie catalog
  hooks/        Shared React and Redux hooks
  models/       Movie types
  pages/        Home screen
  videos/       Mock API and video state
  utils/        Formatting helpers
```

## Scope

This is a UI prototype, not a full streaming service. Sidebar selection is visual, and the Play and More Info buttons currently have placeholder handlers. It uses sample media metadata rather than a production catalog or authentication system.

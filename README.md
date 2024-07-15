# Reveal

## Installation

1. Clone both this repo and its server side counterpart (https://github.com/jacquikeating/reveal-server).
2. Run `npm i` to install dependencies.
3. Set up a `.env` file. A `.env.sample` file is included for reference.
   `VITE_API_URL=http://localhost:8080`
4. Make sure the backend repo is fully set up and confirm the server is running (on port 8080).
5. Run `npm run dev` to open in the browser.

## Authentication

Reveal does not currently include any required authentication. User-specific functionality is temporarily mimicked on a per-page basis using state or variables, pending actual auth implementation.

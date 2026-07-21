# AGENTS.md

Guidance for AI agents and contributors working in this project.

> **Note:** Laravel Boost manages the Laravel/backend AI guidelines (installed via
> `laravel/boost` and injected into this file / the agent's rules by `boost:install`).
> This hand-maintained file focuses on the **frontend stack**, which Boost does not
> cover. Prefer Boost's guidelines and its `search-docs` MCP tool for anything
> Laravel-, Sanctum-, Pest-, or PHP-specific.

## Stack (frontend)

- **Frontend:** Vue 3 (`vue.esm-bundler`), Vue Router, Pinia. Built with Vite + `@tailwindcss/vite` (Tailwind v4).
- **Icons:** FontAwesome Pro (imported in `resources/css/app.css`).
- **Backend (for context):** Laravel API via Sanctum; the SPA fallback route renders `resources/views/app.blade.php`. See Boost's guidelines for backend conventions.

## Frontend structure (`resources/js/`)

- `app.js` - app entry: creates the Vue app, Pinia, router, global directives, mounts `#<app-name>`.
- `router.js` - Vue Router routes; the root route renders `layouts/App.vue`.
- `layouts/` - top-level layouts (e.g. `App.vue` with header/footer/transitions).
- `pages/` - route page components.
- `sections/` - larger reusable page sections.
- `components/` - reusable components (`components/global/` for app-wide ones, `components/modals/` for modals).
- `stores/` - Pinia stores (`global.js` is the app-wide store).
- `directives/` - custom Vue directives (e.g. `clickOutside`).

## Import aliases (see `vite.config.js`)

`@components`, `@directives`, `@layouts`, `@pages`, `@sections`, `@stores` → the matching `resources/js/*` folders. Prefer aliases over deep relative paths.

## Conventions (frontend)

- Formatting is enforced by Prettier (`.prettierrc`): tabs, single quotes, no semicolons, Tailwind class sorting. Run Prettier before committing.
- Routing is client-side: Laravel serves the SPA shell for all non-API routes; add pages via `router.js`.
- Prefer import aliases over deep relative paths (see above).
- Do not run migrations blindly; databases are connected per-environment.

## Common commands

- `composer run dev` - run PHP server, queue, logs and Vite together.
- `npm run build` - production asset build.
- `php artisan migrate` - run migrations (only when the database is configured).

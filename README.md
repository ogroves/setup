# setup / `enemy`

An opinionated scaffolder that runs `laravel new` and then layers on a Vue 3 +
Pinia + Vue Router + Tailwind v4 frontend, API scaffolding, and a set of project
conventions. It applies changes as a **delta** on top of the current Laravel
skeleton, so it keeps working as Laravel releases new versions.

```bash
enemy new my-app
```

To scaffold into a directory you've **already cloned from GitHub** (so the
project's git remote/history is set up before you scaffold), `cd` into it and run
`enemy init` instead — it leaves your existing `.git` untouched:

```bash
cd ~/Development/my-app   # cloned from GitHub, currently empty except .git
enemy init                # scaffolds in place; name defaults to the dir name
```

## How it works

`enemy` is a small Bash tool. The command on your PATH is a bootstrapper that
keeps a local clone of this repo (`github.com/ogroves/setup`) up to date and
then runs the real script from it — so anything pushed here is picked up on the
next `enemy new` or `enemy init`.

For each project it scaffolds (both `new` and `init` run the same pipeline):

1. Runs `laravel new <name>` (no starter kit, PHPUnit, SQLite).
2. Runs `composer update` and `npm update`.
3. Installs the npm/composer packages listed in `config/dependencies.sh` (including
   `laravel/boost` as a dev dependency).
4. Runs `php artisan install:api` (answering **no** to migrations).
5. Copies the files in `stubs/` into the project, templating the app name.
6. Removes the default `welcome.blade.php`.
7. Idempotently adds the FontAwesome import to `resources/css/app.css` and the
   `.DS_Store` rules to `.gitignore`.
8. Runs `php artisan boost:install --guidelines --skills --no-interaction` to
   generate Laravel-aware AI guidelines and skills (choices are pre-seeded via
   `stubs/boost.json`).

Progress is printed per stage with a percentage.

### `new` vs `init`

- **`enemy new <name>`** creates a fresh `./<name>` directory and runs the
  pipeline there. `laravel new` initialises a git repo inside it. Use this when
  you're starting from nothing.
- **`enemy init [name]`** scaffolds **into the current directory** while
  preserving its existing `.git`. It runs the pipeline in a throwaway temp
  directory (so `laravel new` still gets its own clean git repo) and then
  `rsync -a --exclude='.git'`s the result into the current directory. Your
  remote, commit history and git config are left completely untouched. The
  project name defaults to the current directory's name; pass `[name]` to
  override it. It refuses to run if the current directory already contains a
  `composer.json` (so it won't scaffold over an existing project), and it
  requires `rsync` (bundled with macOS). Use this for a repo you've already
  created/cloned from GitHub — e.g. via Tower — so it stays wired to its remote.

## Laravel Boost

[Laravel Boost](https://laravel.com/docs/boost) gives your AI agent Laravel-aware,
version-matched guidelines plus an MCP server (Tinker, DB schema, routes, logs,
docs search). The package is genuinely **per-project** — it's an Artisan command
that introspects each app's `composer.json` and runtime — so `enemy new` installs
`laravel/boost` in every project.

The **MCP server registration is kept global**, though: `enemy prepare` writes a
single `laravel-boost` entry into `~/.cursor/mcp.json` (merging, not clobbering,
any existing servers). Because `php artisan boost:mcp` resolves relative to the
open workspace, that one global entry serves every Laravel project — so `enemy new`
runs `boost:install` with `--guidelines --skills` only (no `--mcp`) and never
writes per-project MCP config.

Run `enemy prepare` once (and after Cursor reinstalls) to register the MCP server.
If you forget, `enemy new` detects the missing global registration and offers to
run `enemy prepare` for you (in a terminal); in non-interactive/CI runs it just
warns and continues.

## Install

```bash
git clone https://github.com/ogroves/setup.git
cd setup
./install.sh
```

This copies the bootstrapper to `~/.local/bin/enemy` (override with
`ENEMY_BIN_DIR`). Make sure that directory is on your `PATH`.

One-liner (once the repo is public):

```bash
curl -fsSL https://raw.githubusercontent.com/ogroves/setup/main/bin/enemy-bootstrap \
  -o ~/.local/bin/enemy && chmod +x ~/.local/bin/enemy
```

## Requirements

- `laravel`, `composer`, `npm`, `php`, `git` on your `PATH` (plus `rsync` for
  `enemy init`, which ships with macOS).
- A **FontAwesome Pro** token in your global `~/.npmrc` (the scaffold installs
  `@fortawesome/fontawesome-pro`). Example:

  ```
  @fortawesome:registry=https://npm.fontawesome.com/
  //npm.fontawesome.com/:_authToken=YOUR-TOKEN
  ```

  (Or remove that package from `config/dependencies.sh`.)

## Commands

| Command | Description |
| --- | --- |
| `enemy new <name>` | Self-update, then create and configure a project in `./<name>` |
| `enemy new <name> --no-update` | Scaffold without pulling the remote first |
| `enemy init [name]` | Scaffold into the **current directory**, preserving its `.git` (name defaults to the directory name). Use for a repo you've already cloned from GitHub |
| `enemy init [name] --no-update` | Same, without pulling the remote first |
| `enemy prepare` | Update global tooling: the Laravel installer, global npm packages, and the global Laravel Boost MCP registration |
| `enemy update` | Show/refresh the cached scaffold version |
| `enemy --help` | Help |
| `enemy --version` | Version |

Run `enemy prepare` occasionally (or before starting a project) to make sure you
scaffold against the latest Laravel — `enemy new` / `enemy init` use whatever
`laravel new` produces, so an out-of-date global installer means an out-of-date
project.

## Customizing

- **Dependencies / `laravel new` flags:** edit `config/dependencies.sh`.
- **Files & structure:** add or edit files under `stubs/` (use `__APP_NAME__`
  where the project name should be substituted).
- **Per-project agent guidance:** edit `stubs/AGENTS.md` (frontend conventions).
  Laravel/backend guidance is managed by Laravel Boost.
- **Boost install choices:** edit `stubs/boost.json` (agents, guidelines, skills, mcp).

Push your changes to `main` and they apply on the next `enemy new` / `enemy init`.

## Notes

- `postcss.config.js` is intentionally **not** included: with Tailwind v4 and
  the `@tailwindcss/vite` plugin, a legacy `tailwindcss` PostCSS config breaks
  the Vite build.
- Filament support (`-f`) is reserved but not yet implemented.

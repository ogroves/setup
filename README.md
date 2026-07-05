# setup / `enemy`

An opinionated scaffolder that runs `laravel new` and then layers on a Vue 3 +
Pinia + Vue Router + Tailwind v4 frontend, API scaffolding, and a set of project
conventions. It applies changes as a **delta** on top of the current Laravel
skeleton, so it keeps working as Laravel releases new versions.

```bash
enemy new my-app
```

## How it works

`enemy` is a small Bash tool. The command on your PATH is a bootstrapper that
keeps a local clone of this repo (`github.com/ogroves/setup`) up to date and
then runs the real script from it — so anything pushed here is picked up on the
next `enemy new`.

For each new project it:

1. Runs `laravel new <name>` (no starter kit, PHPUnit, SQLite).
2. Runs `composer update` and `npm update`.
3. Installs the npm/composer packages listed in `config/dependencies.sh`.
4. Runs `php artisan install:api` (answering **no** to migrations).
5. Copies the files in `stubs/` into the project, templating the app name.
6. Removes the default `welcome.blade.php`.
7. Idempotently adds the FontAwesome import to `resources/css/app.css` and the
   `.DS_Store` rules to `.gitignore`.

Progress is printed per stage with a percentage.

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

- `laravel`, `composer`, `npm`, `php`, `git` on your `PATH`.
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
| `enemy new <name>` | Self-update, then create and configure a project |
| `enemy new <name> --no-update` | Scaffold without pulling the remote first |
| `enemy prepare` | Update global tooling: the Laravel installer + global npm packages |
| `enemy update` | Show/refresh the cached scaffold version |
| `enemy --help` | Help |
| `enemy --version` | Version |

Run `enemy prepare` occasionally (or before starting a project) to make sure you
scaffold against the latest Laravel — `enemy new` uses whatever `laravel new`
produces, so an out-of-date global installer means an out-of-date project.

## Customizing

- **Dependencies / `laravel new` flags:** edit `config/dependencies.sh`.
- **Files & structure:** add or edit files under `stubs/` (use `__APP_NAME__`
  where the project name should be substituted).
- **Per-project agent guidance:** edit `stubs/AGENTS.md`.

Push your changes to `main` and they apply on the next `enemy new`.

## Notes

- `postcss.config.js` is intentionally **not** included: with Tailwind v4 and
  the `@tailwindcss/vite` plugin, a legacy `tailwindcss` PostCSS config breaks
  the Vite build.
- Filament support (`-f`) is reserved but not yet implemented.

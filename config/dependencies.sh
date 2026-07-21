#!/usr/bin/env bash
# Editable configuration for `enemy new`.
# Add or remove packages here as your stack evolves — nothing else needs to change.

# Flags passed to `laravel new` (non-interactive, no starter kit, sqlite).
# No starter kit = simply omit --react/--vue/--livewire under --no-interaction.
# --no-node: we install npm packages ourselves in a later step.
# --no-boost: we install laravel/boost ourselves in a later step (see COMPOSER_DEV_DEPS)
#             so we control its version pin and run boost:install non-interactively.
LARAVEL_NEW_FLAGS=(--phpunit --database=sqlite --no-boost --no-node --no-interaction)

# Runtime npm dependencies (npm i ...)
NPM_DEPS=(
    vue
    vue-router
    pinia
    axios
    swiper
    gsap
    @fortawesome/fontawesome-pro
)

# Dev npm dependencies (npm i -D ...)
NPM_DEV_DEPS=(
    autoprefixer
    @vitejs/plugin-vue
    vite
    tailwindcss
    @tailwindcss/vite
    concurrently
    prettier
    prettier-plugin-tailwindcss
    lodash
)

# Extra composer packages (composer require ...). Sanctum arrives via `php artisan install:api`.
COMPOSER_DEPS=()

# Dev composer packages (composer require --dev ...).
# laravel/boost gives the AI agent Laravel-aware guidelines + an MCP server. We
# install it here (rather than via `laravel new`) so we can pin/replace it and run
# `boost:install` non-interactively against the pre-seeded stubs/boost.json.
COMPOSER_DEV_DEPS=(
    laravel/boost
)

# CSS @import lines prepended (idempotently) to resources/css/app.css.
CSS_PREPEND_IMPORTS=(
    '@import "/node_modules/@fortawesome/fontawesome-pro/css/all.css";'
)

# Lines appended (idempotently) to .gitignore.
GITIGNORE_APPEND=(
    ".DS_Store"
    "*.DS_Store"
    "**/.DS_Store"
)

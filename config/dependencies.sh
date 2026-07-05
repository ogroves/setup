#!/usr/bin/env bash
# Editable configuration for `enemy new`.
# Add or remove packages here as your stack evolves — nothing else needs to change.

# Flags passed to `laravel new` (non-interactive, no starter kit, sqlite).
# No starter kit = simply omit --react/--vue/--livewire under --no-interaction.
# --no-node: we install npm packages ourselves in a later step.
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

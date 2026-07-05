#!/usr/bin/env bash
#
# Installs the `enemy` command onto your PATH.
#
# It copies the tiny bootstrapper to a bin directory; the bootstrapper then
# clones/updates github.com/ogroves/setup on first use, so this repo checkout is
# only needed to run the installer.
#
set -euo pipefail

SCRIPT_DIR="$(cd -P "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
BIN_TARGET="${ENEMY_BIN_DIR:-$HOME/.local/bin}"

mkdir -p "$BIN_TARGET"
cp "$SCRIPT_DIR/bin/enemy-bootstrap" "$BIN_TARGET/enemy"
chmod +x "$BIN_TARGET/enemy"

printf '✓ Installed enemy to %s/enemy\n' "$BIN_TARGET"

case ":$PATH:" in
    *":$BIN_TARGET:"*) ;;
    *)
        printf '! %s is not on your PATH. Add this to your shell profile:\n' "$BIN_TARGET"
        printf '    export PATH="%s:$PATH"\n' "$BIN_TARGET"
        ;;
esac

printf 'Run: enemy new my-app\n'

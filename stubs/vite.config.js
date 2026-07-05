import fs from "fs";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { URL, fileURLToPath } from "url";
import { defineConfig } from "vite";
import { homedir } from "os";
import { resolve } from "path";

let host = "__APP_NAME__.test";

export default defineConfig({
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => tag.includes("swiper"),
                },
            },
        }),
        laravel({
            input: ["resources/css/app.css", "resources/js/app.js"],
            refresh: true,
        }),
        tailwindcss(),
    ],

    server: detectServerConfig(host),

    resolve: {
        dedupe: ["vue"],
        alias: [
            {
                find: "@components",
                replacement: fileURLToPath(
                    new URL("./resources/js/components", import.meta.url),
                ),
            },
            {
                find: "@directives",
                replacement: fileURLToPath(
                    new URL("./resources/js/directives", import.meta.url),
                ),
            },
            {
                find: "@layouts",
                replacement: fileURLToPath(
                    new URL("./resources/js/layouts", import.meta.url),
                ),
            },
            {
                find: "@pages",
                replacement: fileURLToPath(
                    new URL("./resources/js/pages", import.meta.url),
                ),
            },

            {
                find: "@sections",
                replacement: fileURLToPath(
                    new URL("./resources/js/sections", import.meta.url),
                ),
            },
            {
                find: "@stores",
                replacement: fileURLToPath(
                    new URL("./resources/js/stores", import.meta.url),
                ),
            },
        ],
    },
    build: {
        sourcemap: true,
    },
});

function detectServerConfig(host) {
    let keyPath = resolve(homedir(), `.config/valet/Certificates/${host}.key`);
    let certificatePath = resolve(
        homedir(),
        `.config/valet/Certificates/${host}.crt`,
    );

    if (!fs.existsSync(keyPath)) {
        return {};
    }

    if (!fs.existsSync(certificatePath)) {
        return {};
    }

    return {
        hmr: { host },
        host,
        https: {
            key: fs.readFileSync(keyPath),
            cert: fs.readFileSync(certificatePath),
        },
    };
}

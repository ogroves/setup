import { useGlobalStore } from "@stores/global";
import { createApp } from "vue/dist/vue.esm-bundler";
import { createPinia } from "pinia";
import router from "./router";
import clickOutside from "@directives/clickOutside";

/* App Setup */
const pinia = createPinia();
const app = createApp({}).use(router).use(pinia);

/* Stores */
const global = useGlobalStore();

/* Directives */
app.directive("click-outside", clickOutside);

/* Setup Stores */
global.setup();

/* Mount App */
app.mount("#__APP_NAME__");

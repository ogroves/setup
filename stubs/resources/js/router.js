import { createWebHistory, createRouter } from "vue-router";

/* Layouts */
import App from "@layouts/App.vue";

/* Pages */
import Index from "@pages/Index.vue";

/* Routes */
const routes = [
    {
        path: "/",
        component: App,
        children: [{ path: "", name: "index", component: Index }],
    },
];

const router = createRouter({
    scrollBehavior(to, from, savedPosition) {
        if (to.name === from.name && !to.hash) {
            return { top: 0, behavior: "smooth" };
        } else if (to.hash) {
            return {
                el: to.hash,
                top: 100,
                behavior: "smooth",
            };
        } else {
            return {
                top: 0,
            };
        }
    },
    history: createWebHistory(),
    routes,
});

export default router;

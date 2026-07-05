import { defineStore } from "pinia";
import _ from "lodash";

export const useGlobalStore = defineStore("global", {
    state: () => {
        return {
            modal: {
                name: null,
                payload: null,
            },
            // pages: [],
        };
    },
    getters: {
        //
    },
    actions: {
        setup() {
            // this.getPages();
        },
        // getPages() {
        //     return axios
        //         .get("/api/pages")
        //         .then((pages) => {
        //             this.pages = pages.data;
        //         })
        //         .catch((error) => {
        //             console.error(error);
        //         });
        // },
        openModal(modal) {
            this.modal = {
                name: modal,
                payload: null,
            };
            document.body.classList.add("overflow-hidden");
        },
        setModal(modal) {
            this.modal = {
                name: modal[0],
                payload: modal[1],
            };
        },
        closeModal() {
            this.modal = {
                name: null,
                payload: null,
            };
            document.body.classList.remove("overflow-hidden");
        },
    },
});

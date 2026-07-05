<script setup>
import { ref } from "vue";
import { useGlobalStore } from "@stores/global.js";
import Header from "@components/global/Header.vue";
import Footer from "@components/global/Footer.vue";

const global = useGlobalStore();
</script>

<template>
    <!-- Modal -->
    <Transition name="cart" :duration="300">
        <PaperModal v-if="global.modal?.name" :key="global.modal.name" />
    </Transition>

    <!-- Header -->
    <Header />

    <!-- Page -->
    <router-view v-slot="{ Component, route }">
        <transition name="page" mode="out-in">
            <component :is="Component" :key="route.path" />
        </transition>
    </router-view>

    <!-- Footer -->
    <Footer />
</template>

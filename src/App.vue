<script setup lang="ts">
// @ts-nocheck
import Account from './components/Account/Account.vue';
import {WebView, WebApp} from './scripts/tg';
import 'vue3-toastify/dist/index.css';

WebView();
WebApp();

const telegram = window.Telegram.WebApp
telegram.ready()

//telegram.expand()
</script>

<template>
    <Account />
</template>

<style scoped></style>

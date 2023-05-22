<script setup lang="ts">
// @ts-nocheck
import Account from './components/Account/Account.vue';
import {WebView, WebApp} from './scripts/tg';
WebView();
WebApp();

const telegram = window.Telegram.WebApp
telegram.ready()
//telegram.expand()
</script>

<template>
  <main class="container mx-auto px-5 py-3">
    <Account />
  </main>
</template>

<style scoped></style>

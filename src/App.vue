<script setup lang="ts">
// @ts-nocheck
import WalletVue from './components/Wallet.vue';
import {WebView, WebApp} from './scripts/tg';
WebView();
WebApp();

const telegram = window.Telegram.WebApp
telegram.ready()
telegram.expand()
let params = new URLSearchParams(window.location.search);
const action = params.get("action") || 'Unknown';
</script>

<template>
  <main>
    <WalletVue :action="action"/>
  </main>
</template>

<style scoped></style>

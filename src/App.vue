<template>
    <Start v-if="currentScreen === 'start'" @screen="screen" />
    <Account v-if="currentScreen === 'account'" @screen="screen" />
    <WalletNew v-if="currentScreen === 'wallet:new'" @screen="screen" />
    <WalletRecover v-if="currentScreen === 'wallet:recover'" @screen="screen" />
    <WalletSecret v-if="currentScreen === 'wallet:secret'" @screen="screen" />
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref } from 'vue';
import Start from './components/Screens/Start.vue';
import WalletNew from './components/Screens/WalletNew.vue';
import WalletRecover from './components/Screens/WalletRecover.vue';
import WalletSecret from './components/Screens/WalletSecret.vue';
import Account from './components/Screens/Account.vue';

import { WebView, WebApp } from './scripts/tg';
import 'vue3-toastify/dist/index.css';

WebView();
WebApp();

const telegram = window.Telegram.WebApp
telegram.ready()

//telegram.expand()
const connected = !!localStorage.getItem('pkey') && !!localStorage.getItem('pubKey')
const currentScreen = ref(connected ? 'account' : 'start');

const screen = (account) => {
    currentScreen.value = account;
    console.log('screen', account)
}

</script>


<style scoped></style>

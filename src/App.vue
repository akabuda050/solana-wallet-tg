<template>
    <Account />
</template>

<script setup lang="ts">
// @ts-nocheck
import { computed, onMounted, ref, watch } from 'vue';
import Start from './components/Screens/Start.vue';
import WalletNew from './components/Screens/WalletNew.vue';
import WalletRecover from './components/Screens/WalletRecover.vue';
import WalletSecret from './components/Screens/WalletSecret.vue';
import Account from './components/Account/Account.vue';

import { WebView, WebApp } from './scripts/tg';
import 'vue3-toastify/dist/index.css';
import MainButton from './components/general/MainButton.vue';

WebView();
WebApp();

const telegram = window.Telegram.WebApp

if (telegram) {
    telegram.ready()
    telegram.MainButton.hide()
}

//telegram.expand()
const connected = !!localStorage.getItem('pkey') && !!localStorage.getItem('pubKey')
const currentScreen = ref(connected ? 'account' : 'start');

const screen = (screen) => {
    currentScreen.value = screen;
    console.log('screen', screen)
}

const button1Active = ref(false);
const button2Active = computed(() => ['wallet:new', 'wallet:recover'].includes(currentScreen.value));

onMounted(() => {
    button1Active.value = true;
});

watch(() => button2Active.value, () => {
    button1Active.value = false;
})

const disconnect = () => {
    localStorage.removeItem('pubKey')
    localStorage.removeItem('pkey')
    publicKey.value = null;
    balance.value = 0;

    screen('start');
}

const button1Text = computed(() => {
    switch (currentScreen.value) {
        case 'wallet:new':
        case 'wallet:recover':
            return 'Back'
        case 'account':
            return 'Disconnect'
        default:
            return 'Close'
    }
})

const button1Clicked = () => {
    switch (currentScreen.value) {
        case 'start':
            if (telegram) {
                telegram.close()
            }
            break;
        case 'wallet:new':
        case 'wallet:recover':
            screen('start');
            break;
        case 'account':
            disconnect();
            break
    }
}

const button2Text = computed(() => {
    switch (currentScreen.value) {
        case 'wallet:new':
        case 'wallet:recover':
            return 'Confirm'
        default:
            return 'Close'
    }
})

const button2Clicked = () => {
    switch (currentScreen.value) {
        case 'wallet:new':
        case 'wallet:recover':
            screen('start');
            break;
        default:
            break
    }
}

</script>

<style scoped>
.slide-left-enter-active {
    transition: all 0.2s ease-out;
}

.slide-left-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-left-enter-from,
.slide-left-leave-to {
    transform: translateX(-200px);
    opacity: 0;
    height: 0;
}
.slide-down-enter-active {
    transition: all 0.2s ease-out;
}

.slide-down-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-down-enter-from,
.slide-down-leave-to {
    transform: translateY(50px);
    opacity: 0;
}
</style>

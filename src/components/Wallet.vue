
<template>
    <div class="flex flex-col items-center">
        <h1>Wallet</h1>
        <span>{{ props.action }}</span>

        <h2>Encrypted:</h2>
        <code>{{ encrypted }}</code>

        <h2>Decrypted:</h2>
        <code>{{ decrypted }}</code>

        <input v-model="passhrase" />
        <button @click="() => {
            sendAction();
        }">Send Action</button>
        <button @click="() => {
            sendAction2();
        }">Send Action 2</button>
    </div>
</template>
<script setup lang="ts">
// @ts-nocheck
import { encryptPrivateKey, decryptPrivateKey, getRandomBytes } from '../scripts/crypto';
import { ref } from 'vue';

const telegram = window.Telegram.WebApp

const props = defineProps({
    action: {
        type: String,
        require: true,
    }
})
const decrypted = ref(localStorage.getItem('pkey'));
const encrypted = ref('');
const passhrase = ref('');
const sendAction = () => {
    if (props.action === 'register') {
        decrypted.value = getRandomBytes();
        encrypted.value = encryptPrivateKey(decrypted.value, passhrase.value);

        setTimeout(() => {
            localStorage.setItem('pkey', decrypted.value);
            decrypted.value = ''
        }, 5500)
        passhrase.value = '';
    }
}

const sendAction2 = () => {
    if (props.action === 'register') {
        decrypted.value = decryptPrivateKey(encrypted.value, passhrase.value);
    }
}
</script>
<style scoped>
code {
    word-break: break-all;
}

.flex {
    display: flex;
}

.flex-col {
    flex-direction: column;
}

.items-center {
    align-items: center;
}

.justify-center {
    justify-content: center;
}
</style>

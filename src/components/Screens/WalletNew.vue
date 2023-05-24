<template>
    <div class="flex flex-col gap-3 pb-20">
        <div class="flex flex-col">
            <div class="flex items-center justify-between">
                <h1 class="text-3xl text-slate-700 font-bold">Set a Password</h1>
            </div>
            <span class="text-slate-500">This password is used to protect and provide access to your wallet</span>
        </div>
        <div class="flex flex-col">
            <label for="password" class="font-semibold block mb-2">Password</label>
            <input type="password" id="password" v-model="password"
                class="px-4 py-2 mb-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password">
            <p class="text-sm text-gray-500 mb-1">Password must meet the following criteria:</p>
            <ul class="list-inside pl-2 mb-4">
                <li class="text-sm text-gray-700">8 or more characters</li>
                <li class="text-sm text-gray-700">At least one upper case character</li>
                <li class="text-sm text-gray-700">At least one digit</li>
                <li class="text-sm text-gray-700">At least one symbol</li>
            </ul>
            <label for="confirmPassword" class="font-semibold block mb-2">Confirm Password</label>
            <input type="password" id="confirmPassword" v-model="confirmPassword"
                class="px-4 py-2 mb-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirm your password">
                <label for="confirmPassword" class="font-semibold block mb-2">Confirm Password</label>
            <input type="password" id="confirmPassword" v-model="confirmPassword"
                class="px-4 py-2 mb-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirm your password">
                <label for="confirmPassword" class="font-semibold block mb-2">Confirm Password</label>
            <input type="password" id="confirmPassword" v-model="confirmPassword"
                class="px-4 py-2 mb-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirm your password">
        </div>
       
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch, computed, onBeforeUnmount } from 'vue';
import MainButton from '../general/MainButton.vue';
import { toast, type ToastType } from 'vue3-toastify';
import { getPublicKey } from '@/scripts/solana';
import { generateAccount } from '@/scripts/solana';
import { encryptPrivateKey } from '@/scripts/crypto';

const notify = (prompt: string, type: ToastType = 'info') => {
    toast(prompt, {
        closeButton: false,
        autoClose: 1000,
        closeOnClick: true,
        position: 'top-center',
        type
    }); // ToastOptions
}
const emit = defineEmits(['screen'])
const active = ref(false);

const password = ref();
const confirmPassword = ref();

const passwordMatch = computed(() => (password.value && confirmPassword.value) && password.value === confirmPassword.value)

onMounted(() => {
    active.value = true;
})

watch(() => passwordMatch.value, () => {
    active.value = false;
})

const createAccount = async () => {
    try {
        const { account, mnemonic } = await generateAccount(null);
        console.log({ account, mnemonic })
        const publicKey = getPublicKey(account.publicKey).toBase58();
        const privateKey = encryptPrivateKey(mnemonic, password.value);

        localStorage.setItem('pubKey', publicKey);
        localStorage.setItem('pkey', privateKey);
        notify('Account created', 'success');

        emit('screen', 'wallet:secret')
    } catch (e: any) {
        notify((e?.message && e.message.charAt(0).toUpperCase() + e.message.slice(1)) || 'Something went wrong!', 'error');
    } finally {
        password.value = '';
        confirmPassword.value = '';
    }
}

onBeforeUnmount(() => {
    active.value = false;
})
</script>
<style scoped>
.slide-fade-enter-active {
    transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(50px);
    opacity: 0;
}
</style>
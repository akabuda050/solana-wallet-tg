<template>
    <div class="flex flex-col gap-3 pb-20">
        <div class="flex flex-col">
            <div class="flex items-center justify-between">
                <h1 class="text-3xl text-slate-700 font-bold">Recover a wallet</h1>
            </div>
            <span class="text-slate-500">Use your secret key and password taken when you created the wallet</span>
        </div>
        <div class="flex flex-col">
            <label for="password" class="font-semibold block mb-2">Wallet Secret</label>
            <textarea type="password" id="password" v-model="walletSecret"
                class="px-4 py-2 mb-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your wallet secret"></textarea>
            <label for="confirmPassword" class="font-semibold block mb-2">Confirm Password</label>
            <input type="password" id="confirmPassword" v-model="password"
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
import { decryptPrivateKey, encryptPrivateKey } from '@/scripts/crypto';

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
const walletSecret = ref();

const readyToConfirm = computed(() => !!(password.value && walletSecret.value))

onMounted(() => {
    active.value = true;
})

watch(() => readyToConfirm.value, () => {
    active.value = false;
})

const recoverAccount = async () => {
    try {
        let decyptedRecover = decryptPrivateKey(walletSecret.value.trim(), password.value.trim());
        if (!decyptedRecover) {
            throw new Error('Wrong secret provided or password');
        }

        const { account } = await generateAccount(decyptedRecover);
        const publicKey = getPublicKey(account.publicKey).toBase58();

        localStorage.setItem('pubKey', publicKey);
        localStorage.setItem('pkey', walletSecret.value);

        notify('Account recovered', 'success');

        emit('screen', 'account')
    } catch (e: any) {
        notify((e?.message && e.message.charAt(0).toUpperCase() + e.message.slice(1)) || 'Something went wrong!', 'error');
    } finally {
        password.value = '';
        walletSecret.value = '';
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
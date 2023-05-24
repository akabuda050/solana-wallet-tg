<template>
    <div class="flex flex-col gap-3 pb-20">
        <div class="flex items-center justify-between">
            <h1 class="text-3xl text-slate-700 font-bold">Account</h1>
        </div>
        <div class="flex items-center justify-start gap-x-2">
            <div class="flex items-center gap-x-1 text-slate-500 bg-gray-100 p-2 text-sm font-semibold shadow-md hover:shadow-cyan-500/50 cursor-pointer rounded-lg"
                :class="{
                    'animate-pulse': loading
                }" @click="() => copyToClipboard(balanceInSol)">
                <span class="">{{ balanceInSol }}</span>
                <span class="">SOL</span>

            </div>
            <div v-if="publicKey"
                class="truncate text-slate-500 bg-gray-100 p-2 text-sm font-semibold cursor-pointer shadow-md hover:shadow-cyan-500/50 rounded-lg"
                @click="() => copyToClipboard(publicKey || '')">
                <span class="">{{ publicKey }}</span>
            </div>
        </div>
        <div class="flex flex-col gap-5">
            <ActionsToolBar @airdrop:request="onAirdropRequest" />
            <LastTransactions :transactions="transactions" :loading="loading" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { toast, type ToastType } from 'vue3-toastify';
import MainButton from '../general/MainButton.vue';
import ActionsToolBar from '../Account/ActionsToolBar.vue';
import LastTransactions from '../Account/LastTransactions.vue';
import { createConnection, getHistory, getPublicKey, requestAirdrop } from '@/scripts/solana';
import type { AccountInfo } from '@solana/web3.js';

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
const loading = ref(true);

const connection = createConnection();
const publicKey = ref<string | null>(null);
const balance = ref(0);
const transactions = ref<{
    tsig: string,
    balance: number,
    amount: number
    accounts: string[],
    itsMine: boolean,
}[]>([])

onMounted(() => {
    const pubKey = localStorage.getItem('pubKey')
    const privateKey = localStorage.getItem('pkey')

    if (!pubKey || !privateKey) {
        disconnectWallet();
    } else {
        publicKey.value = pubKey
        active.value = true;

        loadAccountHistory().then();

        connection.onAccountChange(getPublicKey(publicKey.value), updateLocalHistory)
    }
});

const loadAccountHistory = async () => {
    try {
        const history = await getHistory(connection, getPublicKey(publicKey.value));
        balance.value = history[0]?.balance || 0;
        transactions.value = history;
    } catch (e: any) {
        notify((e?.message && e.message.charAt(0).toUpperCase() + e.message.slice(1)) || 'Something went wrong!', 'error');
        console.error(e)
    } finally {
        loading.value = false
    }
}

const updateLocalHistory = async (account: AccountInfo<Buffer>) => {
    const history = await getHistory(connection, getPublicKey(publicKey.value), { limit: 1 });
    balance.value = account?.lamports || 0;

    if (history.length && !transactions.value.some((t) => t.tsig === history[0]?.tsig)) {
        transactions.value.unshift(history[0]);

        if (history[0]?.amount && !history[0]?.itsMine) {
            notify(`Receied: ${((history[0]?.amount || 0) * 0.000000001).toFixed(5)}`);
        }
    }
}

const airDrops = ref<string[]>([])

const onAirdropRequest = async () => {
    try {
        notify('Airdrop requested. Please wait for confirmation.', 'success');
        const result = await requestAirdrop(connection, publicKey.value, Math.floor(Math.random() / 0.000000001));
        airDrops.value.push(result)
    } catch (e: any) {
        notify((e?.message && e.message.charAt(0).toUpperCase() + e.message.slice(1)) || 'Something went wrong!', 'error');
        console.error(e)
    }
}

const balanceInSol = computed(() => (balance.value * 0.000000001).toFixed(5));

const disconnectWallet = () => {
    localStorage.removeItem('pubKey')
    localStorage.removeItem('pkey')
    publicKey.value = null;
    balance.value = 0;

    emit('screen', 'start')
}

const copyToClipboard = (text: string) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    notify('Copied.');

}
</script>
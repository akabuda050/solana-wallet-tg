<template>
    <div class="flex flex-col gap-1">
        <div
            class="flex flex-col gap-2 rounded-md shadow-md bg-gray-100 opacity-90 p-2 hover:shadow-lg hover:shadow-cyan-500/50 ">
            <h2 class="text-gray-700 text-md font-medium">Last {{ props.transactions.length }} Transactions</h2>

            <template v-if="props.transactions.length">
                <TransitionGroup name="list" tag="div" class="flex flex-col opacity-90">
                    <div class="flex items-center justify-between cursor-pointer p-2 hover:rounded-md hover:bg-slate-200"
                        v-for="transaction in transactions" :key="transaction.tsig" @click="() => {
                            copyToClipboard(transaction.tsig)
                        }">
                        <div class="flex items-center gap-2">
                            <div class="flex items-center justify-center rounded-full shadow-md w-8 h-8" :class="{

                                'bg-sky-500 shadow-cyan-500/50': transaction.itsMine,
                                'bg-green-500 shadow-green-500/50': !transaction.itsMine,
                            }">
                                <font-awesome-icon size="sm" :icon="transaction.itsMine ? faPaperPlane : faDownload"
                                    class="text-white" />
                            </div>
                            <span class="text-slate-500 text-xs font-semibold max-w-[150px] truncate">{{
                                transaction.tsig }}</span>
                        </div>
                        <span class="text-slate-500 text-xs text-slate-500 font-semibold">SOL</span>
                        <span class="text-xs font-semibold" :class="{
                            'text-red-600': transaction.itsMine,
                            'text-green-600': !transaction.itsMine,
                        }">${{ (transaction.amount * 0.000000001).toFixed(5) }}</span>
                    </div>
                </TransitionGroup>
            </template>
            <template v-else>
                <div class="flex items-center justify-center bg-gray-100 cursor-pointer p-2 hover:rounded-md hover:bg-slate-200"
                    :class="{
                        'animate-pulse': loading
                    }">
                    <span class="text-slate-500 text-xs text-slate-500 font-semibold">{{ loading ? 'Loading...' :
                        'Empty' }}</span>
                </div>
            </template>

        </div>
    </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { toast } from 'vue3-toastify';

const notify = (prompt: string) => {
    toast(prompt, {
        closeButton: false,
        autoClose: 1000,
        closeOnClick: true,
        position: 'top-center',
    }); // ToastOptions
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

const props = defineProps({
    transactions: {
        type: Array as PropType<{
            tsig: string,
            amount: number,
            itsMine: boolean
        }[]>,
        default: () => []
    },
    loading: {
        type: Boolean,
        default: false
    }
})
</script>
<style scoped>
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>
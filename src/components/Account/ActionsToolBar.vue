<template>
    <div
        class="flex items-center justify-between rounded-md shadow-md bg-gray-100 p-4 hover:shadow-lg hover:shadow-cyan-500/50">
        <div class="flex flex-col items-center gap-1">
            <div @click="() => {
                notify('To be done :)');
            }"
                class="flex items-center justify-center bg-sky-500 cursor-pointer rounded-full hover:opacity-75 shadow-md hover:shadow-lg hover:shadow-cyan-500/50 w-14 h-14">
                <font-awesome-icon size="xl" :icon="faPaperPlane" class="text-white" />


            </div>
            <span class="text-slate-500 text-xs font-semibold">Send</span>
        </div>
        <div class="flex flex-col items-center gap-1">
            <div @click="() => {
                emit('airdrop:request');
            }"
                class="flex items-center justify-center bg-green-500 cursor-pointer rounded-full hover:opacity-75 shadow-md hover:shadow-lg hover:shadow-green-500/50 w-14 h-14">
                <font-awesome-icon size="xl" :icon="faDownload" class="text-white" />
            </div>
            <span class="text-slate-500 text-xs font-semibold">Request Airdrop</span>

        </div>
        <div class="flex flex-col items-center gap-1">
            <div 
                class="flex items-center justify-center bg-yellow-500 cursor-pointer rounded-full hover:opacity-75 shadow-md hover:shadow-lg hover:shadow-yellow-500/50 w-14 h-14">
                <font-awesome-icon size="xl" :icon="faFileInvoiceDollar" class="text-white" />
            </div>
            <span class="text-slate-500 text-xs font-semibold">Invoice</span>

        </div>
    </div>
</template>
<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faDownload, faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { toast } from 'vue3-toastify';

const notify = (prompt: string) => {
    toast(prompt, {
        closeButton: false,
        autoClose: 1000,
        closeOnClick: true,
        position: 'top-center',
    });
}

const emit = defineEmits(['airdrop:request'])

</script>
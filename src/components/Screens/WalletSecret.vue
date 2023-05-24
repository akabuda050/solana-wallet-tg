<template>
    <div class="flex flex-col gap-3 pb-20">
        <div class="flex flex-col">
            <div class="flex items-center justify-between">
                <h1 class="text-3xl text-slate-700 font-bold">Copy secret</h1>
            </div>
            <span class="text-slate-500">Copy this secret and store it securely. This secret will be required to connect
                back if you will be disconnected.</span>
        </div>
        <div class="flex flex-col justify-between gap-3 bg-gray-100 rounded-md p-4 shadow-md">
            <div class="flex items-center justify-between">
                <span class="text-gray-700 text-md font-medium">Secret Key:</span>
                <button
                    class="ml-4 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    @click="copyToClipboard(privateKey || '')">Copy</button>
            </div>
            <div class="bg-gray-200 px-3 py-2 rounded-lg">
                <pre class="whitespace-pre-wrap break-all text-sm font-mono text-gray-800">{{ privateKey }}</pre>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from 'vue';
import { toast, type ToastType } from 'vue3-toastify';

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
const privateKey = localStorage.getItem('pkey')

onMounted(() => {
    active.value = true;
})

const copyToClipboard = (text: string) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    notify('Copied.');

    emit('screen', 'account');
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
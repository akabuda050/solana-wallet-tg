<template>
    <div class="flex flex-col gap-3">
        <div class="flex flex-col">
            <div class="flex items-center justify-between">
                <h1 class="text-3xl text-slate-700 font-bold">Welcome</h1>
            </div>
            <span class="text-slate-500">Awesome non-custodial wallet in your telegram</span>
        </div>
        <div class="flex flex-col gap-5">
            <div class="bg-white rounded-lg shadow-lg p-6 hover:bg-violet-50 cursor-pointer" @click="newWallet">
                <div class="flex items-center justify-between gap-5">
                    <div class="flex items-center jusify-start gap-5">
                        <font-awesome-icon size="2xl" :icon="faSquarePlus" />
                        <div class="flex flex-col">
                            <h2 class="font-bold text-slate-700">Create new wallet</h2>
                            <span class="text-slate-500">Start fresh with a new wallet</span>
                        </div>
                    </div>
                    <font-awesome-icon class="" size="2xl" :icon="faArrowRight" />
                </div>
            </div>

            <div class="bg-white rounded-lg shadow-lg p-6 hover:bg-violet-50 cursor-pointer" @click="recoverWallet">
                <div class="flex items-center justify-between gap-5">
                    <div class="flex items-center jusify-start gap-5">
                        <font-awesome-icon size="2xl" :icon="faFileText" />
                        <div class="flex flex-col">
                            <h2 class="font-bold text-slate-700">Recover wallet</h2>
                            <span class="text-slate-500">Connect existing one</span>
                        </div>
                    </div>
                    <font-awesome-icon class="" size="2xl" :icon="faArrowRight" />
                </div>
            </div>
        </div>
        <div class="flex items-center w-full fixed bottom-0 left-0">
            <MainButton text="Close" :active="active" @click="() => active = !active" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faSquarePlus, faFileText } from '@fortawesome/free-regular-svg-icons'
import { onMounted, ref } from 'vue';
import MainButton from '../general/MainButton.vue';

const emit = defineEmits(['screen'])
const active = ref(false);

const newWallet = () => {
    emit('screen', 'wallet:new')
}

const recoverWallet = () => {
    emit('screen', 'wallet:recover')
}

onMounted(() => {
    active.value = true;
})
</script>

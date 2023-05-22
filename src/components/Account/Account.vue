
<template>
    <div class="flex flex-col gap-3">
        <div name="slide-left" tag="div" class="flex flex-col">
            <template v-if="action === undefined">
                <div class="flex items-center justify-between">
                    <h1 class="text-3xl text-slate-700 font-bold">Welcome</h1>
                    <span class="inline-flex items-center justify-center h-4 w-4 rounded-full border-black" :class="{
                        'bg-green-500': !!encrypted,
                        'bg-gray-500': !encrypted
                    }">
                        <svg class="h-2 w-2 text-white" viewBox="0 0 8 8" fill="currentColor">
                            <circle cx="2" cy="2" />
                        </svg>
                    </span>

                </div>
                <span class="text-slate-500">Awesome non-custodial wallet in your telegram</span>

            </template>
            <template v-else-if="action === 'new'">
                <h1 class="text-3xl text-slate-700 font-bold">Set a Password</h1>
                <span class="text-slate-500">This password is used to protect and provide access to your wallet</span>
            </template>
            <template v-else-if="action === 'recover'">
                <h1 class="text-3xl text-slate-700 font-bold">Recover a wallet</h1>
                <span class="text-slate-500">Use your secret key and password taken when you created the wallet</span>
            </template>
        </div>
        <div name="slide-left" tag="div" class="flex flex-col gap-5" v-if="!encrypted">
            <template v-if="action === undefined">
                <div class="bg-white rounded-lg shadow-lg p-6 hover:bg-violet-50 cursor-pointer" @click="() => {
                    action = 'new'
                }">
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

                <div class="bg-white rounded-lg shadow-lg p-6 hover:bg-violet-50 cursor-pointer" @click="() => {
                    action = 'recover'
                }">
                    <div class="flex items-center justify-between gap-5">
                        <div class="flex items-center jusify-start gap-5">
                            <font-awesome-icon size="2xl" :icon="faFileText" />
                            <div class="flex flex-col">
                                <h2 class="font-bold text-slate-700">Recover wallet</h2>
                                <span class="text-slate-500">Enter your wallet secret</span>
                            </div>
                        </div>
                        <font-awesome-icon class="" size="2xl" :icon="faArrowRight" />
                    </div>
                </div>
            </template>
            <template v-else-if="action === 'new'">
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
                </div>
            </template>
            <template v-else-if="action === 'recover'">
                <div class="flex flex-col">
                    <label for="password" class="font-semibold block mb-2">Wallet Secret</label>
                    <textarea type="password" id="password" v-model="walletSecret"
                        class="px-4 py-2 mb-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your wallet secret"></textarea>
                    <label for="password" class="font-semibold block mb-2">Password</label>
                    <input type="password" id="password" v-model="secretPassword"
                        class="px-4 py-2 mb-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your password">

                </div>
            </template>
        </div>
        <div v-else>
            <div class="flex flex-col justify-between gap-3 bg-gray-100 rounded-md p-4 shadow-md">
                <div class="flex items-center justify-between">
                    <span class="text-gray-700 text-md font-medium">Secret Key:</span>
                    <button
                        class="ml-4 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        @click="copyToClipboard(encrypted)">Copy</button>
                </div>
                <div class="bg-gray-200 px-3 py-2 rounded-lg">
                    <pre class="whitespace-pre-wrap break-all text-sm font-mono text-gray-800">{{ encrypted }}</pre>
                </div>
            </div>



        </div>
    </div>
</template>
<script setup lang="ts">
// @ts-nocheck
import { encryptPrivateKey, decryptPrivateKey, getRandomBytes } from '../../scripts/crypto';
import { nextTick, onMounted, ref, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faSquarePlus, faFileText } from '@fortawesome/free-regular-svg-icons'

const telegram = window.Telegram.WebApp
const decrypted = ref(null);
const encrypted = ref(localStorage.getItem('pkey'));

const action = ref<string | undefined>(undefined)
watch(() => action.value, (newAction) => {
    if (newAction === 'new' || newAction === 'recover') {
        telegram.MainButton.text = 'Back';
        telegram.MainButton.color = '#b194f5';

        telegram.MainButton.show()
    }
});

const password = ref<string>('')
const confirmPassword = ref<string>('')
watch(() => [confirmPassword.value, password.value], (pass, passVal) => {
    console.log(pass, passVal)
    if (confirmPassword.value && password.value && password.value === confirmPassword.value) {
        telegram.BackButton.show();

        telegram.MainButton.text = 'Confirm';
        telegram.MainButton.color = '#b194f5';
        telegram.MainButton.show();
    }
});

const walletSecret = ref<string>('')
const secretPassword = ref<string>('')
watch(() => [secretPassword.value, walletSecret.value], () => {
    if (secretPassword.value && walletSecret.value) {
        telegram.BackButton.show();

        telegram.MainButton.text = 'Sign';
        telegram.MainButton.color = '#b194f5';
        telegram.MainButton.show()
    }
});

watch(() => encrypted.value, (val) => {
    if (val) {
        telegram.MainButton.text = 'Disconnect';
        telegram.MainButton.color = '#b194f5';
        telegram.MainButton.show();
        telegram.BackButton.hide();
    } else {
        action.value = undefined;
        telegram.MainButton.hide()
    }
});

onMounted(() => {
    if (encrypted.value) {
        telegram.MainButton.text = 'Disconnect';
        telegram.MainButton.color = '#b194f5';
        telegram.BackButton.hide();

        setTimeout(() => {
            telegram.MainButton.show();
        }, 500)
    }
})

telegram.BackButton.onClick(() => {
    action.value = undefined
    telegram.BackButton.hide()
    telegram.MainButton.hide()

    password.value = ''
    confirmPassword.value = ''
    walletSecret.value = ''
    secretPassword.value = ''
});

telegram.MainButton.onClick(() => {
    if (telegram.MainButton.text === 'Back') {
        action.value = undefined
        telegram.MainButton.hide()
    } else if (telegram.MainButton.text === 'Confirm') {
        decrypted.value = getRandomBytes();
        encrypted.value = encryptPrivateKey(decrypted.value, password.value);
        decrypted.value = '';

        password.value = '';
        confirmPassword.value = '';

        localStorage.setItem('pkey', encrypted.value);
        action.value = undefined
    } else if (telegram.MainButton.text === 'Disconnect') {
        localStorage.removeItem('pkey');
        encrypted.value = null;
        action.value = undefined
    } else if (telegram.MainButton.text === 'Sign') {
        let decyptedRecover = decryptPrivateKey(walletSecret.value.trim(), secretPassword.value);
        console.log(decyptedRecover)

        if (decyptedRecover) {
            encrypted.value = walletSecret.value;
            decrypted.value = '';

            walletSecret.value = '';
            secretPassword.value = '';

            localStorage.setItem('pkey', encrypted.value);
            action.value = undefined
        }

        decyptedRecover = '';
    }
});

const copyToClipboard = (secretKey) => {
    const textarea = document.createElement('textarea');
    textarea.value = secretKey;
    textarea.style.position = 'fixed';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);


}
</script>
<style scoped></style>

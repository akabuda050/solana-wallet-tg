
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
            <template v-else-if="action === 'wallet'">
                <div class="flex items-center justify-between">
                    <h1 class="text-3xl text-slate-700 font-bold">Account</h1>
                    <span class="inline-flex items-center justify-center h-4 w-4 rounded-full border-black" :class="{
                        'bg-green-500': !!encrypted,
                        'bg-gray-500': !encrypted
                    }">
                        <svg class="h-2 w-2 text-white" viewBox="0 0 8 8" fill="currentColor">
                            <circle cx="2" cy="2" />
                        </svg>
                    </span>

                </div>
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-x-1 text-slate-500 p-2 text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/50 cursor-pointer hover:rounded-lg"
                        @click="copyToClipboard(balance * 0.000000001)">
                        <span class="">{{ (balance * 0.000000001).toFixed(5) || 0 }}</span>
                        <span class="">SOL</span>

                    </div>
                    <div class="truncate text-slate-500 p-2 text-sm font-normal cursor-pointer hover:shadow-lg hover:shadow-cyan-500/50 hover:rounded-lg"
                        @click="copyToClipboard(pubclicKey)">
                        <span class="">{{ pubclicKey }}</span>
                    </div>
                </div>
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
                                <span class="text-slate-500">Connect existing one</span>
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
        <div name="slide-left" tag="div" class="flex flex-col gap-5" v-else>
            <template v-if="action === 'secret'">
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
            </template>
            <template v-else-if="action === 'wallet'">
                <div
                    class="flex items-center justify-between rounded-md shadow-lg bg-gray-100 p-4 hover:shadow-lg hover:shadow-cyan-500/50">
                    <div class="flex flex-col items-center gap-1">
                        <div @click="send = true"
                            class="flex items-center justify-center bg-sky-500 cursor-pointer rounded-full hover:opacity-75 shadow-md hover:shadow-lg hover:shadow-cyan-500/50 w-14 h-14">
                            <font-awesome-icon size="xl" :icon="faPaperPlane" class="text-white" />


                        </div>
                        <span class="text-slate-500 text-xs font-semibold">Send</span>

                    </div>
                    <div class="flex flex-col items-center gap-1">
                        <div @click="() => {
                            requestAirdrop(connection, pubclicKey)
                            notify('Requested. Please wait.');
                        }"
                            class="flex items-center justify-center bg-green-500 cursor-pointer rounded-full hover:opacity-75 shadow-md hover:shadow-lg hover:shadow-green-500/50 w-14 h-14">
                            <font-awesome-icon size="xl" :icon="faDownload" class="text-white" />
                        </div>
                        <span class="text-slate-500 text-xs font-semibold">Request Airdrop</span>

                    </div>
                    <div class="flex flex-col items-center gap-1">
                        <div @click="() => {
                            notify('To be done :)');
                        }"
                            class="flex items-center justify-center bg-yellow-500 cursor-pointer rounded-full hover:opacity-75 shadow-md hover:shadow-lg hover:shadow-yellow-500/50 w-14 h-14">
                            <font-awesome-icon size="xl" :icon="faFileInvoiceDollar" class="text-white" />
                        </div>
                        <span class="text-slate-500 text-xs font-semibold">Invoice</span>

                    </div>
                </div>
                <div class="flex flex-col gap-1" v-if="!send">
                    <h2 class="text-gray-700 text-md font-medium">Last {{ transactions.length }} Transactions</h2>
                    <div
                        class="flex flex-col gap-2 rounded-md shadow-lg bg-gray-100 opacity-90 p-4 hover:shadow-cyan-500/50">
                        <template v-if="transactions.length">
                            <TransitionGroup name="list" tag="div">
                                <div class="flex items-center justify-between bg-gray-100 cursor-pointer p-2 hover:rounded-md hover:bg-slate-200"
                                    v-for="transaction in transactions" :key="transaction.tsig" @click="() => {
                                        copyToClipboard(transaction.tsig)
                                    }">
                                    <div class="flex items-center gap-3">
                                        <div class="flex items-center justify-center rounded-full shadow-md w-8 h-8" :class="{

                                            'bg-sky-500 shadow-cyan-500/50': pubclicKey === transaction.accounts[0],
                                            'bg-green-500 shadow-green-500/50': pubclicKey !== transaction.accounts[0],
                                        }">
                                            <font-awesome-icon size="sm"
                                                :icon="pubclicKey === transaction.accounts[0] ? faPaperPlane : faDownload"
                                                class="text-white" />
                                        </div>
                                        <span class="text-slate-500 text-xs font-semibold max-w-[150px] truncate">{{
                                            transaction.tsig }}</span>
                                    </div>
                                    <span class="text-slate-500 text-xs text-slate-500 font-semibold">SOL</span>
                                    <span class="text-xs font-semibold" :class="{
                                        'text-red-600': pubclicKey === transaction.accounts[0],
                                        'text-green-600': pubclicKey !== transaction.accounts[0],
                                    }">${{ (transaction.amount * 0.000000001).toFixed(5) }}</span>
                                </div>
                            </TransitionGroup>
                        </template>
                        <template v-else>
                            <div
                                class="flex items-center justify-center bg-gray-100 cursor-pointer p-2 hover:rounded-md hover:bg-slate-200">
                                <span class="text-slate-500 text-xs text-slate-500 font-semibold">Empty</span>
                            </div>
                        </template>

                    </div>
                </div>
                <div class="flex flex-col gap-1" v-else>
                    <h2 class="text-gray-700 text-md font-medium">Send</h2>
                    <div
                        class="flex flex-col gap-2 rounded-md shadow-lg bg-gray-100 opacity-90 p-4 hover:shadow-cyan-500/50">
                        <label for="recepinet" class="font-semibold block mb-2">To</label>
                        <input type="text" id="recepinet" v-model="recepinet"
                            class="px-4 py-2 mb-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter recepinet address">

                        <label for="amount" class="font-semibold block mb-2">Amount</label>
                        <input type="number" id="amount" v-model="amount"
                            class="px-4 py-2 mb-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter amount">

                        <label for="secretPassword" class="font-semibold block mb-2">Password</label>
                        <input type="password" id="secretPassword" v-model="secretPassword"
                            class="px-4 py-2 mb-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your password">
                    </div>
                </div>

                <!-- <button @click="sendTransactionToAccount(recepinet, amount)">Send</button>-->
            </template>
        </div>
    </div>
</template>
<script setup lang="ts">
// @ts-nocheck
import { encryptPrivateKey, decryptPrivateKey, getRandomBytes } from '../../scripts/crypto';
import { createConnection, getBalance, generateAccount, getPublicKey, sendTransaction, requestAirdrop, getHistory } from '../../scripts/solana';

import { onMounted, ref, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowRight, faDownload, faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons'
import { faSquarePlus, faFileText, faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { toast } from 'vue3-toastify';

const notify = (prompt) => {
    toast(prompt, {
        closeButton: false,
        autoClose: 1000,
        closeOnClick: true,
        position: 'top-center',
    }); // ToastOptions
}



const telegram = window.Telegram.WebApp
const decrypted = ref(null);
const encrypted = ref();
const balance = ref(0);
const pubclicKey = ref('');

const action = ref<string | undefined>(undefined)
watch(() => action.value, (newAction) => {
    if (newAction === 'new' || newAction === 'recover') {
        telegram.MainButton.text = 'Back';
        telegram.MainButton.color = '#b194f5';

        telegram.MainButton.show()
    } else if (action.value === 'wallet') {

    }
});

const password = ref<string>('')
const confirmPassword = ref<string>('')
watch(() => [confirmPassword.value, password.value], (pass, passVal) => {
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

const canShowDisconnect = ref(false);
watch(() => encrypted.value, (val) => {
    if (val) {
        telegram.MainButton.text = 'Disconnect';
        telegram.MainButton.color = '#b194f5';
        if (canShowDisconnect.value) {
            telegram.MainButton.show();
            telegram.BackButton.hide();
        }
    } else {
        action.value = undefined;
        telegram.MainButton.hide()
    }
});

const showDisconnectButton = () => {
    telegram.MainButton.show();
    canShowDisconnect.value = true;
    document.removeEventListener('click', showDisconnectButton)
    document.removeEventListener('touchstart', showDisconnectButton)

}

const inFlight = ref(0);
const transactions = ref([]);
const connection = ref(createConnection());
onMounted(() => {
    encrypted.value = localStorage.getItem('pkey');
    pubclicKey.value = localStorage.getItem('pubKey');
    console.log(pubclicKey.value)
    if (encrypted.value) {
        const urlParams = new URLSearchParams(window.location.search);
        const startAction = urlParams.get('action');

        if (startAction === 'enable_notifications') {
            telegram.sendData(JSON.stringify({
                pubKey: pubclicKey.value,
                action: 'enable'
            }))
        } else if (startAction === 'disable_notifications') {
            telegram.sendData(JSON.stringify({
                pubKey: pubclicKey.value,
                action: 'disable'
            }))
        }

        if (inFlight.value < 1) {
            inFlight.value++
            getHistory(connection.value, getPublicKey(pubclicKey.value)).then((list) => {
                balance.value = list[0]?.balance || 0;
                transactions.value = list;
            }).finally(() => {
                inFlight.value--
            })
        }



        action.value = 'wallet'

        telegram.MainButton.text = 'Disconnect';
        telegram.MainButton.color = '#b194f5';
        telegram.BackButton.hide();

        document.addEventListener('click', showDisconnectButton)
        document.addEventListener('touchstart', showDisconnectButton)


        connection.value.onAccountChange(getPublicKey(pubclicKey.value), (account) => {
            balance.value = account?.lamports || 0;

            getHistory(connection.value, getPublicKey(pubclicKey.value), { limit: 1 }).then((trans) => {
                if (trans.length && !transactions.value.some((t) => t.tsig === trans[0]?.tsig)) {
                    transactions.value.unshift(trans[0]);

                    if (trans[0]?.amount && !trans[0]?.itsMine) {
                        notify(`Receied: ${((trans[0]?.amount || 0) * 0.000000001).toFixed(5)}`);
                    }
                }
            })
        })
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
        getRandomBytes().then(({ account, mnemonic }) => {
            console.log({ account, mnemonic })
            pubclicKey.value = getPublicKey(account._publicKey).toBase58();
            localStorage.setItem('pubKey', pubclicKey.value);

            decrypted.value = mnemonic
            encrypted.value = encryptPrivateKey(decrypted.value, password.value);
            decrypted.value = '';

            password.value = '';
            confirmPassword.value = '';

            localStorage.setItem('pkey', encrypted.value);
            action.value = 'secret'
        });

    } else if (telegram.MainButton.text === 'Disconnect') {
        localStorage.removeItem('pubKey');
        localStorage.removeItem('pkey');

        encrypted.value = null;
        pubclicKey.value = null;

        action.value = undefined
    } else if (telegram.MainButton.text === 'Sign') {
        if (send.value) {
            sendTransactionToAccount(recepinet.value, amount.value)
        } else {
            let decyptedRecover = decryptPrivateKey(walletSecret.value.trim(), secretPassword.value);
            generateAccount(decyptedRecover).then((acc) => {
                console.log(acc.account._publicKey)
                pubclicKey.value = getPublicKey(acc.account._publicKey).toBase58();
                localStorage.setItem('pubKey', pubclicKey.value);

                console.log(pubclicKey.value)
                getBalance(connection.value, acc.account._publicKey).then((bal) => {
                    console.log(bal)
                    balance.value = bal
                });
            });

            if (decyptedRecover) {
                encrypted.value = walletSecret.value;
                decrypted.value = '';

                walletSecret.value = '';
                secretPassword.value = '';

                localStorage.setItem('pkey', encrypted.value);
                action.value = 'wallet'

                if (startAction === 'enable_notifications') {
                    telegram.sendData(JSON.stringify({
                        pubKey: pubclicKey.value,
                        action: 'enable'
                    }))
                } else if (startAction === 'disable_notifications') {
                    telegram.sendData(JSON.stringify({
                        pubKey: pubclicKey.value,
                        action: 'disable'
                    }))
                }
            }

            decyptedRecover = '';
        }
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

    if (action.value === 'secret') {
        const urlParams = new URLSearchParams(window.location.search);
        const startAction = urlParams.get('action');

        if (startAction === 'enable_notifications') {
            telegram.sendData(JSON.stringify({
                pubKey: pubclicKey.value,
                action: 'enable'
            }))
        } else if (startAction === 'disable_notifications') {
            telegram.sendData(JSON.stringify({
                pubKey: pubclicKey.value,
                action: 'disable'
            }))
        }

        action.value = 'wallet'
    }

    notify('Copied.');

}

const send = ref(false);
const recepinet = ref();
const amount = ref();

watch(() => [secretPassword.value, recepinet.value && amount.value], () => {
    if (secretPassword.value && recepinet.value && amount.value) {
        telegram.BackButton.show();

        telegram.MainButton.text = 'Sign';
        telegram.MainButton.color = '#b194f5';
        telegram.MainButton.show()
    }
});

const sendTransactionToAccount = async (to, amnt) => {
    send.value = false;

    let decyptedRecover = decryptPrivateKey(encrypted.value, secretPassword.value);
    const acc = await generateAccount(decyptedRecover);

    notify('Sent. Wait confirmation.');


    secretPassword.value = null
    recepinet.value = null
    amount.value = null

    telegram.MainButton.text = 'Disconnect';
    telegram.MainButton.color = '#b194f5';
    telegram.MainButton.show();
    telegram.BackButton.hide();

    const transaction = await sendTransaction(connection.value, acc.account, to, amnt / 0.000000001);

    notify('Confirmed.');

    console.log(transaction);

}
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

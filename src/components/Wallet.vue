
<template>
    <div class="flex flex-col items-center">
        <h1>Wallet</h1>
        <span>{{ props.action }}</span>
        <button @click="() => {
            sendHello();
        }"></button>
    </div>
</template>
<script setup lang="ts">
// @ts-nocheck
const telegram = window.Telegram.WebApp

const props = defineProps({
    action: {
        type: String,
        require: true,
    }
})

const sendHello = () => {
    telegram.sendData({
        action: props.action
    })
}
</script>
<style scoped>
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

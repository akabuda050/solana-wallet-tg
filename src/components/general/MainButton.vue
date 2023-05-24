<template>
    <div class="w-full p-2.5 flex items-center cursor-pointer">
        <Transition name="slide-fade">
            <div v-if="props.active === true"
                class="w-full flex items-center justify-center p-3 bg-violet-400 rounded-xl">
                <span class="text-white font-bold uppercase">{{ props.text }}</span>
            </div>
        </Transition>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    active: {
        type: Boolean,
        default: false,
    },
    text: {
        type: String,
        required: true,
    }
});
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
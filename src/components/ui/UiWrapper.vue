<template>
    <div
        class="p-4"
        :class="[
            {
                'container mx-auto': container === true,
            },
            {
                'bg-white': color === 'white',
                'bg-[110d0f]': color === 'dark',
                'rounded-3xl': rounded === true,
            },
            {
                'py-12 px-8': padded === true,
            },
        ]"
    >
        <slot />
    </div>
</template>

<script setup lang="ts">
defineProps<{
    container?: boolean;
    color?: string;
    rounded?: boolean;
    padded?: boolean;
}>();
</script>

<template>
    <div
        class="p-4"
        :class="[
            {
                'container mx-auto': container === true,
            },
            {
                'bg-white': color === 'white',
                'bg-[#110d0f]': color === 'dark',
                'bg-[#dfdaae]': color === 'beige',
            },
            {
                'py-12 px-8': padded === true,
                'py-8 px-4': padded === 'sm',
                'p-4': padded === 'squared',
            },
            {
                'rounded-3xl': rounded === true,
                'rounded-xl': rounded === 'sm',
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
    padded?: boolean | string;
    rounded?: boolean | string;
}>();
</script>

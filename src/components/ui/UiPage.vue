<template>
    <div
        class="w-full"
        :class="[
            {
                'h-full': full,
                'h-screen': screen === true,
            },
        ]"
    >
        <slot />
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    full?: boolean;
    screen?: boolean | string | null;
}>();
</script>

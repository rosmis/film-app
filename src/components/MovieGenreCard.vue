<template>
    <ui-wrapper padded="squared" rounded="sm" color="white">
        <ui-level class="flex-col">
            <p>{{ genre.name }}</p>
        </ui-level>
    </ui-wrapper>
</template>

<script lang="ts" setup>
defineProps<{
    genre: { id: number; name: string };
}>();
</script>

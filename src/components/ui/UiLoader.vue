<template>
    <ui-level space="sm" class="w-full" align="center">
        <p class="text-xl animate-pulse text-gray-400">Chargement</p>
        <n-icon size="24" class="animate-spin text-gray-400"
            ><RefreshOutline
        /></n-icon>
    </ui-level>
</template>

<script lang="ts" setup>
import { RefreshOutline } from "@vicons/ionicons5";
</script>

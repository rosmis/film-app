<template>
    <ui-level space="sm" class="w-full" align="center">
        <p class="text-xl animate-pulse text-gray-400">Chargement</p>
        <Icon class="text-lg animate-spin text-gray-400">
            <RefreshOutline />
        </Icon>
    </ui-level>
</template>

<script lang="ts" setup>
import { RefreshOutline } from "@vicons/ionicons5";
import { Icon } from "@vicons/utils";
</script>

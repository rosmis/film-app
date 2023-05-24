<template>
    <Component
        is="button"
        class="bg-transparent border-none rounded-lg cursor-pointer h-10 text-[#dfdaae] py-4 px-8 transition z-0 gap-2 relative inline-flex items-center select-none justify-center hover:bg-gray-900"
    >
        <ui-level space="sm">
            <Icon class="text-[#dfdaae]">
                <slot name="icon"></slot>
            </Icon>

            <slot> </slot>
        </ui-level>
    </Component>
</template>

<script lang="ts" setup>
import { Icon } from "@vicons/utils";
</script>

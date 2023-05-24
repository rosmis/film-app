<template>
    <div class="flex-grow flex relative items-center">
        <ui-level
            class="border-[#dfdaae] rounded-full border-2 px-4"
            space="sm"
        >
            <Icon class="text-[#dfdaae] text-sm">
                <Search />
            </Icon>

            <input
                :placeholder="placeholder"
                :value="modelValue"
                class="bg-transparent outline-none placeholder-[#dfdaae] h-10 text-[#dfdaae] w-full fontSize"
                @keyup.enter="emit('enter')"
                @input="$emit('update:modelValue', $event.target.value)"
            />
        </ui-level>
    </div>
</template>

<script lang="ts">
import { Search } from "@vicons/ionicons5";
import { Icon } from "@vicons/utils";

export default {
    model: {
        prop: "modelValue",
        event: "update:modelValue",
    },
};
</script>

<script lang="ts" setup>
withDefaults(
    defineProps<{
        accent?: string;
        placeholder?: string;
        modelValue?: string | boolean | number;
        size?: string;
    }>(),
    {
        accent: undefined,
        placeholder: undefined,
        modelValue: undefined,
        size: undefined,
    }
);

const emit = defineEmits<{
    (event: "update:modelValue", modelValue: string | boolean | number): void;
    (event: "enter"): void;
}>();
</script>

<style scoped>
input::placeholder {
    font-size: 0.7em;
}
</style>

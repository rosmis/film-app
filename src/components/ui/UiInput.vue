<template>
    <div class="flex-grow flex relative items-center">
        <input
            :placeholder="placeholder"
            :value="modelValue"
            class="bg-transparent border-[#dfdaae] rounded-full outline-none border-2 placeholder-[#dfdaae] h-10 text-[#dfdaae] w-full px-4 fontSize"
            @keyup.enter="emit('enter')"
            @input="$emit('update:modelValue', $event.target.value)"
        />
    </div>
</template>

<script lang="ts">
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

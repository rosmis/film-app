<template>
    <div
        class="flex"
        :class="[
            {
                'flex-col sm:flex-row': breakpoint === 'sm',
                'flex-col md:flex-row': breakpoint === 'md',
            },
            {
                'flex-grow': expanded,
                'flex-wrap': wrapped,
            },
            {
                'gap-0': space === 'none' || space === false,
                'gap-1': space === 'xs',
                'gap-2': space === 'sm',
                'gap-4': space == null || space === '',
                'gap-8': space === 'lg',
                'gap-16': space === 'xl',
                'gap-32': space === '2xl',
            },
            {
                'justify-between': !align,
                'justify-center': align === 'center',
                'justify-end': align === 'right',
                'justify-start': align === 'left',
            },

            {
                'items-center': !verticalAlign || verticalAlign === 'center',
                'items-start': verticalAlign === 'top',
                'items-end': verticalAlign === 'bottom',
            },
        ]"
    >
        <slot />
    </div>
</template>

<script lang="ts" setup>
withDefaults(
    defineProps<{
        space?: string | boolean;
        align?: string | false;
        verticalAlign?: string;
        expanded?: boolean;
        wrapped?: boolean;
        breakpoint?: string;
    }>(),
    {
        space: undefined,
        align: undefined,
        verticalAlign: undefined,
        breakpoint: undefined,
        expanded: false,
        wrapped: false,
    }
);
</script>

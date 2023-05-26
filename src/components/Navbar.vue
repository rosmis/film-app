<template>
    <ui-wrapper color="dark" container class="h-full" padded>
        <ui-level class="flex-col" vertical-align="top" space="none">
            <router-link :to="{ name: 'Home' }">
                <ui-level class="w-full" space="sm" align="left">
                    <img
                        src="https://res.cloudinary.com/dgbuqclbx/image/upload/v1685085502/video_dwopdo.png"
                        class="max-w-1/5"
                    />

                    <h1 class="text-[#dfdaae] text-xl">
                        Movie Station <span class="text-sm">by Rosmis</span>
                    </h1>
                </ui-level>
            </router-link>
        </ui-level>
    </ui-wrapper>
</template>

<script lang="ts" setup></script>

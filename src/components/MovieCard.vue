<template>
    <div
        rounded
        color="white"
        class="rounded-xl cursor-pointer transition-shadow ring-1 ring-slate-900/5 ratio aspect-square relative wrapper card hover:shadow-lg"
        @mouseover="isCardHovered = true"
        @mouseleave="isCardHovered = false"
    >
        <ui-level
            class="bg-[#dfdaae] rounded-lg p-2 top-2 left-2 z-10 absolute"
            align="left"
            space="sm"
        >
            <Icon class="text-xs text-[#110d0f]">
                <CalendarNumberOutline />
            </Icon>

            <p class="text-xs text-[#110d0f]">
                {{ moment(movie.release_date).format("DD/MM/YYYY") }}
            </p>
        </ui-level>

        <div class="rounded-t-xl h-4/5 overflow-hidden">
            <div
                class="bg-cover h-full hover"
                :style="{
                    backgroundImage: `url(${getPosterUrl(movie.poster_path)})`,
                }"
            ></div>
        </div>

        <ui-wrapper
            class="rounded-b-xl bg-gray-800 h-1/5 right-0 bottom-0 left-0 absolute contentCard"
        >
            <ui-level class="flex-col h-full" vertical-align="top" align="left">
                <ui-level class="flex-col" space="xs" vertical-align="top">
                    <p class="font-bold text-xl text-white">
                        {{ movie.title }}
                    </p>
                    <p class="text-white">{{ movie.vote_average }} / 10</p>
                </ui-level>

                <p
                    v-if="isCardHovered"
                    class="h-ful text-white w-full relative ellipsis"
                >
                    {{ movie.overview }}
                </p>
            </ui-level>
        </ui-wrapper>
    </div>
</template>

<script lang="ts" setup>
import { CalendarNumberOutline } from "@vicons/ionicons5";
import { Icon } from "@vicons/utils";
import moment from "moment";
import { ref } from "vue";

defineProps<{
    movie?: any;
}>();

const isCardHovered = ref(false);

const getPosterUrl = (posterPath: string) => {
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
};
</script>

<style scoped>
.hover {
    transition: 0.2s ease-in-out all;
}
.contentCard {
    transition: all 0.3s ease-in-out;
}
.card:hover .contentCard {
    height: 60%;
}
.ratio {
    aspect-ratio: 9/16;
}
.wrapper:hover .hover {
    transform: scale(1.05);
}

.hover:hover .hover::before {
    display: block;
}
.hover::before {
    content: "";
    display: none;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
}
.ellipsis {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: pre-wrap;
}
</style>

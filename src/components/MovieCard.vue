<template>
    <div
        rounded
        color="white"
        class="rounded-xl cursor-pointer transition-shadow ring-1 ring-slate-900/5 ratio aspect-square relative wrapper card hover:shadow-lg"
        @mouseover="isCardHovered = true"
        @mouseleave="isCardHovered = false"
        @click="router.push({ name: 'Home', query: { movieId: movie.id } })"
    >
        <ui-level
            class="bg-[#dfdaae] rounded-lg p-2 top-2 left-2 z-5 absolute"
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
                    backgroundImage: `url(${posterUrl})`,
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

                <p v-if="isCardHovered" class="h-full text-white w-full">
                    {{ truncate(movie.overview, { length: 250 }) }}
                </p>
            </ui-level>
        </ui-wrapper>
    </div>
</template>

<script lang="ts" setup>
import { CalendarNumberOutline } from "@vicons/ionicons5";
import { Icon } from "@vicons/utils";
import { truncate } from "lodash";
import moment from "moment";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { usePosterUrl } from "../composables/usePosterUrl";
import { Movie } from "../types/movie";

const props = defineProps<{
    movie: Movie;
}>();

const router = useRouter();

const isCardHovered = ref(false);

const posterUrl = computed(() => usePosterUrl(props.movie.poster_path));
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
</style>

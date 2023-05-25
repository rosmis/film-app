<template>
    <div
        class="flex flex-col bg-black/15 inset-0 z-20 backdrop-filter backdrop-blur-sm fixed"
    >
        <div
            screen="art"
            class="bg-gray-800 rounded-t-2xl w-full top-8 right-0 bottom-0 left-0 absolute overflow-y-auto"
            ref="outsideWrapper"
        >
            <ui-level align="right" class="w-full p-4 top-0 z-30 sticky">
                <Icon
                    class="cursor-pointer text-white text-lg"
                    @click="emit('close')"
                    ><Close
                /></Icon>
            </ui-level>

            <ui-wrapper padded class="h-full">
                <ui-level
                    class="max-h-screen-md w-full"
                    space="lg"
                    vertical-align="top"
                >
                    <ui-level class="flex-col h-full w-1/3" align="center">
                        <img
                            v-if="posterUrl"
                            :src="posterUrl"
                            class="max-w-2/3"
                        />
                    </ui-level>

                    <ui-wrapper class="h-full w-2/3">
                        <ui-level
                            v-if="movieDetail"
                            class="flex-col h-full w-full"
                            vertical-align="top"
                            align="left"
                        >
                            <h1 class="font-bold text-white text-2xl">
                                {{ movieDetail.data.title }}
                            </h1>

                            <p class="text-white text-lg">
                                {{ movieDetail.data.overview }}
                            </p>

                            <p class="text-white text-lg">
                                Date de sortie:
                                {{
                                    moment(
                                        movieDetail.data.release_date
                                    ).format("DD/MM/YYYY")
                                }}
                            </p>

                            <ui-level wrapped align="left">
                                <MovieGenreCard
                                    v-for="genre in movieDetail.data.genres"
                                    :genre="genre"
                                />
                            </ui-level>

                            <p class="text-white text-lg">
                                Note:
                                {{ Math.round(movieDetail.data.vote_average) }}
                                / 10
                                <span class="text-sm"
                                    >({{
                                        movieDetail.data.vote_count
                                    }}
                                    avis)</span
                                >
                            </p>

                            <p class="text-white text-lg">
                                Budget: {{ movieDetail.data.budget }} $
                            </p>
                        </ui-level>
                    </ui-wrapper>
                </ui-level>

                <ui-level
                    class="flex-col w-full"
                    vertical-align="top"
                    space="lg"
                >
                    <h2 class="font-bold text-xl text-white text-right w-full">
                        Découvrez d'autres films populaires
                    </h2>

                    <div class="w-full grid gap-4 grid-cols-5">
                        <MovieCard
                            v-for="(movie, index) in popularMovies"
                            :key="`popular-movie-${index}`"
                            :movie="movie"
                        />
                    </div>
                </ui-level>
            </ui-wrapper>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Close } from "@vicons/ionicons5";
import { Icon } from "@vicons/utils";
import { onClickOutside } from "@vueuse/core";
import axios from "axios";
import moment from "moment";
import { computed, ref, watch } from "vue";
import { useQuery } from "vue-query";
import { useRoute } from "vue-router";
import { paramsOptions } from "../composables/useParamsOptions";
import { usePosterUrl } from "../composables/usePosterUrl";

const route = useRoute();

const props = defineProps<{
    selectedMovieId: number;
    popularMovies: any[];
}>();

const emit = defineEmits<{
    (event: "close"): void;
}>();

const posterUrl = ref<string | undefined>(undefined);
const selectedMovieId = ref<number>(props.selectedMovieId);

const outsideWrapper = ref<HTMLDivElement>();

const { data: movieDetail } = useQuery(
    ["movieDetail", selectedMovieId],
    () =>
        axios.get(
            `https://api.themoviedb.org/3/movie/${selectedMovieId.value}`,
            paramsOptions
        ),
    {
        enabled: computed(() => !!selectedMovieId.value),
        onSuccess: (movie) =>
            (posterUrl.value = usePosterUrl(movie.data.poster_path)),
        refetchOnWindowFocus: false,
    }
);

watch(
    () => route.query,
    () => {
        selectedMovieId.value = +route.query.movieId!;
    }
);

onClickOutside(outsideWrapper, (_event) => emit("close"));
</script>

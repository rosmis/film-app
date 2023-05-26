<template>
    <ui-wrapper container>
        <ui-level class="flex-col" vertical-align="top" space="lg">
            <ui-level class="w-full" align="left">
                <ui-input v-model="search" placeholder="Rechercher..." />

                <ui-button
                    @click="
                        selectedFilterType =
                            selectedFilterTypeTitleDict[selectedFilterType]
                                .type;
                        page = 1;
                    "
                >
                    <template #icon>
                        <StarOutline v-if="selectedFilterType === 'popular'" />
                        <AnalyticsOutline v-else />
                    </template>

                    {{ selectedFilterTypeTitleDict[selectedFilterType].title }}
                </ui-button>
            </ui-level>

            <template v-if="initialMovies">
                <div
                    class="w-full grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
                >
                    <MovieCard
                        v-for="(movie, index) in initialMovies"
                        :key="`movie-${index}`"
                        :movie="movie"
                    />
                </div>
            </template>

            <ui-loader v-else-if="isFetching" />

            <p class="text-lg w-full text-gray-300">
                Aucun film ne correspond à votre recherche
            </p>

            <MovieDetails
                v-if="selectedMovieId"
                :selected-movie-id="selectedMovieId"
                :popular-movies="
                    initialMovies
                        ?.filter((movie) => movie.id !== selectedMovieId)
                        .slice(0, 5)
                "
                @close="
                    selectedMovieId = undefined;
                    router.push({ name: 'Home', query: {} });
                "
            />
        </ui-level>
    </ui-wrapper>
</template>

<script lang="ts" setup>
import { AnalyticsOutline, StarOutline } from "@vicons/ionicons5";
import { useScroll } from "@vueuse/core";
import axios from "axios";
import { debounce } from "lodash";
import { onMounted, ref, watch } from "vue";
import { useQuery } from "vue-query";
import { useRoute, useRouter } from "vue-router";
import { paramsOptions } from "../composables/useParamsOptions";
import { Movie } from "../types/movie";

const route = useRoute();
const router = useRouter();

onMounted(() => {
    if (route.query.movieId) selectedMovieId.value = +route.query.movieId;
});

const search = ref<string>();
const page = ref(1);

const initialMovies = ref<Movie[] | undefined>(undefined);
const selectedMovieId = ref<number | undefined>(undefined);

const selectedFilterTypeTitleDict = ref<
    Record<string, { type: "top_rated" | "popular"; title: string }>
>({
    popular: {
        type: "top_rated",
        title: "Trier par la meilleure note",
    },
    top_rated: {
        type: "popular",
        title: "Trier par popularité",
    },
});

const { arrivedState } = useScroll(document, { offset: { bottom: 450 } });

const selectedFilterType = ref<"popular" | "top_rated">("popular");

const { refetch, isFetching } = useQuery(
    ["movies", [page, selectedFilterType]],
    () =>
        axios.get(
            !search.value
                ? `https://api.themoviedb.org/3/movie/${selectedFilterType.value}?page=${page.value}`
                : `https://api.themoviedb.org/3/search/movie?query=${search.value}&includepage=1`,
            paramsOptions
        ),
    {
        refetchOnWindowFocus: false,
        onSuccess: (movies) => {
            if (page.value === 1) {
                initialMovies.value = movies.data.results;
                return;
            }

            initialMovies.value?.push(...movies.data.results);
        },
    }
);

watch(
    search,
    debounce(() => refetch.value(), 200)
);

watch(
    () => [arrivedState.bottom, route.query],
    () => {
        if (arrivedState.bottom) {
            page.value++;
            return;
        }

        if (route.query) {
            selectedMovieId.value = +route.query.movieId!;
            return;
        }
    }
);
</script>

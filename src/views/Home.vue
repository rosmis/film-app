<template>
    <ui-wrapper container>
        <ui-level class="flex-col" vertical-align="top" space="lg">
            <ui-level class="w-full" align="left">
                <ui-input v-model="search" placeholder="Rechercher..." />

                <ui-button
                    @click="
                        selectedFilterType =
                            selectedFilterType === 'popular'
                                ? 'top_rated'
                                : 'popular';
                        page = 1;
                    "
                >
                    <template #icon>
                        <StarOutline v-if="selectedFilterType === 'popular'" />
                        <AnalyticsOutline v-else />
                    </template>

                    {{
                        selectedFilterType === "popular"
                            ? "Trier par la meilleure note"
                            : "Trier par popularité"
                    }}
                </ui-button>
            </ui-level>

            <template v-if="filteredMovies">
                <div class="w-full grid gap-8 grid-cols-4">
                    <MovieCard
                        v-for="(movie, index) in filteredMovies"
                        :key="`movie-${index}`"
                        :movie="movie"
                    />
                </div>
            </template>

            <ui-loader v-else />

            <MovieDetails
                v-if="selectedMovieId"
                :selected-movie-id="selectedMovieId"
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
import { computed, ref, watch } from "vue";
import { useQuery } from "vue-query";
import { useRoute, useRouter } from "vue-router";
import { paramsOptions } from "../composables/useParamsOptions";

const route = useRoute();
const router = useRouter();

const search = ref<string>();
const page = ref(1);

const initialMovies = ref<Array<unknown> | undefined>(undefined);
const selectedMovieId = ref<number | undefined>(undefined);

const { arrivedState } = useScroll(document, { offset: { bottom: 450 } });

const selectedFilterType = ref<"popular" | "top_rated">("popular");

useQuery(
    ["movies", [page, selectedFilterType]],
    () =>
        axios.get(
            `https://api.themoviedb.org/3/movie/${selectedFilterType.value}?page=${page.value}`,
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

const filteredMovies = computed(() => {
    if (!initialMovies.value) return undefined;

    if (!search.value) return initialMovies.value;

    return initialMovies.value.filter((movie) =>
        movie.title.toLowerCase().includes(search.value)
    );
});

watch(
    () => arrivedState.bottom,
    () => {
        if (arrivedState.bottom) page.value++;
    }
);

watch(
    () => route.query,
    () => (selectedMovieId.value = +route.query.movieId)
);
</script>

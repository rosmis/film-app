<template>
    <ui-wrapper container>
        <ui-level class="flex-col" vertical-align="top" space="lg">
            <ui-input
                v-model="search"
                placeholder="Rechercher..."
                class="w-1/2"
            />

            <template v-if="initialMovies">
                <div class="w-full grid gap-8 grid-cols-4">
                    <MovieCard
                        v-for="(movie, index) in initialMovies"
                        :key="`movie-${index}`"
                        :movie="movie"
                    />
                </div>
            </template>

            <ui-loader v-else />
        </ui-level>
    </ui-wrapper>
</template>

<script lang="ts" setup>
import { useScroll } from "@vueuse/core";
import axios from "axios";
import { ref, watch } from "vue";
import { useQuery } from "vue-query";
import { paramsOptions } from "../composables/useParamsOptions";

const search = ref<string>();
const page = ref(1);

const initialMovies = ref<Array<unknown> | undefined>(undefined);
const { arrivedState } = useScroll(document, { offset: { bottom: 450 } });

const { data: _movies } = useQuery(
    ["movies", page],
    () =>
        axios.get(
            `https://api.themoviedb.org/3/movie/popular?page=${page.value}`,
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
    () => arrivedState.bottom,
    () => {
        if (arrivedState.bottom) page.value++;
    }
);
</script>

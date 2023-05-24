<template>
    <ui-wrapper container>
        <ui-level class="flex-col" vertical-align="top" space="lg">
            <ui-input
                v-model="search"
                placeholder="Rechercher..."
                class="w-1/2"
            />

            <template v-if="movies">
                <div class="w-full grid gap-8 grid-cols-4">
                    <MovieCard
                        v-for="(movie, index) in movies.data.results"
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
import axios from "axios";
import { ref } from "vue";
import { useQuery } from "vue-query";
import { paramsOptions } from "../composables/useParamsOptions";

const search = ref<string>();

const { data: movies } = useQuery(
    ["movies"],
    () =>
        axios.get(
            `https://api.themoviedb.org/3/movie/popular?page=1`,
            paramsOptions
        ),
    {
        refetchOnWindowFocus: false,
    }
);
</script>

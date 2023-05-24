<template>
    <div
        class="flex flex-col bg-black/15 inset-0 z-20 backdrop-filter backdrop-blur-sm fixed"
    >
        <div
            screen="art"
            class="bg-gray-800 rounded-t-2xl w-full top-8 right-0 bottom-0 left-0 absolute overflow-y-auto"
        >
            <ui-level
                align="right"
                class="bg-white w-full p-4 top-0 z-30 sticky"
            >
                <Icon class="cursor-pointer" @click="emit('close')"
                    ><Close
                /></Icon>
            </ui-level>

            <ui-wrapper padded class="h-full">
                <ui-level class="h-full w-full" space="lg" vertical-align="top">
                    <ui-level class="flex-col bg-green-400 w-1/2">
                        <ui-level
                            class="flex-col w-full"
                            vertical-align="bottom"
                        >
                        </ui-level>
                    </ui-level>

                    <div
                        class="flex flex-col h-full bg-red-500 w-1/2 items-start justify-start"
                    ></div>
                </ui-level>
            </ui-wrapper>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Close } from "@vicons/ionicons5";
import { Icon } from "@vicons/utils";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const props = defineProps<{
    selectedMovieId: number;
}>();

const emit = defineEmits<{
    (event: "close"): void;
}>();

const selectedMovieId = ref<number>(props.selectedMovieId);

// const { data: movieDetail } = useQuery(
//     ["artwork", selectedMovieId],
//     () =>
//         axios.get(
//             `https://api.themoviedb.org/3/movie/movie_id=${props.selectedMovieId}`,
//             paramsOptions
//         ),
//     {
//         enabled: computed(() => !!selectedMovieId.value),
//         refetchOnWindowFocus: false,
//     }
// );

// watch(
//     () => route.query,
//     () => {
//         selectedMovieId.value = +route.query.artworkId!;
//     }
// );

// onClickOutside(outsideWrapper, (_event) => emit("close"));
</script>

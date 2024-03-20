<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRecipeStore } from "#imports"
import { fetchRecipes } from '~/util/api';
import LoadingCard from './LoadingCard.vue';

const props = defineProps(['recipes'])
const store = useRecipeStore();

const distanceFromBottomToBeginLoading = 100;
const { nextLink, loading, recipes } = storeToRefs(store)

onBeforeMount(() => {
    window.addEventListener('scroll', handleScroll)
})

function handleScroll(e) {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - distanceFromBottomToBeginLoading) {
        checkShouldLoadMoreRecipes();
    }
}

const checkShouldLoadMoreRecipes = async () => {
    if (nextLink.value && !loading.value) {
        store.updateLoading(true);
        const { recipes, status, nextLink: newNextLink } = await fetchRecipes(nextLink);
        store.updateLoading(false);
        if (recipes) {
            store.addRecipes(recipes, newNextLink)
        }
    }
}

checkShouldLoadMoreRecipes();

</script>

<style>
.recipe-card-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 24px;
    max-width: 1200px;
    width: 100%;
    padding: 24px;
    box-sizing: border-box;
}
</style>

<template>
    <div class="recipe-card-list">
        <RecipeCard :recipe=recipe v-for="recipe in recipes" v-bind:key="recipe.id" />
        <LoadingCard v-if="loading" v-bind:key="loading" />
    </div>
</template>
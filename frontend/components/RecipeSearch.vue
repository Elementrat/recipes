<script setup>
import { useRecipeStore } from '~/stores/recipeStore';
import { storeToRefs } from 'pinia';
import { fetchRecipes } from '~/util/api';
import { recipeListAPIRoute } from '~/util/routes';
import { KEY_INGREDIENTS } from '~/util/constants';
import { watch } from "vue"
import useDebouncedRef from '~/composables/useDebouncedRef';
import { STRINGS } from '~/util/constants';
import { capitalize } from 'vue';

const store = useRecipeStore();
const { authorSearch, ingredientSearch } = storeToRefs(store)
const recipeSearchText = useDebouncedRef('', 400);
const keyIngredientList = Object.entries(KEY_INGREDIENTS).map(([k, v]) => v);

async function loadRecipes() {
    let recipeAPIRoute = recipeListAPIRoute;
    let searchComponentEmail = '';
    let searchComponentIngredients = '';

    if (authorSearch.value.length || ingredientSearch.value.length) {
        recipeAPIRoute += "?"
    }

    if (authorSearch.value.length) {
        searchComponentEmail = `search[author_email]=${authorSearch.value}`;
    }

    if (ingredientSearch.value.length > 0) {
        searchComponentIngredients += 'search[ingredients]'
        for (let x = 0; x < ingredientSearch.value.length; x++) {
            searchComponentIngredients += `[${x}]=${ingredientSearch.value[x]}`
        }
    }

    recipeAPIRoute += searchComponentEmail;

    if (searchComponentEmail.length && searchComponentIngredients.length) {
        recipeAPIRoute += "&";
    }

    recipeAPIRoute += searchComponentIngredients;
    const data = await fetchRecipes(recipeAPIRoute);
    store.updateRecipes(data.recipes, data.nextLink);
}

await loadRecipes();

watch(recipeSearchText, newRecipeSearchText => {
    store.updateLoading(true);
    store.updateAuthorSearch(newRecipeSearchText)
    loadRecipes();
});

const filterIncludesIngredient = (ingredient) => {
    return ingredientSearch.value.find((ki) => ki === ingredient);
}

const clickedIngredient = (ingredient) => {
    if (filterIncludesIngredient(ingredient)) {
        store.setSearchIngredient([]);
    }
    else {
        store.setSearchIngredient(ingredient);
    }
    store.updateLoading(true);
    loadRecipes();
}

</script>


<template>
    <div class="recipe-search">
        <input type="text" :placeholder="`${STRINGS.SEARCH_BY_AUTHOR}`" v-model="recipeSearchText"
            class="author-input" />
        <div class="ingredient-selection">
            <div class="ingredient-toggle" v-for="ingredient in keyIngredientList"
                :class="{ selected: filterIncludesIngredient(ingredient) }" @click="clickedIngredient(ingredient)">
                {{
            capitalize(ingredient)
        }}
            </div>
        </div>
    </div>
</template>


<style>
input[type="text"] {
    border: none;
    border-radius: var(--border-radius-sm);
    background-color: var(--accent-0-5);
    overflow: hidden;
    color: white;
    max-width: 500px;
}

::placeholder {
    color: var(--bright-translucent-1);
}

.author-input {
    padding: var(--spacing-md);
    font-size: var(--font-size-sm);
}

.ingredient-toggle {
    border: 1px solid rgba(255, 255, 255, .2);
    border-bottom: 1px solid #1c6da3;
    padding: var(--spacing-md);
    cursor: pointer;
    border-radius: var(--border-radius-sm);
    user-select: none;
    box-shadow: 0 4px 10px rgba(0, 0, 0, .4);
}

.ingredient-toggle.selected {
    background-color: var(--accent-2);
    font-weight: bold;
    border: 1px solid white;
}

.ingredient-selection {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: var(--spacing-sm);
    gap: 12px;
}

.recipe-search {
    display: flex;
    gap: 12px;
    padding: var(--spacing-sm);
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: var(--app-width);
    color: white;
    flex-wrap: wrap;
}

@media screen and (max-width: 1024px) {
    .author-input {
        width: 100%;
        margin-top: 12px;
    }
}
</style>

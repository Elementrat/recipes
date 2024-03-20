import { defineStore } from 'pinia'
import { Recipe } from '~/types/Recipe';

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useRecipeStore = defineStore('recipes', () => {
    const authorSearch = ref('');
    const ingredientSearch = ref<string[]>([]);
    const recipes = ref<Recipe[]>([]);
    const nextLink = ref<string>('');
    const loading = ref(false);

    function updateAuthorSearch(newSearchText:string) {
        authorSearch.value = newSearchText;
    }

    function updateRecipes(newRecipes:Array<Recipe>, newNextLink:string) {
        recipes.value = [...newRecipes];
        updateNextLink(newNextLink);
        updateLoading(false);
    }

    function addRecipes(newRecipes:Array<Recipe>, newNextLink:string) {
        recipes.value = [...recipes.value, ...newRecipes];
        updateNextLink(newNextLink)
    }

    function updateNextLink(newNextLink:string){
        nextLink.value = newNextLink;
    }

    function updateIngredientSearch(newIngredientSearch:Array<string>) {
        ingredientSearch.value = newIngredientSearch;
    }

    function addIngredientToSearch(ingredient:string) {
        ingredientSearch.value = [...ingredientSearch.value, ingredient]
    }

    function setSearchIngredient(ingredient:string) {
        ingredientSearch.value = [ingredient]
    }

    function removeIngredientFromSearch(ingredient:string) {
        let newIngredientSearch = [...ingredientSearch.value];
        let existingIngredientIndex = newIngredientSearch.findIndex((existingFilteredIngredient) => existingFilteredIngredient === ingredient);
        newIngredientSearch.splice(existingIngredientIndex, 1);
        updateIngredientSearch(newIngredientSearch);
    }

    function updateLoading(newLoadingState:boolean) {
        loading.value = newLoadingState;
    }

    return { 
        authorSearch,
        ingredientSearch, 
        recipes, 
        nextLink, 
        loading,
        updateAuthorSearch, 
        updateRecipes, 
        addRecipes,
        updateNextLink,
        updateIngredientSearch,
        addIngredientToSearch,
        removeIngredientFromSearch,
        setSearchIngredient,
        updateLoading,
    }
})
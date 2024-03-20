import { Recipe } from "~/types/Recipe";

export const fetchRecipes = async (recipeRoute:string) => {
    const { data, status } = await useFetch(recipeRoute)
    const recipeResponseValue = data?.value;
    const recipes = recipeResponseValue?.data as Array<Recipe>
    const nextLink = recipeResponseValue?.links?.next;
    return { recipes, status, nextLink}
}
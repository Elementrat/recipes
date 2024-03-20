import { RecipeIngredient } from "./RecipeIngredient"

export type Recipe = {
    author_email: string,
    description: string,
    id: number,
    images: Array<string>,
    ingredients: Array<RecipeIngredient>
    name: string, 
    slug: string,
    steps: Array<string>
}
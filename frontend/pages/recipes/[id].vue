<script setup lang="ts">
import { Recipe } from '~/types/Recipe';
import { recipeListAPIRoute } from '~/util/routes';
import { PLACEHOLDER_IMAGES } from '~/util/constants';

const route = useRoute()
const { data } = await useFetch(`${recipeListAPIRoute}/${route.params.id}`)
const recipeData = data?.value?.data as Recipe

const title = `${recipeData.name} - An Easy, Healthy, Wild Alaskan Recipe`
const recipeImageURL = recipeData.images.length && recipeData.images[0];

useHead({
  title: title,
  meta: [
    { property: 'description', content: recipeData.description },
    { property: 'og:description', content: recipeData.description },
    { property: 'title', content: title },
    { property: 'og:title', content: title },
    { property: 'og:image', content: recipeImageURL }
  ],
})

const imgSrces = [PLACEHOLDER_IMAGES[0], PLACEHOLDER_IMAGES[1]];

</script>

<template>
  <section class="recipe-details-page">

    <div class="recipe-name section">
      <div class="section-title">
        <div class="recipe-title">{{ recipeData.name }}</div>
      </div>
      <div> A Delicious, Easy, Wild Alaskan Recipe</div>
      by: {{ recipeData.author_email }}
    </div>

    <div class="recipe-images section">

      <img v-for="imgSrc in imgSrces" v-bind:src="imgSrc" class="recipe-img" />
    </div>

    <div class="recipe-ingredients section">
      <div class="section-title">Ingredients</div>
      <ul class="ingredient-list">
        <li v-for="ingredient in recipeData.ingredients">
          <div class="ingredient-line">
            <div :class="{ 'emphasized': Boolean(ingredient.price) }">
              {{ ingredient.name }} -
              {{ ingredient.qty }} {{ ingredient.unit }}
            </div>
            <div v-if="ingredient.price" class="add-to-cart-cta">
              <span>ADD TO CART</span>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="recipe-description section">
      <div class="section-title">About This Recipe</div>
      {{ recipeData.description }}
    </div>

    <div class="recipe-steps section">
      <div class="section-title">Steps</div>
      <ol>
        <li v-for="step in recipeData.steps">{{ step }}</li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.recipe-details-page {
  max-width: var(--app-width);
  padding: var(--spacing-md);
  box-sizing: border-box;
  overflow: hidden;
  line-height: 28px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

@media screen and (max-width:1024px) {
  .recipe-details-page {
    margin-top: 60px;
  }
}

.section-title {
  font-size: var(--font-size-md);
  font-weight: bold;
}

.section {
  width: 100%;
  flex-shrink: 0;
  padding: 24px;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, .12);
  box-sizing: border-box;
}

.recipe-ingredients,
.recipe-description {
  flex-shrink: 1;
  flex: 1;
}

.ingredient-line {
  flex-direction: column;
  display: flex;
}

.ingredient-list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.emphasized {
  font-weight: bold;
}

.add-to-cart-cta {
  padding: var(--spacing-sm);
  background-color: var(--accent-1);
  color: white;
  margin: 15px 0px;
  cursor: pointer;
  border-radius: var(--border-radius-sm);
  text-align: center;
  font-weight: bold;
  animation: pulse 2s infinite;
}

.add-to-cart-cta:hover {
  border: 4px solid white;
  background-color: white;
  color: black;
}

.recipe-images {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  width: 100%;
  flex-shrink: 1;
}

.recipe-name {
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  box-shadow: none;
}

.recipe-title {
  font-size: var(--font-size-xl);
  margin-top: 60px;
  margin-bottom: 60px;
  line-height: 100px;
  width: 100%;
}

.recipe-author {
  text-align: center;
}

.recipe-steps {
  width: 100%;
}

.recipe-img {
  height: 400px;
  max-width: 350px;
  border-radius: var(--border-radius-sm);
  box-shadow: 0 4px 10px rgba(0, 0, 0, .12);
}


@media screen and (max-width: 1024px) {

  .recipe-ingredients,
  .recipe-description {
    width: 100%;
    flex-shrink: 0;
    flex-grow: 1;
    flex: content
  }
}

@keyframes pulse {
  0% {
    border: 4px solid var(--accent-1);
  }

  50% {
    border: 4px solid var(--accent-3);
  }

  100% {
    border: 4px solid var(--accent-1);
  }
}
</style>
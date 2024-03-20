<script setup>
import { PLACEHOLDER_IMAGES } from '~/util/constants';

const props = defineProps(['recipe']);
const { recipe } = props;
const img = recipe?.images?.length > 0 && recipe?.images[0];
const proteinIngredient = recipe.ingredients?.find((ingredient) => ingredient.type === "protein")
const imgSrc = PLACEHOLDER_IMAGES[Math.round(Math.random() * (PLACEHOLDER_IMAGES.length - 1))];

const isHovered = ref(false);

const onMouseOver = () => {
    isHovered.value = true;
}

const onMouseOut = () => {
    isHovered.value = false;
}

</script>

<style scoped>
.recipe-card {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 550px;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    min-height: 400px;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    cursor: pointer;
    background-color: white;
    box-shadow: 0 4px 10px rgba(0, 0, 0, .12);
    border: 2px solid white;
    transition: border .2s ease;
}

.recipe-card.hovered {
    border: 2px solid var(--accent-2);
}

.recipe-card.hovered>.recipe-img {
    transform: scale(1.05)
}

.recipe-name {
    font-size: var(--font-size-md);
    font-weight: bold;
}

.recipe-protein {
    background-color: var(--accent-1);
    padding: 4px var(--spacing-md);
    color: var(--accent-3);
    border-radius: var(--border-radius-sm);
    margin-top: 10px;
}

.recipe-author {
    color: var(--greyscale-2);
}

.recipe-card-details {
    display: flex;
    flex-direction: column;
    padding: 4px;
    width: 100%;
    padding: var(--spacing-md);
    box-sizing: border-box;
    line-height: 28px;
    background-color: white;
    z-index: 1;
    justify-content: flex-start;
    align-items: flex-start;
}

.recipe-img {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    width: 100%;
    height: 300px;
    object-fit: cover;
    transition: transform .2s ease;
}
</style>

<template>
    <RouterLink :to="`/recipes/${recipe.slug}`">
        <div :class="{ 'recipe-card': true, 'hovered': isHovered }" @mouseover="onMouseOver" @mouseout="onMouseOut">
            <img v-bind:src=imgSrc class="recipe-img" />
            <div class=" recipe-card-details">
                <div class="recipe-name">
                    {{ recipe.name }}
                </div>
                <div class="recipe-author">
                    {{ recipe.author_email }}
                </div>
                <div class="recipe-protein">
                    {{ proteinIngredient.name?.replace(/Wild Alaska[n]?/, "") }}
                </div>
            </div>
        </div>
    </RouterLink>
</template>
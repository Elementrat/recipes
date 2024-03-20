<script setup>
import { useRecipeStore } from "#imports"
const store = useRecipeStore();

const links = ["How It Works", "Our Story", "Gift Boxes"]
const route = useRoute()
const showSearch = ref(!Boolean(route.params.id));
const { loading } = storeToRefs(store)


watch(() => route.params.id, (newId, oldId) => {
    if (newId) {
        showSearch.value = false;
    } else {
        showSearch.value = true;
    }
})

</script>

<style scoped>
.app-header {
    min-height: 50px;
    background-color: var(--accent-1);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, .4);
}

.app-header-row {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
}

.nav-row {
    background-color: white;
}

.app-header-content {
    display: flex;
    max-width: var(--app-width);
    width: 100%;
    flex-wrap: wrap;
}

.links {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
}

.left-links {
    position: absolute;
}

.primary-links {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: var(--spacing-md);
    padding: var(--spacing-lg);
}

.logo {
    width: 100px;
    cursor: pointer;
}

a {
    cursor: pointer;
    user-select: none;
}


@media screen and (max-width: 1024px) {
    .primary-links {
        justify-content: flex-end;
    }

    .app-header {
        position: fixed;
        top: 0;
        z-index: 99;
    }
}

.loading-indicator {
    animation: loading 2s infinite;
    width: 100%;
    padding: var(--spacing-sm);
    text-align: center;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
}

.loader {
    justify-content: center;
    align-items: center;
    overflow: hidden;
    box-sizing: border-box;
    height: 0px;
    transition: height 1s;
    background-color: black;
}

.loader.show {
    height: 35px;
}

@keyframes loading {
    0% {}

    50% {
        color: rgba(255, 255, 255, .5);
    }

    100% {}
}
</style>

<template>
    <div class="app-header">
        <div class="app-header-row nav-row">
            <div class="app-header-content">
                <div class="links">
                    <div class="left-links">
                        <RouterLink to="/">
                            <img src="https://s3.amazonaws.com/abn-prod/wp-content/uploads/sites/7/2021/02/Wwild-Alaskan-Company.jpg"
                                alt="Wild Alaskan Company" class="logo">
                        </RouterLink>
                    </div>
                    <div class="primary-links">
                        <a v-for="link in links">{{ link }}</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="app-header-row" v-show="showSearch">
            <RecipeSearch />
        </div>
        <div :class="{ 'app-header-row': true, 'loader': true, 'show': loading }">
            <div class="loading-indicator">Loading...</div>
        </div>
    </div>
</template>

<style>
.hero-splash {
    font-size: var(--font-size-xl);
    min-height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: column;
}

.text-emphasis {
    color: var(--accent-1);
}

.wrappable {
    text-wrap: wrap;
}

@media screen and (max-width: 1024px) {
    .hero-splash {
        margin-top: 300px;
        font-size: var(--font-size-lg);
    }
}
</style>
<template>
    <div class="hero-splash">
        <div class="wrappable">
            <span class="text-emphasis">Wild&nbsp;</span>
            <span>Caught,&nbsp;</span>
        </div>
        <div class="wrappable">
            <span class="text-emphasis">Alaskan&nbsp;</span>
            <span>Delicious. &nbsp;</span>
        </div>
    </div>
</template>
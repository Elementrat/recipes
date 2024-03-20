<style>
.loading-card {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 550px;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    min-height: 400px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: grey;
    color: var(--greyscale-1);
    box-shadow: 0 4px 10px rgba(0, 0, 0, .12);
    animation: flash 3s infinite;
}


.text-emphasis {
    color: var(--accent-1);
    font-weight: bold;
}

@keyframes flash {
    0% {
        background-color: rgba(255, 255, 255, .1);
    }

    50% {
        background-color: rgba(255, 255, 255, .5);
        transform: scale(1.005);
    }

    100% {
        background-color: rgba(255, 255, 255, .1);
    }
}
</style>

<template>
    <div class="loading-card"> <span>Loading more <span class="text-emphasis">delicious</span> recipes...</span></div>
</template>
<style>
.empty-card {
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
    background-color: white;
    color: var(--greyscale-1);
    box-shadow: 0 4px 10px rgba(0, 0, 0, .12);
    justify-items: center;
}


.text-emphasis {
    color: var(--accent-1);
    font-weight: bold;
}
</style>

<template>
    <div class="empty-card">
        <div>No bites for this query.</div>
        <div>Let's try another search.</div>
    </div>
</template>
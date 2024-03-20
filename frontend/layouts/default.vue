<script setup>
import Header from '~/components/Header.vue';
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Andada+Pro');

html,
body {
  font-family: 'Andada Pro', sans-serif;
  margin: 0;
}

:root {
  --greyscale-1: #242226;
  --greyscale-2: #46434A;
  --greyscale-3: #69646E;
  --accent-0-5: #091f2d;
  --accent-1: #0d334c;
  --accent-2: #1c6da3;
  --accent-3: #aad8f7;
  --font-size-sm: 16px;
  --font-size-md: 22px;
  --font-size-lg: 32px;
  --font-size-xl: 76px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --border-radius-sm: 12px;
  --border-radius-md: 20px;
  --app-width: 1200px;
  --animation-fast: .2s;
  --bright-translucent-1: rgba(255, 255, 255, .8);
}

a {
  all: unset;
}

.app {
  background-color: #eaeaea;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>

<template>
  <div class="app">
    <Header />
    <slot />
    <Footer />
  </div>
</template>
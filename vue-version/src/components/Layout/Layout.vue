<script setup>
import Header from './Header.vue';
import Footer from './Footer.vue';
</script>

<template>
  <div style="display: flex; flex-direction: column; min-height: 100vh;">
    <Header />
    <main style="flex: 1;">
      <slot />
    </main>
    <Footer />
  </div>
</template>

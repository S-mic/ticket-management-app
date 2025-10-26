<template>
  <div id="app">
    <ToastContainer />
    <router-view />
  </div>
</template>

<script setup>
import ToastContainer from './components/ToastContainer.vue'
</script>

<style>
#app {
  min-height: 100vh;
}
</style>
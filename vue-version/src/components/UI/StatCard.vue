<template>
  <div class="card text-center">
    <h3 :style="{ color }">{{ value }}</h3>
    <p>{{ title }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: Number,
  color: String
})
</script>

<style scoped>
h3 {
  font-size: 2rem;
  margin: 0 0 0.5rem 0;
}

p {
  color: #6b7280;
  margin: 0;
}
</style>
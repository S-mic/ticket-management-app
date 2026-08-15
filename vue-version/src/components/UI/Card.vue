<script setup>
defineProps({
  className: { type: String, default: '' }
});
</script>

<template>
  <div :class="`card ${className}`">
    <slot />
  </div>
</template>

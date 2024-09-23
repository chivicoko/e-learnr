<template>
    <div>
      <p>{{ description }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({
    description: String
  });
  </script>
  
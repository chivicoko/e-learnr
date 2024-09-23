<template>
  <div>
    <component :is="activeTab">
      <slot :name="activeTab" />
    </component>
  </div>
</template>
  
<script setup lang="ts">
  const props = defineProps({
    activeTab: String
  });
</script>
  
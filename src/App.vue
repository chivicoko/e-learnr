<template>
  <div class="relative flex justify-between min-h-screen">
    <SidebarLeft />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
  import SidebarLeft from "@/components/SidebarLeft.vue";
  
  // Using RouterView to load the component associated with the current route dynamically
  import { RouterView } from "vue-router";
</script>

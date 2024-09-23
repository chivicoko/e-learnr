<template>
  <div class="flex items-center justify-center w-full">
    <div class="flex min-h-full flex-col items-center justify-center gap-4 py-24 px-5 md:p-24">
      <i class="pi pi-exclamation-triangle text-7xl text-yellow-500 mb-5"></i>
      <h2 class="text-center text-6xl font-bold mb-4">404 Not Found</h2>
      <p class="text-xl mb-5">This page does not exist</p>
      <button @click="goBack" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
        Go back
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function goBack() {
  // Programmatically navigate to the previous page
  router.back();
}
</script>

<template>
    <section class="flex-1 absolute left-[38.6px] md:left-[84px] right-0 flex flex-col lg:flex-row justify-between border-l-2 bg-gray-100">
        <div class="flex-1 flex flex-col px-3 md:px-10 lg:px-16 xl:px-28 gap-6">
            <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
                <i class="pi pi-exclamation-triangle text-7xl text-red-600 mb-5"></i>
                <h1 class="text-4xl font-bold text-red-600 mb-4">Something went wrong!</h1>
                <p class="text-gray-700 text-lg mb-6">We encountered an error while loading the page.</p>
                <button @click="goBack" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                    Go Back
                </button>
            </div>
        </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router';
  
  const router = useRouter();

    // Programmatically navigate to the previous page
  function goBack() {
    router.go(-2);
  }
  </script>
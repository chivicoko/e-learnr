<template>
    <div class="bodies flex items-center gap-3">
      <div class="px-1 md:px-6">
        <div class="mb-6 flex flex-col md:flex-row items-center gap-4">

          <img 
            :src="instructor.image || '/src/assets/imagePlaceholder.jpeg'" 
            alt="Course Instructor" 
            class="w-full h-auto max-h-72 rounded-md object-cover"
            @error="onImageError"
          />
          
          <div class="userText">
            <div class="border-b-2 mb-4">
              <h3 class="font-semibold text-2xl">{{ instructor.name }}</h3>
            </div>
            <p>{{ instructor.bio }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { Instructor } from '@/utils/types';
  
  const props = defineProps<{
    instructor: Instructor;
  }>();
  
  // Image fallback function if the course image fails to load
  const onImageError = (event: Event) => {
    const target = event.target as HTMLImageElement;
    target.src = '/src/assets/imagePlaceholder.jpeg';
  };
  </script>
  
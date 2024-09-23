<template>
    <article v-if="discussions && discussions.length > 0" class="flex flex-col gap-4">
        <div v-for="discussion in discussions" :key="discussion.user" class="w-full p-4 bg-white shadow rounded-lg">
            <div class="w-full flex items-center gap-4 mb-2">
                <img :src="discussion.image" alt="user" class="w-10 h-10 rounded-full">
                <div class="flex flex-col">
                    <p class="font-semibold">{{ discussion.user }}</p>
                    <p>{{ discussion.comment }}</p>
                </div>
            </div>
        </div>
    </article>
    
    <p v-else>No discussions available</p>
  </template>
  
  <script setup lang="ts">
    import type { Discussion } from '@/utils/types';
    
    const props = defineProps<{
        discussions: Discussion[];
    }>();
  </script>
  
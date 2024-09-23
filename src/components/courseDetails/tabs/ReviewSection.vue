<template>
    <div class="bodies flex items-center gap-3">
        <div class="">
            <div class="flex items-center justify-between gap-4">
                <div v-if="reviews && reviews.length > 0" class="pb-4 flex flex-wrap gap-4">
                    <div v-for="(review, index) in reviews" :key="index" class="flex rounded-lg items-center gap-4 bg-white p-4">
                        <span class="pb-4">
                            <img :src="review.image" alt="user" class="w-10 h-10 rounded-full">
                        </span>
                        <div class="userText">
                            <h3 class="font-semibold">{{ review.user }}</h3>
                            <p class="font-semibold text-xs text-gray-500 my-2">{{ review.comment }}</p>
                            
                            <div class="flex items-center">
                            <span v-for="n in review.rating" :key="'yellow-' + n">
                                <i class="pi pi-star-fill text-yellow-400"></i>
                            </span>
                            <span v-for="n in (5 - review.rating)" :key="'gray-' + n">
                                <i class="pi pi-star-fill text-gray-300"></i>
                            </span>
                            <p class="font-semibold text-xs text-gray-500 ml-2">{{ review.rating }}/5</p>
                            </div>
                        </div>
                    </div>

                </div>
                
                <p v-else>No reviews available</p>
            </div>
        </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { Review } from '@/utils/types';
  
  const props = defineProps<{
    reviews: Review[];
  }>();
  </script>
  
  
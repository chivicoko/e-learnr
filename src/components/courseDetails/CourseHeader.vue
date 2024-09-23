<template>
  <div>
    <p class="page text-gray-400 text-xs md:text-base">
      <RouterLink to="/course-list">My Courses</RouterLink> / 
      <RouterLink :to="`/course-list/${departmentId}/courses`">
        {{ typeof departmentName === 'object' ? departmentName?.name : departmentName }}
      </RouterLink> / 
      <span class="text-gray-900 font-semibold">{{ courseName }}</span>
    </p>

    <div class="flex flex-col md:flex-row items-center justify-between mt-4">
      <div class="self-start mb-3">
        <h1 class="flex-1 text-lg sm:text-xl md:text-3xl font-semibold text-gray-800">{{ courseTitle }}</h1>
        <p class="leading-1 text-gray-500">{{ instructor }}</p>
      </div>

      <div class="btns w-full md:w-auto flex items-center gap-2">
        <button class="flex items-center justify-center p-2 md:p-3 border border-gray-300 rounded-full hover:bg-gray-200 transition-all duration-300 ease-linear">
          <i class="pi pi-share-alt"></i>
        </button>
        <button class="flex items-center justify-center p-2 md:p-3 border border-gray-300 rounded-full hover:bg-gray-200 transition-all duration-300 ease-linear">
          <i class="pi pi-bookmark"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { PropType } from 'vue';
  import type { Department } from '@/utils/types';

  const props = defineProps({
    courseName: String,
    courseTitle: String,
    instructor: String,
    departmentId: String,
    departmentName: [String, Object] as PropType<string | Department | undefined>,
  });

</script>
  
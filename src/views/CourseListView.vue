<template>
  <div class="flex-1 absolute left-[38.6px] md:left-[84px] right-0 min-h-screen border-l-2">
    <main class="py-6 px-3 md:py-8 md:px-16 lg:py-10 lg:px-20 flex w-full">
      <section class="flex flex-col gap-4 w-full">
        <h1 class="text-base md:text-3xl">Course List View</h1>
        <div class="flex items-center md:py-3">
          <RouterLink to="/" class="flex items-center gap-1 text-gray-500 hover:text-[#0f61ff] transition-all duration-300 ease-linear transform hover:-translate-x-1">
            <i class="pi pi-arrow-circle-left"></i> Back
          </RouterLink>
        </div>
        
        <div class="w-full py-4 px-2 md:pb-6 md:pt-0 md:px-0">
          <div v-if="courseStore.loading" class="loading">
            <LoadingView />
          </div>
          
          <div v-else>
            <h3 class="page text-gray-900 text-base md:text-xl text-center font-semibold mb-8 underline underline-offset-8">Here are the Available Courses</h3>
            
            <div v-if="courseStore.departments && courseStore.departments.length > 0" class="flex items-center justify-center gap-6 flex-wrap">
              <ul v-for="department in courseStore.departments" :key="department.id" class="w-full md:w-auto border-b-2 bg-gray-200 rounded-lg transform hover:-translate-y-1 hover:-rotate-2 hover:shadow-lg transition-all duration-300 ease-linear">
                <RouterLink :to="'/course-list/' + department.id + '/courses'">
                  <li class="flex flex-col items-center justify-center gap-6 py-6 px-4 md:p-7">
                    <i class="pi pi-objects-column transform rotate-45 text-2xl md:text-3xl text-[#0f61ff]"></i>
                    <h2 class="text-gray-950 hover:text-[#0f61ff] text-center text-xl md:text-2xl lg:text-3xl font-bold transition-all duration-300 ease-linear">{{ department.name }}</h2>
                  </li>
                </RouterLink>
              </ul>
            </div>
            
            <div v-else class="flex items-center justify-center gap-6 flex-wrap">
              <p>No Courses available</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
  import { RouterLink } from "vue-router";
  import { useCourseStore } from '@/stores/courseStore';
  import { onMounted } from 'vue';
  import LoadingView from '@/components/LoadingView.vue';

  const courseStore = useCourseStore();

  // Fetch courses on component mount
  onMounted(courseStore.getCourses);
</script>

<template>
  <section class="flex-1 absolute left-[38.6px] md:left-[84px] right-0 min-h-screen border-l-2 bg-gray-100 py-8 lg:py-12 px-3 lg:px-28">

    <!-- Breadcrumb navigation with current department name -->
    <p class="page text-gray-400 text-xs md:text-base">
      <RouterLink to="/course-list">My Courses</RouterLink> / 
      <span class="text-gray-900 font-semibold">{{ departmentName }} Options</span>
    </p>

    <div v-if="department" class="py-3 lg:py-6">
      <h1 class="text-lg md:text-xl lg:text-3xl font-bold mb-8 underline">{{ department.name }} Options</h1>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="course in department.courses" :key="course.id" class="relative bg-white/30 backdrop-blur-md border border-gray-200 rounded-lg shadow-lg p-3 xl:p-6 transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 ease-linear">
          
          <img 
            :src="course.image"
            alt="course image" 
            class="h-40 w-full object-cover rounded-t-lg mb-4"
            @error="onImageError"
          />

          <RouterLink :to="'/course-list/' + department.id + '/courses/' + course.id" class="block">
            <h2 class="text-gray-950 font-bold text-base md:text-lg lg:text-2xl hover:text-blue-500 transition-all duration-300 ease-linear">{{ course.title }}</h2>
          </RouterLink>

          <!-- Show course description (excerpted) -->
          <p class="text-gray-600 mt-2 hidden md:block">{{ course.description.substring(0, 90) }}...</p>

          <h4 class="text-sm text-gray-800 my-4">Instructor: <span class="font-semibold">{{ course.lecturer }}</span></h4>

          <!-- Link to view more about the course -->
          <RouterLink :to="'/course-list/' + department.id + '/courses/' + course.id" class="text-blue-600 hover:text-blue-800 font-semibold">
            View more
          </RouterLink>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="loading">
        <LoadingView />
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { useCourseStore } from '@/stores/courseStore';
  import type { Department } from '@/utils/types';
  import LoadingView from '@/components/LoadingView.vue';

  const route = useRoute();
  const courseStore = useCourseStore();
  const department = ref<Department | null | undefined>(undefined);
  const departmentName = ref<string>('');

  onMounted(async () => {
    const departmentId = route.params.departmentId as string;
    // const fetchedDepartment = await courseStore.getDepartmentByIdAction(departmentId);
    const fetchedDepartment = courseStore.getDepartmentById(departmentId);
    department.value = fetchedDepartment || null;
    departmentName.value = fetchedDepartment?.name || '';
  });

  // Image fallback function if the course image fails to load
  const onImageError = (event: Event) => {
    const target = event.target as HTMLImageElement;
    target.src = '/src/assets/imagePlaceholder.jpeg';
  };
</script>

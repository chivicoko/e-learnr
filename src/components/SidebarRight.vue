<template>
  <nav class="lg:border-l-2 overflow-auto text-gray-700 py-2 md:py-12 px-0 md:px-10 lg:px-3 w-full lg:w-1/4 min-h-screen flex flex-col justify-start lg:items-center">
    <div class="flex flex-col justify-start lg:items-center pb-6">
      <div class="px-3 md:px-6 lg:px-0 xl:px-6 border-b-2 pb-8">
        <h2 class="font-semibold text-xl mb-3 md:mb-auto">About the Course</h2>
        <div class="flex items-center gap-4 py-2 md:pt-2">
          <div class="rounded-full w-1/4">
            <img :src="instructorImage" alt="user" class="w-8 h-8 md:w-10 md:h-10 lg:w-16 lg:h-16 rounded-full" />
          </div>
          <div class="userText mb-4 md:mb-auto w-3/4">
            <h3 class="font-semibold">{{ course?.instructors[0]?.name }}</h3>
            <p class="font-semibold text-xs text-gray-500">{{ course?.instructors[0]?.bio }}</p>
          </div>
        </div>
          <p class="text-sm md:text-md">
              {{ showFullDescription ? course?.description : course?.description.substring(0, 110) }}...
              <button @click="toggleDescription" class="text-gray-950 font-semibold">
                  {{ showFullDescription ? 'read less' : 'read more' }}
              </button>
          </p>
      </div>

      <div class="self-start px-3 pt-7 w-full">
          <h2 class="font-semibold text-xl px-4 lg:px-0 xl:px-4">Course Completion</h2>
          <div class="progress w-full px-4 lg:px-0 xl:px-4">
              <div class="percentage mb-1 mt-3 text-gray-500 text-xs flex items-center justify-between">
                  <span class="font-semibold">{{ progress }}% completed</span>
                  <span class="font-semibold">{{ completedChapters }}/{{ totalChapters }}</span>
              </div>
              <div class="h-[1.9px] w-full bg-gray-200">
                  <div :class="['h-[1.9px]', 'bg-blue-500']" :style="{ width: progress + '%' }"></div>
              </div>
          </div>

        <ul class="flex flex-col items-center w-full mt-2">
          <li
            v-for="(chapter, index) in sortedChapters"
            :key="chapter.title"
            :title="chapter.status"
            :class="{
              'flex items-center justify-between gap-6 text-sm w-full py-3 px-4 lg:px-0 xl:px-4 rounded-sm hover:bg-gray-200 group font-semibold': true,
              'text-gray-900': chapter.status === 'completed' || chapter.status === 'in progress',
              'text-gray-500': chapter.status === 'locked'
            }"
          >
            <div class="flex items-center gap-2">
              <span class="text-gray-400 font-semibold">{{ (index + 1).toString().padStart(2, '0') }}</span>
              <p :class="{'text-gray-900 font-semibold': chapter.status === 'locked' || chapter.status === 'in progress', 'text-gray-400 font-semibold': chapter.status === 'completed'}">
                {{ chapter.title }}
              </p>
            </div>
            <i v-if="chapter.status === 'completed'" class="pi pi-check text-green-500"></i>
            <i v-else-if="chapter.status === 'locked'" class="pi pi-lock text-gray-500"></i>
            <span v-else class=""></span>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCourseStore } from '@/stores/courseStore';

const courseStore = useCourseStore();
const route = useRoute();
const departmentId = route.params.departmentId as string; // Get department ID from route
const courseId = route.params.courseId as string; // Get course ID from route
const showFullDescription = ref(false); // State for toggling description view

// Toggle full description visibility
const toggleDescription = () => {
  showFullDescription.value = !showFullDescription.value;
};

// Fetch course details on component mount
onMounted(async () => {
  courseStore.getCourseById(departmentId, courseId);
});

// Computed properties for course data and progress
const course = computed(() =>
  courseStore.getCourseById(departmentId, courseId)
);

const completedChapters = computed(() =>
  course.value?.chapters.filter(chapter => chapter.status === 'completed').length || 0
);
const totalChapters = computed(() => course.value?.chapters.length || 0);
const progress = computed(() =>
  totalChapters.value > 0
    ? Math.round((completedChapters.value / totalChapters.value) * 100)
    : 0
);

// Sort chapters based on status
const sortedChapters = computed(() => {
  return course.value?.chapters.slice().sort((a, b) => {
    const order = { completed: 1, 'in progress': 2, locked: 3 };
    return order[a.status] - order[b.status];
  }) || [];
});

// Get instructor image or fallback
const instructorImage = computed(() =>
  course.value?.instructors[0]?.image || '/src/assets/user.jpeg'
);
</script>

<template>
  <section class="flex-1 absolute left-[38.6px] md:left-[84px] right-0 flex flex-col lg:flex-row justify-between min-h-screen border-l-2 bg-gray-100">
    
    <div v-if="course && department" class="flex-1 flex flex-col py-9 md:py-12 px-3 md:px-10 lg:px-16 xl:px-28 gap-6">
      
      <CourseHeader
        :courseName="course.title"
        :courseTitle="course.title"
        :instructor="course.lecturer"
        :departmentId="department.id"
        :departmentName="department.name"
      />

      <VideoSection :videoSource="course.video" />

      <!-- Tabs for course details -->
      <TabComponent :tabs="tabs" defaultTab="Description">
        <template #default="{ activeTab }">
          <TabContent :activeTab="activeTab">
            <!-- Dynamically render content based on active tab -->
            <template v-slot:Description>
              <DescriptionSection :description="course.description" />
            </template>

            <template v-slot:Reviews>
              <ReviewSection :reviews="course.reviews" />
            </template>

            <template v-slot:Discussion>
              <DiscussionSection :discussions="course.discussions" />
            </template>

            <template v-slot:Resources>
              <ResourcesSection :resources="course.resources" />
            </template>

            <template v-slot:Instructor>
              <InstructorSection :instructor="course.instructors?.[0]" />
            </template>
          </TabContent>
        </template>
      </TabComponent>
    </div>
    
    <div v-else class="flex-1 flex items-start justify-center py-9 md:py-12 px-3 md:px-10 lg:px-16 xl:px-28 gap-6">
      <div class="loading">
        <LoadingView />
      </div>
    </div>

    <SidebarRight />

    <!-- This is strictly for error page testing. If uncommented, this page can't be viewed. -->
    <!-- <div>{{ undefinedProperty.nonExistentMethod() }}</div> -->
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCourseStore } from '@/stores/courseStore';
import type { Course, Department } from '@/utils/types';

import CourseHeader from '@/components/courseDetails/CourseHeader.vue';
import VideoSection from '@/components/courseDetails/VideoSection.vue';
import TabComponent from '@/components/courseDetails/TabComponent.vue';
import TabContent from '@/components/courseDetails/TabContent.vue';
import DescriptionSection from '@/components/courseDetails/tabs/DescriptionSection.vue';
import InstructorSection from '@/components/courseDetails/tabs/InstructorSection.vue';
import DiscussionSection from '@/components/courseDetails/tabs/DiscussionSection.vue';
import ResourcesSection from '@/components/courseDetails/tabs/ResourcesSection.vue';
import ReviewSection from '@/components/courseDetails/tabs/ReviewSection.vue';
import SidebarRight from '@/components/SidebarRight.vue';
import LoadingView from '@/components/LoadingView.vue';

const route = useRoute();
const courseStore = useCourseStore();

const course = ref<Course | null>(null);
const department = ref<Department | null>(null);
const tabs = [
  { name: 'Description' },
  { name: 'Reviews' },
  { name: 'Discussion' },
  { name: 'Resources' },
  { name: 'Instructor' }
];

onMounted(async () => {
  const departmentId = Array.isArray(route.params.departmentId)
    ? route.params.departmentId[0]
    : route.params.departmentId;
  const courseId = route.params.courseId as string;

  if (departmentId && courseId) {
    try {
      if (!courseStore.departments.length) {
        await courseStore.getCourses();
      }

      const fetchedCourse = courseStore.getCourseById(departmentId, courseId);
      const fetchedDepartment = await courseStore.getDepartmentByIdAction(departmentId);

      // Update state if data is available
      if (fetchedCourse && fetchedDepartment) {
        course.value = fetchedCourse;
        department.value = fetchedDepartment;
      } else {
        console.error('Failed to fetch course or department data.');
      }
    } catch (error) {
      console.error('Error fetching course or department:', error);
    }
  } else {
    console.error('Missing departmentId or courseId.');
  }
});
</script>

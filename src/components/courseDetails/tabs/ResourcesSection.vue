<template>
  <div>
    <ul v-if="resources && resources.length > 0">
      <li v-for="(resource, index) in resources" :key="index" class="mb-3 text-sm md:text-base">
        <a :href="resource.url" target="_blank" class="text-blue-500 hover:underline">
            <i class="pi pi-globe"></i>
            {{ resource.title }}
        </a>
      </li>
    </ul>
    
    <p v-else>No resources available</p>
  </div>
</template>

<script setup lang="ts">
import type { Resource } from '@/utils/types';

const props = defineProps<{
  resources: Resource[];
}>();
</script>
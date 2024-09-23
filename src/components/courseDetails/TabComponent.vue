<template>
  <div>
    <div class="headings w-full border-b-2 mt-1 md:mt-8 flex items-center flex-wrap gap-x-5 md:gap-14">
      <button 
        v-for="tab in tabs" 
        :key="tab.name" 
        @click="setActiveTab(tab.name)" 
        :class="{
          'border-[#0f61ff] text-gray-900': activeTab === tab.name, 
          'border-transparent text-gray-600': activeTab !== tab.name
        }" 
        class="border-b-2 transition-all text-sm md:text-base duration-300 ease-linear cursor-pointer hover:text-blue-500 pb-1 -mb-[1.5px]"
      >
        {{ tab.name }}
      </button>
    </div>

    <div class="bodies flex items-center gap-3 mt-5">
      <slot :activeTab="activeTab" /> <!-- Pass the active tab to the slot -->
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Tab } from '@/utils/types';
import { ref } from 'vue';
import type { PropType } from 'vue';

const props = defineProps({
  tabs: {
    type: Array as PropType<Tab[]>,
    required: true
  },
  defaultTab: String
});

const activeTab = ref(props.defaultTab || props.tabs?.[0]?.name || '');

// Set the active tab when a button is clicked
const setActiveTab = (tabName: string) => {
  activeTab.value = tabName;
};
</script>

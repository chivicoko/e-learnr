<template>
  <div class="video flex justify-center items-center relative">
      <video 
          :src="videoSource" 
          @error="onVideoError" 
          @play="isPlaying = true" 
          @pause="isPlaying = false"
          controls 
          class="w-full h-auto max-h-96 rounded-md object-cover" 
      >
          Your browser does not support the video tag.
      </video>
      <i 
          v-if="!isPlaying" 
          class="pi pi-play-circle p-3 rounded-full bg-gray-200 text-white flex items-center justify-center absolute m-auto mb-[25px] text-4xl hover:scale-110 transition-all duration-300 ease-linear cursor-pointer" 
          @click="playVideo"
      ></i>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  videoSource: String
});

const isPlaying = ref(false);

// Handle video loading errors
const onVideoError = (event: Event) => {
  const target = event.target as HTMLVideoElement;
  target.src = '/src/assets/videoPlaceholder.mp4';
  target.load();
};

// Play video when the play icon is clicked
const playVideo = (event: MouseEvent) => {
  const videoElement = (event.currentTarget as HTMLElement).parentElement?.querySelector('video') as HTMLVideoElement;
  if (videoElement) {
      videoElement.play();
      isPlaying.value = true;
  }
};
</script>

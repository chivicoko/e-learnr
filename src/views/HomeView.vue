
<template>
  <main class="flex-1 absolute left-[38.6px] md:left-[84px] right-0 min-h-screen border-l-2 p-3 md:p-12 flex">
    <section class="flex flex-col items-center justify-center gap-6 w-full">
      <p class="page"><span class="text-2xl text-[#0f61ff] font-semibold uppercase">E-Learnr</span></p>
      <div class="video flex justify-center items-center relative">
        <img src="/src/assets/homeImageAfricaaned.jpeg" alt="African Technology Network Photo" class="w-full h-auto max-h-72 rounded-md object-cover">
      </div>
      <h1 class="text-xl md:text-3xl text-center">Welcome To E-Learnr Network</h1>
      <div>
        <RouterLink to="/course-list" class="py-2 px-8 rounded-md border border-[#0f61ff] hover:border-transparent bg-transparent hover:bg-[#0f61ff] text-[#0f61ff] hover:text-white transition-all duration-300 ease-linear">
          Choose A Course
        </RouterLink>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
</script>

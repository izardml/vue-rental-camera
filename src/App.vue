<script setup>
import NavHeader from './components/NavHeader.vue'
</script>

<template>
  <div>
    <img src="./assets/img/background.jpg" alt="background" class="fixed -z-10 opacity-70 w-full h-full">
    <div>
      <NavHeader></NavHeader>

      <main class="container">
        <div class="bg-white rounded-xl shadow-lg mt-12 mb-24 p-8 min-h-[600px]">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

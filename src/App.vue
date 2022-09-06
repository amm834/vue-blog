<template>
  <main class="container">
    <nav-bar />
    <router-view />
  </main>
</template>
<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
</script>
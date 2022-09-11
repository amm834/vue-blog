<script lang="ts" setup>
import NavBar from "@/components/NavBar.vue";
import Modal from "@/components/Modal.vue";</script>

<template>
  <Modal />
  <main class="container">
    <nav-bar />
    <router-view />
  </main>
</template>


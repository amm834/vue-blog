<script lang="ts" setup>
import NavBar from "@/components/NavBar.vue";
import Modal from "@/components/Modal.vue";
import FormInput from "@/components/FormInput.vue";

const username = $ref("username");
</script>

<template>
  <Modal />
  <main class="container">
    <nav-bar />
    <FormInput
      label="Username"
      type="text"
      v-model="username"
      error="There is an error at here"
    />
    {{ username }}
    <router-view />
  </main>
</template>


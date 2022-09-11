<script setup lang="ts">
import { useModal } from "@/composables/useModal";
import FormInput from "@/components/FormInput.vue";
import SignUp from "@/components/SignUp.vue";

const { showModal } = useModal();
const username = $ref("some");
</script>

<template>

  <teleport to="#modal">
    <SignUp />
  </teleport>

  <nav class="navbar navbar-expand-lg mt-3">
    <div class="container-fluid">
      <div>
        <router-link to="/posts/new" class="btn btn-outline-primary shadow-sm">New Post</router-link>
      </div>
      <div class="ms-auto">
        <button class="btn btn-outline-success shadow-sm" @click="showModal">Sign Up</button>
      </div>
    </div>
  </nav>
</template>


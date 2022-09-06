<script setup lang="ts">
import type { Post } from "@/mocks";

defineProps<{
  post: Post
}>();
</script>

<template>
  <a href="#" class="card  text-decoration-none border-0 shadow-sm border-1 mb-2">
    <div class="card-body">
      <div>{{ post.title }}</div>
      <div>{{ post.created.format("Do MMM") }}</div>
    </div>
  </a>
</template>

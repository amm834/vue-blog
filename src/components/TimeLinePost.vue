<script setup lang="ts">
import type { Post } from "@/mocks";

const { post } = defineProps<{
  post: Post
}>();

const to = $ref(`/posts/${post.id}`);

</script>

<template>
  <router-link :to="to" class="card  text-decoration-none border-0 shadow-sm border-1 mb-2">
    <div class="card-body">
      <div>{{ post.title }}</div>
      <div>{{ post.created.format("Do MMM") }}</div>
    </div>
  </router-link>
</template>

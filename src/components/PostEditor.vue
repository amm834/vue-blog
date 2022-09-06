<script setup lang="ts">
import type { Post } from "@/mocks";

defineProps<{
  newPost: Post
}>();

</script>

<template>
  <div>
    <input type="text"
           v-model="newPost.title"
           class="form-control"
    >
  </div>
</template>


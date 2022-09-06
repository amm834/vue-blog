<script setup lang="ts">

import PostEditor from "@/components/PostEditor.vue";
import type { Post } from "@/mocks";
import moment from "moment";

const post: Post = {
  id: "-1",
  title: "New Post Title",
  created: moment()
};
</script>
<template>
  <p class="fw-bold">New Post</p>
  <PostEditor :new-post="post" />
</template>
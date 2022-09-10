<script setup lang="ts">

import PostEditor from "@/components/PostEditor.vue";
import type { Post } from "@/mocks";
import moment from "moment";

const post: Post = {
  id: "-1",
  title: "Enter post title",
  created: moment()
};

const save = (post: Post) => {
  console.log(post);
};
</script>

<template>
  <p class="fw-bold">New Post</p>
  <PostEditor :new-post="post" @save="save" />
</template>
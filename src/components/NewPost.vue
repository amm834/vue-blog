<script setup lang="ts">

import PostEditor from "@/components/PostEditor.vue";
import type { Post } from "@/mocks";
import moment from "moment";
import useStore from "@/store";
import { useRouter } from "vue-router";

const post: Post = {
  id: "-1",
  title: "Enter post title",
  created: moment()
};

const router = useRouter();
const store = useStore();

const save = async (post: Post) => {
  await store.createPost(post);
  await router.push("/");
};
</script>

<template>
  <p class="fw-bold">New Post</p>
  <PostEditor :post="post" @save="save" />
</template>
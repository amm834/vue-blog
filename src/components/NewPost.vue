<script setup lang="ts">

import PostEditor from "@/components/PostWriter.vue";
import type { Post } from "@/mocks";
import moment from "moment";
import { useRouter } from "vue-router";
import useStore from "@/store";


const router = useRouter();
const store = useStore();

const currentUserId = store.getState().users.currentUserId;
if (!currentUserId) {
  throw  new Error("authorId is not defined");
}
const post: Post = {
  id: "-1",
  title: "Enter post title",
  created: moment(),
  authorId: currentUserId
};


const save = async (post: Post) => {
  await store.createPost(post);
  await router.push("/");
};
</script>

<template>
  <p class="fw-bold">New Post</p>
  <PostEditor :post="post" @save="save" />
</template>
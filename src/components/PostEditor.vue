<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import useStore from "@/store";

const routes = useRoute();
const id = routes.params.id as string;
const store = useStore();
const router = useRouter();

if (!store.getState().posts.loaded) {
  await store.fetchPosts();
}

const post = store.getState().posts.all.get(id);
if (!post) {
  throw new Error("post not found ");
}


if (post.authorId !== store.getState().users.currentUserId) {
  await router.push("/");
}
</script>


<template>
  Post editor
</template>

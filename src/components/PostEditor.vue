<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import useStore from "@/store";
import PostWriter from "@/components/PostWriter.vue";
import { Post } from "@/mocks";

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

const updatePost = async (post: Post) => {
  await store.updatePost(post);
  await router.push("/");
};
</script>


<template>
  <PostWriter :post="post" @save="updatePost" />
</template>

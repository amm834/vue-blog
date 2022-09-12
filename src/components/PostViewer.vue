<script lang="ts" setup>
import { useRoute } from "vue-router";
import useStore from "@/store";

const routes = useRoute();
const id = routes.params.id as string;
const store = useStore();

if (!store.getState().posts.loaded) {
  await store.fetchPosts();
}

const post = store.getState().posts.all.get(id);
console.log(post);
</script>

<template>
  <div>
    Show post
  </div>
</template>

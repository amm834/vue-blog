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
    <router-link :to="`/posts/${post.id}/edit`"
                 class="btn btn-outline-info"
    >
      Edit
    </router-link>

    <div>
      show post
    </div>
  </div>
</template>

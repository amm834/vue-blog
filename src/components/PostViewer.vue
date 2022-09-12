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
if (!post) throw new Error("post is not defined");
const isAuthorized = post.authorId === store.getState().users.currentUserId;
</script>

<template>
  <div>
    <router-link :to="`/posts/${post.id}/edit`"
                 class="btn btn-outline-info"
                 v-if="isAuthorized"
    >
      Edit
    </router-link>

    <div>
      show post
    </div>
  </div>
</template>

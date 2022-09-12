<script lang="ts" setup>
import PostViewer from "@/components/PostViewer.vue";
import Spinner from "@/components/Spinner.vue";
</script>

<template>
  <suspense>
    <template #default>
      <PostViewer />
    </template>
    <template #fallback>
      <Spinner />
    </template>
  </suspense>
</template>

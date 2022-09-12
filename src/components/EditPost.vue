<script lang="ts" setup>
import Spinner from "@/components/Spinner.vue";
import PostEditor from "@/components/PostEditor.vue";</script>

<template>
  <suspense>
    <template #default>
      <PostEditor />
    </template>
    <template #fallback>
      <Spinner />
    </template>
  </suspense>
</template>

<script setup lang="ts">
import Timeline from "./components/TimeLine.vue";
import Spinner from "@/components/Spinner.vue";
</script>

<template>
  <main class="container">
    <Suspense>
      <template #default>
        <Timeline />
      </template>

      <template #fallback>
        <Spinner />
      </template>
    </Suspense>
  </main>
</template>

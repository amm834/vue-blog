<script lang="ts" setup>
import TimeLine from "./TimeLine.vue";
import Spinner from "./Spinner.vue";

</script>

<template>
  <Suspense>
    <template #default>
      <TimeLine />
    </template>

    <template #fallback>
      <Spinner />
    </template>
  </Suspense>
</template>


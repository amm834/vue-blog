<script lang="ts" setup>
import { $ref } from "vue/macros";
import { Post, thisMonth, thisWeek, today } from "../mocks";
import { computed } from "vue";
import moment from "moment";
import TimeLinePost from "@/components/TimeLinePost.vue";
import useStore from "@/store";


type Period = "Today" | "This Week" | "This Month";
const periods: Period[] = ["Today", "This Week", "This Month"];
let currentPeriod = $ref<Period>("Today");

const setCurrentPeriod = (period: Period) => currentPeriod = period;

const store = useStore();

const allPosts = store.getState().posts.ids.reduce<Post[]>((acc, id) => {
  const post = store.getState().posts.all.get(id);
  if (!post) throw new Error("No post ");

  return acc.concat(post);
}, []);

const posts = computed(() => {
  return allPosts.filter((post) => {
    if (currentPeriod === "Today") {
      return post.created.isAfter(moment().subtract(1, "day"));
    }

    if (currentPeriod === "This Week") {
      return post.created.isAfter(moment().subtract(1, "week"));
    }

    if (currentPeriod === "This Month") {
      return post.created.isAfter(moment().subtract(1, "month"));
    }
    return false;
  });
});


</script>

<template>
  <section>
    <nav class="nav justify-content-center my-3 shadow-sm rounded-2 border">
      <div
        class="nav-item"
        v-for="period in periods"
        :key="period"
      >
        <a class="nav-link" aria-current="page" href="#"
           @click="setCurrentPeriod(period)"
           :class="{'text-active': period === currentPeriod}"
           :data-test="period"
        >{{ period }}</a>
      </div>

    </nav>
    <TimeLinePost
      v-for="post in posts"
      :key="post.id"
      :post="post"
    />

  </section>
</template>

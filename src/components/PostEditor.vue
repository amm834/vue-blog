<script lang="ts" setup>
import type { Post } from "@/mocks";
import { onMounted, ref, watch, watchEffect } from "vue";
import { marked } from "marked";
import parse = marked.parse;
import hljs from "highlight.js";

const { newPost } = defineProps<{
  newPost: Post
}>();


const title = $ref(newPost.title);
let content = $ref("Enter your post in markdown here \n ");
let html = $ref("");

watchEffect(() => {
  html = parse(content, {
    gfm: true,
    breaks: true,
    highlight(code: string, lang: string, callback?: (error: any, code?: string) => void): string | void {
      return hljs.highlightAuto(code).value;
    }
  });
});

</script>

<template>
  <div>
    <input type="text"
           v-model="title"
           class="form-control"
    >
    <div class="row mt-4">
      <div class="col-md-6">

        <!--        Markdown content-->
        <textarea class="form-control" rows="10" placeholder="Enter your post here ..."
                  v-model="content"></textarea>
      </div>
      <div class="col-md-6">
        <!--        Rendered HTML content -->
        <div v-html="html"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
pre {
  color: #adbac7;
  background: #22272e;
  padding: 2rem;
  border-radius: .5rem;
}
</style>
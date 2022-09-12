<script lang="ts" setup>
import type { Post } from "@/mocks";
import { onMounted, ref, watch, watchEffect } from "vue";
import { marked } from "marked";
import parse = marked.parse;
// @ts-ignore
import hljs from "highlight.js";
import { debounce } from "lodash";

const { post } = defineProps<{
  post: Post
}>();

const emits = defineEmits<{
  (e: "save", post: Post): void,
}>();

const title = $ref(post.title);
let content = ref(post.markdown || "Enter your post in markdown here \n ");
let html = ref("");

const parseHTML = (raw: string) => {
  html.value = parse(raw, {
    gfm: true,
    breaks: true,
    highlight(code: string): string {
      return hljs.highlightAuto(code).value;
    }
  });
};

watch(content, debounce((newContent) => {
  parseHTML(newContent);
}, 0), { immediate: true });


const save = () => {
  const new_post: Post = {
    ...post,
    title: title,
    html: html.value,
    markdown: content.value
  };
  emits("save", new_post);
};

</script>

<template>
  <div>
    <nav class="my-3 d-flex justify-content-end">
      <!--       Submit Button -->
      <button
        class="btn btn-success"
        @click="save"
        data-test="submit"
      >Save
      </button>
    </nav>

    <!--     Post title -->
    <input type="text"
           v-model="title"
           data-test="title"
           class="form-control"
    >
    <div class="row mt-4">
      <div class="col-md-6">

        <!--        Markdown content-->
        <textarea
          v-model="content"
          data-test="content"
          class="form-control"
          rows="10"
          placeholder="Enter your post here ..."
        ></textarea>
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
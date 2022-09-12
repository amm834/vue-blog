import { createApp } from "vue";

import App from "./App.vue";

import "./assets/main.scss";
import axios from "axios";
import { thisMonth, thisWeek, today } from "./mocks";
import "highlight.js/styles/github-dark-dimmed.css";
import { random } from "lodash";
import { store, storeKey } from "@/store";
import router from "@/router";


function delay() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("resolve");
    }, 1000);
  });
}

// @ts-ignore
axios.get = async (url: string) => {
  await delay();
  if (url === "/posts") {
    return Promise.resolve({
      data: [today, thisWeek, thisMonth]
    });
  }
};

// @ts-ignore
axios.post = async (url: string, payload: any) => {
  await delay();
  if (url === "/posts") {
    const id = random(100, 1000).toString();
    const post = {
      id: id.toString(),
      title: payload.title,
      html: payload.html,
      created: payload.created,
      markdown: payload.markdown,
      authorId: payload.authorId
    };
    return Promise.resolve({
      data: post
    });
  }

  if (url === "/users") {
    const id = random(1, 10000).toString();
    return Promise.resolve({
      data: {
        ...payload,
        id
      }
    });
  }

};

const app = createApp(App);
app.use(router(store));

app.provide(storeKey, store);
app.mount("#app");

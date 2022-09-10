import { createApp } from "vue";

import App from "./App.vue";

import "./assets/main.scss";
import axios from "axios";
import { thisMonth, thisWeek, today } from "./mocks";
import router from "@/router";
import "highlight.js/styles/github-dark-dimmed.css";
import { random } from "lodash";


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
axios.post = async (url: string, post: Post) => {
  await delay();
  if (url === "/posts") {
    const id = random(1, 10000);
    return Promise.resolve({
      data: {
        ...post,
        id
      }
    });
  }
};

const app = createApp(App);

app.use(router);

app.mount("#app");

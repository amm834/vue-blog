import { createApp } from "vue";

import App from "./App.vue";

import "./assets/main.scss";
import axios from "axios";
import { thisMonth, thisWeek, today } from "@/mocks";
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
const app = createApp(App);

app.use(router);

app.mount("#app");

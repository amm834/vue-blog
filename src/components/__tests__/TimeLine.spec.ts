import TimeLine from "../TimeLine.vue";
import { mount, flushPromises } from "@vue/test-utils";
import { describe, it, vi } from "vitest";
import { expect } from "vitest";
import { thisMonth, thisWeek, today } from "../../mocks";
import { beforeAll, beforeEach } from "vitest/dist/browser";

vi.mock("axios", () => ({
  default: {
    get: (url: string) => {
      if (url === "/posts") {
        return Promise.resolve({
          data: [today, thisWeek, thisMonth]
        });
      }
    }
  }
}));


const mountTimeLine = () => {
  return mount({
    components: { TimeLine },
    template: `
      <Suspense>
      <template #default>
        <TimeLine />
      </template>
      <template #fallback>
        Loading..
      </template>
      </Suspense>
    `
  });
};

describe("TimeLine", () => {
  it("should render today default post", async function() {

    const wrapper = mountTimeLine();

    // resolve the external promises
    await flushPromises();

    expect(wrapper.html()).toContain(today.created.format("Do MMM"));
  });


  it("should render when period today was clicked", async () => {
    const wrapper = mountTimeLine();

    await flushPromises();

    //click the period tab
    await wrapper.get("[data-test=\"Today\"]").trigger("click");

    // await nextTick();
    expect(wrapper.html()).toContain(today.created.format("Do MMM"));
  });

  it("should render when period this week was clicked", async () => {
    const wrapper = mountTimeLine();

    await flushPromises();

    //click the period tab
    await wrapper.get("[data-test=\"This Week\"]").trigger("click");

    expect(wrapper.html()).toContain(today.created.format("Do MMM"));
    expect(wrapper.html()).toContain(thisWeek.created.format("Do MMM"));
  });

  it("should render when period this month was clicked", async () => {
    const wrapper = mountTimeLine();

    await flushPromises();

    //click the period tab
    await wrapper.get("[data-test=\"This Month\"]").trigger("click");

    expect(wrapper.html()).toContain(today.created.format("Do MMM"));
    expect(wrapper.html()).toContain(thisWeek.created.format("Do MMM"));
    expect(wrapper.html()).toContain(thisMonth.created.format("Do MMM"));
  });


});




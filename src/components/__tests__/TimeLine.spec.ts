import TimeLine from "../TimeLine.vue";
import { flushPromises, mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { thisMonth, thisWeek, today } from "../../mocks";
import { Store } from "../../store";

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
  const store = new Store({
    posts: {
      ids: [],
      loaded: false,
      all: new Map()
    }
  });
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




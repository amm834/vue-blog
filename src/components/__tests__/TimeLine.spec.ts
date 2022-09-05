import TimeLine from "../TimeLine.vue";
import { mount } from "@vue/test-utils";
import { describe, it } from "vitest";
import { expect } from "vitest";
import { thisMonth, thisWeek, today } from "../../mocks";
import { nextTick } from "vue";

describe("TimeLine", () => {
  it("should render today default post", function() {
    const wrapper = mount(TimeLine);

    expect(wrapper.html()).toContain(today.created.format("Do MMM"));
  });


  it("should render when period today was clicked", async () => {
    const wrapper = mount(TimeLine);

    //click the period tab
    await wrapper.get("[data-test=\"Today\"]").trigger("click");

    // await nextTick();
    expect(wrapper.html()).toContain(today.created.format("Do MMM"));
  });

  it("should render when period this week was clicked", async () => {
    const wrapper = mount(TimeLine);

    //click the period tab
    await wrapper.get("[data-test=\"This Week\"]").trigger("click");

    expect(wrapper.html()).toContain(today.created.format("Do MMM"));
    expect(wrapper.html()).toContain(thisWeek.created.format("Do MMM"));
  });

  it("should render when period this month was clicked", async () => {
    const wrapper = mount(TimeLine);

    //click the period tab
    await wrapper.get("[data-test=\"This Month\"]").trigger("click");

    expect(wrapper.html()).toContain(today.created.format("Do MMM"));
    expect(wrapper.html()).toContain(thisWeek.created.format("Do MMM"));
    expect(wrapper.html()).toContain(thisMonth.created.format("Do MMM"));
  });


});




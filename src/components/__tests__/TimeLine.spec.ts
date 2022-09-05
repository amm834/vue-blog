import TimeLine from "../TimeLine.vue";
import { mount } from "@vue/test-utils";
import { describe, it } from "vitest/dist/browser";
import { expect } from "vitest";
import { today } from "../../mocks";

describe("TimeLine", () => {
  it("should render today default post", function() {
    const wrapper = mount(TimeLine);
    console.log(wrapper.html());
    expect(wrapper.html()).toContain(today.created.format("Do MMM"));
  });
});

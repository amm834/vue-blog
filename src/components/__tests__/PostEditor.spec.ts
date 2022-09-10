import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import PostEditor from "../PostEditor.vue";
import moment from "moment";
import { nextTick } from "vue";

describe("PostEditor", () => {
  it("should emit a save event with the new post", async function() {
    const wrapper = mount(PostEditor, {
      props: {
        post: {
          title: "New Post"
        }
      }
    });

    await wrapper.find("[data-test='title']").setValue("My new post title");
    await wrapper.find("[data-test='content']").setValue("## My content");


    await wrapper.find("[data-test='submit']").trigger("click");

    const emitted = (wrapper.emitted()["save"] as any)[0][0];

    expect(emitted.title).toBe("My new post title");
    expect(emitted.markdown).toBe("## My content");
  });

});
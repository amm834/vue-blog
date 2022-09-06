import { reactive, readonly } from "vue";
import type { Post } from "@/mocks";
import axios from "axios";

interface State {
  posts: PostsState;
}

interface PostsState {
  ids: string[];
  all: Map<string, Post>;
  loaded: boolean;
}

class Store {
  private readonly state: State;

  constructor(initial: State) {
    this.state = reactive(initial);
  }

  getState() {
    return readonly(this.state);
  }

  async fetchPosts() {
    const response = await axios.get<Post[]>("/posts");

    const postState: PostsState = {
      all: new Map(),
      ids: [],
      loaded: true
    };

    for (const post of response.data) {
      postState.ids.push(post.id);
      postState.all.set(post.id, post);
    }

    this.state.posts = postState;
  }

}

const store = new Store({
  posts: {
    all: new Map(),
    ids: [],
    loaded: false
  }
});
store.getState().posts.all.get("1");

import { reactive, readonly } from "vue";
import type { Post } from "@/mocks";
import { thisMonth, thisWeek, today } from "@/mocks";
import axios from "axios";

interface State {
  posts: PostsState;
}

interface PostsState {
  ids: string[];
  all: Map<string, Post>;
  loaded: boolean;
}

export interface User {
  id: string;
  username: string;
  password: string;
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


  async createUser(user: User) {
    console.log(user);
  }

  async createPost(post: Post) {
    const response = await axios.post<Post>("/posts", post);
    this.state.posts.all.set(response.data.id, response.data);
    this.state.posts.ids.push(response.data.id);
  }

}

const all = new Map();
all.set(today.id, today);
all.set(thisWeek.id, thisWeek);
all.set(thisMonth.id, thisMonth);

const store = new Store({
  posts: {
    all,
    ids: [today.id, thisWeek.id, thisMonth.id],
    loaded: false
  }
});


export default function useStore() {
  return store;
}
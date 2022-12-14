import { inject, reactive, readonly } from "vue";
import type { Post } from "@/mocks";
import { thisMonth, thisWeek, today } from "@/mocks";
import axios from "axios";


interface State {
  posts: PostsState;
  users: AuthorState;
}

interface BaseState<T> {
  ids: string[];
  all: Map<string, T>;
  loaded: boolean;
}


export type Author = Omit<User, "password">

interface AuthorState extends BaseState<Author> {
  currentUserId: string | undefined;
}

type PostsState = BaseState<Post>

export interface User {
  id: string;
  username: string;
  password: string;
}

export const storeKey = Symbol("store");

export class Store {
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
    const response = await axios.post<Author>("/users", user);
    this.state.users.all.set(response.data.id, response.data);
    this.state.users.ids.push(response.data.id);
    this.state.users.currentUserId = response.data.id;

  }

  async createPost(post: Post) {
    const response = await axios.post<Post>("/posts", post);
    this.state.posts.all.set(response.data.id, response.data);
    this.state.posts.ids.push(response.data.id);
  }

  async updatePost(post: Post) {
    const response = await axios.put<Post>("/posts", post);
    this.state.posts.all.set(response.data.id, response.data);
  }

  async signOutUser() {
    const userId = this.state.users.currentUserId;
    if (userId) {
      this.state.users.all.delete(userId);
    }
    this.state.users.currentUserId = undefined;
  }


}

const all = new Map();
all.set(today.id, today);
all.set(thisWeek.id, thisWeek);
all.set(thisMonth.id, thisMonth);
export const store = new Store({
  users: {
    all: new Map<string, User>(),
    ids: [],
    loaded: false,
    currentUserId: undefined
  },
  posts: {
    all,
    ids: [today.id, thisWeek.id, thisMonth.id],
    loaded: false
  }
});


export default function useStore(): Store {
  const _store = inject<Store>(storeKey);
  if (!_store) {
    throw new Error("Did you forget to provide call?");
  }
  return _store;
}

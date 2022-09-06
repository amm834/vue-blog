import { reactive, readonly } from "vue";

interface State {
  test: string;
}

class Store {
  private state: State;

  constructor(initial: State) {
    this.state = reactive(initial);
  }

  getState() {
    return readonly(this.state);
  }
}

const store = new Store({
  test: "Hello"
});

store.getState().test;
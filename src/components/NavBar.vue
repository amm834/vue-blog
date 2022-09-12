<script setup lang="ts">
import { useModal } from "@/composables/useModal";
import SignUp from "@/components/SignUp.vue";
import { computed, h } from "vue";
import useStore from "@/store";

const modal = useModal();
const username = $ref("some");

const store = useStore();
const auth = computed(() => {
  return !!store.getState().users.currentUserId;
});

const signOut = () => {
  store.signOutUser();
};
const signUp = () => {
  modal.component.value = SignUp;
  modal.showModal();
};

const signIn = () => {
  modal.component.value = h("div", "hey there");
  modal.showModal();
};
</script>

<template>

  <teleport to="#modal">
    <component :is="modal.component.value"></component>
  </teleport>

  <nav class="navbar navbar-expand-lg mt-3">
    <div class="container-fluid">
      <div class="ms-auto">
        <div v-if="auth">
          <button class="btn btn-outline-success shadow-sm" @click="signOut">Sign Out</button>
          <router-link to="/posts/new" class="btn btn-outline-primary shadow-sm mx-3">New Post</router-link>
        </div>
        <div v-else>
          <button class="btn btn-outline-success shadow-sm" @click="signIn">Sign In</button>
          <button class="btn btn-success shadow-sm mx-3" @click="signUp">Sign Up</button>
        </div>

      </div>
    </div>
  </nav>
</template>


<script lang="ts" setup>
import { computed } from "vue";
import { length, required, Status, validate } from "@/services/validation";
import FormInput from "./FormInput.vue";
import useStore, { User } from "@/store";
import { useRouter } from "vue-router";
import { useModal } from "@/composables/useModal";


const username = $ref("username");
const usernameStatus = computed<Status>(() => {
  return validate(username, [required(), length({ min: 5, max: 16 })]);
});

const password = $ref("password");
const passwordStatus = computed<Status>(() => {
  return validate(password, [required(), length({ min: 8, max: 20 })]);
});


const store = useStore();
const router = useRouter();
const modal = useModal();

async function submit() {
  const user: User = {
    id: "-1",
    username,
    password,
  };
  await store.createUser(user);
  modal.hideModal();
  await router.push("/");
}

</script>

<template>
  <div class="card">
    <div class="card-header">Sign Up</div>
    <div class="card-body">
      <form @submit.prevent="submit">
        <FormInput
          label="Username"
          type="text"
          v-model="username"
          :error="usernameStatus.message"
        />
        <FormInput
          label="Password"
          type="password"
          v-model="password"
          :error="passwordStatus.message"
        />
        <button class="btn btn-success" :disabled="!usernameStatus.valid || !passwordStatus.valid">Sign Up</button>
      </form>
    </div>
  </div>
</template>


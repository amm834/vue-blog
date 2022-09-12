import { ref, shallowRef } from "vue";


const show = ref<boolean>(false);
const component = shallowRef();

export function useModal() {
  return {
    component,
    show,
    hideModal: () => show.value = false,
    showModal: () => show.value = true
  };
}
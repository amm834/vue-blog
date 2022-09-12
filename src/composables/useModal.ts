import { ref } from "vue";


const show = ref<boolean>(false);
const component = ref();

export function useModal() {
  return {
    component,
    show,
    hideModal: () => show.value = false,
    showModal: () => show.value = true
  };
}
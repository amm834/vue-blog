import { ref } from "vue";


const show = ref<boolean>(false);

export function useModal() {
  return {
    show,
    hideModal: () => show.value = false,
    showModal: () => show.value = true
  };
}
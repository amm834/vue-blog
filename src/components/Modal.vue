<script setup lang="ts">
import { useModal } from "@/composables/useModal";

const modal = useModal();

</script>

<template>
  <div class="popup" :class="modal.show.value ? 'd-block' : 'd-none'">

    <button
      class="btn btn-danger close-btn"
      @click="modal.hideModal"
    >
      Close
    </button>

    <div class="w-50 position-absolute start-50 translate-middle rounded-2" style="top:30%">
      <!--     receive message here -->
      <div id="modal"></div>
    </div>
  </div>
</template>


<style scoped>
.popup {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
}

.close-btn {
  position: absolute;
  right: 2rem;
  top: 1rem;
}

</style>
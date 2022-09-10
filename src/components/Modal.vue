<script setup lang="ts">
import { useModal } from "@/composables/useModal";

const modal = useModal();

</script>

<template>
  <div class="popup" :class="modal.show.value ? 'd-block' : 'd-none'">

    <div class="w-50 position-absolute start-50 translate-middle rounded-2" style="top:20%">
      <div class="card">
        <h5 class="card-header">Sign Up</h5>
        <div class="card-body">

          <!--     receive message here -->
          <div id="modal" class="card-body"></div>

          <button
            class="btn btn-primary"
            @click="modal.hideModal"
          >
            Close
          </button>
        </div>
      </div>
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
  right: 2rem;
  top: 1rem;
}

</style>
<script lang="ts" setup>

const { type, label, modelValue, error } = defineProps<{
  label: string,
  type: string,
  modelValue: string,
  error?: string
}>();

defineEmits<{
  (e: "update:modelValue"): void
}>();

</script>

<template>
  <div class="mb-3">
    <label class="form-label d-block">{{ label }}</label>
    <input
      id="name"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue',$event.target.value)"
      class="form-control" :class="error ? 'is-invalid' : 'is-valid' "
    >
    <small class="invalid-feedback">{{ error }}</small>
  </div>
</template>
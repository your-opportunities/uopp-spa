<template>
  <button class="gradient-button" @click="$emit('click')">
    {{ buttonText }}
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
defineProps({
  buttonText: {
    type: String,
    required: true,
  },
});
defineEmits(["click"]);
</script>

<style lang="scss" scoped>
.gradient-button {
  background: linear-gradient(90deg, #d95db0 0%, #3344dc 100%);
  border: none;
  border-radius: 6.25rem;
  color: #fff;
  padding: 1rem 1.25rem;
  font-size: 1rem;
  line-height: 1.25rem;
  width: fit-content;
  cursor: pointer;
  @media (min-width: 768px) {
    font-size: 2rem;
    height: 5rem;
  }

  &:hover {
    background: linear-gradient(90deg, #3344dc 0%, #d95db0 100%);
  }

  &:focus {
    outline: none;
  }

  &:active {
    background: linear-gradient(90deg, #d95db0 0%, #3344dc 100%);
  }
}
</style>

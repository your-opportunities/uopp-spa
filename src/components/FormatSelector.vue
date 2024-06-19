<template>
  <div :class="['formats', background]">
    <p class="formats-title">{{ title }}</p>
    <div class="formats-buttons">
      <CategoryButton
        v-for="format in formats"
        :key="format"
        :text="format"
        @click="toggleFormat(format)"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import CategoryButton from "./CategoryButton.vue";

const emits = defineEmits(["toggleFormat"]);

defineProps({
  formats: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  background: {
    type: String,
    default: "white",
  },
});

const toggleFormat = (format) => {
  emits("toggleFormat", format);
};
</script>

<style scoped>
.formats {
  margin-bottom: 2rem;
  color: #fff;
}
.formats-title {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.formats-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.formats.white {
  color: #000;
  .category-button {
    border: 1px solid #000;
  }
  .category-button.selected, .category-button:hover {
    border: none;
  }
}
</style>

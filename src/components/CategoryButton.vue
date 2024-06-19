<template>
  <button :class="buttonClass" @click="toggleSelection">{{ text }}</button>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch, computed } from "vue";

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
  gradientBackground: {
    type: String,
    default: "linear-gradient(90deg, #D95DB0 0%, #3344DC 100%)",
  },
});

const emit = defineEmits(["update:selected"]);

const isSelected = ref(props.selected);

watch(
  () => props.selected,
  (newVal) => {
    isSelected.value = newVal;
  }
);

const toggleSelection = () => {
  isSelected.value = !isSelected.value;
  emit("update:selected", isSelected.value);
};

const buttonClass = computed(() => ({
  "category-button": true,
  selected: isSelected.value,
  "not-selected": !isSelected.value,
}));
</script>

<style lang="scss" scoped>
.category-button {
  border: none;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
  background: white;
  color: black;
}

.category-button.selected {
  background: linear-gradient(90deg, #d95db0 0%, #3344dc 100%);
  color: white;
}

.category-button.not-selected:hover {
  background: linear-gradient(90deg, #d95db0 0%, #3344dc 100%);
  color: white;
}
</style>

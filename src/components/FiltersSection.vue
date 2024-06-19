<template>
  <div :class="['filters-section', background]">
    <div class="categories">
      <p class="categories-title">Категорії</p>
      <div class="category-buttons">
        <CategoryButton
          v-for="category in categories"
          :key="category"
          :text="category"
          @click="toggleCategory(category)"
        />
      </div>
    </div>
    <FormatSelector
      :formats="['онлайн', 'офлайн']"
      title="Формат"
      :background="background"
      @toggleFormat="toggleFormat"
    />
<!--    TODO: create unary isAsap selector-->
    <FormatSelector
      :formats="['термінові', 'будь-які']"
      title="Терміновість"
      :background="background"
      @toggleFormat="toggleIsAsap"
    />
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps } from "vue";
import CategoryButton from "./CategoryButton.vue";
import FormatSelector from "./FormatSelector.vue";

const emit = defineEmits(["updateFilters"]);
defineProps({
  background: {
    type: String,
    default: "white",
  },
});

const categories = [
  "вебінар",
  "волонтерство",
  "грант",
  "конкурс",
  "конференція",
  "курс",
  "лекція",
  "майстер-клас",
  "хакатон",
  "обмін",
  "програма",
  "проект",
  "стажування",
  "стипендія",
  "табір",
  "турнір",
  "тренінг",
];

const selectedCategories = ref([]);
const selectedFormats = ref([]);
const selectedIsAsap = ref([]);

const emitFilters = () => {
  emit("updateFilters", {
    categories: selectedCategories.value,
    formats: selectedFormats.value,
    isAsap: selectedIsAsap.value
  });
};

const toggleCategory = (category) => {
  const index = selectedCategories.value.indexOf(category);
  if (index > -1) {
    selectedCategories.value.splice(index, 1);
  } else {
    selectedCategories.value.push(category);
  }
  emitFilters();
};

const toggleFormat = (format) => {
  const index = selectedFormats.value.indexOf(format);
  if (index > -1) {
    selectedFormats.value.splice(index, 1);
  } else {
    selectedFormats.value.push(format);
  }
  emitFilters();
};

const toggleIsAsap = (isAsap) => {
  selectedIsAsap.value = isAsap === 'термінові' ? true : false;
  emitFilters();
};
</script>

<style scoped>
.filters-section {
  width: 100%;
}

.categories {
  margin-bottom: 2rem;
}

.categories-title {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.category-buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}
.filters-section.white {
  .category-button {
    border: 1px solid #000;
  }
  .category-button.selected,
  .category-button:hover {
    border: none;
  }
}
</style>

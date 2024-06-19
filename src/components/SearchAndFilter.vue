<template>
  <div class="search-and-filter">
    <div class="search-box-image" ref="searchBoxImage">
        <img
          src="@/assets/images/magnifier.svg"
          alt="search icon"
          class="search-box-image-icon"
        />
      </div>
    
    <div class="search-box">
      <div class="search-and-filter-title"><h2>Що шукаєш?</h2></div>
      <div class="search-box-input">
        <div class="search-input-container">
          <input
            v-model="searchQuery"
            @input="emitSearchQuery"
            type="text"
            placeholder="Введи ключові слова"
            class="search-input"
          />
          <GradientButton buttonText="Пошук" @click="emitSearchQuery" />
        </div>
        <p class="search-box-input-text">👉 Введи ключові слова</p>
        <div class="filters">
          <p class="filters-title">Фільтри</p>
          <FiltersSection @updateFilters="updateFilters" background="black" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import GradientButton from "./GradientButton.vue";
import FiltersSection from "./FiltersSection.vue";

const emit = defineEmits(["updateSearchQuery", "updateFilters"]);

const searchQuery = ref("");

const emitSearchQuery = () => {
  if (searchQuery.value.length > 70) {
    searchQuery.value = searchQuery.value.slice(0, 70);
  }
  emit("updateSearchQuery", searchQuery.value);
};

const updateFilters = (filters) => {
  emit("updateFilters", filters);
};
</script>

<style scoped>
.search-and-filter {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #000;
  padding: 2rem;
  border-radius: 2rem;
  color: #fff;
  @media (min-width: 768px) {
    align-items: flex-start;
    flex-direction: row;

  }
}

.search-and-filter-title {
  margin-bottom: 1.5rem;
  width: 100%;
  h2 {
    font-size: 1.25rem;
    font-weight: normal;
    text-align: center;
    margin: 0;
    @media (min-width: 768px) {
      font-size: 2.75rem;
      text-align: left;
      margin-left: 3.25rem;
    }
  }
}

.search-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  width: 100%;
  @media (min-width: 768px) {
    align-items: flex-start;
  }
}
.search-box-input {
  @media (min-width: 768px) {
    margin-left: 3.25rem;
  }
}

.search-box-input-text {
  text-align: center;
  @media (min-width: 768px) {
    text-align: left;
  }
}
.search-box-image {
  display: none;

  @media (min-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 50%;
    width: 5rem;
    min-width: 5rem;
    height: 5rem;
    min-height: 5rem;
    margin-top: 4rem;
  }
}
.search-box-image-icon {
  width: 1.5rem;
  height: 1.5rem;
  @media (min-width: 768px) {
    width: 2.5rem;
    height: 2.5rem;
  }
}
.search-input-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  .gradient-button {
    height: 3.5rem;
    width: 10rem;
    font-size: 1rem;
    margin-top: 1rem;
    @media (min-width: 768px) {
      margin-left: 1rem;
      margin-top: 0;
    }
  }
  @media (min-width: 768px) {
    flex-direction: row;
  }
}

.search-input {
  width: 15rem;
  padding: 1rem;
  border: none;
  border-radius: 2rem;
  font-size: 1.2rem;
  @media (min-width: 1024px) {
    width: 30rem;
  }
}

.filters {
  width: 100%;
  display: none;
  @media (min-width: 768px) {
    display: block;
  }
}

.filters-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
</style>

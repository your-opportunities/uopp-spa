<template>
  <div class="search-page">
    <div class="search-page-filter" ref="filterSection">
      <SearchAndFilter
        @updateFilters="updateFilters"
        @updateSearchQuery="updateSearchQuery"
      />
    </div>
    <div class="search-page-cards-container">
      <h2 class="search-page-title">Актуальні можливості</h2>
      <div
        class="search-page-cards-search-box"
        ref="searchBoxImage"
        @click="scrollToTop"
      >
        <img
          src="@/assets/images/magnifier.svg"
          alt="search icon"
          class="search-page-cards-search-box-image"
        />
      </div>
      <div class="search-page-cards">
        <AppCard
          v-for="opportunity in opportunities"
          :key="opportunity.uuid"
          :content="opportunity.title"
          :uuid="opportunity.uuid"
          @cardClicked="handleCardClicked(opportunity)"
          buttonText="Більше"
        />
      </div>
      <div class="search-page-button">
        <GradientButton
            @click="loadMore"
            v-if="showLoadMore"
            button-text="Завантажити більше" />
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted, onBeforeMount, watch} from "vue";
import { useRouter } from "vue-router";
import AppCard from "./AppCard.vue";
import SearchAndFilter from "./SearchAndFilter.vue";
import GradientButton from "./GradientButton.vue";
import {getOpportunities} from "@/apiClient";

const opportunities = ref([]);
const searchQuery = ref("");
const filters = ref({ categories: [], formats: [], isAsap: false });
const page = ref(0);
const size = 12;
const filterSection = ref(null);
const searchBoxImage = ref(null);
const showLoadMore = ref(true);
const router = useRouter();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.target && !entry.isIntersecting) {
        if (searchBoxImage.value && searchBoxImage.value.style) {
          searchBoxImage.value.style.display = "flex";
        }
      } else if (entry.target) {
        if (searchBoxImage.value && searchBoxImage.value.style) {
          searchBoxImage.value.style.display = "none";
        }
      }
    });
  },
  {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  }
);


const updateFilters = (newFilters) => {
  filters.value = newFilters;
  resetSearch();
};

const updateSearchQuery = (newSearchQuery) => {
  searchQuery.value = newSearchQuery;
  resetSearch();
};

const resetSearch = () => {
  page.value = 0;
  opportunities.value = [];
  getResults();
};

const getResults = async () => {
  const data = await getOpportunities(
      page.value,
      size,
      searchQuery.value,
      filters.value.categories,
      filters.value.formats,
      filters.value.isAsap
  );
  opportunities.value = [...opportunities.value, ...data];
  page.value += 1;

  await checkShowButton();
  return data;
};

const loadMore = async () => {
  await getResults();
};

// fix: two calls is not good, implement remaining count on backend
const checkShowButton = async () =>  {
  const nextPageData = await getOpportunities(
      page.value,
      size,
      searchQuery.value,
      filters.value.categories,
      filters.value.formats,
      filters.value.isAsap
  );
  showLoadMore.value = nextPageData.length !== 0;
};

const handleCardClicked = async (clickedOpportunity) => {
  router.push({
    name: "DetailsPage",
    params: { uuid: clickedOpportunity.uuid },
  });
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  getResults();
  if (filterSection.value) {
    observer.observe(filterSection.value);
  }
});

onBeforeMount(() => {
  if (router.currentRoute.value.query.categories) {
    filters.value.categories = router.currentRoute.value.query.categories.split(",");
  }
  if (router.currentRoute.value.query.formats) {
    filters.value.formats = router.currentRoute.value.query.formats.split(",");
  }
  searchQuery.value = router.currentRoute.value.query.searchQuery || "";
});

onUnmounted(() => {
  if (filterSection.value) {
    observer.unobserve(filterSection.value);
  }
});

watch([searchQuery, filters], () => {
  router.push({
    query: {
      searchQuery: searchQuery.value,
      categories: filters.value.categories.join(","),
      formats: filters.value.formats.join(","),
    },
  });
});
</script>

<style scoped>
.search-page-title {
  font-size: 1.25rem;
  font-weight: normal;
  text-align: center;
  @media (min-width: 768px) {
    font-size: 2.75rem;
  }
}
.search-page-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(21rem, 1fr));
  gap: 1rem;
  .app-card {
    justify-self: center;
    align-self: center;
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
}
.search-page-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3.125rem 0;
  .gradient-button {
    height: 3.5rem;
    font-size: 1rem;
  }
}
.search-page-cards-search-box {
  display: none;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 50%;
  width: 5.5rem;
  min-width: 5.5rem;
  height: 5.5rem;
  min-height: 5.5rem;
  position: fixed;
  bottom: 4rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  right: 5%;
}
.search-page-cards-search-box-image {
  width: 3rem;
  height: 3rem;
  @media (min-width: 768px) {
    width: 3rem;
    height: 3rem;
  }
}
</style>

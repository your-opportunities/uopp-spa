<template>
  <div class="details-page">
    <div class="details-page-top">
      <BackButton @go-back="goBack" />
      <div class="details-page-card">
        <AppCard :content="opportunity.title" :uuid="opportunity.uuid" />
      </div>
      <div class="details-page-labels">
        <div v-for="category in opportunity.categories" :key="category.name">
          <div class="details-page-labels-text">{{ category.name }}</div>
        </div>
        <div v-for="format in opportunity.formats" :key="format.name">
          <div class="details-page-labels-text">{{ format.name }}</div>
        </div>
        <div class="details-page-labels-text">
          {{ opportunity.isAsap ? "теріміново" : "будь-які" }}
        </div>
      </div>
    </div>

    <div class="details-page-content">
      <div class="details-page-content-text">
        <TextContent>
          <p>{{ opportunity.description }}</p>
        </TextContent>
      </div>
      <div class="details-page-content-text">
        <TextContent>
          <a
            :href="opportunity.sourceLink"
            target="_blank"
            rel="noopener noreferrer"
            class="details-page-content-text-link"
          >
            Джерело: {{ opportunity.sourceName }}
          </a>
        </TextContent>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import AppCard from "./AppCard.vue";
import BackButton from "./BackButton.vue";
import TextContent from "./TextContent.vue";
import {getOpportunityByUuid} from "@/apiClient";

const router = useRouter();
const route = useRoute();

const opportunity = ref({});

const goBack = () => {
  router.back();
};

onMounted(async () => {
  const uuid = route.params.uuid;
  const response = await getOpportunityByUuid(uuid);
  opportunity.value = response;
});
</script>

<style scoped>
.details-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  @media (min-width: 768px) {
    gap: 2rem;
  }
}
.details-page-top {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  @media (min-width: 768px) {
    flex-direction: row;
  }
}
.details-page-button-back {
  width: 15.625rem;
  height: 3.75rem;
  font-size: 1.25rem;
  line-height: 2.25rem;
  background-color: #000;
  color: #fff;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 1px 30px #3344dc;
}
.details-page-button-back-image {
  width: 2.75rem;
  height: 2.75rem;
  margin-right: 0.5rem;
}
.details-page-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  max-width: 99.5%;
  @media (min-width: 768px) {
    gap: 2rem;
  }
}
.details-page-content-text {
  border-radius: 1.25rem;
  box-shadow: 1px 1px 30px #3344dc;
  width: 100%;
  max-width: 100%;
  word-wrap: break-word;
  white-space: pre-wrap;
  .text-content {
    padding-top: 0;
    padding-bottom: 0;
  }
}
.details-page-labels {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  @media (min-width: 768px) {
    gap: 1rem;
  }
}

.details-page-labels-text {
  background: linear-gradient(90deg, #d95db0 0%, #3344dc 100%);
  border: none;
  border-radius: 6.25rem;
  color: #fff;
  padding: 1rem 1.25rem;
  font-size: 1rem;
  line-height: 1.25rem;
  text-align: center;
}
.details-page-content-text-link {
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: block;
  color: #000;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
</style>

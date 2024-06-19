<template>
  <div class="moderator-page">
    <div class="moderator-page-button-logout">
      <GradientButton @click="logout" button-text="Вийти" />
    </div>
    <div class="moderator-page-content">
      <div
        v-if="opportunities.length > 0"
        class="moderator-page-cards-container"
      >
        <div class="moderator-page-title">
          <p>Черга</p>
        </div>
        <div
          v-for="opportunity in opportunities"
          :key="opportunity.uuid"
          class="moderator-page-cards"
        >
          <AppCard
            :content="opportunity.title"
            :uuid="opportunity.uuid"
            @cardClicked="handleCardClicked(opportunity)"
            buttonText="Більше"
          />
          <div class="moderator-page-button">
            <button
              class="button-white"
              @click="handleOpportunity(opportunity.uuid, 'APPROVED')"
            >
              Схвалити
            </button>
            <button
              class="button-black"
              @click="handleOpportunity(opportunity.uuid, 'REJECTED')"
            >
              Відхилити
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="moderator-page-button-submit">
      <GradientButton @click="loadMore" button-text="Завантажити більше" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import AppCard from "./AppCard.vue";
import GradientButton from "./GradientButton.vue";
import {getModeratorOpportunities, setAuthToken, updateOpportunityStatus} from "@/apiClient";

const router = useRouter();

const page = ref(0);
const size = 12;
const opportunities = ref([]);

const getOpportunities = async () => {
  try {
    const jwtToken = localStorage.getItem("jwtToken");
    const response = await getModeratorOpportunities(page.value, size, jwtToken);
    opportunities.value = [...opportunities.value, ...response];
    page.value += 1;
  } catch (error) {
    console.error("Error fetching opportunities:", error);
  }
};
const handleCardClicked = async (clickedOpportunity) => {
  router.push({
    name: "DetailsPage",
    params: { uuid: clickedOpportunity.uuid },
  });
};
const loadMore = () => {
  getOpportunities();
};

const handleOpportunity = async (uuid, status) => {
  await updateOpportunityStatus(uuid, status);
  opportunities.value = opportunities.value.filter((opportunity) => opportunity.uuid !== uuid);
};
const logout = () => {
  localStorage.removeItem("jwtToken");
  setAuthToken(null)
  router.push("/moderator/sign-in");
};

onMounted(() => {
  getOpportunities();
});
</script>

<style scoped>
.moderator-page {
    position: relative;
}
.moderator-page-content {
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
}

.moderator-page-cards {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
  @media (min-width: 768px) {
    flex-direction: row;
    gap: 5rem;
  }
}
.moderator-page-cards-container {
  @media (min-width: 768px) {
    width: 100%;
  }
}
.moderator-page-button {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  @media (min-width: 768px) {
    max-width: 19rem;
  }
}
.moderator-page-title {
  border-radius: 1.25rem;
  background-color: #000;
  color: #fff;
  font-size: 2rem;
  line-height: 2.25rem;
  margin-bottom: 4.6rem;
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 768px) {
    max-width: 56rem;
    margin-left: auto;
    margin-right: auto;
    margin-top: 0;
  }
}

.moderator-page-button-submit,
.moderator-page-button-logout  {
.gradient-button {
    height: 3.5rem;
    font-size: 1rem;
    width: 100%;
    max-width: 21rem;
  }
}

.moderator-page-button-submit {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3.125rem 0;
  
}

.moderator-page-button-logout {
    position: absolute;
    right: 0;
    top: -10px;
    .gradient-button {
        width: 18.75rem;
    }
    @media(min-width: 768px) {
        top: -150px;
        right: 20px;
    }
}
</style>

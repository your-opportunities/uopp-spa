<template>
  <div class="home-page">
    <div class="home-page-button">
      <GradientButton
          @click="navigateToSearch"
          button-text="Шукати можливості"
      />
      <GradientButton
          @click="navigateToSubscription"
          button-text="Створити сповіщення"
      />
    </div>
    <section class="home-page-text">
      <div class="svg-image">
        <img :src="wave" alt="wave"/>
      </div>
      <TextContent>
        <p>
          Привіт! Уяви собі місце, де всі ті можливості для саморозвитку,
          волонтерства, проєкти, конкурси та курси - зібрані разом! Більше не
          треба шукали їх у сотнях телеграм-каналів, на сторінках у Фейсбуці та
          в Інстаграмі.
        </p>
        <p>
          Уявляєш? А ми взяли і зробили таке місце. Користуйся і ділитися з
          друзями
        </p>
      </TextContent>
    </section>
    <section class="home-page-content">
      <div v-if="opportunities.length > 0" class="home-page-cards">
        <AppCard
            v-for="opportunity in opportunities.slice(0, 3)"
            :key="opportunity.uuid"
            :content="opportunity.title"
            :uuid="opportunity.uuid"
            @cardClicked="handleCardClicked(opportunity)"
            buttonText="Більше"
        />
      </div>
      <div class="home-page-phone-container">
        <div class="home-page-phone-img">
          <img :src="phone" alt="Phone"/>
        </div>
        <div class="home-page-phone-content-container">
          <div class="home-page-phone-content">
            <div class="home-page-phone-content-circles">
              <div class="home-page-phone-content-circle circle-large"></div>
              <div class="home-page-phone-content-circle circle-medium"></div>
              <div class="home-page-phone-content-circle circle-small"></div>
            </div>
            <p class="home-page-phone-content-text">
              <b>120</b> <br/>актуальних можливостей на платформі зараз
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import TextContent from "@/components/TextContent.vue";
import GradientButton from "@/components/GradientButton.vue";
import AppCard from "@/components/AppCard.vue";

import wave from "@/assets/images/wave.svg";
import phone from "@/assets/images/phone.png";

import {useRouter} from "vue-router";
import {ref, onMounted} from "vue";

import {getOpportunities} from '@/apiClient.js';

const opportunities = ref([]);
const router = useRouter();

const navigateToSearch = () => {
  router.push("/search");
};
const navigateToSubscription = () => {
  router.push("/subscriptions");
};
const handleCardClicked = async (clickedOpportunity) => {
  router.push({
    name: "DetailsPage",
    params: {uuid: clickedOpportunity.uuid},
  });
};

onMounted(async () => {
  opportunities.value = await getOpportunities();
});

</script>

<style lang="scss" scoped>
.home-page {
  background-color: #000;
  @media (min-width: 768px) {
    display: flex;
    flex-direction: column-reverse;
  }
}

.home-page-content {
  display: none;
  @media (min-width: 768px) {
    display: block;
    position: relative;
  }
}

.home-page-button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  @media (min-width: 768px) {
    margin-bottom: 7rem;
    gap: 2.6rem;
  }
}

.home-page-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.875rem;
  margin: 1rem 0;
  @media (min-width: 768px) {
    flex-direction: row;
    margin: -15% auto 5.9rem;
    border-radius: 1.25rem;
    gap: 3.125rem;
    background-color: #fff;
    padding: 3rem;
    z-index: 2;
    max-width: 66rem;
  }
  @media (min-width: 768px) {
    margin-top: -10%;
  }

  .text-content {
    border-radius: 1.25rem;
    background-color: #fff;
    color: #000;
    @media (min-width: 768px) {
      padding: 0;
      max-width: 47.5rem;
    }
  }
}

.svg-image {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #fff;
  width: 4.6875rem;
  height: 4.6875rem;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
  @media (min-width: 768px) {
    min-width: 9rem;
    width: 9rem;
    min-height: 9rem;
    height: 9rem;

    img {
      width: 5.43rem;
      height: 5.43rem;
    }
  }
}

.home-page-phone-container {
  position: relative;
  width: 100%;
  max-width: 30.625rem;
  margin: 0 auto;

  .home-page-phone-img {
    position: relative;
    z-index: 1;

    img {
      width: 100%;
      height: auto;
      z-index: 1;
      position: relative;
      border: 1px solid #000000;
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    }
  }

  .home-page-phone-content-container {
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    text-align: center;
    z-index: 1;

    .home-page-phone-content-circles {
      position: relative;
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      margin-bottom: 1rem;
    }

    .home-page-phone-content-circle {
      position: absolute;
      border: 1px solid #000;
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .circle-large {
      width: 17.93rem;
      height: 14.47rem;
    }

    .circle-medium {
      width: 15.18rem;
      height: 11.31rem;
    }

    .circle-small {
      width: 11.25rem;
      height: 8.4375rem;
    }

    .home-page-phone-content-text {
      font-size: 1.2rem;
      line-height: 1.25rem;
      position: absolute;
      width: 100%;
      top: 33%;
      transform: translate(75%, 15%);
      margin: 0;
      max-width: 9.68rem;
      color: #000;
    }
  }
}

.home-page-cards {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  max-width: 98%;
  align-items: center;
  position: absolute;
  top: 57%;
  left: 50%;
  transform: translate(-50%, -40%);
  z-index: 2;

  > :first-child {
    transform: translateY(15%) rotate(-15deg);
  }

  > :last-child {
    transform: translateY(15%) rotate(15deg);
  }

  .app-card {
    height: 20rem;
    max-height: 20rem;
    color: #000;
    @media (min-width: 1024px) {
      height: 18rem;
      max-height: 18rem;
    }
  }
}
</style>

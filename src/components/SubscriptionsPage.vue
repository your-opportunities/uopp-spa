<template>
  <div class="subscriptions-page">
    <div class="subscriptions-page-top">
      <BackButton @go-back="goBack" />
      <div class="subscriptions-page-title">
        <p>Хочеш підписатися на отримання сповіщень про можливості?</p>
      </div>
    </div>
    <div class="subscriptions-page-content">
      <div class="subscriptions-page-content-email">
        <div class="subscriptions-page-content-labels-text">Твій імейл</div>
        <div class="subscriptions-page-content-email-container">
          <input
            v-model="email"
            type="email"
            placeholder="Твій імейл"
            class="subscriptions-page-content-email-input"
            @blur="validateEmail"
          />
          <img
            v-if="email && !emailError"
            src="@/assets/images/check-button.png"
            alt="valid icon"
            class="subscriptions-page-content-email-input-icon"
          />
          <img
            v-if="emailError"
            src="@/assets/images/prohibited.png"
            alt="invalid icon"
            class="subscriptions-page-content-email-input-icon"
          />
          <p v-if="emailError" class="subscriptions-page-content-email-error">
            Будь ласка, введіть дійсну електронну адресу.
          </p>
        </div>
      </div>
      <div class="subscriptions-page-content-filters">
        <div class="subscriptions-page-content-labels-text">Обери теги</div>
        <FiltersSection @updateFilters="updateFilters" background="white" />
      </div>
      <button class="submit-button" @click="submitSubscription">
        Надіслати
      </button>
    </div>
  </div>
</template>

<script setup>
import {createSubscription} from "@/apiClient";
import BackButton from "./BackButton.vue";
import FiltersSection from "./FiltersSection.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const emailError = ref(false);
const categories = ref([]);
const formats = ref([]);
const isAsap = ref(false);

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailError.value = !emailRegex.test(email.value);
};

const updateFilters = (filters) => {
  categories.value = filters.categories;
  formats.value = filters.formats;
  isAsap.value = filters.isAsap;
};

const submitSubscription = async () => {
  validateEmail();
  if (emailError.value) {
    return;
  }

  const subscriptionData = {
    subscriptionChannel: "EMAIL",
    userId: email.value,
    categories: categories.value,
    formats: formats.value,
    isAsap: isAsap.value,
  };

  try {
    await createSubscription(subscriptionData);
    router.push("/success");
  } catch (error) {
    console.error(
      "Error creating subscription",
      error.response ? error.response.data : error
    );
    router.push("/error");
  }
};

const goBack = () => {
  history.back();
};
</script>

<style scoped>
.subscriptions-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  color: #000;
  @media (min-width: 768px) {
    gap: 3.5rem;
    align-items: flex-start;
  }
}

.subscriptions-page-top {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    height: 3.75rem;
    max-height: 3.75rem;
  }
}
.subscriptions-page-title {
  margin-bottom: 2rem;
  background-color: #000;
  color: #fff;
  border-radius: 1.25rem;
  padding: 0.5rem;
  text-align: center;
  font-size: 1.25rem;
  line-height: 2.25rem;
  p {
    margin: 0;
    @media (min-width: 768px) {
      padding: 1.25rem;
    }
  }
  @media (min-width: 768px) {
    height: 2rem;
    max-height: 2rem;
    text-align: left;
    margin-bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.25rem;
  }
  @media (min-width: 1024px) {
    height: 1.25rem;
    max-height: 1.25rem;
  }
}

.subscriptions-page-content {
  width: 100%;
  max-width: 50rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  @media (min-width: 768px) {
    align-items: flex-start;
    max-width: none;
  }
}

.subscriptions-page-content-email {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  width: 100%;
}
.subscriptions-page-content-email-input {
  box-shadow: 1px 1px 30px #3344dc;
  border-radius: 20px;
  width: 100%;
  max-width: 50rem;
  padding: 0.75rem;
  border-radius: 1.25rem;
  border: 1px solid #ccc;
  font-size: 1rem;
  position: relative;
  @media (min-width: 768px) {
    padding: 1rem;
  }
}

.subscriptions-page-content-email-input-icon {
  position: absolute;
  right: 0;
  top: 1.5rem;
  transform: translateY(-50%);
  width: 1.5rem;
  height: 1.5rem;
}
.subscriptions-page-content-email-container {
  width: 50%;
  position: relative;
}

.subscriptions-page-content-email-error {
  color: red;
  font-size: 0.875rem;
}

.subscriptions-page-content-labels {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.subscriptions-page-content-labels-text {
  background: linear-gradient(90deg, #d95db0 0%, #3344dc 100%);
  border: none;
  border-radius: 6.25rem;
  color: #fff;
  padding: 1rem 1.25rem;
  font-size: 1rem;
  line-height: 1.25rem;
  text-align: center;
  @media (min-width: 768px) {
    width: 11.25rem;
    min-width: 11.25rem;;
  }
}

.subscriptions-page-content-filters {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 2.5rem;
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    gap: 1rem;
  }
}

.submit-button {
  background-color: #000;
  color: #fff;
  font-size: 1.25rem;
  padding: 1rem;
  border-radius: 20px;
  cursor: pointer;
  text-align: center;
  @media (min-width: 768px) {
    margin: 0 auto;
    width: 15rem;
  }
}
</style>

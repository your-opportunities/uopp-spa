<template>
  <div class="success-page">
    <div class="success-page-content">
      <TextContent>
        <p>
          Успіх! Підписка на отримання сповіщень про бажані освітні можливості була створена!
        </p>
      </TextContent>
    </div>
    <div class="success-page-button">
      <GradientButton
        @click="navigateToSearch"
        button-text="Шукати можливість"
      />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

import GradientButton from "./GradientButton.vue";

const router = useRouter();
const navigateToSearch = () => {
  router.push("/search");
};
</script>

<style lang="scss" scoped>
.success-page {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
}
.success-page-content {
  max-width: 31rem;
  font-size: 1.25rem;
  line-height: 1.5rem;
  padding: 2rem;
  border-radius: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  color: #000;
  text-align: center;
}
</style>

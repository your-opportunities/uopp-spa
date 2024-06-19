<template>
    <div class="login-page">
      <h1 class="login-page-title">Панель модератора</h1>
      <form @submit.prevent="submitForm">
        <div class="login-page-content">
            <div>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Логін"
            class="login-page-content-input"
            required
            @blur="validateEmail"
          />
          <div v-if="emailError" class="login-page-content-error">{{ emailError }}</div>
        </div>
        <div>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Пароль"
            class="login-page-content-input"
            required
            @blur="validatePassword"
          />
          <div v-if="passwordError" class="login-page-content-error">{{ passwordError }}</div>
        </div>
        <GradientButton button-text="Увійти" @click="submitForm" :disabled="isFormInvalid" />
        <div v-if="error" class="login-page-content-error">{{ error }}</div>
        </div>
        
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import {setAuthToken, signIn} from "@/apiClient";
  import { useRouter } from "vue-router";
  import GradientButton from "./GradientButton.vue";
  
  const router = useRouter();
  const email = ref("");
  const password = ref("");
  const error = ref("");
  const emailError = ref("");
  const passwordError = ref("");
  
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    emailError.value = email.value && !emailRegex.test(email.value) ? "Некоректний формат електронної пошти" : "";
  };
  
  const validatePassword = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    passwordError.value = password.value && !passwordRegex.test(password.value)
      ? "Пароль повинен містити принаймні 8 символів, одну велику літеру, одну малу літеру та одну цифру"
      : "";
  };
  
  const isFormInvalid = computed(() => {
    return emailError.value || passwordError.value || !email.value || !password.value;
  });
  
  const submitForm = async () => {
    if (isFormInvalid.value) {
      return;
    }
  
    try {
      const jwtToken = await signIn(email.value, password.value);
      localStorage.setItem("jwtToken", jwtToken);
      setAuthToken(jwtToken)
      router.push("/moderator/opportunities");
    } catch (err) {
      error.value = "Невірний логін або пароль";
      console.error("Error during login:", err);
    }
  };
  </script>
  <style lang="scss" scoped>
  .login-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 90vh;
  }

  .login-page-title {
    font-weight: 500;
  }
  
  .login-page-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .login-page-content-input {
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 18.75rem;
    max-width: 18.75rem;
    border-radius: 6.25rem;
    height: 2.5rem;
    font-size: 1rem;
    @media(min-width:768px) {
        width: 25rem;
        max-width: 25rem;
    }
  }
  .gradient-button {
    width:100%;
    height: 100%;
    max-width: 18.75rem;
    @media(min-width:768px) {
        width: 25rem;
        max-width: 25rem;
    }
  }
  .login-page-content-error {
    color: red;
    padding: .5rem 0 0 1rem;
    width: 18.75rem;
    max-width: 18.75rem;
    @media(min-width:768px) {
        width: 25rem;
        max-width: 25rem;
    }
  }
  </style>
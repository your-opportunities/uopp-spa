<template>
  <div class="error-page">
    <div class="error-page-content">
      <p>
        Щось пішло не так. Будь-ласка, спробуйте пізніше!
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

setTimeout(() => {
  router.push('/');
}, 10000); 
</script>

<style scoped>
.error-page-content {
  font-size: 2rem;
  line-height: 2rem;
}
</style>

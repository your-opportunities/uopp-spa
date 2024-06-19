<template>
  <button @click="$emit('go-back')" class="button-back">
    <img
      src="@/assets/images/emoji-back.png"
      alt="back icon"
      class="button-back-image"
    />
    Повернутися
  </button>
</template>

<script setup></script>

<style scoped>
.button-back {
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
.button-back-image {
  width: 2.75rem;
  height: 2.75rem;
  margin-right: 0.5rem;
}
</style>

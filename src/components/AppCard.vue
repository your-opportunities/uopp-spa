<template>
  <div class="app-card">
    <div class="app-card-content">
      <p class="app-card-content-text">{{ truncatedContent }}</p>
      <img :src="emojiImg" class="app-card-content-img" />
    </div>
    <GradientButton
      v-if="buttonText"
      @click="handleClick"
      :buttonText="buttonText"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";
import GradientButton from "./GradientButton.vue";

const props = defineProps({
  uuid: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  buttonText: {
    type: String,
    required: false,
  },
});

const emits = defineEmits(["cardClicked"]);

const handleClick = () => {
  emits("cardClicked", props.uuid);
};

const emojis = require.context(
  "@/assets/images/emojis",
  false,
  /\.(png|jpe?g|gif|svg)$/
);

const emojiFiles = emojis.keys().map((key) => emojis(key));
const emojiImg = emojiFiles[Math.floor(Math.random() * emojiFiles.length)];

const truncatedContent = computed(() => {
  const maxLength = 100; 
  if (props.content && props.content.length > maxLength) {
    return `${props.content.slice(0, maxLength)}...`;
  }
  return props.content;
});
</script>

<style lang="scss" scoped>
.app-card {
  width: 21rem;
  max-width: 21rem;
  height: 18rem;
  max-height: 18rem;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 1px 1px 30px #3344dc;
  padding: 1.5rem;
  font-size: 1.5rem;
  line-height: 2.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;

  &-content {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-text {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3; 
      -webkit-box-orient: vertical;
      white-space: normal;
    }

    &-img {
      width: 3.125rem;
      height: 3.125rem;
      margin-left: 1rem;
    }
  }

  .gradient-button {
    font-size: 1rem;
    width: calc(100% - 3rem);
    height: 3.5rem;
    margin: 0 auto;
  }
}
</style>

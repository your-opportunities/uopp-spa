<template>
  <div class="text-content">
    <slot></slot>
  </div>
</template>

<script setup></script>

<style>
.text-content {
  padding: 1rem;
  font-size: 1rem;
  line-height: 1.5rem;
  @media (min-width: 768px) {
    font-size: 1.3rem;
  }
}
</style>

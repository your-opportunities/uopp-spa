<template>
  <footer class="footer">
    <div class="footer-item">Контакти: opportunities@gmail.com</div>
    <div class="footer-item">Твої можливості</div>
  </footer>
</template>

<script setup></script>

<style scoped>
.footer {
  border-top: 1px solid #000;
  background-color: #fff;
  color: #000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}
.footer-item {
  font-size: 1rem;
  margin-top: 1rem;
  &:last-child {
    margin-top: 0;
    margin-bottom: 1rem;
  }
}
</style>

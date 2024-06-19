<template>
  <header class="header">
    <div class="header-title">
      <a href="/" style="text-decoration:none"><h1>твої <span>можливості</span></h1></a>
    </div>
  </header>
</template>

<script setup></script>

<style lang="scss" scoped>
.header {
  background-color: #000;
  border-radius: 0 0 3.125rem 3.125rem;
  margin-bottom: 1.25rem;
  @media (min-width: 768px) {
    margin-bottom: 3rem;
  }
}

.header-title {
  padding: 0.5rem 5.625rem 0;

  h1 {
    font-weight: 500;
    font-size: 1.875rem;
    line-height: 1.875rem;
    color: #fff;
    text-align: center;
    margin: 0;

    span {
      display: block;
    }
  }

  @media (min-width: 768px) {
    padding: 0.5rem 6.25rem 3.43rem;

    h1 {
      text-align: start;
    }
  }
}
</style>

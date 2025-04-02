<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h1>Chess Game Application</h1>

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/chess">Chess</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style lang="scss" scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1rem;

  a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);

    &:first-of-type {
      border: 0;
    }

    &.router-link-exact-active {
      color: var(--color-text);
    }

    &.router-link-exact-active:hover {
      background-color: transparent;
    }
  }
}
</style>

<script setup lang="ts">
import pkg from '../package.json'
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h1>Chess Game Application</h1>

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/chess">Chess</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />

  <footer>
    <p>&copy; 2025 Jannik Lohaus</p>
    <p>Source at <a :href="pkg.repository.url" target="_blank" rel="noopener">GitHub</a></p>
  </footer>
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

footer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
}
</style>

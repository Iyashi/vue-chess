<script lang="ts" setup>
import ChessGame from '@/components/chess/ChessGame.vue'
</script>

<template>
  <main class="chess-view">
    <header>
      <h2>Chess View</h2>
    </header>

    <ChessGame />
  </main>
</template>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.chess-game {
  margin: 0 auto;
}
</style>

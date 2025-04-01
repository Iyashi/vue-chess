<script lang="ts" setup>
import { ref } from 'vue'
import { createBoard } from '@/chess/board'
import ChessBoard from '@/components/chess/ChessBoard.vue'

const board = ref(createBoard())
</script>

<template>
  <div class="chess-game">
    <ChessBoard :board="board" />
  </div>
</template>

<style lang="scss" scoped></style>

<script lang="ts" setup>
import { ref } from 'vue'
import { createBoard } from '@/chess/board'
import { type Tile } from '@/chess/tile'
import { isBlackFigure, isWhiteFigure, getFigureDesciption, MovedOnce } from '@/chess/figure'
import ChessBoard from '@/components/chess/ChessBoard.vue'

const board = ref(createBoard())

async function handleMove(fromTile: Tile, toTile: Tile) {
  if (fromTile === toTile) return // cannot move to same tile

  const movingFigure = board.value[fromTile]
  const targetFigure = board.value[toTile]

  // TODO: Use movingFigure's MovementMap to check if move is possible

  if (targetFigure === 0) {
    // empty target, just move the figure
  } else if (
    (isBlackFigure(movingFigure) && isBlackFigure(targetFigure)) ||
    (isWhiteFigure(movingFigure) && isWhiteFigure(targetFigure))
  ) {
    // friendly target, cannot move
    console.warn('Cannot move to friendly figure at', toTile)
    return
  } else {
    // capture the target figure and remove it from the board
    board.value[toTile] = 0
    console.info('Capture', getFigureDesciption(targetFigure), 'at', toTile)
  }

  // move the piece to the new tile and remove it from the old one
  board.value[fromTile] = 0
  board.value[toTile] = movingFigure | MovedOnce
  console.info('Moved from', fromTile, 'to', toTile)
}
</script>

<template>
  <div class="chess-game">
    <ChessBoard :board="board" @move="handleMove" />
  </div>
</template>

<style lang="scss" scoped></style>

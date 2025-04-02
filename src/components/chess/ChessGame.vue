<script lang="ts" setup>
import { ref } from 'vue'
import { createBoard } from '@/chess/board'
import { getIndexForVerticalKey, type Tile } from '@/chess/tile'
import {
  isBlackFigure,
  isWhiteFigure,
  isPawnFigure,
  getFigureDesciption,
  type Figure,
  MovedOnce,
} from '@/chess/figure'
import ChessBoard from '@/components/chess/ChessBoard.vue'
import ChessPromotionDialog from '@/components/chess/ChessPromotionDialog.vue'

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

  // start pawn promotion if a pawn reaches the end of the board
  const row = getIndexForVerticalKey(toTile)
  if (isPawnFigure(movingFigure) && (row === 0 || row == 7)) {
    startPromotion(toTile, movingFigure)
  }
}

// Handle Pawn Promotion
const promotion = ref<{ tile: Tile; figure: Figure } | null>(null)
function startPromotion(tile: Tile, figure: Figure) {
  if (promotion.value !== null) return // promotion already started
  promotion.value = { tile, figure }
  console.info('Promoting pawn on', tile)
}
function endPromotion(newFigure: Figure) {
  if (promotion.value === null) return // promotion not started yet
  board.value[promotion.value.tile] = newFigure
  console.info('Promoting pawn on', promotion.value.tile, 'to', getFigureDesciption(newFigure))
  promotion.value = null
}
</script>

<template>
  <div class="chess-game">
    <ChessBoard :board="board" @move="handleMove" />

    <ChessPromotionDialog v-if="promotion" :figure="promotion!.figure" @promote="endPromotion" />
  </div>
</template>

<style lang="scss" scoped>
.chess-game {
  position: relative; // make promotion dialog overlay chess-game container
  width: 100%;
  @media screen and (min-width: 640px) {
    width: 480px;
  }
  @media screen and (min-width: 768px) {
    width: 640px;
  }
  @media screen and (min-width: 1024px) {
    width: 768px;
  }
  @media screen and (min-width: 1280px) {
    width: 1024px;
  }
}
</style>

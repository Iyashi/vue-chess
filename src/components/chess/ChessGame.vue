<script lang="ts" setup>
import { ref } from 'vue'
import { createBoard } from '@/chess/board'
import { getAxisIndicesForTile, type Tile } from '@/chess/tile'
import {
  isPawnFigure,
  getFigureDesciption,
  MovedOnce,
  isEnemyFigure,
  type Figure,
} from '@/chess/figure'
import { calculateMovementPaths } from '@/chess/movement_map'
import * as Moves from '@/chess/moves'
import ChessBoard from '@/components/chess/ChessBoard.vue'
import ChessPromotionDialog from '@/components/chess/ChessPromotionDialog.vue'

const board = ref(createBoard())

function handleMove(fromTile: Tile, toTile: Tile) {
  if (fromTile === toTile) return // cannot move to same tile

  let movingFigure = board.value[fromTile]
  const targetFigure = board.value[toTile]

  const movementPaths = calculateMovementPaths(board.value, fromTile)
  const [toX, toY] = getAxisIndicesForTile(toTile)
  let shouldMove = false
  if (movementPaths[toY][toX]) {
    if (movementPaths[toY][toX] & (Moves.WalkOnEmpty | Moves.JumpOnEmpty) && !targetFigure) {
      shouldMove = true // move figure to empty target tile
    } else if (
      movementPaths[toY][toX] & (Moves.WalkOnEnemy | Moves.JumpOnEnemy) &&
      true === isEnemyFigure(movingFigure, targetFigure)
    ) {
      shouldMove = true // capture enemy figure at target tile and move figure to target tile
    } else if (
      movementPaths[toY][toX] & (Moves.WalkOnFriend | Moves.JumpOnFriend) &&
      false === isEnemyFigure(movingFigure, targetFigure)
    ) {
      shouldMove = true // move figure to friendly tile
      // TODO: Handle special cases when moving on friendly tiles (for example Castling)
    }
  }

  // start pawn promotion if a pawn reaches the end of the board
  if (isPawnFigure(movingFigure) && (toY === 0 || toY == 7)) {
    startPromotion(toTile, movingFigure)
  }

  // lastly, move the figure to the new tile and update the board state
  if (shouldMove) {
    board.value[fromTile] = 0
    board.value[toTile] = movingFigure = movingFigure | MovedOnce
    if (targetFigure) {
      console.info('Captured', getFigureDesciption(targetFigure), 'at', toTile)
    } else {
      console.info('Moved to empty tile', toTile)
    }
    // TODO: switch active player
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

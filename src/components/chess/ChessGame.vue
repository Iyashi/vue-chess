<script lang="ts" setup>
import { ref } from 'vue'
import { createBoard, resetBoard } from '@/chess/board'
import { getAxisIndicesForTile, type Tile } from '@/chess/tile'
import {
  MovedOnce,
  isBlackFigure,
  isWhiteFigure,
  isPawnFigure,
  isEnemyFigure,
  isRookFigure,
  isKnightFigure,
  isBishopFigure,
  isQueenFigure,
  isKingFigure,
  getFigureDesciption,
  type Figure,
} from '@/chess/figure'
import { calculateMovementPaths } from '@/chess/movement_map'
import * as Moves from '@/chess/moves'
import ChessBoard from '@/components/chess/ChessBoard.vue'
import ChessPromotionDialog from '@/components/chess/ChessPromotionDialog.vue'

const board = ref(createBoard())
const activePlayer = ref<'black' | 'white'>('black')
const turnCount = ref(1)
const blackCaptures = ref<Figure[]>([])
const whiteCaptures = ref<Figure[]>([])

function handleMove(fromTile: Tile, toTile: Tile) {
  if (fromTile === toTile) return // cannot move to same tile

  let movingFigure = board.value[fromTile]
  const targetFigure = board.value[toTile]

  if (activePlayer.value !== 'black' && isBlackFigure(movingFigure)) return
  if (activePlayer.value !== 'white' && isWhiteFigure(movingFigure)) return

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

  // update game state
  if (shouldMove) {
    // update tiles / move figure
    board.value[fromTile] = 0
    board.value[toTile] = movingFigure = movingFigure | MovedOnce

    // update captures array
    if (targetFigure) {
      if (isBlackFigure(movingFigure)) {
        blackCaptures.value.push(targetFigure)
      } else {
        whiteCaptures.value.push(targetFigure)
      }
    }

    // update other game state
    activePlayer.value = isBlackFigure(movingFigure) ? 'white' : 'black'
    turnCount.value++
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

function getFigureType(
  figure: Figure,
): 'pawn' | 'rook' | 'bishop' | 'knight' | 'queen' | 'king' | 'invalid' {
  if (isPawnFigure(figure)) {
    return 'pawn'
  } else if (isRookFigure(figure)) {
    return 'rook'
  } else if (isKnightFigure(figure)) {
    return 'knight'
  } else if (isBishopFigure(figure)) {
    return 'bishop'
  } else if (isQueenFigure(figure)) {
    return 'queen'
  } else if (isKingFigure(figure)) {
    return 'king'
  }
  return 'invalid'
}

function resetGame() {
  if (confirm('Are you sure you want to reset the game?')) {
    resetBoard(board.value)
  }
}
</script>

<template>
  <div class="chess-game">
    <section class="chess-info">
      <p>Active Player: {{ activePlayer }}</p>
      <p>Turn Count: {{ turnCount }}</p>
      <button @click="resetGame">Reset Game</button>
    </section>

    <ChessBoard :board="board" @move="handleMove" />

    <section class="chess-captures">
      <div class="black">
        <p>Black captured:</p>
        <ul>
          <li v-for="(figure, index) in blackCaptures" :key="index">
            <span
              :class="['chess-figure white', getFigureType(figure)]"
              :title="getFigureDesciption(figure)"
            />
          </li>
        </ul>
      </div>
      <div class="white">
        <p>White captured:</p>
        <ul>
          <li v-for="(figure, index) in whiteCaptures" :key="index">
            <span
              :class="['chess-figure black', getFigureType(figure)]"
              :title="getFigureDesciption(figure)"
            />
          </li>
        </ul>
      </div>
    </section>

    <ChessPromotionDialog v-if="promotion" :figure="promotion!.figure" @promote="endPromotion" />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/chess-font.scss' as chess-font;

.chess-game {
  position: relative; // make promotion dialog overlay chess-game container
  width: 100%;
  :deep(.chess-board-figure) {
    font-size: 2rem;
  }
  @media screen and (min-width: 640px) {
    width: 480px;
    :deep(.chess-board-figure) {
      font-size: 2.5rem;
    }
  }
  @media screen and (min-width: 768px) {
    width: 560px;
    :deep(.chess-board-figure) {
      font-size: 3rem;
    }
  }
  @media screen and (min-width: 1024px) {
    width: 640px;
    :deep(.chess-board-figure) {
      font-size: 3.5rem;
    }
  }
}

.chess-info,
.captures {
  margin: 0.5rem;
}

.chess-info,
.chess-captures,
.chess-captures .black,
.chess-captures .white,
.chess-captures ul {
  display: flex;
  flex-flow: row wrap;
  place-items: center;
  justify-content: space-between;
}

.chess-captures {
  p {
    display: inline-block;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
}

.chess-figure {
  font-size: 2rem;
  &.black {
    @include chess-font.chess-figure-black;
  }
  &.white {
    @include chess-font.chess-figure-white;
  }
}
</style>

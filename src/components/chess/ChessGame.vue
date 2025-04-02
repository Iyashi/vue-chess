<script lang="ts" setup>
import { ref } from 'vue'
import {
  createBoard,
  resetBoard,
  MovedOnce,
  isBlackFigure,
  isWhiteFigure,
  isPawnFigure,
  isEnemyFigure,
  getFigureKind,
  getFigureDesciption,
  isKingFigure,
  getAxisIndicesForTile,
  getIndexForVerticalKey,
  calculateMovementPaths,
  Moves,
  type Figure,
  type Tile,
} from '@/chess'
import ChessBoard from '@/components/chess/ChessBoard.vue'
import ChessPromotionDialog from '@/components/chess/ChessPromotionDialog.vue'

const board = ref(createBoard())
const activePlayer = ref<'black' | 'white'>('black')
const turnCount = ref(1)
const blackCaptures = ref<Figure[]>([])
const whiteCaptures = ref<Figure[]>([])

function handleResetGame() {
  if (confirm('Are you sure you want to reset the game?')) {
    resetGame()
  }
}

function resetGame() {
  activePlayer.value = 'black'
  turnCount.value = 0
  resetBoard(board.value)
}

function handleMove(fromTile: Tile, toTile: Tile): void {
  if (canFigureMove(fromTile, toTile)) {
    moveFigure(fromTile, toTile)
  }
}

function canFigureMove(fromTile: Tile, toTile: Tile): boolean {
  if (fromTile === toTile) return false // cannot move to same tile

  const movingFigure = board.value[fromTile]
  const targetFigure = board.value[toTile]

  // check if the player is active
  if (activePlayer.value !== 'black' && isBlackFigure(movingFigure)) return false
  if (activePlayer.value !== 'white' && isWhiteFigure(movingFigure)) return false

  // check if the move is valid
  const movementPaths = calculateMovementPaths(board.value, fromTile)
  const [toX, toY] = getAxisIndicesForTile(toTile)

  // if allowed, move figure to empty target tile
  if (movementPaths[toY][toX] & (Moves.WalkOnEmpty | Moves.JumpOnEmpty) && !targetFigure) {
    return true
  }

  // if allowed, capture enemy figure at target tile and move figure to target tile
  if (
    movementPaths[toY][toX] & (Moves.WalkOnEnemy | Moves.JumpOnEnemy) &&
    true === isEnemyFigure(movingFigure, targetFigure)
  ) {
    return true
  }

  // if allowed, move figure to friendly tile
  if (
    movementPaths[toY][toX] & (Moves.WalkOnFriend | Moves.JumpOnFriend) &&
    false === isEnemyFigure(movingFigure, targetFigure)
  ) {
    return true
  }

  return false
}

function moveFigure(fromTile: Tile, toTile: Tile) {
  let movingFigure = board.value[fromTile]
  const targetFigure = board.value[toTile]

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

  // check for game end conditions
  if (isKingFigure(targetFigure)) {
    if (confirm(activePlayer.value + ' has won! Start a new game?')) {
      resetGame()
    }
    return
  }

  // update other game state
  activePlayer.value = isBlackFigure(movingFigure) ? 'white' : 'black'
  turnCount.value++

  // start pawn promotion if a pawn reaches the end of the board
  const toY = getIndexForVerticalKey(toTile)
  if (isPawnFigure(movingFigure) && (toY === 0 || toY == 7)) {
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
    <section class="chess-info">
      <p>Active Player: {{ activePlayer }}</p>
      <p>Turn Count: {{ turnCount }}</p>
      <button @click="handleResetGame">Reset Game</button>
    </section>

    <ChessBoard :board="board" @move="handleMove" />

    <section class="chess-captures">
      <div class="black">
        <p>Black captured:</p>
        <ul>
          <li v-for="(figure, index) in blackCaptures" :key="index">
            <span
              :class="['chess-figure white', getFigureKind(figure)]"
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
              :class="['chess-figure black', getFigureKind(figure)]"
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

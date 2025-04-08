<script lang="ts" setup>
import { ref } from 'vue'
import {
  createBoard,
  resetBoard,
  MovedOnce,
  isBlackPiece,
  isWhitePiece,
  isPawnPiece,
  isEnemyPiece,
  getPieceDesciption,
  isKingPiece,
  getAxisIndicesForTile,
  getIndexForVerticalKey,
  calculateMovementPaths,
  Moves,
  isTile,
  type Piece,
  type Tile,
} from '@/chess'
import ChessBoard from '@/components/chess/ChessBoard.vue'
import ChessPromotionDialog from '@/components/chess/ChessPromotionDialog.vue'
import ChessPiece from '@/components/chess/ChessPiece.vue'

const board = ref(createBoard())
const activePlayer = ref<'black' | 'white'>('black')
const turnCount = ref(1)
const sourceTile = ref<Tile | ''>('')
const targetTile = ref<Tile | ''>('')

const blackCaptures = ref<Piece[]>([])
const whiteCaptures = ref<Piece[]>([])

function handleResetGame() {
  if (confirm('Are you sure you want to reset the game?')) {
    resetGame()
  }
}

function resetGame() {
  activePlayer.value = 'black'
  turnCount.value = 0
  sourceTile.value = ''
  targetTile.value = ''
  blackCaptures.value = []
  whiteCaptures.value = []
  resetBoard(board.value)
}

function handleMove(fromTile: Tile, toTile: Tile): void {
  if (canPieceMove(fromTile, toTile)) {
    movePiece(fromTile, toTile)
    sourceTile.value = ''
    targetTile.value = ''
  }
}

function canPieceMove(fromTile: Tile, toTile: Tile): boolean {
  if (fromTile === toTile) return false // cannot move to same tile

  const movingPiece = board.value[fromTile]
  const targetPiece = board.value[toTile]

  // check if the player is active
  if (activePlayer.value !== 'black' && isBlackPiece(movingPiece)) return false
  if (activePlayer.value !== 'white' && isWhitePiece(movingPiece)) return false

  // check if the move is valid
  const movementPaths = calculateMovementPaths(board.value, fromTile)
  const [toX, toY] = getAxisIndicesForTile(toTile)

  // if allowed, move piece to empty target tile
  if (movementPaths[toY][toX] & (Moves.WalkOnEmpty | Moves.JumpOnEmpty) && !targetPiece) {
    return true
  }

  // if allowed, capture enemy piece at target tile and move piece to target tile
  if (
    movementPaths[toY][toX] & (Moves.WalkOnEnemy | Moves.JumpOnEnemy) &&
    true === isEnemyPiece(movingPiece, targetPiece)
  ) {
    return true
  }

  // if allowed, move piece to friendly tile
  if (
    movementPaths[toY][toX] & (Moves.WalkOnFriend | Moves.JumpOnFriend) &&
    false === isEnemyPiece(movingPiece, targetPiece)
  ) {
    return true
  }

  return false
}

function movePiece(fromTile: Tile, toTile: Tile) {
  let movingPiece = board.value[fromTile]
  const targetPiece = board.value[toTile]

  // update tiles / move piece
  board.value[fromTile] = 0
  board.value[toTile] = movingPiece = movingPiece | MovedOnce

  // update captures array
  if (targetPiece) {
    if (isBlackPiece(movingPiece)) {
      blackCaptures.value.push(targetPiece)
    } else {
      whiteCaptures.value.push(targetPiece)
    }
  }

  // check for game end conditions
  if (isKingPiece(targetPiece)) {
    if (confirm(activePlayer.value + ' has won! Start a new game?')) {
      resetGame()
    }
    return
  }

  // update other game state
  activePlayer.value = isBlackPiece(movingPiece) ? 'white' : 'black'
  turnCount.value++

  // start pawn promotion if a pawn reaches the end of the board
  const toY = getIndexForVerticalKey(toTile)
  if (isPawnPiece(movingPiece) && (toY === 0 || toY == 7)) {
    startPromotion(toTile, movingPiece)
  }
}

// Handle Pawn Promotion
const promotion = ref<{ tile: Tile; piece: Piece } | null>(null)
function startPromotion(tile: Tile, piece: Piece) {
  if (promotion.value !== null) return // promotion already started
  promotion.value = { tile, piece }
  console.info('Promoting pawn on', tile)
}
function endPromotion(newPiece: Piece) {
  if (promotion.value === null) return // promotion not started yet
  board.value[promotion.value.tile] = newPiece
  console.info('Promoting pawn on', promotion.value.tile, 'to', getPieceDesciption(newPiece))
  promotion.value = null
}
</script>

<template>
  <div class="chess-game">
    <section class="chess-info">
      <p>Active Player: {{ activePlayer }}</p>
      <p>Turn Count: {{ turnCount }}</p>
      <form
        class="manual-move"
        @submit.prevent="
          isTile(sourceTile) && isTile(targetTile) && handleMove(sourceTile, targetTile)
        "
      >
        <input v-model="sourceTile" placeholder="From Tile" :size="4" list="tiles" />
        <input v-model="targetTile" placeholder="To Tile" :size="4" list="tiles" />
        <button type="submit">Move</button>
        <datalist id="tiles">
          <option v-for="(_, tile) in board" :key="tile" :value="tile" />
        </datalist>
      </form>
      <button @click="handleResetGame">Reset Game</button>
    </section>

    <ChessBoard :board="board" @move="handleMove" />

    <section class="chess-captures">
      <div class="black">
        <p>Black captured:</p>
        <ul>
          <li v-for="(piece, index) in blackCaptures" :key="index">
            <ChessPiece :piece="piece" />
          </li>
        </ul>
      </div>
      <div class="white">
        <p>White captured:</p>
        <ul>
          <li v-for="(piece, index) in whiteCaptures" :key="index">
            <ChessPiece :piece="piece" />
          </li>
        </ul>
      </div>
    </section>

    <ChessPromotionDialog v-if="promotion" :piece="promotion!.piece" @promote="endPromotion" />
  </div>
</template>

<style lang="scss" scoped>
.chess-game {
  position: relative; // make promotion dialog overlay chess-game container
  width: 100%;
  :deep(.chess-piece) {
    font-size: 2rem;
  }
  @media screen and (min-width: 640px) {
    width: 480px;
    :deep(.chess-piece) {
      font-size: 2.5rem;
    }
  }
  @media screen and (min-width: 768px) {
    width: 560px;
    :deep(.chess-piece) {
      font-size: 3rem;
    }
  }
  @media screen and (min-width: 1024px) {
    width: 640px;
    :deep(.chess-piece) {
      font-size: 3.5rem;
    }
  }
}

.manual-move {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
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
</style>

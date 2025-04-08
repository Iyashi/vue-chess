<script lang="ts" setup>
import { ref } from 'vue'
import {
  BlackPlayer,
  WhitePlayer,
  createBoard,
  resetBoard,
  MovedOnce,
  isBlackPiece,
  isWhitePiece,
  isPawnPiece,
  isKingPiece,
  isTile,
  getIndexForVerticalKey,
  canPieceMove,
  type Piece,
  type Tile,
} from '@/chess'
import { useHistory } from '@/chess/composables'
import ChessBoard from '@/components/chess/ChessBoard.vue'
import ChessPromotionDialog from '@/components/chess/ChessPromotionDialog.vue'
import ChessPiece from '@/components/chess/ChessPiece.vue'
import ChessHistory from '@/components/chess/ChessHistory.vue'

const board = ref(createBoard())
const sourceTile = ref<Tile | ''>('')
const targetTile = ref<Tile | ''>('')

const history = useHistory()
const {
  entries: historyEntries,
  blackCapturedPieces,
  whiteCapturedPieces,
  currentTurn,
  currentPlayer,
} = history

function handleResetGame() {
  if (confirm('Are you sure you want to reset the game?')) {
    resetGame()
  }
}

function resetGame() {
  sourceTile.value = ''
  targetTile.value = ''
  history.clear()
  resetBoard(board.value)
}

function handleMove(fromTile: Tile, toTile: Tile): void {
  // check if the player is active
  if (currentPlayer.value !== BlackPlayer && isBlackPiece(board.value[fromTile])) return
  if (currentPlayer.value !== WhitePlayer && isWhitePiece(board.value[fromTile])) return

  if (canPieceMove(board.value, fromTile, toTile)) {
    movePiece(fromTile, toTile)
    sourceTile.value = ''
    targetTile.value = ''
  }
}

function movePiece(fromTile: Tile, toTile: Tile) {
  let movingPiece = board.value[fromTile]
  const targetPiece = board.value[toTile]

  // update tiles / move piece
  board.value[fromTile] = 0
  board.value[toTile] = movingPiece = movingPiece | MovedOnce

  // check for game end conditions
  if (isKingPiece(targetPiece)) {
    if (confirm(currentPlayer.value + ' has won! Start a new game?')) {
      resetGame()
    }
    return
  }

  // start pawn promotion if a pawn reaches the end of the board
  const toY = getIndexForVerticalKey(toTile)
  if (isPawnPiece(movingPiece) && (toY === 0 || toY == 7)) {
    promotion.value = { tile: fromTile, targetTile: toTile, piece: movingPiece }
    if (targetPiece) promotion.value.targetPiece = targetPiece
  } else {
    // add history entry
    if (targetPiece) {
      // add capture history entry
      history.create(fromTile, toTile, movingPiece, targetPiece)
    } else {
      // add move history entry
      history.create(fromTile, toTile, movingPiece)
    }
  }
}

// Handle Pawn Promotion
const promotion = ref<{ tile: Tile; targetTile: Tile; piece: Piece; targetPiece?: Piece } | null>(
  null,
)
function promotePiece(newPiece: Piece) {
  if (promotion.value === null) return // promotion not started yet
  board.value[promotion.value.targetTile] = newPiece

  // add promotion history entry
  history.create(
    promotion.value.tile,
    promotion.value.targetTile,
    promotion.value.piece,
    promotion.value.targetPiece,
    newPiece,
  )
  promotion.value = null
}
</script>

<template>
  <div class="chess-game">
    <section class="chess-info">
      <p>Active Player: {{ currentPlayer }}</p>
      <p>Turn Count: {{ currentTurn }}</p>
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

    <section class="chess-board-wrapper">
      <ChessBoard :board="board" @move="handleMove" />

      <ChessPromotionDialog v-if="promotion" :piece="promotion!.piece" @promote="promotePiece" />
    </section>

    <section class="chess-captures">
      <div class="black">
        <p>Black captured:</p>
        <ul>
          <li v-for="(piece, index) in whiteCapturedPieces" :key="index">
            <ChessPiece :piece="piece" />
          </li>
        </ul>
      </div>
      <div class="white">
        <p>White captured:</p>
        <ul>
          <li v-for="(piece, index) in blackCapturedPieces" :key="index">
            <ChessPiece :piece="piece" />
          </li>
        </ul>
      </div>
    </section>

    <section class="chess-history">
      <header>
        <h3>Game History</h3>
      </header>

      <ChessHistory :history="historyEntries" />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.chess-game {
  width: 100%;

  // responsive scaling of chess board and pieces on board
  .chess-board :deep(.chess-piece) {
    font-size: 2rem;
  }
  @media screen and (min-width: 640px) {
    width: 480px;
    .chess-board :deep(.chess-piece) {
      font-size: 2.5rem;
    }
  }
  @media screen and (min-width: 768px) {
    width: 560px;
    .chess-board :deep(.chess-piece) {
      font-size: 3rem;
    }
  }
  @media screen and (min-width: 1024px) {
    width: 640px;
    .chess-board :deep(.chess-piece) {
      font-size: 3.5rem;
    }
  }
}

.chess-board-wrapper {
  position: relative; // make promotion dialog overlay chess-game container
}

.chess-captures,
.chess-history {
  :deep(.chess-piece) {
    font-size: 1.5em;
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

.chess-history {
  .history-entry {
    display: flex;
    flex-direction: row;
    gap: 0.25rem;
  }
}
</style>

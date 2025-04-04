<script lang="ts" setup>
import { computed } from 'vue'
import {
  isBlackPiece,
  RookPiece,
  KnightPiece,
  BishopPiece,
  QueenPiece,
  BlackPiece,
  PromotedPiece,
  WhitePiece,
  getPieceDesciption,
  type Piece,
} from '@/chess'
import ChessPiece from './ChessPiece.vue'

const emit = defineEmits<{
  (event: 'promote', promotedPiece: Piece): void
}>()
const props = defineProps<{
  piece: Piece
}>()

const promotionPieces = computed(() => [
  {
    kind: 'rook',
    piece: RookPiece | (isBlackPiece(props.piece) ? BlackPiece : WhitePiece),
    title: `Promote pawn to ${getPieceDesciption(RookPiece)}`,
  },
  {
    kind: 'knight',
    piece: KnightPiece | (isBlackPiece(props.piece) ? BlackPiece : WhitePiece),
    title: `Promote pawn to ${getPieceDesciption(KnightPiece)}`,
  },
  {
    kind: 'bishop',
    piece: BishopPiece | (isBlackPiece(props.piece) ? BlackPiece : WhitePiece),
    title: `Promote pawn to ${getPieceDesciption(BishopPiece)}`,
  },
  {
    kind: 'queen',
    piece: QueenPiece | (isBlackPiece(props.piece) ? BlackPiece : WhitePiece),
    title: `Promote pawn to ${getPieceDesciption(QueenPiece)}`,
  },
])

function promote(newPiece: Piece) {
  newPiece |= isBlackPiece(props.piece) ? BlackPiece : WhitePiece
  emit('promote', newPiece | PromotedPiece)
}
</script>

<template>
  <div class="promotion-dialog-container">
    <dialog class="promotion-dialog">
      <header>
        <h2>Promote pawn to...</h2>
      </header>

      <ul class="promotion-piece-list">
        <li v-for="promotionPiece in promotionPieces" :key="promotionPiece.kind">
          <button
            :class="[promotionPiece.kind]"
            :title="promotionPiece.title"
            @click="promote(promotionPiece.piece)"
          >
            <ChessPiece :piece="promotionPiece.piece" />
          </button>
          <span class="name">{{ getPieceDesciption(promotionPiece.piece) }}</span>
        </li>
      </ul>

      <footer>
        <p>You have to select a piece. The pawn cannot move any further!</p>
      </footer>
    </dialog>
  </div>
</template>

<style lang="scss" scoped>
.promotion-dialog-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(1px);
}

.promotion-dialog {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
  z-index: 999;
  padding: 50px;
  margin: 60px;
  border-radius: 50px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  header,
  footer {
    text-align: center;
  }
}

.promotion-piece-list {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 25px;
  list-style-type: none;
  padding: 0;

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  button {
    font-size: 1.5em;
    padding: 10px;
  }

  .name {
    font-size: 1.2rem;
  }
}
</style>

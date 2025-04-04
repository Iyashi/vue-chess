<script lang="ts" setup>
import { computed } from 'vue'
import {
  isBlackFigure,
  RookFigure,
  KnightFigure,
  BishopFigure,
  QueenFigure,
  BlackFigure,
  PromotedFigure,
  WhiteFigure,
  getFigureDesciption,
  type Figure,
} from '@/chess'
import ChessPiece from './ChessPiece.vue'

const emit = defineEmits<{
  (event: 'promote', promotedFigure: Figure): void
}>()
const props = defineProps<{
  figure: Figure
}>()

const promotionFigures = computed(() => [
  {
    kind: 'rook',
    figure: RookFigure | (isBlackFigure(props.figure) ? BlackFigure : WhiteFigure),
    title: `Promote pawn to ${getFigureDesciption(RookFigure)}`,
  },
  {
    kind: 'knight',
    figure: KnightFigure | (isBlackFigure(props.figure) ? BlackFigure : WhiteFigure),
    title: `Promote pawn to ${getFigureDesciption(KnightFigure)}`,
  },
  {
    kind: 'bishop',
    figure: BishopFigure | (isBlackFigure(props.figure) ? BlackFigure : WhiteFigure),
    title: `Promote pawn to ${getFigureDesciption(BishopFigure)}`,
  },
  {
    kind: 'queen',
    figure: QueenFigure | (isBlackFigure(props.figure) ? BlackFigure : WhiteFigure),
    title: `Promote pawn to ${getFigureDesciption(QueenFigure)}`,
  },
])

function promote(newFigure: Figure) {
  newFigure |= isBlackFigure(props.figure) ? BlackFigure : WhiteFigure
  emit('promote', newFigure | PromotedFigure)
}
</script>

<template>
  <div class="promotion-dialog-container">
    <dialog class="promotion-dialog">
      <header>
        <h2>Promote pawn to...</h2>
      </header>

      <ul class="promotion-figure-list">
        <li v-for="promotionFigure in promotionFigures" :key="promotionFigure.kind">
          <button
            :class="[promotionFigure.kind]"
            :title="promotionFigure.title"
            @click="promote(promotionFigure.figure)"
          >
            <ChessPiece :figure="promotionFigure.figure" />
          </button>
          <span class="name">{{ getFigureDesciption(promotionFigure.figure) }}</span>
        </li>
      </ul>

      <footer>
        <p>You have to select a figure. The pawn cannot move any further!</p>
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

.promotion-figure-list {
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

<script lang="ts" setup>
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
} from '@/chess/figure'

const emit = defineEmits<{
  (event: 'promote', promotedFigure: Figure, oldFigure: Figure): void
}>()
const props = defineProps<{
  figure: Figure
}>()

function promote(newFigure: Figure) {
  newFigure |= isBlackFigure(props.figure) ? BlackFigure : WhiteFigure
  newFigure |= PromotedFigure
  emit('promote', newFigure, props.figure)
}
</script>

<template>
  <div class="promotion-dialog-container">
    <div class="promotion-dialog">
      <header>
        <h2>Promote pawn to...</h2>
      </header>

      <ul class="promotion-figure-list">
        <li>
          <button
            :class="['rook', isBlackFigure(props.figure) ? 'black' : 'white']"
            :title="`Promote ${getFigureDesciption(props.figure)} to ${getFigureDesciption(RookFigure)}`"
            @click="promote(RookFigure)"
          />
          <span>Rook</span>
        </li>
        <li>
          <button
            :class="['knight', isBlackFigure(props.figure) ? 'black' : 'white']"
            :title="`Promote ${getFigureDesciption(props.figure)} to ${getFigureDesciption(KnightFigure)}`"
            @click="promote(KnightFigure)"
          />
          <span>Knight</span>
        </li>
        <li>
          <button
            :class="['bishop', isBlackFigure(props.figure) ? 'black' : 'white']"
            :title="`Promote ${getFigureDesciption(props.figure)} to ${getFigureDesciption(BishopFigure)}`"
            @click="promote(BishopFigure)"
          />
          <span>Bishop</span>
        </li>
        <li>
          <button
            :class="['queen', isBlackFigure(props.figure) ? 'black' : 'white']"
            :title="`Promote ${getFigureDesciption(props.figure)} to ${getFigureDesciption(QueenFigure)}`"
            @click="promote(QueenFigure)"
          />
          <span>Queen</span>
        </li>
      </ul>

      <footer>
        <p>You have to select a figure. The pawn cannot move any further!</p>
      </footer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/chess-font.scss' as chess-font;

.promotion-dialog-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50px;
  padding: 100px;
  backdrop-filter: blur(1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.promotion-dialog {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
  width: 100%;
  z-index: 999;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50px;
  padding: 50px;
  backdrop-filter: blur(1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
    font-size: 1.3rem;
  }

  button {
    font-size: 3.5rem;
    padding: 10px;

    &.white {
      @include chess-font.chess-figure-white;
    }
    &.black {
      @include chess-font.chess-figure-black;
    }
  }
}
</style>

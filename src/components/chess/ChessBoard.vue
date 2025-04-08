<script lang="ts" setup>
import { computed, ref, type Ref } from 'vue'
import {
  getPieceDesciption,
  HorizontalKeys,
  isTile,
  VerticalKeys,
  canPieceMove,
  type Board,
  type Tile,
} from '@/chess'
import ChessTile from './ChessTile.vue'
import ChessPiece from './ChessPiece.vue'

const emit = defineEmits<{
  (event: 'move', from: Tile, to: Tile): void
}>()
const props = defineProps<{
  board: Board
}>()

const horizontalKeys = computed(() => HorizontalKeys)
const verticalKeys = computed(() => VerticalKeys)

// drag and drop a piece
const draggedTile: Ref<Tile | null> = ref(null)

function handleDrop(event: DragEvent, tile: Tile) {
  if (!isTile(draggedTile.value) || !isTile(tile) || draggedTile.value === tile) return
  emit('move', draggedTile.value, tile)
  draggedTile.value = null
}

// hovering a piece
const hoveredTile: Ref<Tile | null> = ref(null)
</script>

<template>
  <div class="chess-board">
    <section class="chess-board-header top">
      <div v-for="c in horizontalKeys" :key="c">{{ c }}</div>
    </section>
    <section class="chess-board-header bottom">
      <div v-for="c in horizontalKeys" :key="c">{{ c }}</div>
    </section>
    <section class="chess-board-header left">
      <div v-for="c in verticalKeys" :key="c">{{ c }}</div>
    </section>
    <section class="chess-board-header right">
      <div v-for="c in verticalKeys" :key="c">{{ c }}</div>
    </section>

    <section class="chess-board-tiles">
      <ChessTile
        v-for="(piece, tile) in props.board"
        :key="tile"
        :tile="tile"
        :can-move-here="hoveredTile ? canPieceMove(props.board, hoveredTile, tile) : null"
        @drop="handleDrop($event, tile)"
        @dragover.prevent
        @mouseenter="hoveredTile = tile"
        @mouseleave="hoveredTile = null"
      >
        <ChessPiece
          v-if="piece !== 0"
          :piece="piece"
          :title="`${getPieceDesciption(piece)} on ${tile}`"
          draggable="true"
          @dragstart="draggedTile = tile"
        />
      </ChessTile>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@use '@/assets/chess-font.scss' as chess-font;

.chess-board {
  --header-size: 50px;
  --grid-template: var(--header-size) 1fr var(--header-size);
  display: grid;
  grid-template: var(--grid-template) / var(--grid-template);
  grid-template-areas:
    '. header_top .'
    'header_left tiles header_right'
    '. header_bottom .';

  border: 1px solid #000000;
  border-radius: var(--header-size);

  aspect-ratio: 1 / 1;
}

.chess-board-tiles {
  grid-area: tiles;
  display: grid;
  grid-template: repeat(8, 1fr) / repeat(8, 1fr);
  border: 1px solid #000000;
}

.chess-board-header {
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 1.5rem;
  user-select: none;

  &.top {
    grid-area: header_top;
    flex-direction: row;
  }
  &.bottom {
    grid-area: header_bottom;
    flex-direction: row;
  }

  &.left {
    grid-area: header_left;
    flex-direction: column;
  }
  &.right {
    grid-area: header_right;
    flex-direction: column;
  }
}
</style>

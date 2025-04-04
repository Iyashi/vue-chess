<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import {
  getPieceDesciption,
  isEnemyPiece,
  getAxisIndicesForTile,
  HorizontalKeys,
  isTile,
  VerticalKeys,
  calculateMovementPaths,
  Moves,
  type Board,
  type Tile,
  type Piece,
  type MovementMap,
} from '@/chess'
import ChessPiece from './ChessPiece.vue'

const emit = defineEmits<{
  (event: 'move', from: Tile, to: Tile): void
}>()
const props = defineProps<{
  board: Board
}>()

const horizontalKeys = ref(HorizontalKeys)
const verticalKeys = ref(VerticalKeys)

function getTileColor(tile: Tile): 'black' | 'white' {
  const [x, y] = getAxisIndicesForTile(tile)
  return (x + y) % 2 === 1 ? 'black' : 'white'
}

// drag and drop a piece
const draggedTile: Ref<Tile | null> = ref(null)

function handleDragStart(event: DragEvent, tile: Tile) {
  if (!isTile(tile)) return
  draggedTile.value = tile
}

function handleDrop(event: DragEvent, tile: Tile) {
  if (draggedTile.value === null) return
  if (!isTile(tile)) return
  if (draggedTile.value === tile) return
  emit('move', draggedTile.value, tile)
  draggedTile.value = null
}

function handleDragEnter(event: DragEvent, tile: Tile) {
  if (draggedTile.value === null) return
  if (!isTile(tile)) return
}

function handleDragLeave(event: DragEvent, tile: Tile) {
  if (draggedTile.value === null) return
  if (!isTile(tile)) return
}

// hovering a piece
// TODO: maybe make composable of this?
const hoverState: Ref<{
  tile: Tile
  piece: Piece
  movementPaths: MovementMap
} | null> = ref(null)

function handleMouseEnter(event: MouseEvent, tile: Tile) {
  const piece = props.board[tile]
  const movementPaths = calculateMovementPaths(props.board, tile)
  hoverState.value = { tile, piece, movementPaths }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function handleMouseLeave(event: MouseEvent, tile: Tile) {
  hoverState.value = null
}

function getTileClassesForMovementPaths(tile: Tile): string[] {
  // fast-return if no tile is hovered anyways
  if (hoverState.value === null) return []

  const canMoveClass = 'can-move-to'
  const cannotMoveClass = 'cannot-move-to'
  const [x, y] = getAxisIndicesForTile(tile)
  const moves = hoverState.value.movementPaths[y][x]

  // no moves defined in movement map of hovered piece, ignore tile
  if (!moves) return []

  // empty tiles
  if (!props.board[tile]) {
    if (moves & ((moves & Moves.WalkOnEmpty) | Moves.JumpOnEmpty)) {
      return [canMoveClass]
    } else {
      return [cannotMoveClass]
    }
  }

  // tiles occupied by enemy pieces
  if (true === isEnemyPiece(hoverState.value.piece, props.board[tile])) {
    if (moves & (Moves.WalkOnEnemy | Moves.JumpOnEnemy)) {
      return [canMoveClass]
    } else {
      return [cannotMoveClass]
    }
  }

  // tiles occupied by friendly pieces
  if (false === isEnemyPiece(hoverState.value.piece, props.board[tile])) {
    if (moves & (Moves.WalkOnFriend | Moves.JumpOnFriend)) {
      return [canMoveClass]
    } else {
      return [cannotMoveClass]
    }
  }

  return []
}
</script>

<template>
  <div class="chess-board">
    <section class="chess-board-header top">
      <div v-for="c in horizontalKeys" :key="`top-${c}`">{{ c }}</div>
    </section>
    <section class="chess-board-header bottom">
      <div v-for="c in horizontalKeys" :key="`bottom-${c}`">{{ c }}</div>
    </section>
    <section class="chess-board-header left">
      <div v-for="c in verticalKeys" :key="`left-${c}`">{{ c }}</div>
    </section>
    <section class="chess-board-header right">
      <div v-for="c in verticalKeys" :key="`right-${c}`">{{ c }}</div>
    </section>

    <section class="chess-board-tiles">
      <div
        v-for="(piece, tile) in props.board"
        :key="tile"
        :class="['chess-board-tile', getTileColor(tile), ...getTileClassesForMovementPaths(tile)]"
        :id="tile"
        :title="tile"
        @drop="handleDrop($event, tile)"
        @dragenter="handleDragEnter($event, tile)"
        @dragleave="handleDragLeave($event, tile)"
        @dragover.prevent
        @mouseenter="handleMouseEnter($event, tile)"
        @mouseleave="handleMouseLeave($event, tile)"
      >
        <div class="chess-board-tile-label">{{ tile }}</div>
        <div class="chess-board-tile-movement-indicator" />
        <ChessPiece
          v-if="piece !== 0"
          :piece="piece"
          :title="`${getPieceDesciption(piece)} on ${tile}`"
          draggable="true"
          @dragstart="handleDragStart($event, tile)"
        />
      </div>
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
  border: 1px solid #000000;
}

.chess-board-header {
  &.top,
  &.bottom,
  &.left,
  &.right {
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 1.5rem;
    user-select: none;
  }

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

.chess-board-tiles {
  display: grid;
  grid-template: repeat(8, 1fr) / repeat(8, 1fr);
}

.chess-board-tile {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &.black {
    background-color: black;
    color: white;

    .chess-board-tile-label {
      color: color.scale(white, $alpha: -80%);
    }
  }
  &.white {
    background-color: white;
    color: black;

    .chess-board-tile-label {
      color: color.scale(black, $alpha: -80%);
    }
  }

  &.can-move-to {
    .chess-board-tile-movement-indicator {
      border-color: green;
    }
  }
  &.cannot-move-to {
    .chess-board-tile-movement-indicator {
      border-color: red;
    }
  }
}

.chess-board-tile-label,
.chess-board-tile-movement-indicator,
.chess-piece {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.chess-board-tile-label,
.chess-board-tile-movement-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
}

.chess-board-tile-label {
  font-size: 2rem;
  user-select: none;
  pointer-events: none;
  z-index: 1;
}

.chess-board-tile-movement-indicator {
  box-sizing: border-box;
  border-radius: 50%;
  border: 6px solid transparent;
  margin: 5px;
}

.chess-piece {
  font-size: 2rem;
  user-select: none;
  z-index: 2;
}
</style>

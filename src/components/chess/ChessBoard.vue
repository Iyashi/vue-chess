<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import { type Board } from '@/chess/board'
import {
  getAxisIndicesForTile,
  HorizontalKeys,
  isTile,
  VerticalKeys,
  type Tile,
} from '@/chess/tile'
import {
  getFigureDesciption,
  isBlackFigure,
  isEnemyFigure,
  isPawnFigure,
  isRookFigure,
  isKnightFigure,
  isBishopFigure,
  isQueenFigure,
  isKingFigure,
  type Figure,
} from '@/chess/figure'
import { calculateMovementPaths, type MovementMap } from '@/chess/movement_map'
import * as Moves from '@/chess/moves'

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

// TODO: maybe make composable of this?
const hoverState: Ref<{
  tile: Tile
  figure: Figure
  movementPaths: MovementMap
} | null> = ref(null)

function handleMouseEnter(event: MouseEvent, tile: Tile) {
  const figure = props.board[tile]
  const movementPaths = calculateMovementPaths(props.board, tile)
  hoverState.value = { tile, figure, movementPaths }
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

  // no moves defined in movement map of hovered figure, ignore tile
  if (!moves) return []

  // empty tiles
  if (!props.board[tile] && moves & Moves.JumpOnEmpty) {
    return [canMoveClass]
  } else if (!props.board[tile] && moves & Moves.WalkOnEmpty) {
    // TODO: check if path is blocked by other figures
    return [canMoveClass]
  }

  // tiles occupied by enemy figures
  if (true === isEnemyFigure(hoverState.value.figure, props.board[tile])) {
    if (moves & Moves.JumpOnEnemy) {
      return [canMoveClass]
    } else if (moves & Moves.WalkOnEnemy) {
      // TODO: check if path is blocked by other figures
      return [canMoveClass]
    } else {
      return [cannotMoveClass]
    }
  }

  // tiles occupied by friendly figures
  if (false === isEnemyFigure(hoverState.value.figure, props.board[tile])) {
    return [cannotMoveClass]
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
        v-for="(figure, tile) in props.board"
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
        <div
          v-if="figure !== 0"
          :class="[
            'chess-board-figure',
            isBlackFigure(figure) ? 'black' : 'white',
            getFigureType(figure),
          ]"
          :title="`${getFigureDesciption(figure)} on ${tile}`"
          draggable="true"
          @dragstart="handleDragStart($event, tile)"
        />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/chess-font.scss';

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
      color: transparentize(white, 0.8);
    }
  }
  &.white {
    background-color: white;
    color: black;

    .chess-board-tile-label {
      color: transparentize(black, 0.8);
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
.chess-board-figure {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
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

.chess-board-figure {
  font-size: 2rem;
  user-select: none;
  z-index: 2;

  &.white {
    @include chess-figure-white;
  }
  &.black {
    @include chess-figure-black;
  }
}
</style>

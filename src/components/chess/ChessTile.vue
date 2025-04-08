<script lang="ts" setup>
import { computed } from 'vue'
import { getAxisIndicesForTile, type Tile } from '@/chess'

const props = withDefaults(
  defineProps<{
    tile: Tile
    showLabel?: boolean
    showMovementIndicator?: boolean
    canMoveHere?: boolean | null // true = can move, false = could move but blocked, null = cannot move at all
  }>(),
  {
    showLabel: false,
    showMovementIndicator: true,
    canMoveHere: null,
  },
)

const color = computed(() => {
  const [x, y] = getAxisIndicesForTile(props.tile)
  return (x + y) % 2 === 1 ? 'black' : 'white'
})

defineExpose({
  tile: props.tile,
  color,
  canMoveHere: props.canMoveHere,
})
</script>

<template>
  <div class="chess-tile" :color="color" :id="tile" :tile="tile" :title="tile">
    <!-- tile label -->
    <div v-if="showLabel" class="tile-label">{{ tile }}</div>

    <!-- movement indicator -->
    <div
      v-if="showMovementIndicator && canMoveHere !== null"
      class="tile-movement-indicator"
      :can-move-here="canMoveHere"
    />

    <!-- slot for chess piece -->
    <slot name="default"></slot>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:color';

.chess-tile {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &[color='black'] {
    background-color: black;
    color: white;

    .chess-tile-label {
      color: color.scale(white, $alpha: -80%);
    }
  }
  &[color='white'] {
    background-color: white;
    color: black;

    .chess-tile-label {
      color: color.scale(black, $alpha: -80%);
    }
  }
}

.tile-label,
.tile-movement-indicator,
.chess-tile::slotted(*) {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.tile-label,
.tile-movement-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
}

.tile-label {
  font-size: 2rem;
  user-select: none;
  pointer-events: none;
  z-index: 1;
}

.tile-movement-indicator {
  box-sizing: border-box;
  border-radius: 50%;
  border: 6px solid transparent;
  margin: 5px;

  &[can-move-here='true'] {
    border-color: green;
  }
  &[can-move-here='false'] {
    border-color: red;
  }
}
</style>

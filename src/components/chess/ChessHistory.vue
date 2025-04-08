<script lang="ts" setup>
import { isPiece, type History } from '@/chess'
import ChessPiece from '@/components/chess/ChessPiece.vue'

const emit = defineEmits<{
  (event: 'show', entries: History): void
}>()
const props = defineProps<{
  history: History
}>()
</script>

<template>
  <ul class="chess-history-list">
    <li class="chess-history-entry" v-for="(entry, index) in props.history" :key="index">
      <ChessPiece class="actor-piece" :piece="entry.piece" />

      <span class="label">moved from</span>
      <strong class="source-tile">{{ entry.tile }}</strong>

      <span class="label">to</span>
      <strong class="target-tile">{{ entry.targetTile }}</strong>

      <template v-if="'capturedPiece' in entry && isPiece(entry.capturedPiece)">
        <span class="label">and captured</span>
        <ChessPiece class="captured-piece" :piece="entry.capturedPiece" />
      </template>

      <template v-if="'promotedPiece' in entry && isPiece(entry.promotedPiece)">
        <span class="label">and was promoted to</span>
        <ChessPiece class="promoted-piece" :piece="entry.promotedPiece" />
      </template>

      <button class="show-on-board" @click="emit('show', history.slice(0, index))">
        Show on board
      </button>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.chess-history-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  list-style-type: none;
  padding: 0;
}

.chess-history-entry {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
}
</style>

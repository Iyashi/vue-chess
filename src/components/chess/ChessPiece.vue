<script lang="ts" setup>
import { computed } from 'vue'
import {
  isBlackFigure,
  isWhiteFigure,
  isPromotedFigure,
  hasFigureMoved,
  getFigureKind,
  getFigureDesciption,
  type Figure,
} from '@/chess'

const props = defineProps<{
  figure: Figure
}>()

const isBlack = computed(() => isBlackFigure(props.figure))
const isWhite = computed(() => isWhiteFigure(props.figure))
const player = computed(() => (isBlack.value ? 'black' : 'white'))

const kind = computed(() => getFigureKind(props.figure))
const desciption = computed(() => getFigureDesciption(props.figure))

const isPromoted = computed(() => isPromotedFigure(props.figure))
const hasMoved = computed(() => hasFigureMoved(props.figure))

defineExpose({
  isBlack,
  isWhite,
  player,
  kind,
  desciption,
  isPromoted,
  hasMoved,
})
</script>

<template>
  <span
    class="chess-piece"
    :kind="kind"
    :player="player"
    :title="desciption"
    :promoted="isPromoted ? '' : null"
    :has-moved="hasMoved ? '' : null"
  />
</template>

<style lang="scss" scoped>
@font-face {
  font-family: 'ChessMedium';
  src: url('@/assets/chess.otf') format('opentype');
}

.chess-piece {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-family: 'ChessMedium';
  font-size: 2em;
  line-height: 1;
  user-select: none;

  &[player='white'] {
    &[kind='pawn']::before {
      content: 'P';
    }
    &[kind='rook']::before {
      content: 'R';
    }
    &[kind='knight']::before {
      content: 'N';
    }
    &[kind='bishop']::before {
      content: 'L';
    }
    &[kind='queen']::before {
      content: 'Q';
    }
    &[kind='king']::before {
      content: 'K';
    }
  }

  &[player='black'] {
    font-family: 'ChessMedium';

    &[kind='pawn']::before {
      content: 'p';
    }
    &[kind='rook']::before {
      content: 'r';
    }
    &[kind='knight']::before {
      content: 'n';
    }
    &[kind='bishop']::before {
      content: 'l';
    }
    &[kind='queen']::before {
      content: 'q';
    }
    &[kind='king']::before {
      content: 'k';
    }
  }
}
</style>

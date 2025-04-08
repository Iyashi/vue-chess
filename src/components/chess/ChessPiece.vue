<script lang="ts" setup>
import { computed } from 'vue'
import {
  BlackPlayer,
  WhitePlayer,
  isBlackPiece,
  isWhitePiece,
  isPromotedPiece,
  hasPieceMoved,
  getPieceKind,
  getPieceDesciption,
  type Piece,
  type Player,
} from '@/chess'

const props = defineProps<{
  piece: Piece
}>()

const isBlack = computed(() => isBlackPiece(props.piece))
const isWhite = computed(() => isWhitePiece(props.piece))
const player = computed<Player>(() => (isBlack.value ? BlackPlayer : WhitePlayer))

const kind = computed(() => getPieceKind(props.piece))
const desciption = computed(() => getPieceDesciption(props.piece))

const isPromoted = computed(() => isPromotedPiece(props.piece))
const hasMoved = computed(() => hasPieceMoved(props.piece))

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

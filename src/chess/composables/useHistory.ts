import type { Ref, ComputedRef } from 'vue'
import { ref, computed } from 'vue'
import type { Board, History, HistoryEntry, Piece, Player, Tile } from '..'
import {
  BlackPlayer,
  WhitePlayer,
  isHistoryEntry,
  isWhitePiece,
  isBlackPiece,
  isPiece,
  createHistoryEntry,
  createBoard,
} from '..'

export function useHistory(): UseHistory
export function useHistory(history: History): UseHistory

export function useHistory(history_?: History): UseHistory {
  const entries = ref<History>(Array.isArray(history_) ? [...history_] : [])

  const firstEntry = computed<HistoryEntry | null>(() => entries.value.at(0) || null)
  const lastEntry = computed<HistoryEntry | null>(() => entries.value.at(-1) || null)

  const entryCount = computed(() => entries.value.length)
  const currentTurn = computed(() => entryCount.value + 1)

  const currentPlayer = computed<Player>(() =>
    isBlackPiece(lastEntry.value?.piece) ? WhitePlayer : BlackPlayer,
  )

  const capturedPieces = computed<Piece[]>(() => {
    return entries.value.map((entry) => entry.capturedPiece).filter((piece) => isPiece(piece))
  })
  const blackCapturedPieces = computed<Piece[]>(() =>
    capturedPieces.value.filter((piece) => isBlackPiece(piece)),
  )
  const whiteCapturedPieces = computed<Piece[]>(() =>
    capturedPieces.value.filter((piece) => isWhitePiece(piece)),
  )

  const board = computed<Board>(() => {
    const board = createBoard()
    for (const entry of entries.value) {
      board[entry.tile] = 0
      board[entry.targetTile] = entry.piece
    }
    return board
  })

  function clear() {
    entries.value = []
  }

  function create(
    tile: Tile,
    targetTile: Tile,
    piece: Piece,
    capturedPiece?: Piece,
    promotedPiece?: Piece,
  ) {
    const entry = createHistoryEntry(tile, targetTile, piece, capturedPiece, promotedPiece)
    entries.value.push(entry)
    return entry
  }

  function push(entry: HistoryEntry) {
    if (!isHistoryEntry(entry)) throw new Error('Invalid history entry')
    entries.value.push(entry)
  }

  function pop(): HistoryEntry | null {
    const entry = entries.value.pop()
    return entry ? entry : null
  }

  return {
    entries,
    firstEntry,
    lastEntry,
    entryCount,
    currentTurn,
    currentPlayer,
    capturedPieces,
    blackCapturedPieces,
    whiteCapturedPieces,
    board,
    clear,
    create,
    push,
    pop,
  }
}

export interface UseHistory {
  entries: Ref<History>
  firstEntry: ComputedRef<HistoryEntry | null>
  lastEntry: ComputedRef<HistoryEntry | null>
  entryCount: ComputedRef<number>
  currentTurn: ComputedRef<number>
  capturedPieces: ComputedRef<Piece[]>
  blackCapturedPieces: ComputedRef<Piece[]>
  whiteCapturedPieces: ComputedRef<Piece[]>
  currentPlayer: ComputedRef<Player>
  board: ComputedRef<Board>
  clear: () => void
  create: typeof createHistoryEntry
  push: (entry: HistoryEntry) => void
  pop: () => HistoryEntry | null
}

export default useHistory

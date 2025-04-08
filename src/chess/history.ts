import type { HistoryEntry, Tile, Piece } from './types'
import { isTile } from './tile'
import { isPiece } from './piece'

export function isHistoryEntry(o: unknown): o is HistoryEntry {
  return (
    typeof o === 'object' &&
    o !== null &&
    'tile' in o &&
    isTile(o.tile) &&
    'targetTile' in o &&
    isTile(o.targetTile) &&
    'piece' in o &&
    isPiece(o.piece) &&
    (!('capturedPiece' in o) || isPiece(o.capturedPiece)) &&
    (!('promotedPiece' in o) || isPiece(o.promotedPiece))
  )
}

export function isHistory(o: unknown): o is History {
  return Array.isArray(o) && o.every(isHistoryEntry)
}

export function createHistoryEntry(
  tile: Tile,
  targetTile: Tile,
  piece: Piece,
  capturedPiece?: Piece,
  promotedPiece?: Piece,
): HistoryEntry {
  if (!isTile(tile)) throw new Error('Invalid tile')
  if (!isTile(targetTile)) throw new Error('Invalid target tile')
  if (!isPiece(piece)) throw new Error('Invalid piece')
  if (typeof capturedPiece !== 'undefined' && !isPiece(capturedPiece))
    throw new Error('Invalid piece')
  if (typeof promotedPiece !== 'undefined' && !isPiece(promotedPiece))
    throw new Error('Invalid piece')
  return { tile, targetTile, piece, capturedPiece, promotedPiece }
}

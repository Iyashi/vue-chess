import type { Board, Piece, Tile, MovementMap } from './types'
import * as Moves from './moves'
import {
  isBlackPiece,
  isWhitePiece,
  isEnemyPiece,
  isPawnPiece,
  isRookPiece,
  isKnightPiece,
  isBishopPiece,
  isQueenPiece,
  isKingPiece,
  hasPieceMoved,
} from './piece'
import { getAxisIndicesForTile, getTileForAxisIndices } from './tile'

export function isMovementMap(o: unknown): o is MovementMap {
  return (
    Array.isArray(o) &&
    o.length === 15 &&
    o.every((oo) => Array.isArray(oo) && oo.length === 15 && oo.every((v) => typeof v === 'number'))
  )
}

export const EmptyMovementMap = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

const p = Moves.WalkOnEmpty // moves for Pawn (no attack => forward)
const P = Moves.WalkOnEnemy // moves for Pawn (attack => diagonal)
const r = Moves.WalkOnEmpty | Moves.WalkOnEnemy // moves for Rook
const n = Moves.JumpOnEmpty | Moves.JumpOnEnemy // moves for Knight
const b = Moves.WalkOnEmpty | Moves.WalkOnEnemy // moves for Bishop
const q = Moves.WalkOnEmpty | Moves.WalkOnEnemy // moves for Queen
const k = Moves.WalkOnEmpty | Moves.WalkOnEnemy // moves for King

/**
 * `MovementMap` for a black pawn on a chessboard.
 */
export const BlackPawnMovementMap = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, P, p, P, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

/**
 * `MovementMap` for an unmoved black pawn on a chessboard.
 */
export const BlackPawnFirstMoveMovementMap = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, p, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, P, p, P, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

/**
 * `MovementMap` for a white pawn on a chessboard.
 */
export const WhitePawnMovementMap = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, P, p, P, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

/**
 * `MovementMap` for an unmoved white pawn on a chessboard.
 */
export const WhitePawnFirstMoveMovementMap = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, P, p, P, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, p, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

/**
 * `MovementMap` for a rook on a chessboard.
 */
export const RookMovementMap = [
  [0, 0, 0, 0, 0, 0, 0, r, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, r, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, r, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, r, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, r, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, r, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, r, 0, 0, 0, 0, 0, 0, 0],
  [r, r, r, r, r, r, r, 0, r, r, r, r, r, r, r],
  [0, 0, 0, 0, 0, 0, 0, r, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, r, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, r, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, r, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, r, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, r, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, r, 0, 0, 0, 0, 0, 0, 0],
]

/**
 * `MovementMap` for a knight on a chessboard.
 */
export const KnightMovementMap = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, n, 0, n, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, n, 0, 0, 0, n, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, n, 0, 0, 0, n, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, n, 0, n, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

/**
 * `MovementMap` for a bishop on a chessboard.
 */
export const BishopMovementMap = [
  [b, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, b],
  [0, b, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, b, 0],
  [0, 0, b, 0, 0, 0, 0, 0, 0, 0, 0, 0, b, 0, 0],
  [0, 0, 0, b, 0, 0, 0, 0, 0, 0, 0, b, 0, 0, 0],
  [0, 0, 0, 0, b, 0, 0, 0, 0, 0, b, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, b, 0, 0, 0, b, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, b, 0, b, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, b, 0, b, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, b, 0, 0, 0, b, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, b, 0, 0, 0, 0, 0, b, 0, 0, 0, 0],
  [0, 0, 0, b, 0, 0, 0, 0, 0, 0, 0, b, 0, 0, 0],
  [0, 0, b, 0, 0, 0, 0, 0, 0, 0, 0, 0, b, 0, 0],
  [0, b, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, b, 0],
  [b, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, b],
]

/**
 * `MovementMap` for a queen on a chessboard.
 */
export const QueenMovementMap = [
  [q, 0, 0, 0, 0, 0, 0, q, 0, 0, 0, 0, 0, 0, q],
  [0, q, 0, 0, 0, 0, 0, q, 0, 0, 0, 0, 0, q, 0],
  [0, 0, q, 0, 0, 0, 0, q, 0, 0, 0, 0, q, 0, 0],
  [0, 0, 0, q, 0, 0, 0, q, 0, 0, 0, q, 0, 0, 0],
  [0, 0, 0, 0, q, 0, 0, q, 0, 0, q, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, q, 0, q, 0, q, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, q, q, q, 0, 0, 0, 0, 0, 0],
  [q, q, q, q, q, q, q, 0, q, q, q, q, q, q, q],
  [0, 0, 0, 0, 0, 0, q, q, q, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, q, 0, q, 0, q, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, q, 0, 0, q, 0, 0, q, 0, 0, 0, 0],
  [0, 0, 0, q, 0, 0, 0, q, 0, 0, 0, q, 0, 0, 0],
  [0, 0, q, 0, 0, 0, 0, q, 0, 0, 0, 0, q, 0, 0],
  [0, q, 0, 0, 0, 0, 0, q, 0, 0, 0, 0, 0, q, 0],
  [q, 0, 0, 0, 0, 0, 0, q, 0, 0, 0, 0, 0, 0, q],
]

/**
 * `MovementMap` for a king on a chessboard.
 */
export const KingMovementMap = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, k, k, k, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, k, 0, k, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, k, k, k, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

/**
 * Returns the `MovementMap` for the given `Piece`.
 *
 * @param {Piece} piece The `Piece` for which to return the `MovementMap`.
 * @returns {MovementMap} The `MovementMap` for the given `Piece`.
 *
 * See also:
 *
 * @see {MovementMap} `EmptyMovementMap`
 * @see {MovementMap} `BlackPawnMovementMap`
 * @see {MovementMap} `BlackPawnFirstMoveMovementMap`
 * @see {MovementMap} `WhitePawnMovementMap`
 * @see {MovementMap} `WhitePawnFirstMoveMovementMap`
 * @see {MovementMap} `RookMovementMap`
 * @see {MovementMap} `KnightMovementMap`
 * @see {MovementMap} `BishopMovementMap`
 * @see {MovementMap} `QueenMovementMap`
 * @see {MovementMap} `KingMovementMap`
 */
export function getPieceMovementMap(piece: Piece): MovementMap {
  if (isPawnPiece(piece)) {
    if (isBlackPiece(piece))
      return hasPieceMoved(piece) ? BlackPawnMovementMap : BlackPawnFirstMoveMovementMap
    if (isWhitePiece(piece))
      return hasPieceMoved(piece) ? WhitePawnMovementMap : WhitePawnFirstMoveMovementMap
  } else if (isRookPiece(piece)) {
    return RookMovementMap
  } else if (isKnightPiece(piece)) {
    return KnightMovementMap
  } else if (isBishopPiece(piece)) {
    return BishopMovementMap
  } else if (isQueenPiece(piece)) {
    return QueenMovementMap
  } else if (isKingPiece(piece)) {
    return KingMovementMap
  }
  return EmptyMovementMap
}

/**
 * Returns a slice of given `MovementMap` based on given x and y positions on chessboard.
 *
 * The slice will be 8*8, same as chessboard size and can be directly applied to it. For example to indicate wether a piece can move to a tile or not.
 *
 * @param map 15*15 `MovementMap` of a `Piece`
 * @param x x position of the `Piece` on chessboard
 * @param y y position of the `Piece` on chessboard
 * @returns 8*8 `MovementMap` for chessboard
 */
export function getPositionalMovementMapSlice(map: MovementMap, x: number, y: number) {
  return map.slice(7 - y, 7 - y + 8).map(($) => $.slice(7 - x, 7 - x + 8))
}

/**
 * `canPieceMove` checks whether the piece on `fromTile` can move to `toTile` on given `board`.
 *
 * It returns one of the 3 states:
 *  - `true` when path exists and is not blocked
 *  - `false` when path exist but is blocked
 *  - `null` when path does not exist at all
 *
 * @param board The chess board.
 * @param fromTile The tile to move from.
 * @param toTile The tile to move to.
 * @returns `true` when path exists and is not blocked, `false` when path exist but is blocked and `null` when path does not exist for piece on fromTile.
 */
export function canPieceMove(board: Board, fromTile: Tile, toTile: Tile): boolean | null {
  if (fromTile === toTile) return null // cannot move to same tile

  const movingPiece = board[fromTile]
  const targetPiece = board[toTile]

  const [fromX, fromY] = getAxisIndicesForTile(fromTile)
  const [toX, toY] = getAxisIndicesForTile(toTile)

  // check if the target tile is within the movement map of the moving piece's
  const movementMap = getPieceMovementMap(movingPiece)
  const movementMapSlice = getPositionalMovementMapSlice(movementMap, fromX, fromY)
  if (!movementMapSlice[toY][toX]) return null

  // check if the path to the target tile is clear
  const movementPaths = calculateMovementPaths(board, fromTile, movementMapSlice)

  const canMoveToEmptyTile =
    (movementPaths[toY][toX] & (Moves.WalkOnEmpty | Moves.JumpOnEmpty)) !== 0 && !targetPiece
  const canMoveToEnemyTile =
    (movementPaths[toY][toX] & (Moves.WalkOnEnemy | Moves.JumpOnEnemy)) !== 0 &&
    isEnemyPiece(movingPiece, targetPiece) === true
  const canMoveToFriendlyTile =
    (movementPaths[toY][toX] & (Moves.WalkOnFriend | Moves.JumpOnFriend)) !== 0 &&
    isEnemyPiece(movingPiece, targetPiece) === false

  return canMoveToEmptyTile || canMoveToEnemyTile || canMoveToFriendlyTile
}

/**
 * Returns a slice of `MovementMap` for the piece on the given tile on the the given chessboard.
 *
 * The slice will be 8*8, same as chessboard size and can be directly applied to it. For example to indicate wether a piece can move to a tile or not.
 *
 * @param {Board} board The chessboard state
 * @param {Tile} tile The tile of the `Piece` on chessboard
 * @returns 8*8 `MovementMap` with all tiles marked where the piece on given tile can move to
 */
export function calculateMovementPaths(
  board: Board,
  tile: Tile,
  movementMapSlice?: MovementMap,
): MovementMap {
  const piece = board[tile]
  const [x, y] = getAxisIndicesForTile(tile)

  if (!piece) return getPositionalMovementMapSlice(EmptyMovementMap, x, y) // no piece on tile

  if (!movementMapSlice)
    movementMapSlice = getPositionalMovementMapSlice(getPieceMovementMap(piece), x, y)

  const result: MovementMap = new Array(8).fill([]).map(() => new Array(8).fill(Moves.NoMove))

  // Jump
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const t = getTileForAxisIndices(x, y)
      const m = movementMapSlice[y][x]
      if (m & Moves.JumpOnEmpty && !board[t]) {
        result[y][x] = Moves.JumpOnEmpty // can jump on empty tile
      } else if (m & Moves.JumpOnEnemy && true === isEnemyPiece(piece, board[t])) {
        result[y][x] = Moves.JumpOnEnemy // can jump on enemy tile
      } else if (m & Moves.JumpOnFriend && false === isEnemyPiece(piece, board[t])) {
        result[y][x] = Moves.JumpOnFriend // can jump on friendly tile
      }
    }
  }

  // setPossibleMoves sets the possible moves for the piece at position (y, x) based on its movement map and current board state.
  // It returns true if it is possible to continue walking further or false if the walk loop should stop here.
  const setPossibleMoves = (y: number, x: number): boolean => {
    const m = movementMapSlice[y][x]
    if (!(m & Moves.WalkOnAny)) return false // cannot walk further
    const t = getTileForAxisIndices(x, y)
    if (m & Moves.WalkOnEnemy && true === isEnemyPiece(piece, board[t])) {
      // enemy encounted, allow move to enemy tile, but stop going further
      result[y][x] |= Moves.WalkOnEnemy
    } else if (m & Moves.WalkOnFriend && false === isEnemyPiece(piece, board[t])) {
      // friend encounted, allow move to friendly tile, but stop going further
      result[y][x] |= Moves.WalkOnFriend
    } else if (m & Moves.WalkOnEmpty && !board[t]) {
      // empty tile encountered, allow move and allow going further
      result[y][x] |= Moves.WalkOnEmpty
      return true // continue loop
    } else if (board[t]) {
      // stop going further if a piece is encountered
    }
    return false // break out of loop
  }

  // from the piece's position, move towards each direction and stop when encountering an occupied tile
  // set the result map at the position of the occupied tile to `Moves.WalkOnEnemy` or `Moves.WalkOnEmpty` respectively

  // Walk up
  for (let i = y - 1; i >= 0; i--) {
    if (!setPossibleMoves(i, x)) break
  }

  // Walk down
  for (let i = y + 1; i <= 7; i++) {
    if (!setPossibleMoves(i, x)) break
  }

  // Walk left
  for (let i = x - 1; i >= 0; i--) {
    if (!setPossibleMoves(y, i)) break
  }

  // Walk right
  for (let i = x + 1; i <= 7; i++) {
    if (!setPossibleMoves(y, i)) break
  }

  // Walk diagonally up-left
  for (let ix = x - 1, iy = y - 1; ix >= 0 && iy >= 0; ix--, iy--) {
    if (!setPossibleMoves(iy, ix)) break
  }

  // Walk diagonally up-right
  for (let ix = x + 1, iy = y - 1; ix <= 7 && iy >= 0; ix++, iy--) {
    if (!setPossibleMoves(iy, ix)) break
  }

  // Walk diagonally down-left
  for (let ix = x - 1, iy = y + 1; ix >= 0 && iy <= 7; ix--, iy++) {
    if (!setPossibleMoves(iy, ix)) break
  }

  // Walk diagonally down-right
  for (let ix = x + 1, iy = y + 1; ix <= 7 && iy <= 7; ix++, iy++) {
    if (!setPossibleMoves(iy, ix)) break
  }

  // TODO: Checkmate detection. Disallow king to move where it can be captured or blocked by an opponent's piece.

  // TODO: Stalemate detection. Stalemate is a situation where the player has no legal moves and cannot capture or block an opponent's piece.

  // TODO: Castling. Castling is a special case where the king moves two squares and the rook moves one square.
  // It is only possible when the king has not moved and neither of the rooks have moved. The king cannot be in check after castling.

  // console.log(
  //   'movementMapSlice\n',
  //   movementMapSlice.map((row) => row.map((cell) => (cell ? 'x' : '.')).join('')).join('\n '),
  // )
  // console.log(
  //   'result\n',
  //   result.map((row) => row.map((cell) => (cell ? 'x' : '.')).join('')).join('\n '),
  // )
  return result
}

// export function stringifyMovementMap(movementMap: MovementMap): string {
//   function mapper(move: number): string {
//     if (move === Moves.None) {
//       return '#'
//     } else if (move & Moves.WalkOnEmpty || move & Moves.JumpOnEmpty) {
//       return '+'
//     } else if (move & Moves.WalkOnEnemy || move & Moves.JumpOnEnemy) {
//       return 'e'
//     } else if (move & Moves.WalkOnFriend || move & Moves.JumpOnFriend) {
//       return 'f'
//     }
//     return '?'
//   }
//   return movementMap.map((row) => row.map(mapper).join('')).join('\n')
// }

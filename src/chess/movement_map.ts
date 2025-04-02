import * as Moves from './moves'
import {
  isBlackFigure,
  isWhiteFigure,
  isEnemyFigure,
  isPawnFigure,
  isRookFigure,
  isKnightFigure,
  isBishopFigure,
  isQueenFigure,
  isKingFigure,
  hasFigureMoved,
  type Figure,
} from './figure'
import { getAxisIndicesForTile, getTileForAxisIndices, type Tile } from './tile'
import type { Board } from './board'

/**
 * MovementMap is a 2D array of all possible moves for a figure on a chessboard.
 *
 * The Map is 15x15 and the figure lies at its center position (x=7, y=7).
 * This allows moves across a 8x8 board no matter where the figure is currently positioned on the board.
 */
export type MovementMap = number[][]

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
 * Returns the `MovementMap` for the given `Figure`.
 *
 * @param {Figure} figure The `Figure` for which to return the `MovementMap`.
 * @returns {MovementMap} The `MovementMap` for the given `Figure`.
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
export function getFigureMovementMap(figure: Figure): MovementMap {
  if (isPawnFigure(figure)) {
    if (isBlackFigure(figure))
      return hasFigureMoved(figure) ? BlackPawnMovementMap : BlackPawnFirstMoveMovementMap
    if (isWhiteFigure(figure))
      return hasFigureMoved(figure) ? WhitePawnMovementMap : WhitePawnFirstMoveMovementMap
  } else if (isRookFigure(figure)) {
    return RookMovementMap
  } else if (isKnightFigure(figure)) {
    return KnightMovementMap
  } else if (isBishopFigure(figure)) {
    return BishopMovementMap
  } else if (isQueenFigure(figure)) {
    return QueenMovementMap
  } else if (isKingFigure(figure)) {
    return KingMovementMap
  }
  return EmptyMovementMap
}

/**
 * Returns a slice of given `MovementMap` based on given x and y positions on chessboard.
 *
 * The slice will be 8*8, same as chessboard size and can be directly applied to it. For example to indicate wether a figure can move to a tile or not.
 *
 * @param map 15*15 `MovementMap` of a `Figure`
 * @param x x position of the `Figure` on chessboard
 * @param y y position of the `Figure` on chessboard
 * @returns 8*8 `MovementMap` for chessboard
 */
export function getPositionalMovementMapSlice(map: MovementMap, x: number, y: number) {
  return map.slice(7 - y, 7 - y + 8).map(($) => $.slice(7 - x, 7 - x + 8))
}

/**
 * Returns a slice of `MovementMap` for the figure on the given tile on the the given chessboard.
 *
 * The slice will be 8*8, same as chessboard size and can be directly applied to it. For example to indicate wether a figure can move to a tile or not.
 *
 * @param {Board} board The chessboard state
 * @param {Tile} tile The tile of the `Figure` on chessboard
 * @returns 8*8 `MovementMap` with all tiles marked where the figure on given tile can move to
 */
export function calculateMovementPaths(board: Board, tile: Tile): MovementMap {
  const figure = board[tile]
  const [x, y] = getAxisIndicesForTile(tile)

  if (!figure) return getPositionalMovementMapSlice(EmptyMovementMap, x, y) // no figure on tile

  const movementMap = getFigureMovementMap(figure)
  const movementMapSlice = getPositionalMovementMapSlice(movementMap, x, y)

  const result: MovementMap = new Array(8).fill([]).map(() => new Array(8).fill(Moves.None))

  // Jump
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const t = getTileForAxisIndices(x, y)
      const m = movementMapSlice[y][x]
      if (m & Moves.JumpOnEmpty && !board[t]) {
        result[y][x] = Moves.JumpOnEmpty // can jump on empty tile
      } else if (m & Moves.JumpOnEnemy && true === isEnemyFigure(figure, board[t])) {
        result[y][x] = Moves.JumpOnEnemy // can jump on enemy tile
      } else if (m & Moves.JumpOnFriend && false === isEnemyFigure(figure, board[t])) {
        result[y][x] = Moves.JumpOnFriend // can jump on friendly tile
      }
    }
  }

  // from the figure's position, move towards each direction and stop when encountering an occupied tile
  // set the result map at the position of the occupied tile to `Moves.WalkOnEnemy` or `Moves.WalkOnEmpty` respectively

  // Walk up
  for (let i = y - 1; i >= 0; i--) {
    const m = movementMapSlice[i][x]
    if (!(m & Moves.WalkOnAny)) break // cannot walk to this tile whatsoever
    const t = getTileForAxisIndices(x, i)
    if (m & Moves.WalkOnEnemy && true === isEnemyFigure(figure, board[t])) {
      // enemy encounted, allow move to enemy tile, but stop going further
      result[i][x] |= Moves.WalkOnEnemy
      break
    } else if (m & Moves.WalkOnFriend && false === isEnemyFigure(figure, board[t])) {
      // friend encounted, disallow move to friendly tile and stop going further
      break
    } else if (m & Moves.WalkOnEmpty && !board[t]) {
      // empty tile
      result[i][x] |= Moves.WalkOnEmpty
    } else if (board[t]) {
      // stop going further if a figure is encountered
      break
    }
  }

  // Walk down
  for (let i = y + 1; i <= 7; i++) {
    const m = movementMapSlice[i][x]
    if (!(m & Moves.WalkOnAny)) break // cannot walk to this tile whatsoever
    const t = getTileForAxisIndices(x, i)
    if (m & Moves.WalkOnEnemy && true === isEnemyFigure(figure, board[t])) {
      // enemy encounted, allow move to enemy tile, but stop going further
      result[i][x] |= Moves.WalkOnEnemy
      break
    } else if (m & Moves.WalkOnFriend && false === isEnemyFigure(figure, board[t])) {
      // friend encounted, disallow move to friendly tile and stop going further
      break
    } else if (m & Moves.WalkOnEmpty && !board[t]) {
      // empty tile
      result[i][x] |= Moves.WalkOnEmpty
    } else if (board[t]) {
      // stop going further if a figure is encountered
      break
    }
  }

  // Walk left
  for (let i = x - 1; i >= 0; i--) {
    const m = movementMapSlice[y][i]
    if (!(m & Moves.WalkOnAny)) break // cannot walk to this tile whatsoever
    const t = getTileForAxisIndices(i, y)
    if (m & Moves.WalkOnEnemy && true === isEnemyFigure(figure, board[t])) {
      // enemy encounted, allow move to enemy tile, but stop going further
      result[y][i] |= Moves.WalkOnEnemy
      break
    } else if (m & Moves.WalkOnFriend && false === isEnemyFigure(figure, board[t])) {
      // friend encounted, disallow move to friendly tile and stop going further
      break
    } else if (m & Moves.WalkOnEmpty && !board[t]) {
      // empty tile
      result[y][i] |= Moves.WalkOnEmpty
    } else if (board[t]) {
      // stop going further if a figure is encountered
      break
    }
  }

  // Walk right
  for (let i = x + 1; i <= 7; i++) {
    const m = movementMapSlice[y][i]
    if (!(m & Moves.WalkOnAny)) break // cannot walk to this tile whatsoever
    const t = getTileForAxisIndices(i, y)
    if (m & Moves.WalkOnEnemy && true === isEnemyFigure(figure, board[t])) {
      // enemy encounted, allow move to enemy tile, but stop going further
      result[y][i] |= Moves.WalkOnEnemy
      break
    } else if (m & Moves.WalkOnFriend && false === isEnemyFigure(figure, board[t])) {
      // friend encounted, disallow move to friendly tile and stop going further
      break
    } else if (m & Moves.WalkOnEmpty && !board[t]) {
      // empty tile
      result[y][i] |= Moves.WalkOnEmpty
    } else if (board[t]) {
      // stop going further if a figure is encountered
      break
    }
  }

  // Walk diagonally up-left
  for (let ix = x - 1, iy = y - 1; ix >= 0 && iy >= 0; ix--, iy--) {
    const m = movementMapSlice[iy][ix]
    if (!(m & Moves.WalkOnAny)) break // cannot walk to this tile whatsoever
    const t = getTileForAxisIndices(ix, iy)
    if (m & Moves.WalkOnEnemy && true === isEnemyFigure(figure, board[t])) {
      // enemy encounted, allow move to enemy tile, but stop going further
      result[iy][ix] |= Moves.WalkOnEnemy
      break
    } else if (m & Moves.WalkOnFriend && false === isEnemyFigure(figure, board[t])) {
      // friend encounted, disallow move to friendly tile and stop going further
      break
    } else if (m & Moves.WalkOnEmpty && !board[t]) {
      // empty tile
      result[iy][ix] |= Moves.WalkOnEmpty
    } else if (board[t]) {
      // stop going further if a figure is encountered
      break
    }
  }

  // Walk diagonally up-right
  for (let ix = x + 1, iy = y - 1; ix <= 7 && iy >= 0; ix++, iy--) {
    const m = movementMapSlice[iy][ix]
    if (!(m & Moves.WalkOnAny)) break // cannot walk to this tile whatsoever
    const t = getTileForAxisIndices(ix, iy)
    if (m & Moves.WalkOnEnemy && true === isEnemyFigure(figure, board[t])) {
      // enemy encounted, allow move to enemy tile, but stop going further
      result[iy][ix] |= Moves.WalkOnEnemy
      break
    } else if (m & Moves.WalkOnFriend && false === isEnemyFigure(figure, board[t])) {
      // friend encounted, disallow move to friendly tile and stop going further
      break
    } else if (m & Moves.WalkOnEmpty && !board[t]) {
      // empty tile
      result[iy][ix] |= Moves.WalkOnEmpty
    } else if (board[t]) {
      // stop going further if a figure is encountered
      break
    }
  }

  // Walk diagonally down-left
  for (let ix = x - 1, iy = y + 1; ix >= 0 && iy <= 7; ix--, iy++) {
    const m = movementMapSlice[iy][ix]
    if (!(m & Moves.WalkOnAny)) break // cannot walk to this tile whatsoever
    const t = getTileForAxisIndices(ix, iy)
    if (m & Moves.WalkOnEnemy && true === isEnemyFigure(figure, board[t])) {
      // enemy encounted, allow move to enemy tile, but stop going further
      result[iy][ix] |= Moves.WalkOnEnemy
      break
    } else if (m & Moves.WalkOnFriend && false === isEnemyFigure(figure, board[t])) {
      // friend encounted, disallow move to friendly tile and stop going further
      break
    } else if (m & Moves.WalkOnEmpty && !board[t]) {
      // empty tile
      result[iy][ix] |= Moves.WalkOnEmpty
    } else if (board[t]) {
      // stop going further if a figure is encountered
      break
    }
  }

  // Walk diagonally down-right
  for (let ix = x + 1, iy = y + 1; ix <= 7 && iy <= 7; ix++, iy++) {
    const m = movementMapSlice[iy][ix]
    if (!(m & Moves.WalkOnAny)) break // cannot walk to this tile whatsoever
    const t = getTileForAxisIndices(ix, iy)
    if (m & Moves.WalkOnEnemy && true === isEnemyFigure(figure, board[t])) {
      // enemy encounted, allow move to enemy tile, but stop going further
      result[iy][ix] |= Moves.WalkOnEnemy
      break
    } else if (m & Moves.WalkOnFriend && false === isEnemyFigure(figure, board[t])) {
      // friend encounted, disallow move to friendly tile and stop going further
      break
    } else if (m & Moves.WalkOnEmpty && !board[t]) {
      // empty tile
      result[iy][ix] |= Moves.WalkOnEmpty
    } else if (board[t]) {
      // stop going further if a figure is encountered
      break
    }
  }

  // TODO: Checkmate detection. Disallow king to move where it can be captured or blocked by an opponent's figure.

  // TODO: Stalemate detection. Stalemate is a situation where the player has no legal moves and cannot capture or block an opponent's figure.

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

import * as Moves from './moves'
import {
  hasFigureMoved,
  isBishopFigure,
  isBlackFigure,
  isWhiteFigure,
  isKingFigure,
  isKnightFigure,
  isPawnFigure,
  isQueenFigure,
  isRookFigure,
  type Figure,
} from './figure'

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

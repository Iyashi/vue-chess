import * as Moves from './moves'
import * as Directions from './directions'
import {
  hasMovedOnce,
  isBishopFigure,
  isBlackFigure,
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
 *
 * Below are 4 examples of how a MovementMaps might look.
 * - One for a Queen figure which can move 7 units in every direction (horizontally, vertically, diagonally).
 * - One for a King figure which can move one unit in every direction (horizontally, vertically, diagonally).
 * - One for a Rook figure which can move 7 units both horizontally and vertically.
 * - One for a Bishop figure which can move 7 units diagonally.
 *
 * @example
 * //      Queen          King         Rook               Bishop
 * // \      |      /                   |            \             /
 * //  \     |     /                    |             \           /
 * //   \    |    /                     |              \         /
 * //    \   |   /                      |               \       /
 * //     \  |  /                       |                \     /
 * //      \ | /                        |                 \   /
 * //       \|/           \|/           |                  \ /
 * // ------- -------     - -    ------- -------
 * //       /|\           /|\           |                  / \
 * //      / | \                        |                 /   \
 * //     /  |  \                       |                /     \
 * //    /   |   \                      |               /       \
 * //   /    |    \                     |              /         \
 * //  /     |     \                    |             /           \
 * // /      |      \                   |            /             \
 */
export type MovementMap = number[][]

export function isMovementMap(o: unknown): o is MovementMap {
  return (
    Array.isArray(o) &&
    o.length === 15 &&
    o.every((oo) => Array.isArray(oo) && oo.length === 15 && oo.every((v) => typeof v === 'number'))
  )
}

/**
 * Creates a new MovementMap with all cells set to `Moves.None`.
 *
 * @returns Empty 15*15 MovementMap
 */
export function createEmptyMovementMap(): MovementMap {
  const map: MovementMap = []
  for (let x = 0; x < 15; x++) {
    map.push([])
    for (let y = 0; y < 15; y++) {
      map[x].push(Moves.None)
    }
  }
  return map
}

/**
 * Creates a new MovementMap with given directions set to given moves for count of units from map center.
 *
 * @param {number} directions one or more Directions
 * @param {number} value one or more Moves
 * @param {number} count count of units from map center
 */
export function createMovementMap(
  directions: number,
  moves: number,
  count: number = 8,
): MovementMap {
  const map = createEmptyMovementMap()
  if (count <= 0) return map // fast return for empty movement maps

  addMovementToMap(map, directions, moves, count)
  return map
}

export function addMovementToMap(
  map: MovementMap,
  directions: number,
  moves: number,
  count: number = 8,
) {
  if (count > 7) count = 7 // map is only 15x15, count is based from center (7,7), so max 7 units for each direction on a 8x8 board

  const center = (map.length - 1) / 2
  if (directions & Directions.Up) {
    for (let i = 1; i <= count; i++) map[center - i][center] = moves
  }
  if (directions & Directions.Down) {
    for (let i = 1; i <= count; i++) map[center + i][center] = moves
  }
  if (directions & Directions.Left) {
    for (let i = 1; i <= count; i++) map[center][center - i] = moves
  }
  if (directions & Directions.Right) {
    for (let i = 1; i <= count; i++) map[center][center + i] = moves
  }
  if (directions & Directions.DiagonalUpLeft) {
    for (let i = 1; i <= count; i++) map[center - i][center - i] = moves
  }
  if (directions & Directions.DiagonalUpRight) {
    for (let i = 1; i <= count; i++) map[center - i][center + i] = moves
  }
  if (directions & Directions.DiagonalDownLeft) {
    for (let i = 1; i <= count; i++) map[center + i][center - i] = moves
  }
  if (directions & Directions.DiagonalDownRight) {
    for (let i = 1; i <= count; i++) map[center + i][center + i] = moves
  }
}

/**
 * Shrinks given MovementMap to 8*8 for board based on given x and y positions on board.
 *
 * This allows to directly apply the MovementMap to the board. For example to indicate wether a figure can move to a tile or not.
 *
 * @param map 15*15 MovementMap of a figure
 * @param x - x position of the figure on board
 * @param y - x position of the figure on board
 * @returns 8*8 MovementMap for board
 */
export function shrinkMovementMapForBoard(map: MovementMap, x: number, y: number) {
  return map.slice(7 - y, 7 - y + 8).map(($) => $.slice(7 - x, 7 - x + 8))
}

export const EmptyMovementMap = createMovementMap(Directions.None, Moves.None, 0)

export const BlackPawnMovementMap = createMovementMap(Directions.Up, Moves.WalkOnEmpty, 1)
BlackPawnMovementMap[7 - 1][7 + 1] = Moves.WalkOnEnemy
BlackPawnMovementMap[7 - 1][7 - 1] = Moves.WalkOnEnemy

export const BlackPawnFirstMoveMovementMap = JSON.parse(JSON.stringify(BlackPawnMovementMap))
// pawns can move two units forward on first move
addMovementToMap(BlackPawnFirstMoveMovementMap, Directions.Up, Moves.WalkOnEmpty, 2)

export const WhitePawnMovementMap = createMovementMap(Directions.Down, Moves.WalkOnEmpty, 1)
WhitePawnMovementMap[7 + 1][7 + 1] = Moves.WalkOnEnemy
WhitePawnMovementMap[7 + 1][7 - 1] = Moves.WalkOnEnemy

export const WhitePawnFirstMoveMovementMap = JSON.parse(JSON.stringify(WhitePawnMovementMap))
// pawns can move two units forward on first move
addMovementToMap(WhitePawnFirstMoveMovementMap, Directions.Down, Moves.WalkOnEmpty, 2)

export const RookMovementMap = createMovementMap(
  Directions.HorizontalVertical,
  Moves.WalkOnEmpty | Moves.WalkOnEnemy,
  8,
)

export const KnightMovementMap = createMovementMap(
  Directions.HorizontalVertical,
  Moves.WalkOnEmpty | Moves.WalkOnEnemy,
  0,
)
KnightMovementMap[7 - 1][7 - 2] = Moves.JumpOnEmpty | Moves.JumpOnEnemy
KnightMovementMap[7 - 1][7 + 2] = Moves.JumpOnEmpty | Moves.JumpOnEnemy
KnightMovementMap[7 + 1][7 - 2] = Moves.JumpOnEmpty | Moves.JumpOnEnemy
KnightMovementMap[7 + 1][7 + 2] = Moves.JumpOnEmpty | Moves.JumpOnEnemy
KnightMovementMap[7 - 2][7 - 1] = Moves.JumpOnEmpty | Moves.JumpOnEnemy
KnightMovementMap[7 + 2][7 - 1] = Moves.JumpOnEmpty | Moves.JumpOnEnemy
KnightMovementMap[7 - 2][7 + 1] = Moves.JumpOnEmpty | Moves.JumpOnEnemy
KnightMovementMap[7 + 2][7 + 1] = Moves.JumpOnEmpty | Moves.JumpOnEnemy

export const BishopMovementMap = createMovementMap(
  Directions.Diagonal,
  Moves.WalkOnEmpty | Moves.WalkOnEnemy,
  8,
)

export const QueenMovementMap = createMovementMap(
  Directions.Vertical | Directions.Horizontal | Directions.Diagonal,
  Moves.WalkOnEmpty | Moves.WalkOnEnemy,
  8,
)

export const KingMovementMap = createMovementMap(
  Directions.Vertical | Directions.Horizontal | Directions.Diagonal,
  Moves.WalkOnEmpty | Moves.WalkOnEnemy,
  1,
)

export function getMovementMapForFigure(figure: Figure): MovementMap {
  if (isPawnFigure(figure)) {
    if (hasMovedOnce(figure)) {
      return isBlackFigure(figure) ? BlackPawnMovementMap : WhitePawnMovementMap
    }
    return isBlackFigure(figure) ? BlackPawnFirstMoveMovementMap : WhitePawnFirstMoveMovementMap
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

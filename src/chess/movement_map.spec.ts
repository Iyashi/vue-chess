import { describe, it, expect } from 'vitest'
import {
  isMovementMap,
  createEmptyMovementMap,
  createMovementMap,
  shrinkMovementMapForBoard,
  getMovementMapForFigure,
  KingMovementMap,
  QueenMovementMap,
  BlackPawnFirstMoveMovementMap,
  BlackPawnMovementMap,
  WhitePawnMovementMap,
  WhitePawnFirstMoveMovementMap,
  RookMovementMap,
  KnightMovementMap,
  BishopMovementMap,
  EmptyMovementMap,
} from './movement_map'
import * as Moves from './moves'
import * as Directions from './directions'
import {
  BlackFigure,
  WhiteFigure,
  MovedOnce,
  PawnFigure,
  RookFigure,
  KnightFigure,
  BishopFigure,
  QueenFigure,
  KingFigure,
} from './figure'

const testEmptyMovementMap = [
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

const k = Moves.WalkOnEmpty | Moves.WalkOnEnemy
const testKingMovementMap = [
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

describe('isMovementMap', () => {
  it('returns true for valid MovementMaps', () => {
    expect(isMovementMap(testEmptyMovementMap)).toBe(true)
    expect(isMovementMap(createEmptyMovementMap())).toBe(true)
    expect(isMovementMap(testKingMovementMap)).toBe(true)
    expect(isMovementMap(BlackPawnFirstMoveMovementMap)).toBe(true)
    expect(isMovementMap(BlackPawnMovementMap)).toBe(true)
    expect(isMovementMap(WhitePawnFirstMoveMovementMap)).toBe(true)
    expect(isMovementMap(WhitePawnMovementMap)).toBe(true)
    expect(isMovementMap(RookMovementMap)).toBe(true)
    expect(isMovementMap(KnightMovementMap)).toBe(true)
    expect(isMovementMap(BishopMovementMap)).toBe(true)
    expect(isMovementMap(QueenMovementMap)).toBe(true)
    expect(isMovementMap(KingMovementMap)).toBe(true)
  })
  it('returns false for invalid MovementMaps', () => {
    expect(isMovementMap(undefined)).toBe(false)
    expect(isMovementMap(null)).toBe(false)
    expect(isMovementMap(false)).toBe(false)
    expect(isMovementMap('invalid')).toBe(false)
    expect(isMovementMap({})).toBe(false)
    expect(isMovementMap([])).toBe(false)
    expect(isMovementMap([[]])).toBe(false)
    expect(isMovementMap([[], [], [], [], [], [], [], [], [], [], [], [], [], [], []])).toBe(false)
  })
})

describe('createEmptyMovementMap', () => {
  it('returns a MovementMap filled with zeros', () => {
    expect(testEmptyMovementMap).toEqual(testEmptyMovementMap)
    expect(createEmptyMovementMap()).toEqual(testEmptyMovementMap)
    expect(createEmptyMovementMap()).toEqual(createEmptyMovementMap())
  })
})

describe('createMovementMap', () => {
  it('returns a MovementMap with the correct directions and moves', () => {
    expect(createMovementMap(Directions.None, Moves.None)).toEqual(testEmptyMovementMap)

    let map = JSON.parse(JSON.stringify(testEmptyMovementMap))
    Object.values(Moves).forEach((move) => {
      // Direction Up
      map = JSON.parse(JSON.stringify(testEmptyMovementMap))
      map[0][7] = move
      map[1][7] = move
      map[2][7] = move
      map[3][7] = move
      map[4][7] = move
      map[5][7] = move
      map[6][7] = move
      expect(createMovementMap(Directions.Up, move), 'Directions.Up').toEqual(map)
      // Direction Down
      map = JSON.parse(JSON.stringify(testEmptyMovementMap))
      map[8][7] = move
      map[9][7] = move
      map[10][7] = move
      map[11][7] = move
      map[12][7] = move
      map[13][7] = move
      map[14][7] = move
      expect(createMovementMap(Directions.Down, move), 'Directions.Down').toEqual(map)
      // Direction Left
      map = JSON.parse(JSON.stringify(testEmptyMovementMap))
      map[7][0] = move
      map[7][1] = move
      map[7][2] = move
      map[7][3] = move
      map[7][4] = move
      map[7][5] = move
      map[7][6] = move
      expect(createMovementMap(Directions.Left, move), 'Directions.Left').toEqual(map)
      // Direction Right
      map = JSON.parse(JSON.stringify(testEmptyMovementMap))
      map[7][8] = move
      map[7][9] = move
      map[7][10] = move
      map[7][11] = move
      map[7][12] = move
      map[7][13] = move
      map[7][14] = move
      expect(createMovementMap(Directions.Right, move), 'Directions.Right').toEqual(map)
      // Direction DiagonalUpLeft
      map = JSON.parse(JSON.stringify(testEmptyMovementMap))
      map[0][0] = move
      map[1][1] = move
      map[2][2] = move
      map[3][3] = move
      map[4][4] = move
      map[5][5] = move
      map[6][6] = move
      expect(
        createMovementMap(Directions.DiagonalUpLeft, move),
        'Directions.DiagonalUpLeft',
      ).toEqual(map)
      // Direction DiagonalUpRight
      map = JSON.parse(JSON.stringify(testEmptyMovementMap))
      map[0][14] = move
      map[1][13] = move
      map[2][12] = move
      map[3][11] = move
      map[4][10] = move
      map[5][9] = move
      map[6][8] = move
      expect(
        createMovementMap(Directions.DiagonalUpRight, move),
        'Directions.DiagonalUpRight',
      ).toEqual(map)
      // Direction DiagonalDownLeft
      map = JSON.parse(JSON.stringify(testEmptyMovementMap))
      map[8][6] = move
      map[9][5] = move
      map[10][4] = move
      map[11][3] = move
      map[12][2] = move
      map[13][1] = move
      map[14][0] = move
      expect(
        createMovementMap(Directions.DiagonalDownLeft, move),
        'Directions.DiagonalDownLeft',
      ).toEqual(map)
      // Direction DiagonalDownRight
      map = JSON.parse(JSON.stringify(testEmptyMovementMap))
      map[8][8] = move
      map[9][9] = move
      map[10][10] = move
      map[11][11] = move
      map[12][12] = move
      map[13][13] = move
      map[14][14] = move
      expect(
        createMovementMap(Directions.DiagonalDownRight, move),
        'Directions.DiagonalDownRight',
      ).toEqual(map)
    })
  })
})

describe('shrinkMovementMapForBoard', () => {
  const fn = shrinkMovementMapForBoard
  it('returns a shrinked MovementMap with the correct directions and moves', () => {
    {
      // King
      const m = Moves.WalkOnEmpty | Moves.WalkOnEnemy
      expect(fn(KingMovementMap, 4, 4), 'King x=4 y=4').toEqual([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, m, m, m, 0, 0],
        [0, 0, 0, m, 0, m, 0, 0],
        [0, 0, 0, m, m, m, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ])
      expect(fn(KingMovementMap, 0, 0), 'King x=0 y=0').toEqual([
        [0, m, 0, 0, 0, 0, 0, 0],
        [m, m, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ])
      expect(fn(KingMovementMap, 7, 7), 'King x=7 y=7').toEqual([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, m, m],
        [0, 0, 0, 0, 0, 0, m, 0],
      ])
    }
    {
      // Queen
      const m = Moves.WalkOnEmpty | Moves.WalkOnEnemy
      expect(fn(QueenMovementMap, 4, 4), 'Queen x=4 y=4').toEqual([
        [m, 0, 0, 0, m, 0, 0, 0],
        [0, m, 0, 0, m, 0, 0, m],
        [0, 0, m, 0, m, 0, m, 0],
        [0, 0, 0, m, m, m, 0, 0],
        [m, m, m, m, 0, m, m, m],
        [0, 0, 0, m, m, m, 0, 0],
        [0, 0, m, 0, m, 0, m, 0],
        [0, m, 0, 0, m, 0, 0, m],
      ])
      expect(fn(QueenMovementMap, 0, 0), 'Queen x=0 y=0').toEqual([
        [0, m, m, m, m, m, m, m],
        [m, m, 0, 0, 0, 0, 0, 0],
        [m, 0, m, 0, 0, 0, 0, 0],
        [m, 0, 0, m, 0, 0, 0, 0],
        [m, 0, 0, 0, m, 0, 0, 0],
        [m, 0, 0, 0, 0, m, 0, 0],
        [m, 0, 0, 0, 0, 0, m, 0],
        [m, 0, 0, 0, 0, 0, 0, m],
      ])
      expect(fn(QueenMovementMap, 7, 7), 'Queen x=7 y=7').toEqual([
        [m, 0, 0, 0, 0, 0, 0, m],
        [0, m, 0, 0, 0, 0, 0, m],
        [0, 0, m, 0, 0, 0, 0, m],
        [0, 0, 0, m, 0, 0, 0, m],
        [0, 0, 0, 0, m, 0, 0, m],
        [0, 0, 0, 0, 0, m, 0, m],
        [0, 0, 0, 0, 0, 0, m, m],
        [m, m, m, m, m, m, m, 0],
      ])
    }
    {
      // White Pawn
      const e = Moves.WalkOnEmpty // e=empty
      const a = Moves.WalkOnEnemy // a=attack
      expect(fn(WhitePawnFirstMoveMovementMap, 4, 1), 'White Pawn x=4 y=1 (first move)').toEqual([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, a, e, a, 0, 0],
        [0, 0, 0, 0, e, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ])
      expect(fn(WhitePawnMovementMap, 4, 1), 'White x=4 y=1').toEqual([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, a, e, a, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ])
    }
    {
      // Black Pawn
      const e = Moves.WalkOnEmpty // e=empty
      const a = Moves.WalkOnEnemy // a=attack
      expect(fn(BlackPawnFirstMoveMovementMap, 4, 6), 'Black Pawn x=4 y=6 (first move)').toEqual([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, e, 0, 0, 0],
        [0, 0, 0, a, e, a, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ])
      expect(fn(BlackPawnMovementMap, 4, 6), 'Black Pawn x=4 y=6').toEqual([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, a, e, a, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ])
    }
  })
})

describe('getMovementMapForFigure', () => {
  const fn = getMovementMapForFigure
  it('should return the correct movement map for a pawn figure', () => {
    expect(fn(PawnFigure | WhiteFigure | MovedOnce)).toEqual(WhitePawnMovementMap)
    expect(fn(PawnFigure | WhiteFigure)).toEqual(WhitePawnFirstMoveMovementMap)
    expect(fn(PawnFigure | BlackFigure | MovedOnce)).toEqual(BlackPawnMovementMap)
    expect(fn(PawnFigure | BlackFigure)).toEqual(BlackPawnFirstMoveMovementMap)
  })
  it('should return the correct movement map for a rook figure', () => {
    expect(fn(RookFigure | WhiteFigure)).toEqual(RookMovementMap)
    expect(fn(RookFigure | BlackFigure)).toEqual(RookMovementMap)
  })
  it('should return the correct movement map for a knight figure', () => {
    expect(fn(KnightFigure | WhiteFigure)).toEqual(KnightMovementMap)
    expect(fn(KnightFigure | BlackFigure)).toEqual(KnightMovementMap)
  })
  it('should return the correct movement map for a bishop figure', () => {
    expect(fn(BishopFigure | WhiteFigure)).toEqual(BishopMovementMap)
    expect(fn(BishopFigure | BlackFigure)).toEqual(BishopMovementMap)
  })
  it('should return the correct movement map for a queen figure', () => {
    expect(fn(QueenFigure | WhiteFigure)).toEqual(QueenMovementMap)
    expect(fn(QueenFigure | BlackFigure)).toEqual(QueenMovementMap)
  })
  it('should return the correct movement map for a king figure', () => {
    expect(fn(KingFigure | WhiteFigure)).toEqual(KingMovementMap)
    expect(fn(KingFigure | BlackFigure)).toEqual(KingMovementMap)
  })
  it('should return an empty movement map for invalid figures', () => {
    expect(fn(WhiteFigure)).toEqual(EmptyMovementMap)
    expect(fn(BlackFigure)).toEqual(EmptyMovementMap)
  })
})

import { describe, it, expect } from 'vitest'
import {
  isMovementMap,
  shrinkMovementMapForBoard,
  getFigureMovementMap,
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

describe('getFigureMovementMap', () => {
  const fn = getFigureMovementMap
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

import { describe, it, expect } from 'vitest'
import {
  isMovementMap,
  getPieceMovementMap,
  getPositionalMovementMapSlice,
  calculateMovementPaths,
  EmptyMovementMap,
  BlackPawnFirstMoveMovementMap,
  BlackPawnMovementMap,
  WhitePawnFirstMoveMovementMap,
  WhitePawnMovementMap,
  RookMovementMap,
  KnightMovementMap,
  BishopMovementMap,
  QueenMovementMap,
  KingMovementMap,
} from './movement_map'
import * as Moves from './moves'
import {
  BlackPiece,
  WhitePiece,
  MovedOnce,
  PawnPiece,
  RookPiece,
  KnightPiece,
  BishopPiece,
  QueenPiece,
  KingPiece,
} from './piece'
import { createEmptyBoard } from './board'

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

describe('getPositionalMovementMapSlice', () => {
  const fn = getPositionalMovementMapSlice
  it('returns a positional MovementMap slice (8*8) with the correct directions and moves', () => {
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

describe('getPieceMovementMap', () => {
  const fn = getPieceMovementMap
  it('should return the correct movement map for a pawn piece', () => {
    expect(fn(PawnPiece | WhitePiece | MovedOnce)).toEqual(WhitePawnMovementMap)
    expect(fn(PawnPiece | WhitePiece)).toEqual(WhitePawnFirstMoveMovementMap)
    expect(fn(PawnPiece | BlackPiece | MovedOnce)).toEqual(BlackPawnMovementMap)
    expect(fn(PawnPiece | BlackPiece)).toEqual(BlackPawnFirstMoveMovementMap)
  })
  it('should return the correct movement map for a rook piece', () => {
    expect(fn(RookPiece | WhitePiece)).toEqual(RookMovementMap)
    expect(fn(RookPiece | BlackPiece)).toEqual(RookMovementMap)
  })
  it('should return the correct movement map for a knight piece', () => {
    expect(fn(KnightPiece | WhitePiece)).toEqual(KnightMovementMap)
    expect(fn(KnightPiece | BlackPiece)).toEqual(KnightMovementMap)
  })
  it('should return the correct movement map for a bishop piece', () => {
    expect(fn(BishopPiece | WhitePiece)).toEqual(BishopMovementMap)
    expect(fn(BishopPiece | BlackPiece)).toEqual(BishopMovementMap)
  })
  it('should return the correct movement map for a queen piece', () => {
    expect(fn(QueenPiece | WhitePiece)).toEqual(QueenMovementMap)
    expect(fn(QueenPiece | BlackPiece)).toEqual(QueenMovementMap)
  })
  it('should return the correct movement map for a king piece', () => {
    expect(fn(KingPiece | WhitePiece)).toEqual(KingMovementMap)
    expect(fn(KingPiece | BlackPiece)).toEqual(KingMovementMap)
  })
  it('should return an empty movement map for invalid pieces', () => {
    expect(fn(WhitePiece)).toEqual(EmptyMovementMap)
    expect(fn(BlackPiece)).toEqual(EmptyMovementMap)
  })
})

describe('calculateMovementPaths', () => {
  it('should calculate the correct movement paths for a given tile on an empty board', () => {
    const board = createEmptyBoard()
    expect(calculateMovementPaths(board, 'a1')).toEqual(
      getPositionalMovementMapSlice(EmptyMovementMap, 0, 0),
    )
  })

  // TODO: make elaborate tests for different scenarios and edge cases
  // urgh.. this will be messy
})

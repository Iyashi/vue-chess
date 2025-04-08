import { describe, it, expect } from 'vitest'
import { isHistoryEntry, isHistory, createHistoryEntry } from './history'
import { PawnPiece, PromotedPiece, QueenPiece } from './piece'
import type { Tile } from './types'

describe('isHistoryEntry', () => {
  it('should return true for valid history entries', () => {
    expect(isHistoryEntry({ tile: 'a1', targetTile: 'b2', piece: PawnPiece })).toBe(true)
    expect(
      isHistoryEntry({ tile: 'a1', targetTile: 'b2', piece: PawnPiece, capturedPiece: PawnPiece }),
    ).toBe(true)
    expect(
      isHistoryEntry({
        tile: 'a1',
        targetTile: 'b2',
        piece: PawnPiece,
        capturedPiece: PawnPiece,
        promotedPiece: QueenPiece | PromotedPiece,
      }),
    ).toBe(true)
  })
  it('should return false for history entries', () => {
    expect(isHistoryEntry(undefined)).toBe(false)
    expect(isHistoryEntry(null)).toBe(false)
    expect(isHistoryEntry('')).toBe(false)
    expect(isHistoryEntry({})).toBe(false)
    expect(isHistoryEntry({ tile: 'a1', targetTile: 'a1', piece: NaN })).toBe(false)
    expect(isHistoryEntry({ tile: 'invalid', targetTile: 'a1', piece: PawnPiece })).toBe(false)
    expect(isHistoryEntry({ tile: 'a1', targetTile: 'invalid', piece: PawnPiece })).toBe(false)
  })
})

describe('isHistory', () => {
  it('should return true for valid histories', () => {
    expect(isHistory([])).toBe(true)
    expect(isHistory([{ tile: 'a1', targetTile: 'b2', piece: PawnPiece }])).toBe(true)
    expect(
      isHistory([{ tile: 'a1', targetTile: 'b2', piece: PawnPiece, capturedPiece: PawnPiece }]),
    ).toBe(true)
    expect(
      isHistory([
        {
          tile: 'a1',
          targetTile: 'b2',
          piece: PawnPiece,
          capturedPiece: PawnPiece,
          promotedPiece: QueenPiece | PromotedPiece,
        },
      ]),
    ).toBe(true)
  })
  it('should return false for invalid histories', () => {
    expect(isHistory(undefined)).toBe(false)
    expect(isHistory(null)).toBe(false)
    expect(isHistory({})).toBe(false)
    expect(isHistory('')).toBe(false)
    expect(isHistory([{ tile: 'a1', targetTile: 'a1', piece: NaN }])).toBe(false)
    expect(isHistory([{ tile: 'invalid', targetTile: 'a1', piece: PawnPiece }])).toBe(false)
    expect(isHistory([{ tile: 'a1', targetTile: 'invalid', piece: PawnPiece }])).toBe(false)
  })
})

describe('createHistoryEntry', () => {
  it('should return valid history entry', () => {
    expect(createHistoryEntry('a1', 'b2', PawnPiece)).toEqual({
      tile: 'a1',
      targetTile: 'b2',
      piece: PawnPiece,
    })
    expect(createHistoryEntry('a1', 'b2', PawnPiece, PawnPiece)).toEqual({
      tile: 'a1',
      targetTile: 'b2',
      piece: PawnPiece,
      capturedPiece: PawnPiece,
    })
    expect(
      createHistoryEntry('a1', 'b2', PawnPiece, PawnPiece, QueenPiece | PromotedPiece),
    ).toEqual({
      tile: 'a1',
      targetTile: 'b2',
      piece: PawnPiece,
      capturedPiece: PawnPiece,
      promotedPiece: QueenPiece | PromotedPiece,
    })
  })
  it('should throw error for invalid tile', () => {
    expect(() => createHistoryEntry('invalid' as Tile, 'b2', PawnPiece)).toThrowError()
  })
  it('should throw error for invalid target tile', () => {
    expect(() => createHistoryEntry('a1', 'invalid' as Tile, PawnPiece)).toThrowError()
  })
  it('should throw error for invalid piece', () => {
    expect(() => createHistoryEntry('a1', 'b2', NaN as number)).toThrowError()
  })
  it('should throw error for invalid captured piece', () => {
    expect(() => createHistoryEntry('a1', 'b2', PawnPiece, NaN as number)).toThrowError()
  })
  it('should throw error for invalid promoted piece', () => {
    expect(() => createHistoryEntry('a1', 'b2', PawnPiece, undefined, NaN as number)).toThrowError()
  })
})

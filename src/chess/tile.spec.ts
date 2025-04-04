import { describe, it, expect } from 'vitest'
import type { Tile, AxisIndices, AxisIndex, HorizontalKey, VerticalKey } from './types'
import {
  isTile,
  getIndexForHorizontalKey,
  getHorizontalKeyForAxisIndex,
  getIndexForVerticalKey,
  getVerticalKeyForAxisIndex,
  getTileForAxisIndices,
  getAxisIndicesForTile,
} from './tile'

const horizontalKeys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const
const verticalKeys = ['1', '2', '3', '4', '5', '6', '7', '8'] as const
const allTiles = {} as Record<Tile, AxisIndices>
for (let x: AxisIndex = 0; x < 8; x++) {
  for (let y: AxisIndex = 0; y < 8; y++) {
    allTiles[(horizontalKeys[x] + verticalKeys[y]) as Tile] = [x, y] as AxisIndices
  }
}
// console.log(allTiles)

describe('isTile', () => {
  it('should return true for valid tiles', () => {
    for (const [tile] of Object.entries(allTiles)) {
      expect(isTile(tile)).toBe(true)
    }
  })
  it('should return false for invalid tiles', () => {
    for (const [tile] of Object.entries(allTiles)) {
      expect(isTile(tile.toLocaleUpperCase())).toBe(false)
    }
    expect(isTile('invalid')).toBe(false)
    expect(isTile('a0')).toBe(false)
    expect(isTile('a9')).toBe(false)
    expect(isTile('x1')).toBe(false)
    expect(isTile('.1')).toBe(false)
  })
})

describe('getIndexForHorizontalKey', () => {
  it('should return correct horizontal axis index for valid tiles', () => {
    expect(getIndexForHorizontalKey('a')).toEqual(0)
    expect(getIndexForHorizontalKey('h')).toEqual(7)
    expect(getIndexForHorizontalKey('a1' as HorizontalKey)).toEqual(0)
    expect(getIndexForHorizontalKey('h8' as HorizontalKey)).toEqual(7)
  })
})

describe('getHorizontalKeyForAxisIndex', () => {
  it('should return correct horizontal key for valid axis index', () => {
    expect(getHorizontalKeyForAxisIndex(0)).toEqual('a')
    expect(getHorizontalKeyForAxisIndex(7)).toEqual('h')
  })
})

describe('getIndexForVerticalKey', () => {
  it('should return correct vertical axis index for valid tiles', () => {
    expect(getIndexForVerticalKey('1')).toEqual(0)
    expect(getIndexForVerticalKey('8')).toEqual(7)
    expect(getIndexForVerticalKey('a1' as VerticalKey)).toEqual(0)
    expect(getIndexForVerticalKey('h8' as VerticalKey)).toEqual(7)
  })
})

describe('getVerticalKeyForAxisIndex', () => {
  it('should return correct vertical key for valid axis index', () => {
    expect(getVerticalKeyForAxisIndex(0)).toEqual('1')
    expect(getVerticalKeyForAxisIndex(7)).toEqual('8')
  })
})

describe('getTileForAxisIndices', () => {
  it('should return correct vertical key for valid axis index', () => {
    expect(getTileForAxisIndices(0, 0)).toEqual('a1')
    expect(getTileForAxisIndices(7, 7)).toEqual('h8')
  })
})

describe('getAxisIndicesForTile', () => {
  it('should return correct axis indices for valid tiles', () => {
    for (const [tile, axisIndices] of Object.entries(allTiles)) {
      const [x, y] = getAxisIndicesForTile(tile as Tile)
      expect(x).toEqual(axisIndices[0])
      expect(y).toEqual(axisIndices[1])
    }
  })
  it('should throw an error for invalid tiles', () => {
    const error = 'Tile is invalid'
    expect(() => getAxisIndicesForTile(undefined as unknown as Tile)).toThrowError(error)
    expect(() => getAxisIndicesForTile(null as unknown as Tile)).toThrowError(error)
    expect(() => getAxisIndicesForTile(NaN as unknown as Tile)).toThrowError(error)
    expect(() => getAxisIndicesForTile({} as unknown as Tile)).toThrowError(error)
    expect(() => getAxisIndicesForTile([] as unknown as Tile)).toThrowError(error)
    expect(() => getAxisIndicesForTile('invalid' as Tile)).toThrowError(error)
    expect(() => getAxisIndicesForTile('a0' as Tile)).toThrowError(error)
    expect(() => getAxisIndicesForTile('a9' as Tile)).toThrowError(error)
    expect(() => getAxisIndicesForTile('x1' as Tile)).toThrowError(error)
    expect(() => getAxisIndicesForTile('.1' as Tile)).toThrowError(error)
  })
})

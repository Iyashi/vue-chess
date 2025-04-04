import type { HorizontalKey, VerticalKey, AxisIndex, AxisIndices, Tile } from './types'

const aCharCode = 'a'.charCodeAt(0)

export const HorizontalKeys: HorizontalKey[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

export function getIndexForHorizontalKey(c: string): AxisIndex {
  return (c.charCodeAt(0) - aCharCode) as AxisIndex
}

export function getHorizontalKeyForAxisIndex(index: number): HorizontalKey {
  return String.fromCharCode(aCharCode + index) as HorizontalKey
}

export const VerticalKeys: VerticalKey[] = ['1', '2', '3', '4', '5', '6', '7', '8']

export function getIndexForVerticalKey(c: string): AxisIndex {
  if (c.length === 2) c = c[1] as VerticalKey
  return (parseInt(c[0], 10) - 1) as AxisIndex
}

export function getVerticalKeyForAxisIndex(index: number): VerticalKey {
  return `${index + 1}` as VerticalKey
}

export function isTile(v: unknown): v is Tile {
  if (typeof v !== 'string') return false
  if (v.length !== 2) return false
  const x = getIndexForHorizontalKey(v[0] as HorizontalKey)
  if (x < 0 || x > 7) return false
  const y = getIndexForVerticalKey(v[1] as VerticalKey)
  if (y < 0 || y > 7) return false
  return true
}

export function getTileForAxisIndices(x: number, y: number): Tile {
  return (getHorizontalKeyForAxisIndex(x) + getVerticalKeyForAxisIndex(y)) as Tile
}

export const Tiles: Tile[] = new Array(64)
for (let x = 0; x < 8; x++) {
  for (let y = 0; y < 8; y++) {
    Tiles[y * 8 + x] = `${String.fromCharCode(aCharCode + x)}${y + 1}` as Tile
  }
}

/**
 * `getAxisIndicesForTile` converts a `Tile` to indices for both x and y axis (0-7).
 *
 * @param {Tile} tile - Tile to convert
 * @returns tuple of indices per axis (0-7)
 * @example
 * getAxisIndicesForTile('a1') // returns [0, 0]
 * getAxisIndicesForTile('a8') // returns [0, 7]
 * getAxisIndicesForTile('h1') // returns [7, 0]
 * getAxisIndicesForTile('h8') // returns [7, 7]
 */
export function getAxisIndicesForTile(tile: Tile): AxisIndices {
  if (!isTile(tile)) throw new Error('Tile is invalid')
  return [
    getIndexForHorizontalKey(tile[0] as HorizontalKey),
    getIndexForVerticalKey(tile[1] as VerticalKey),
  ] as AxisIndices
}

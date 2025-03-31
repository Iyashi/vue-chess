const aCharCode = 'a'.charCodeAt(0)

export const HorizontalKeys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const
export type HorizontalKey = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h'

export function getIndexForHorizontalKey(c: string): AxisIndex {
  return (c.charCodeAt(0) - aCharCode) as AxisIndex
}

export function getHorizontalKeyForAxisIndex(index: number): HorizontalKey {
  return String.fromCharCode(aCharCode + index) as HorizontalKey
}

export const VerticalKeys = ['1', '2', '3', '4', '5', '6', '7', '8'] as const
export type VerticalKey = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'

export function getIndexForVerticalKey(c: string): AxisIndex {
  if (c.length === 2) c = c[1] as VerticalKey
  return (parseInt(c[0], 10) - 1) as AxisIndex
}

export function getVerticalKeyForAxisIndex(index: number): VerticalKey {
  return `${index + 1}` as VerticalKey
}

export type Tile = `${HorizontalKey}${VerticalKey}`

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

export type AxisIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

export type AxisIndices = [AxisIndex, AxisIndex]

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

/* prettier-ignore */
export type Index = /* 0-63 */ 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63

/**
 * `getIndexForTile` converts a `Tile` to the index (0-63) of the tile in a flat array of tiles.
 *
 * @param {Tile} tile - Tile to convert
 * @returns index (0-63) of the tile in a flat array
 * @example
 * getIndexForTile('a1') // returns 0
 * getIndexForTile('a8') // returns 7
 * getIndexForTile('h1') // returns 56
 * getIndexForTile('h8') // returns 63
 */
export function getIndexForTile(tile: Tile): Index {
  const [x, y] = getAxisIndicesForTile(tile)
  return (x * 8 + y) as Index
}

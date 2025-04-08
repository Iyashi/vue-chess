/**
 * `Piece` is a chess piece.
 *
 * It is a bitmask that represents the piece's kind (pawn, rook, bishop, knight, queen, king), color (black or white) and other information like whether it has moved once.
 */
export type Piece = number

export type HorizontalKey = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h'
export type VerticalKey = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'

/**
 * `Tile` is the key of a tile in a chess board.
 *
 * It is a string that consists of a horizontal and vertical key.
 */
export type Tile = `${HorizontalKey}${VerticalKey}`

/**
 * `AxisIndex` is the index of x and y axis in a chess board.
 */
export type AxisIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

/**
 * `AxisIndices` is a tuple of x and y axis indices in a chess board.
 */
export type AxisIndices = [/* x */ AxisIndex, /* y */ AxisIndex]

/**
 * `Index` is the tile index in a flat array of tiles (0-64).
 */
/* prettier-ignore */ export type Index = /* 0-63 */ 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63

/**
 * `Board` is record of tiles and their pieces.
 *
 * The key is the `Tile` (a1, b2, c3, etc) and the value is the `Piece` bitmask.
 */
export type Board = Record<Tile, Piece>

/**
 * `MovementMap` is a 2D array of all possible moves for a piece on a chess board.
 *
 * The Map is 15x15 and the piece lies at its center position (x=7, y=7).
 *
 * This allows moves across a 8x8 board no matter where the piece is currently positioned on the board.
 */
export type MovementMap = number[][]

/**
 * `HistoryEntry` is a record of the movement of a chess piece on a chess board.
 */
export interface HistoryEntry {
  /**
   * The tile the moved piece originally was located.
   */
  tile: Tile

  /**
   * The tile the piece moved to.
   */
  targetTile: Tile

  /**
   * The piece that moved.
   */
  piece: Piece

  /**
   * The enemy piece that was captured by the moving piece.
   */
  capturedPiece?: Piece

  /**
   * The piece that the original piece (pawn) was promoted to.
   */
  promotedPiece?: Piece
}

/**
 * `History` is a list of `HistoryEntry`s.
 *
 * It contains all actions performed during a game of chess.
 */
export type History = HistoryEntry[]

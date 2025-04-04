import { describe, expect, it } from 'vitest'
import { createEmptyBoard, createBoard, clearBoard, resetBoard } from './board'
import { getTileForAxisIndices } from './tile'
import {
  BlackPiece,
  WhitePiece,
  PawnPiece,
  RookPiece,
  KnightPiece,
  BishopPiece,
  QueenPiece,
  KingPiece,
} from './piece'

describe('createEmptyBoard', () => {
  it('returns a board with all tiles set to zero', () => {
    const board = createEmptyBoard()
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        expect(board[getTileForAxisIndices(x, y)], `Tile at (${x}, ${y}) should be zero`).toBe(0)
      }
    }
  })
})

describe('createBoard', () => {
  it('returns a board with pieces in the correct starting positions', () => {
    const board = createBoard()

    // White Pieces
    expect(board['a1'], `a1 should be White Rook`).toBe(WhitePiece | RookPiece)
    expect(board['b1'], `b1 should be White Knight`).toBe(WhitePiece | KnightPiece)
    expect(board['c1'], `c1 should be White Bishop`).toBe(WhitePiece | BishopPiece)
    expect(board['d1'], `d1 should be White King`).toBe(WhitePiece | KingPiece)
    expect(board['e1'], `e1 should be White Queen`).toBe(WhitePiece | QueenPiece)
    expect(board['f1'], `f1 should be White Bishop`).toBe(WhitePiece | BishopPiece)
    expect(board['g1'], `g1 should be White Knight`).toBe(WhitePiece | KnightPiece)
    expect(board['h1'], `h1 should be White Rook`).toBe(WhitePiece | RookPiece)
    // White Pawns
    expect(board['a2'], `a2 should be White Pawn`).toBe(WhitePiece | PawnPiece)
    expect(board['b2'], `b2 should be White Pawn`).toBe(WhitePiece | PawnPiece)
    expect(board['c2'], `c2 should be White Pawn`).toBe(WhitePiece | PawnPiece)
    expect(board['d2'], `d2 should be White Pawn`).toBe(WhitePiece | PawnPiece)
    expect(board['e2'], `e2 should be White Pawn`).toBe(WhitePiece | PawnPiece)
    expect(board['f2'], `f2 should be White Pawn`).toBe(WhitePiece | PawnPiece)
    expect(board['g2'], `g2 should be White Pawn`).toBe(WhitePiece | PawnPiece)
    expect(board['h2'], `h2 should be White Pawn`).toBe(WhitePiece | PawnPiece)

    // Black Pieces
    expect(board['a8'], `a8 should be Black Rook`).toBe(BlackPiece | RookPiece)
    expect(board['b8'], `b8 should be Black Knight`).toBe(BlackPiece | KnightPiece)
    expect(board['c8'], `c8 should be Black Bishop`).toBe(BlackPiece | BishopPiece)
    expect(board['d8'], `d8 should be Black King`).toBe(BlackPiece | KingPiece)
    expect(board['e8'], `e8 should be Black Queen`).toBe(BlackPiece | QueenPiece)
    expect(board['f8'], `f8 should be Black Bishop`).toBe(BlackPiece | BishopPiece)
    expect(board['g8'], `g8 should be Black Knight`).toBe(BlackPiece | KnightPiece)
    expect(board['h8'], `h8 should be Black Rook`).toBe(BlackPiece | RookPiece)
    // Black Pawns
    expect(board['a7'], `a7 should be Black Pawn`).toBe(BlackPiece | PawnPiece)
    expect(board['b7'], `b7 should be Black Pawn`).toBe(BlackPiece | PawnPiece)
    expect(board['c7'], `c7 should be Black Pawn`).toBe(BlackPiece | PawnPiece)
    expect(board['d7'], `d7 should be Black Pawn`).toBe(BlackPiece | PawnPiece)
    expect(board['e7'], `e7 should be Black Pawn`).toBe(BlackPiece | PawnPiece)
    expect(board['f7'], `f7 should be Black Pawn`).toBe(BlackPiece | PawnPiece)
    expect(board['g7'], `g7 should be Black Pawn`).toBe(BlackPiece | PawnPiece)
    expect(board['h7'], `h7 should be Black Pawn`).toBe(BlackPiece | PawnPiece)
  })
})

describe('clearBoard', () => {
  it('sets all tiles in given board to zero', () => {
    const board = createBoard()
    clearBoard(board)
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        expect(board[getTileForAxisIndices(x, y)], `Tile at (${x}, ${y}) should be zero`).toBe(0)
      }
    }
  })
})

describe('resetBoard', () => {
  it('resets a board and sets all pieces in the correct starting positions', () => {
    // set up the board with some pieces
    const board = createEmptyBoard()
    board['a5'] = BlackPiece | RookPiece
    board['b5'] = BlackPiece | KnightPiece
    board['c5'] = BlackPiece | BishopPiece
    board['d5'] = BlackPiece | KingPiece
    board['e5'] = BlackPiece | QueenPiece
    board['f5'] = BlackPiece | BishopPiece
    board['g5'] = BlackPiece | KnightPiece
    board['h5'] = BlackPiece | RookPiece

    resetBoard(board)

    // White Pieces
    expect(board['a1'], `a1 should be White Rook`).toBe(WhitePiece | RookPiece)
    expect(board['b1'], `b1 should be White Knight`).toBe(WhitePiece | KnightPiece)
    expect(board['c1'], `c1 should be White Bishop`).toBe(WhitePiece | BishopPiece)
    expect(board['d1'], `d1 should be White King`).toBe(WhitePiece | KingPiece)
    expect(board['e1'], `e1 should be White Queen`).toBe(WhitePiece | QueenPiece)
    expect(board['f1'], `f1 should be White Bishop`).toBe(WhitePiece | BishopPiece)
    expect(board['g1'], `g1 should be White Knight`).toBe(WhitePiece | KnightPiece)
    expect(board['h1'], `h1 should be White Rook`).toBe(WhitePiece | RookPiece)
    // White Pawns
    expect(board['a2'], `a2 should be White Pawn`).toBe(WhitePiece | PawnPiece)
    expect(board['b2'], `b2 should be White Pawn`).toBe(WhitePiece | PawnPiece)
    expect(board['c2'], `c2 should be White Pawn`).toBe(WhitePiece | PawnPiece)
    expect(board['d2'], `d2 should be White Pawn`).toBe(WhitePiece | PawnPiece)
    expect(board['e2'], `e2 should be White Pawn`).toBe(WhitePiece | PawnPiece)
    expect(board['f2'], `f2 should be White Pawn`).toBe(WhitePiece | PawnPiece)
    expect(board['g2'], `g2 should be White Pawn`).toBe(WhitePiece | PawnPiece)
    expect(board['h2'], `h2 should be White Pawn`).toBe(WhitePiece | PawnPiece)

    // Black Pieces
    expect(board['a8'], `a8 should be Black Rook`).toBe(BlackPiece | RookPiece)
    expect(board['b8'], `b8 should be Black Knight`).toBe(BlackPiece | KnightPiece)
    expect(board['c8'], `c8 should be Black Bishop`).toBe(BlackPiece | BishopPiece)
    expect(board['d8'], `d8 should be Black King`).toBe(BlackPiece | KingPiece)
    expect(board['e8'], `e8 should be Black Queen`).toBe(BlackPiece | QueenPiece)
    expect(board['f8'], `f8 should be Black Bishop`).toBe(BlackPiece | BishopPiece)
    expect(board['g8'], `g8 should be Black Knight`).toBe(BlackPiece | KnightPiece)
    expect(board['h8'], `h8 should be Black Rook`).toBe(BlackPiece | RookPiece)
    // Black Pawns
    expect(board['a7'], `a7 should be Black Pawn`).toBe(BlackPiece | PawnPiece)
    expect(board['b7'], `b7 should be Black Pawn`).toBe(BlackPiece | PawnPiece)
    expect(board['c7'], `c7 should be Black Pawn`).toBe(BlackPiece | PawnPiece)
    expect(board['d7'], `d7 should be Black Pawn`).toBe(BlackPiece | PawnPiece)
    expect(board['e7'], `e7 should be Black Pawn`).toBe(BlackPiece | PawnPiece)
    expect(board['f7'], `f7 should be Black Pawn`).toBe(BlackPiece | PawnPiece)
    expect(board['g7'], `g7 should be Black Pawn`).toBe(BlackPiece | PawnPiece)
    expect(board['h7'], `h7 should be Black Pawn`).toBe(BlackPiece | PawnPiece)
  })
})

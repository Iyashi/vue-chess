import { describe, expect, it } from 'vitest'
import { createEmptyBoard, createBoard, clearBoard, resetBoard } from './board'
import { getTileForAxisIndices } from './tile'
import {
  WhitePawnFigure,
  WhiteRookFigure,
  WhiteKnightFigure,
  WhiteBishopFigure,
  WhiteQueenFigure,
  WhiteKingFigure,
  BlackPawnFigure,
  BlackRookFigure,
  BlackKnightFigure,
  BlackBishopFigure,
  BlackQueenFigure,
  BlackKingFigure,
} from './figure'

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
  it('returns a board with figures in the correct starting positions', () => {
    const board = createBoard()

    // White Figures
    expect(board['a1'], `a1 should be White Rook`).toBe(WhiteRookFigure)
    expect(board['b1'], `b1 should be White Knight`).toBe(WhiteKnightFigure)
    expect(board['c1'], `c1 should be White Bishop`).toBe(WhiteBishopFigure)
    expect(board['d1'], `d1 should be White King`).toBe(WhiteKingFigure)
    expect(board['e1'], `e1 should be White Queen`).toBe(WhiteQueenFigure)
    expect(board['f1'], `f1 should be White Bishop`).toBe(WhiteBishopFigure)
    expect(board['g1'], `g1 should be White Knight`).toBe(WhiteKnightFigure)
    expect(board['h1'], `h1 should be White Rook`).toBe(WhiteRookFigure)
    // White Pawns
    expect(board['a2'], `a2 should be White Pawn`).toBe(WhitePawnFigure)
    expect(board['b2'], `b2 should be White Pawn`).toBe(WhitePawnFigure)
    expect(board['c2'], `c2 should be White Pawn`).toBe(WhitePawnFigure)
    expect(board['d2'], `d2 should be White Pawn`).toBe(WhitePawnFigure)
    expect(board['e2'], `e2 should be White Pawn`).toBe(WhitePawnFigure)
    expect(board['f2'], `f2 should be White Pawn`).toBe(WhitePawnFigure)
    expect(board['g2'], `g2 should be White Pawn`).toBe(WhitePawnFigure)
    expect(board['h2'], `h2 should be White Pawn`).toBe(WhitePawnFigure)

    // Black Figures
    expect(board['a8'], `a8 should be Black Rook`).toBe(BlackRookFigure)
    expect(board['b8'], `b8 should be Black Knight`).toBe(BlackKnightFigure)
    expect(board['c8'], `c8 should be Black Bishop`).toBe(BlackBishopFigure)
    expect(board['d8'], `d8 should be Black King`).toBe(BlackKingFigure)
    expect(board['e8'], `e8 should be Black Queen`).toBe(BlackQueenFigure)
    expect(board['f8'], `f8 should be Black Bishop`).toBe(BlackBishopFigure)
    expect(board['g8'], `g8 should be Black Knight`).toBe(BlackKnightFigure)
    expect(board['h8'], `h8 should be Black Rook`).toBe(BlackRookFigure)
    // Black Pawns
    expect(board['a7'], `a7 should be Black Pawn`).toBe(BlackPawnFigure)
    expect(board['b7'], `b7 should be Black Pawn`).toBe(BlackPawnFigure)
    expect(board['c7'], `c7 should be Black Pawn`).toBe(BlackPawnFigure)
    expect(board['d7'], `d7 should be Black Pawn`).toBe(BlackPawnFigure)
    expect(board['e7'], `e7 should be Black Pawn`).toBe(BlackPawnFigure)
    expect(board['f7'], `f7 should be Black Pawn`).toBe(BlackPawnFigure)
    expect(board['g7'], `g7 should be Black Pawn`).toBe(BlackPawnFigure)
    expect(board['h7'], `h7 should be Black Pawn`).toBe(BlackPawnFigure)
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
  it('resets a board and sets all figures in the correct starting positions', () => {
    // set up the board with some figures
    const board = createEmptyBoard()
    board['a5'] = BlackRookFigure
    board['b5'] = BlackKnightFigure
    board['c5'] = BlackBishopFigure
    board['d5'] = BlackKingFigure
    board['e5'] = BlackQueenFigure
    board['f5'] = BlackBishopFigure
    board['g5'] = BlackKnightFigure
    board['h5'] = BlackRookFigure

    resetBoard(board)

    // White Figures
    expect(board['a1'], `a1 should be White Rook`).toBe(WhiteRookFigure)
    expect(board['b1'], `b1 should be White Knight`).toBe(WhiteKnightFigure)
    expect(board['c1'], `c1 should be White Bishop`).toBe(WhiteBishopFigure)
    expect(board['d1'], `d1 should be White King`).toBe(WhiteKingFigure)
    expect(board['e1'], `e1 should be White Queen`).toBe(WhiteQueenFigure)
    expect(board['f1'], `f1 should be White Bishop`).toBe(WhiteBishopFigure)
    expect(board['g1'], `g1 should be White Knight`).toBe(WhiteKnightFigure)
    expect(board['h1'], `h1 should be White Rook`).toBe(WhiteRookFigure)
    // White Pawns
    expect(board['a2'], `a2 should be White Pawn`).toBe(WhitePawnFigure)
    expect(board['b2'], `b2 should be White Pawn`).toBe(WhitePawnFigure)
    expect(board['c2'], `c2 should be White Pawn`).toBe(WhitePawnFigure)
    expect(board['d2'], `d2 should be White Pawn`).toBe(WhitePawnFigure)
    expect(board['e2'], `e2 should be White Pawn`).toBe(WhitePawnFigure)
    expect(board['f2'], `f2 should be White Pawn`).toBe(WhitePawnFigure)
    expect(board['g2'], `g2 should be White Pawn`).toBe(WhitePawnFigure)
    expect(board['h2'], `h2 should be White Pawn`).toBe(WhitePawnFigure)

    // Black Figures
    expect(board['a8'], `a8 should be Black Rook`).toBe(BlackRookFigure)
    expect(board['b8'], `b8 should be Black Knight`).toBe(BlackKnightFigure)
    expect(board['c8'], `c8 should be Black Bishop`).toBe(BlackBishopFigure)
    expect(board['d8'], `d8 should be Black King`).toBe(BlackKingFigure)
    expect(board['e8'], `e8 should be Black Queen`).toBe(BlackQueenFigure)
    expect(board['f8'], `f8 should be Black Bishop`).toBe(BlackBishopFigure)
    expect(board['g8'], `g8 should be Black Knight`).toBe(BlackKnightFigure)
    expect(board['h8'], `h8 should be Black Rook`).toBe(BlackRookFigure)
    // Black Pawns
    expect(board['a7'], `a7 should be Black Pawn`).toBe(BlackPawnFigure)
    expect(board['b7'], `b7 should be Black Pawn`).toBe(BlackPawnFigure)
    expect(board['c7'], `c7 should be Black Pawn`).toBe(BlackPawnFigure)
    expect(board['d7'], `d7 should be Black Pawn`).toBe(BlackPawnFigure)
    expect(board['e7'], `e7 should be Black Pawn`).toBe(BlackPawnFigure)
    expect(board['f7'], `f7 should be Black Pawn`).toBe(BlackPawnFigure)
    expect(board['g7'], `g7 should be Black Pawn`).toBe(BlackPawnFigure)
    expect(board['h7'], `h7 should be Black Pawn`).toBe(BlackPawnFigure)
  })
})

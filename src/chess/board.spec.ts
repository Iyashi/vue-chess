import { describe, expect, it } from 'vitest'
import { createEmptyBoard, createBoard, clearBoard, resetBoard } from './board'
import { getTileForAxisIndices } from './tile'
import {
  BlackFigure,
  WhiteFigure,
  PawnFigure,
  RookFigure,
  KnightFigure,
  BishopFigure,
  QueenFigure,
  KingFigure,
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
    expect(board['a1'], `a1 should be White Rook`).toBe(WhiteFigure | RookFigure)
    expect(board['b1'], `b1 should be White Knight`).toBe(WhiteFigure | KnightFigure)
    expect(board['c1'], `c1 should be White Bishop`).toBe(WhiteFigure | BishopFigure)
    expect(board['d1'], `d1 should be White King`).toBe(WhiteFigure | KingFigure)
    expect(board['e1'], `e1 should be White Queen`).toBe(WhiteFigure | QueenFigure)
    expect(board['f1'], `f1 should be White Bishop`).toBe(WhiteFigure | BishopFigure)
    expect(board['g1'], `g1 should be White Knight`).toBe(WhiteFigure | KnightFigure)
    expect(board['h1'], `h1 should be White Rook`).toBe(WhiteFigure | RookFigure)
    // White Pawns
    expect(board['a2'], `a2 should be White Pawn`).toBe(WhiteFigure | PawnFigure)
    expect(board['b2'], `b2 should be White Pawn`).toBe(WhiteFigure | PawnFigure)
    expect(board['c2'], `c2 should be White Pawn`).toBe(WhiteFigure | PawnFigure)
    expect(board['d2'], `d2 should be White Pawn`).toBe(WhiteFigure | PawnFigure)
    expect(board['e2'], `e2 should be White Pawn`).toBe(WhiteFigure | PawnFigure)
    expect(board['f2'], `f2 should be White Pawn`).toBe(WhiteFigure | PawnFigure)
    expect(board['g2'], `g2 should be White Pawn`).toBe(WhiteFigure | PawnFigure)
    expect(board['h2'], `h2 should be White Pawn`).toBe(WhiteFigure | PawnFigure)

    // Black Figures
    expect(board['a8'], `a8 should be Black Rook`).toBe(BlackFigure | RookFigure)
    expect(board['b8'], `b8 should be Black Knight`).toBe(BlackFigure | KnightFigure)
    expect(board['c8'], `c8 should be Black Bishop`).toBe(BlackFigure | BishopFigure)
    expect(board['d8'], `d8 should be Black King`).toBe(BlackFigure | KingFigure)
    expect(board['e8'], `e8 should be Black Queen`).toBe(BlackFigure | QueenFigure)
    expect(board['f8'], `f8 should be Black Bishop`).toBe(BlackFigure | BishopFigure)
    expect(board['g8'], `g8 should be Black Knight`).toBe(BlackFigure | KnightFigure)
    expect(board['h8'], `h8 should be Black Rook`).toBe(BlackFigure | RookFigure)
    // Black Pawns
    expect(board['a7'], `a7 should be Black Pawn`).toBe(BlackFigure | PawnFigure)
    expect(board['b7'], `b7 should be Black Pawn`).toBe(BlackFigure | PawnFigure)
    expect(board['c7'], `c7 should be Black Pawn`).toBe(BlackFigure | PawnFigure)
    expect(board['d7'], `d7 should be Black Pawn`).toBe(BlackFigure | PawnFigure)
    expect(board['e7'], `e7 should be Black Pawn`).toBe(BlackFigure | PawnFigure)
    expect(board['f7'], `f7 should be Black Pawn`).toBe(BlackFigure | PawnFigure)
    expect(board['g7'], `g7 should be Black Pawn`).toBe(BlackFigure | PawnFigure)
    expect(board['h7'], `h7 should be Black Pawn`).toBe(BlackFigure | PawnFigure)
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
    board['a5'] = BlackFigure | RookFigure
    board['b5'] = BlackFigure | KnightFigure
    board['c5'] = BlackFigure | BishopFigure
    board['d5'] = BlackFigure | KingFigure
    board['e5'] = BlackFigure | QueenFigure
    board['f5'] = BlackFigure | BishopFigure
    board['g5'] = BlackFigure | KnightFigure
    board['h5'] = BlackFigure | RookFigure

    resetBoard(board)

    // White Figures
    expect(board['a1'], `a1 should be White Rook`).toBe(WhiteFigure | RookFigure)
    expect(board['b1'], `b1 should be White Knight`).toBe(WhiteFigure | KnightFigure)
    expect(board['c1'], `c1 should be White Bishop`).toBe(WhiteFigure | BishopFigure)
    expect(board['d1'], `d1 should be White King`).toBe(WhiteFigure | KingFigure)
    expect(board['e1'], `e1 should be White Queen`).toBe(WhiteFigure | QueenFigure)
    expect(board['f1'], `f1 should be White Bishop`).toBe(WhiteFigure | BishopFigure)
    expect(board['g1'], `g1 should be White Knight`).toBe(WhiteFigure | KnightFigure)
    expect(board['h1'], `h1 should be White Rook`).toBe(WhiteFigure | RookFigure)
    // White Pawns
    expect(board['a2'], `a2 should be White Pawn`).toBe(WhiteFigure | PawnFigure)
    expect(board['b2'], `b2 should be White Pawn`).toBe(WhiteFigure | PawnFigure)
    expect(board['c2'], `c2 should be White Pawn`).toBe(WhiteFigure | PawnFigure)
    expect(board['d2'], `d2 should be White Pawn`).toBe(WhiteFigure | PawnFigure)
    expect(board['e2'], `e2 should be White Pawn`).toBe(WhiteFigure | PawnFigure)
    expect(board['f2'], `f2 should be White Pawn`).toBe(WhiteFigure | PawnFigure)
    expect(board['g2'], `g2 should be White Pawn`).toBe(WhiteFigure | PawnFigure)
    expect(board['h2'], `h2 should be White Pawn`).toBe(WhiteFigure | PawnFigure)

    // Black Figures
    expect(board['a8'], `a8 should be Black Rook`).toBe(BlackFigure | RookFigure)
    expect(board['b8'], `b8 should be Black Knight`).toBe(BlackFigure | KnightFigure)
    expect(board['c8'], `c8 should be Black Bishop`).toBe(BlackFigure | BishopFigure)
    expect(board['d8'], `d8 should be Black King`).toBe(BlackFigure | KingFigure)
    expect(board['e8'], `e8 should be Black Queen`).toBe(BlackFigure | QueenFigure)
    expect(board['f8'], `f8 should be Black Bishop`).toBe(BlackFigure | BishopFigure)
    expect(board['g8'], `g8 should be Black Knight`).toBe(BlackFigure | KnightFigure)
    expect(board['h8'], `h8 should be Black Rook`).toBe(BlackFigure | RookFigure)
    // Black Pawns
    expect(board['a7'], `a7 should be Black Pawn`).toBe(BlackFigure | PawnFigure)
    expect(board['b7'], `b7 should be Black Pawn`).toBe(BlackFigure | PawnFigure)
    expect(board['c7'], `c7 should be Black Pawn`).toBe(BlackFigure | PawnFigure)
    expect(board['d7'], `d7 should be Black Pawn`).toBe(BlackFigure | PawnFigure)
    expect(board['e7'], `e7 should be Black Pawn`).toBe(BlackFigure | PawnFigure)
    expect(board['f7'], `f7 should be Black Pawn`).toBe(BlackFigure | PawnFigure)
    expect(board['g7'], `g7 should be Black Pawn`).toBe(BlackFigure | PawnFigure)
    expect(board['h7'], `h7 should be Black Pawn`).toBe(BlackFigure | PawnFigure)
  })
})

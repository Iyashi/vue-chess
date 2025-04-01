import {
  BlackFigure,
  WhiteFigure,
  PawnFigure,
  RookFigure,
  KnightFigure,
  BishopFigure,
  QueenFigure,
  KingFigure,
  type Figure,
} from './figure'
import { getVerticalKeyForAxisIndex, getHorizontalKeyForAxisIndex, type Tile } from './tile'

export type Board = Record<Tile, Figure | 0>

export function createEmptyBoard(): Board {
  const board = {} as Board
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const tile = (getHorizontalKeyForAxisIndex(x) + getVerticalKeyForAxisIndex(y)) as Tile
      board[tile] = 0
    }
  }
  return board
}

export function createBoard(): Board {
  const board = createEmptyBoard()
  resetBoard(board)
  return board
}

export function clearBoard(board: Board): void {
  for (const tile in board) {
    board[tile as Tile] = 0
  }
}

export function resetBoard(board: Board): void {
  clearBoard(board)

  // White Figures
  board['a1'] = WhiteFigure | RookFigure
  board['b1'] = WhiteFigure | KnightFigure
  board['c1'] = WhiteFigure | BishopFigure
  board['d1'] = WhiteFigure | KingFigure
  board['e1'] = WhiteFigure | QueenFigure
  board['f1'] = WhiteFigure | BishopFigure
  board['g1'] = WhiteFigure | KnightFigure
  board['h1'] = WhiteFigure | RookFigure
  // White Pawns
  board['a2'] = WhiteFigure | PawnFigure
  board['b2'] = WhiteFigure | PawnFigure
  board['c2'] = WhiteFigure | PawnFigure
  board['d2'] = WhiteFigure | PawnFigure
  board['e2'] = WhiteFigure | PawnFigure
  board['f2'] = WhiteFigure | PawnFigure
  board['g2'] = WhiteFigure | PawnFigure
  board['h2'] = WhiteFigure | PawnFigure

  // Black Figures
  board['a8'] = BlackFigure | RookFigure
  board['b8'] = BlackFigure | KnightFigure
  board['c8'] = BlackFigure | BishopFigure
  board['d8'] = BlackFigure | KingFigure
  board['e8'] = BlackFigure | QueenFigure
  board['f8'] = BlackFigure | BishopFigure
  board['g8'] = BlackFigure | KnightFigure
  board['h8'] = BlackFigure | RookFigure
  // Black Pawns
  board['a7'] = BlackFigure | PawnFigure
  board['b7'] = BlackFigure | PawnFigure
  board['c7'] = BlackFigure | PawnFigure
  board['d7'] = BlackFigure | PawnFigure
  board['e7'] = BlackFigure | PawnFigure
  board['f7'] = BlackFigure | PawnFigure
  board['g7'] = BlackFigure | PawnFigure
  board['h7'] = BlackFigure | PawnFigure
}

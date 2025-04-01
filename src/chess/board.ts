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
  board['a1'] = WhiteRookFigure
  board['b1'] = WhiteKnightFigure
  board['c1'] = WhiteBishopFigure
  board['d1'] = WhiteKingFigure
  board['e1'] = WhiteQueenFigure
  board['f1'] = WhiteBishopFigure
  board['g1'] = WhiteKnightFigure
  board['h1'] = WhiteRookFigure
  // White Pawns
  board['a2'] = WhitePawnFigure
  board['b2'] = WhitePawnFigure
  board['c2'] = WhitePawnFigure
  board['d2'] = WhitePawnFigure
  board['e2'] = WhitePawnFigure
  board['f2'] = WhitePawnFigure
  board['g2'] = WhitePawnFigure
  board['h2'] = WhitePawnFigure

  // Black Figures
  board['a8'] = BlackRookFigure
  board['b8'] = BlackKnightFigure
  board['c8'] = BlackBishopFigure
  board['d8'] = BlackKingFigure
  board['e8'] = BlackQueenFigure
  board['f8'] = BlackBishopFigure
  board['g8'] = BlackKnightFigure
  board['h8'] = BlackRookFigure
  // Black Pawns
  board['a7'] = BlackPawnFigure
  board['b7'] = BlackPawnFigure
  board['c7'] = BlackPawnFigure
  board['d7'] = BlackPawnFigure
  board['e7'] = BlackPawnFigure
  board['f7'] = BlackPawnFigure
  board['g7'] = BlackPawnFigure
  board['h7'] = BlackPawnFigure
}

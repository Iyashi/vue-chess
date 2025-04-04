import type { Board, Tile } from './types'
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
import { getTileForAxisIndices } from './tile'

export function createEmptyBoard(): Board {
  const board = {} as Board
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const tile = getTileForAxisIndices(x, y)
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

  // White Pieces
  board['a1'] = WhitePiece | RookPiece
  board['b1'] = WhitePiece | KnightPiece
  board['c1'] = WhitePiece | BishopPiece
  board['d1'] = WhitePiece | KingPiece
  board['e1'] = WhitePiece | QueenPiece
  board['f1'] = WhitePiece | BishopPiece
  board['g1'] = WhitePiece | KnightPiece
  board['h1'] = WhitePiece | RookPiece
  // White Pawns
  board['a2'] = WhitePiece | PawnPiece
  board['b2'] = WhitePiece | PawnPiece
  board['c2'] = WhitePiece | PawnPiece
  board['d2'] = WhitePiece | PawnPiece
  board['e2'] = WhitePiece | PawnPiece
  board['f2'] = WhitePiece | PawnPiece
  board['g2'] = WhitePiece | PawnPiece
  board['h2'] = WhitePiece | PawnPiece

  // Black Pieces
  board['a8'] = BlackPiece | RookPiece
  board['b8'] = BlackPiece | KnightPiece
  board['c8'] = BlackPiece | BishopPiece
  board['d8'] = BlackPiece | KingPiece
  board['e8'] = BlackPiece | QueenPiece
  board['f8'] = BlackPiece | BishopPiece
  board['g8'] = BlackPiece | KnightPiece
  board['h8'] = BlackPiece | RookPiece
  // Black Pawns
  board['a7'] = BlackPiece | PawnPiece
  board['b7'] = BlackPiece | PawnPiece
  board['c7'] = BlackPiece | PawnPiece
  board['d7'] = BlackPiece | PawnPiece
  board['e7'] = BlackPiece | PawnPiece
  board['f7'] = BlackPiece | PawnPiece
  board['g7'] = BlackPiece | PawnPiece
  board['h7'] = BlackPiece | PawnPiece
}

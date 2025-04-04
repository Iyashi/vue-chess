import { describe, it, expect } from 'vitest'
import {
  BlackPiece,
  WhitePiece,
  PromotedPiece,
  PawnPiece,
  RookPiece,
  KnightPiece,
  BishopPiece,
  QueenPiece,
  KingPiece,
  isPawnPiece,
  isRookPiece,
  isKnightPiece,
  isBishopPiece,
  isQueenPiece,
  isKingPiece,
  isPiece,
  isPromotedPiece,
  isBlackPiece,
  isWhitePiece,
  isEnemyPiece,
  getPieceKind,
  getPieceDesciption,
  MovedOnce,
  hasPieceMoved,
  BasePieces,
} from './piece'

describe('isPawnPiece', () => {
  const fn = isPawnPiece
  it('should return true for pawn pieces', () => {
    expect(fn(PawnPiece)).toBe(true)
    expect(fn(BlackPiece | PawnPiece)).toBe(true)
    expect(fn(WhitePiece | PawnPiece)).toBe(true)
  })
  it('should return false for non-pawn pieces', () => {
    expect(fn(RookPiece)).toBe(false)
    expect(fn(KnightPiece)).toBe(false)
    expect(fn(BishopPiece)).toBe(false)
    expect(fn(QueenPiece)).toBe(false)
    expect(fn(KingPiece)).toBe(false)
    expect(fn(RookPiece | PromotedPiece)).toBe(false)
    expect(fn(KnightPiece | PromotedPiece)).toBe(false)
    expect(fn(BishopPiece | PromotedPiece)).toBe(false)
    expect(fn(QueenPiece | PromotedPiece)).toBe(false)
    expect(fn(BlackPiece | RookPiece)).toBe(false)
    expect(fn(BlackPiece | KnightPiece)).toBe(false)
    expect(fn(BlackPiece | BishopPiece)).toBe(false)
    expect(fn(BlackPiece | QueenPiece)).toBe(false)
    expect(fn(BlackPiece | KingPiece)).toBe(false)
    expect(fn(BlackPiece | RookPiece | PromotedPiece)).toBe(false)
    expect(fn(BlackPiece | KnightPiece | PromotedPiece)).toBe(false)
    expect(fn(BlackPiece | BishopPiece | PromotedPiece)).toBe(false)
    expect(fn(BlackPiece | QueenPiece | PromotedPiece)).toBe(false)
    expect(fn(WhitePiece | RookPiece)).toBe(false)
    expect(fn(WhitePiece | KnightPiece)).toBe(false)
    expect(fn(WhitePiece | BishopPiece)).toBe(false)
    expect(fn(WhitePiece | QueenPiece)).toBe(false)
    expect(fn(WhitePiece | KingPiece)).toBe(false)
    expect(fn(WhitePiece | RookPiece | PromotedPiece)).toBe(false)
    expect(fn(WhitePiece | KnightPiece | PromotedPiece)).toBe(false)
    expect(fn(WhitePiece | BishopPiece | PromotedPiece)).toBe(false)
    expect(fn(WhitePiece | QueenPiece | PromotedPiece)).toBe(false)
  })
})

describe('isRookPiece', () => {
  const fn = isRookPiece
  it('should return true for rook pieces', () => {
    expect(fn(RookPiece)).toBe(true)
    expect(fn(RookPiece | BlackPiece)).toBe(true)
    expect(fn(RookPiece | WhitePiece)).toBe(true)
    expect(fn(RookPiece | PromotedPiece)).toBe(true)
    expect(fn(BlackPiece | RookPiece | PromotedPiece)).toBe(true)
    expect(fn(WhitePiece | RookPiece | PromotedPiece)).toBe(true)
  })
  it('should return false for non-rook pieces', () => {
    expect(fn(PawnPiece)).toBe(false)
    expect(fn(KnightPiece)).toBe(false)
    expect(fn(BishopPiece)).toBe(false)
    expect(fn(QueenPiece)).toBe(false)
    expect(fn(KingPiece)).toBe(false)
    expect(fn(KnightPiece | PromotedPiece)).toBe(false)
    expect(fn(BishopPiece | PromotedPiece)).toBe(false)
    expect(fn(QueenPiece | PromotedPiece)).toBe(false)
    expect(fn(BlackPiece | PawnPiece)).toBe(false)
    expect(fn(BlackPiece | KnightPiece)).toBe(false)
    expect(fn(BlackPiece | BishopPiece)).toBe(false)
    expect(fn(BlackPiece | QueenPiece)).toBe(false)
    expect(fn(BlackPiece | KingPiece)).toBe(false)
    expect(fn(BlackPiece | KnightPiece | PromotedPiece)).toBe(false)
    expect(fn(BlackPiece | BishopPiece | PromotedPiece)).toBe(false)
    expect(fn(BlackPiece | QueenPiece | PromotedPiece)).toBe(false)
    expect(fn(WhitePiece | PawnPiece)).toBe(false)
    expect(fn(WhitePiece | KnightPiece)).toBe(false)
    expect(fn(WhitePiece | BishopPiece)).toBe(false)
    expect(fn(WhitePiece | QueenPiece)).toBe(false)
    expect(fn(WhitePiece | KingPiece)).toBe(false)
    expect(fn(WhitePiece | KnightPiece | PromotedPiece)).toBe(false)
    expect(fn(WhitePiece | BishopPiece | PromotedPiece)).toBe(false)
    expect(fn(WhitePiece | QueenPiece | PromotedPiece)).toBe(false)
  })
})

describe('isKnightPiece', () => {
  const fn = isKnightPiece
  it('should return true for knight pieces', () => {
    expect(fn(KnightPiece)).toBe(true)
    expect(fn(KnightPiece | PromotedPiece)).toBe(true)
    expect(fn(BlackPiece | KnightPiece)).toBe(true)
    expect(fn(BlackPiece | KnightPiece | PromotedPiece)).toBe(true)
    expect(fn(WhitePiece | KnightPiece)).toBe(true)
    expect(fn(WhitePiece | KnightPiece | PromotedPiece)).toBe(true)
  })
  it('should return false for non-knight pieces', () => {
    expect(fn(PawnPiece)).toBe(false)
    expect(fn(RookPiece)).toBe(false)
    expect(fn(BishopPiece)).toBe(false)
    expect(fn(QueenPiece)).toBe(false)
    expect(fn(KingPiece)).toBe(false)
    expect(fn(RookPiece | PromotedPiece)).toBe(false)
    expect(fn(BishopPiece | PromotedPiece)).toBe(false)
    expect(fn(QueenPiece | PromotedPiece)).toBe(false)
    expect(fn(BlackPiece | PawnPiece)).toBe(false)
    expect(fn(BlackPiece | RookPiece)).toBe(false)
    expect(fn(BlackPiece | BishopPiece)).toBe(false)
    expect(fn(BlackPiece | QueenPiece)).toBe(false)
    expect(fn(BlackPiece | KingPiece)).toBe(false)
    expect(fn(BlackPiece | RookPiece | PromotedPiece)).toBe(false)
    expect(fn(BlackPiece | BishopPiece | PromotedPiece)).toBe(false)
    expect(fn(BlackPiece | QueenPiece | PromotedPiece)).toBe(false)
    expect(fn(WhitePiece | PawnPiece)).toBe(false)
    expect(fn(WhitePiece | RookPiece)).toBe(false)
    expect(fn(WhitePiece | BishopPiece)).toBe(false)
    expect(fn(WhitePiece | QueenPiece)).toBe(false)
    expect(fn(WhitePiece | KingPiece)).toBe(false)
    expect(fn(WhitePiece | RookPiece | PromotedPiece)).toBe(false)
    expect(fn(WhitePiece | BishopPiece | PromotedPiece)).toBe(false)
    expect(fn(WhitePiece | QueenPiece | PromotedPiece)).toBe(false)
  })
})

describe('isBishopPiece', () => {
  const fn = isBishopPiece
  it('should return true for bishop pieces', () => {
    expect(fn(BishopPiece)).toBe(true)
    expect(fn(BishopPiece | PromotedPiece)).toBe(true)
    expect(fn(BlackPiece | BishopPiece)).toBe(true)
    expect(fn(BlackPiece | BishopPiece | PromotedPiece)).toBe(true)
    expect(fn(WhitePiece | BishopPiece)).toBe(true)
    expect(fn(WhitePiece | BishopPiece | PromotedPiece)).toBe(true)
  })
  it('should return false for non-bishop pieces', () => {
    expect(fn(PawnPiece)).toBe(false)
    expect(fn(RookPiece)).toBe(false)
    expect(fn(KnightPiece)).toBe(false)
    expect(fn(QueenPiece)).toBe(false)
    expect(fn(KingPiece)).toBe(false)
    expect(fn(RookPiece | PromotedPiece)).toBe(false)
    expect(fn(KnightPiece | PromotedPiece)).toBe(false)
    expect(fn(QueenPiece | PromotedPiece)).toBe(false)
    expect(fn(BlackPiece | PawnPiece)).toBe(false)
    expect(fn(BlackPiece | RookPiece)).toBe(false)
    expect(fn(BlackPiece | KnightPiece)).toBe(false)
    expect(fn(BlackPiece | QueenPiece)).toBe(false)
    expect(fn(BlackPiece | KingPiece)).toBe(false)
    expect(fn(BlackPiece | RookPiece | PromotedPiece)).toBe(false)
    expect(fn(BlackPiece | KnightPiece | PromotedPiece)).toBe(false)
    expect(fn(BlackPiece | QueenPiece | PromotedPiece)).toBe(false)
    expect(fn(WhitePiece | PawnPiece)).toBe(false)
    expect(fn(WhitePiece | RookPiece)).toBe(false)
    expect(fn(WhitePiece | KnightPiece)).toBe(false)
    expect(fn(WhitePiece | QueenPiece)).toBe(false)
    expect(fn(WhitePiece | KingPiece)).toBe(false)
    expect(fn(WhitePiece | RookPiece | PromotedPiece)).toBe(false)
    expect(fn(WhitePiece | KnightPiece | PromotedPiece)).toBe(false)
    expect(fn(WhitePiece | QueenPiece | PromotedPiece)).toBe(false)
  })
})

describe('isQueenPiece', () => {
  const fn = isQueenPiece
  it('should return true for queen pieces', () => {
    expect(fn(QueenPiece)).toBe(true)
    expect(fn(QueenPiece | PromotedPiece)).toBe(true)
    expect(fn(BlackPiece | QueenPiece)).toBe(true)
    expect(fn(BlackPiece | QueenPiece | PromotedPiece)).toBe(true)
    expect(fn(WhitePiece | QueenPiece)).toBe(true)
    expect(fn(WhitePiece | QueenPiece | PromotedPiece)).toBe(true)
  })
  it('should return false for non-queen pieces', () => {
    expect(fn(PawnPiece)).toBe(false)
    expect(fn(RookPiece)).toBe(false)
    expect(fn(KnightPiece)).toBe(false)
    expect(fn(BishopPiece)).toBe(false)
    expect(fn(KingPiece)).toBe(false)
    expect(fn(RookPiece | PromotedPiece)).toBe(false)
    expect(fn(KnightPiece | PromotedPiece)).toBe(false)
    expect(fn(BishopPiece | PromotedPiece)).toBe(false)
    expect(fn(BlackPiece | PawnPiece)).toBe(false)
    expect(fn(BlackPiece | RookPiece)).toBe(false)
    expect(fn(BlackPiece | KnightPiece)).toBe(false)
    expect(fn(BlackPiece | BishopPiece)).toBe(false)
    expect(fn(BlackPiece | KingPiece)).toBe(false)
    expect(fn(BlackPiece | RookPiece | PromotedPiece)).toBe(false)
    expect(fn(BlackPiece | KnightPiece | PromotedPiece)).toBe(false)
    expect(fn(BlackPiece | BishopPiece | PromotedPiece)).toBe(false)
    expect(fn(WhitePiece | PawnPiece)).toBe(false)
    expect(fn(WhitePiece | RookPiece)).toBe(false)
    expect(fn(WhitePiece | KnightPiece)).toBe(false)
    expect(fn(WhitePiece | BishopPiece)).toBe(false)
    expect(fn(WhitePiece | KingPiece)).toBe(false)
    expect(fn(WhitePiece | RookPiece | PromotedPiece)).toBe(false)
    expect(fn(WhitePiece | KnightPiece | PromotedPiece)).toBe(false)
    expect(fn(WhitePiece | BishopPiece | PromotedPiece)).toBe(false)
  })
})

describe('isKingPiece', () => {
  const fn = isKingPiece
  it('should return true for king pieces', () => {
    expect(fn(KingPiece)).toBe(true)
    expect(fn(BlackPiece | KingPiece)).toBe(true)
    expect(fn(WhitePiece | KingPiece)).toBe(true)
  })
  it('should return false for non-king pieces', () => {
    expect(fn(PawnPiece)).toBe(false)
    expect(fn(RookPiece)).toBe(false)
    expect(fn(KnightPiece)).toBe(false)
    expect(fn(BishopPiece)).toBe(false)
    expect(fn(QueenPiece)).toBe(false)
    expect(fn(RookPiece | PromotedPiece)).toBe(false)
    expect(fn(KnightPiece | PromotedPiece)).toBe(false)
    expect(fn(BishopPiece | PromotedPiece)).toBe(false)
    expect(fn(QueenPiece | PromotedPiece)).toBe(false)
    expect(fn(BlackPiece | PawnPiece)).toBe(false)
    expect(fn(BlackPiece | RookPiece)).toBe(false)
    expect(fn(BlackPiece | KnightPiece)).toBe(false)
    expect(fn(BlackPiece | BishopPiece)).toBe(false)
    expect(fn(BlackPiece | QueenPiece)).toBe(false)
    expect(fn(BlackPiece | RookPiece | PromotedPiece)).toBe(false)
    expect(fn(BlackPiece | KnightPiece | PromotedPiece)).toBe(false)
    expect(fn(BlackPiece | BishopPiece | PromotedPiece)).toBe(false)
    expect(fn(BlackPiece | QueenPiece | PromotedPiece)).toBe(false)
    expect(fn(WhitePiece | PawnPiece)).toBe(false)
    expect(fn(WhitePiece | RookPiece)).toBe(false)
    expect(fn(WhitePiece | KnightPiece)).toBe(false)
    expect(fn(WhitePiece | BishopPiece)).toBe(false)
    expect(fn(WhitePiece | QueenPiece)).toBe(false)
    expect(fn(WhitePiece | RookPiece | PromotedPiece)).toBe(false)
    expect(fn(WhitePiece | KnightPiece | PromotedPiece)).toBe(false)
    expect(fn(WhitePiece | BishopPiece | PromotedPiece)).toBe(false)
    expect(fn(WhitePiece | QueenPiece | PromotedPiece)).toBe(false)
  })
})

describe('isPromotedPiece', () => {
  const fn = isPromotedPiece
  it('should return true for promoted pieces', () => {
    expect(fn(RookPiece | PromotedPiece)).toBe(true)
    expect(fn(KnightPiece | PromotedPiece)).toBe(true)
    expect(fn(BishopPiece | PromotedPiece)).toBe(true)
    expect(fn(QueenPiece | PromotedPiece)).toBe(true)
    expect(fn(BlackPiece | RookPiece | PromotedPiece)).toBe(true)
    expect(fn(BlackPiece | KnightPiece | PromotedPiece)).toBe(true)
    expect(fn(BlackPiece | BishopPiece | PromotedPiece)).toBe(true)
    expect(fn(BlackPiece | QueenPiece | PromotedPiece)).toBe(true)
    expect(fn(WhitePiece | RookPiece | PromotedPiece)).toBe(true)
    expect(fn(WhitePiece | KnightPiece | PromotedPiece)).toBe(true)
    expect(fn(WhitePiece | BishopPiece | PromotedPiece)).toBe(true)
    expect(fn(WhitePiece | QueenPiece | PromotedPiece)).toBe(true)
  })
  it('should return false for non-promoted pieces', () => {
    expect(fn(PawnPiece)).toBe(false)
    expect(fn(RookPiece)).toBe(false)
    expect(fn(KnightPiece)).toBe(false)
    expect(fn(BishopPiece)).toBe(false)
    expect(fn(QueenPiece)).toBe(false)
    expect(fn(BlackPiece | PawnPiece)).toBe(false)
    expect(fn(BlackPiece | RookPiece)).toBe(false)
    expect(fn(BlackPiece | KnightPiece)).toBe(false)
    expect(fn(BlackPiece | BishopPiece)).toBe(false)
    expect(fn(BlackPiece | QueenPiece)).toBe(false)
    expect(fn(WhitePiece | PawnPiece)).toBe(false)
    expect(fn(WhitePiece | RookPiece)).toBe(false)
    expect(fn(WhitePiece | KnightPiece)).toBe(false)
    expect(fn(WhitePiece | BishopPiece)).toBe(false)
    expect(fn(WhitePiece | QueenPiece)).toBe(false)
  })
})

describe('isPiece', () => {
  const fn = isPiece
  it('should return true for any valid piece', () => {
    expect(fn(PawnPiece)).toBe(true)
    expect(fn(RookPiece)).toBe(true)
    expect(fn(KnightPiece)).toBe(true)
    expect(fn(BishopPiece)).toBe(true)
    expect(fn(QueenPiece)).toBe(true)
    expect(fn(KingPiece)).toBe(true)
    expect(fn(RookPiece | PromotedPiece)).toBe(true)
    expect(fn(KnightPiece | PromotedPiece)).toBe(true)
    expect(fn(BishopPiece | PromotedPiece)).toBe(true)
    expect(fn(QueenPiece | PromotedPiece)).toBe(true)
    expect(fn(BlackPiece | PawnPiece)).toBe(true)
    expect(fn(BlackPiece | RookPiece)).toBe(true)
    expect(fn(BlackPiece | KnightPiece)).toBe(true)
    expect(fn(BlackPiece | BishopPiece)).toBe(true)
    expect(fn(BlackPiece | QueenPiece)).toBe(true)
    expect(fn(BlackPiece | KingPiece)).toBe(true)
    expect(fn(BlackPiece | RookPiece | PromotedPiece)).toBe(true)
    expect(fn(BlackPiece | KnightPiece | PromotedPiece)).toBe(true)
    expect(fn(BlackPiece | BishopPiece | PromotedPiece)).toBe(true)
    expect(fn(BlackPiece | QueenPiece | PromotedPiece)).toBe(true)
    expect(fn(WhitePiece | PawnPiece)).toBe(true)
    expect(fn(WhitePiece | RookPiece)).toBe(true)
    expect(fn(WhitePiece | KnightPiece)).toBe(true)
    expect(fn(WhitePiece | BishopPiece)).toBe(true)
    expect(fn(WhitePiece | QueenPiece)).toBe(true)
    expect(fn(WhitePiece | KingPiece)).toBe(true)
    expect(fn(WhitePiece | RookPiece | PromotedPiece)).toBe(true)
    expect(fn(WhitePiece | KnightPiece | PromotedPiece)).toBe(true)
    expect(fn(WhitePiece | BishopPiece | PromotedPiece)).toBe(true)
    expect(fn(WhitePiece | QueenPiece | PromotedPiece)).toBe(true)
  })
  it('should return false for invalid pieces', () => {
    expect(fn(0)).toBe(false)
  })
})

describe('isBlackPiece', () => {
  it('should return true for valid black pieces', () => {
    expect(isBlackPiece(BlackPiece | PawnPiece)).toBe(true)
    expect(isBlackPiece(BlackPiece | RookPiece)).toBe(true)
    expect(isBlackPiece(BlackPiece | KnightPiece)).toBe(true)
    expect(isBlackPiece(BlackPiece | BishopPiece)).toBe(true)
    expect(isBlackPiece(BlackPiece | QueenPiece)).toBe(true)
    expect(isBlackPiece(BlackPiece | KingPiece)).toBe(true)
    expect(isBlackPiece(BlackPiece | RookPiece | PromotedPiece)).toBe(true)
    expect(isBlackPiece(BlackPiece | KnightPiece | PromotedPiece)).toBe(true)
    expect(isBlackPiece(BlackPiece | BishopPiece | PromotedPiece)).toBe(true)
    expect(isBlackPiece(BlackPiece | QueenPiece | PromotedPiece)).toBe(true)
  })
  it('should return false for invalid black pieces', () => {
    expect(isBlackPiece(BlackPiece)).toBe(false) // not a piece, only black flag
    expect(isBlackPiece(WhitePiece)).toBe(false)
    expect(isBlackPiece(WhitePiece | PawnPiece)).toBe(false)
    expect(isBlackPiece(WhitePiece | RookPiece)).toBe(false)
    expect(isBlackPiece(WhitePiece | KnightPiece)).toBe(false)
    expect(isBlackPiece(WhitePiece | BishopPiece)).toBe(false)
    expect(isBlackPiece(WhitePiece | QueenPiece)).toBe(false)
    expect(isBlackPiece(WhitePiece | KingPiece)).toBe(false)
    expect(isBlackPiece(WhitePiece | RookPiece | PromotedPiece)).toBe(false)
    expect(isBlackPiece(WhitePiece | KnightPiece | PromotedPiece)).toBe(false)
    expect(isBlackPiece(WhitePiece | BishopPiece | PromotedPiece)).toBe(false)
    expect(isBlackPiece(WhitePiece | QueenPiece | PromotedPiece)).toBe(false)
  })
})

describe('isWhitePiece', () => {
  it('should return true for valid white pieces', () => {
    expect(isWhitePiece(WhitePiece | PawnPiece)).toBe(true)
    expect(isWhitePiece(WhitePiece | RookPiece)).toBe(true)
    expect(isWhitePiece(WhitePiece | KnightPiece)).toBe(true)
    expect(isWhitePiece(WhitePiece | BishopPiece)).toBe(true)
    expect(isWhitePiece(WhitePiece | QueenPiece)).toBe(true)
    expect(isWhitePiece(WhitePiece | KingPiece)).toBe(true)
    expect(isWhitePiece(WhitePiece | RookPiece | PromotedPiece)).toBe(true)
    expect(isWhitePiece(WhitePiece | KnightPiece | PromotedPiece)).toBe(true)
    expect(isWhitePiece(WhitePiece | BishopPiece | PromotedPiece)).toBe(true)
    expect(isWhitePiece(WhitePiece | QueenPiece | PromotedPiece)).toBe(true)
  })
  it('should return false for invalid white pieces', () => {
    expect(isWhitePiece(WhitePiece)).toBe(false) // not a piece, only white flag
    expect(isWhitePiece(BlackPiece)).toBe(false)
    expect(isWhitePiece(BlackPiece | PawnPiece)).toBe(false)
    expect(isWhitePiece(BlackPiece | RookPiece)).toBe(false)
    expect(isWhitePiece(BlackPiece | KnightPiece)).toBe(false)
    expect(isWhitePiece(BlackPiece | BishopPiece)).toBe(false)
    expect(isWhitePiece(BlackPiece | QueenPiece)).toBe(false)
    expect(isWhitePiece(BlackPiece | KingPiece)).toBe(false)
    expect(isWhitePiece(BlackPiece | RookPiece | PromotedPiece)).toBe(false)
    expect(isWhitePiece(BlackPiece | KnightPiece | PromotedPiece)).toBe(false)
    expect(isWhitePiece(BlackPiece | BishopPiece | PromotedPiece)).toBe(false)
    expect(isWhitePiece(BlackPiece | QueenPiece | PromotedPiece)).toBe(false)
  })
})

describe('isEnemyPiece', () => {
  it('should return true for valid enemy pieces', () => {
    expect(isEnemyPiece(WhitePiece | PawnPiece, BlackPiece | PawnPiece)).toBe(true)
    expect(isEnemyPiece(BlackPiece | PawnPiece, WhitePiece | PawnPiece)).toBe(true)
  })
  it('should return false for valid friendly pieces', () => {
    expect(isEnemyPiece(WhitePiece | PawnPiece, WhitePiece | PawnPiece)).toBe(false)
    expect(isEnemyPiece(BlackPiece | PawnPiece, BlackPiece | PawnPiece)).toBe(false)
  })
  it('should return null for invalid/uncolored pieces', () => {
    expect(isEnemyPiece(PawnPiece, PawnPiece)).toBe(null)
    expect(isEnemyPiece(BlackPiece | PawnPiece, PawnPiece)).toBe(null)
    expect(isEnemyPiece(PawnPiece, BlackPiece | PawnPiece)).toBe(null)
    expect(isEnemyPiece(WhitePiece | PawnPiece, PawnPiece)).toBe(null)
    expect(isEnemyPiece(PawnPiece, WhitePiece | PawnPiece)).toBe(null)
  })
})

describe('hasPieceMoved', () => {
  const fn = hasPieceMoved
  it('should return true for any valid piece which moved once', () => {
    expect(fn(BlackPiece | PawnPiece | MovedOnce)).toBe(true)
    expect(fn(WhitePiece | PawnPiece | MovedOnce)).toBe(true)
  })
  it('should return false for any valid piece which did not move yet', () => {
    expect(fn(BlackPiece | PawnPiece)).toBe(false)
    expect(fn(WhitePiece | PawnPiece)).toBe(false)
  })
})

describe('getPieceKind', () => {
  it('should return pawn for any valid pawn piece', () => {
    expect(getPieceKind(PawnPiece)).toBe('pawn')
    expect(getPieceKind(PawnPiece | MovedOnce)).toBe('pawn')
    expect(getPieceKind(BlackPiece | PawnPiece)).toBe('pawn')
    expect(getPieceKind(BlackPiece | PawnPiece | MovedOnce)).toBe('pawn')
    expect(getPieceKind(WhitePiece | PawnPiece)).toBe('pawn')
    expect(getPieceKind(WhitePiece | PawnPiece | MovedOnce)).toBe('pawn')
  })
  it('should return rook for any valid rook piece', () => {
    expect(getPieceKind(RookPiece)).toBe('rook')
    expect(getPieceKind(RookPiece | MovedOnce)).toBe('rook')
    expect(getPieceKind(BlackPiece | RookPiece)).toBe('rook')
    expect(getPieceKind(BlackPiece | RookPiece | MovedOnce)).toBe('rook')
    expect(getPieceKind(BlackPiece | RookPiece | PromotedPiece)).toBe('rook')
    expect(getPieceKind(WhitePiece | RookPiece)).toBe('rook')
    expect(getPieceKind(WhitePiece | RookPiece | MovedOnce)).toBe('rook')
    expect(getPieceKind(WhitePiece | RookPiece | PromotedPiece)).toBe('rook')
  })
  it('should return knight for any valid knight piece', () => {
    expect(getPieceKind(KnightPiece)).toBe('knight')
    expect(getPieceKind(KnightPiece | MovedOnce)).toBe('knight')
    expect(getPieceKind(BlackPiece | KnightPiece)).toBe('knight')
    expect(getPieceKind(BlackPiece | KnightPiece | MovedOnce)).toBe('knight')
    expect(getPieceKind(BlackPiece | KnightPiece | MovedOnce)).toBe('knight')
    expect(getPieceKind(WhitePiece | KnightPiece)).toBe('knight')
    expect(getPieceKind(WhitePiece | KnightPiece | MovedOnce)).toBe('knight')
    expect(getPieceKind(WhitePiece | KnightPiece | PromotedPiece)).toBe('knight')
  })
  it('should return bishop for any valid bishop piece', () => {
    expect(getPieceKind(BishopPiece)).toBe('bishop')
    expect(getPieceKind(BishopPiece | MovedOnce)).toBe('bishop')
    expect(getPieceKind(BlackPiece | BishopPiece)).toBe('bishop')
    expect(getPieceKind(BlackPiece | BishopPiece | MovedOnce)).toBe('bishop')
    expect(getPieceKind(BlackPiece | BishopPiece | PromotedPiece)).toBe('bishop')
    expect(getPieceKind(WhitePiece | BishopPiece)).toBe('bishop')
    expect(getPieceKind(WhitePiece | BishopPiece | MovedOnce)).toBe('bishop')
    expect(getPieceKind(WhitePiece | BishopPiece | PromotedPiece)).toBe('bishop')
  })
  it('should return queen for any valid queen piece', () => {
    expect(getPieceKind(QueenPiece)).toBe('queen')
    expect(getPieceKind(QueenPiece | MovedOnce)).toBe('queen')
    expect(getPieceKind(BlackPiece | QueenPiece)).toBe('queen')
    expect(getPieceKind(BlackPiece | QueenPiece | MovedOnce)).toBe('queen')
    expect(getPieceKind(BlackPiece | QueenPiece | PromotedPiece)).toBe('queen')
    expect(getPieceKind(WhitePiece | QueenPiece)).toBe('queen')
    expect(getPieceKind(WhitePiece | QueenPiece | MovedOnce)).toBe('queen')
    expect(getPieceKind(WhitePiece | QueenPiece | PromotedPiece)).toBe('queen')
  })
  it('should return king for any valid king piece', () => {
    expect(getPieceKind(KingPiece)).toBe('king')
    expect(getPieceKind(KingPiece | MovedOnce)).toBe('king')
    expect(getPieceKind(BlackPiece | KingPiece)).toBe('king')
    expect(getPieceKind(BlackPiece | KingPiece | MovedOnce)).toBe('king')
    expect(getPieceKind(WhitePiece | KingPiece)).toBe('king')
    expect(getPieceKind(WhitePiece | KingPiece | MovedOnce)).toBe('king')
  })
  it('should return invalid for any invalid piece', () => {
    expect(getPieceKind(BlackPiece)).toBe('invalid')
    expect(getPieceKind(WhitePiece)).toBe('invalid')
  })
})

describe('getPieceDesciption', () => {
  const fn = getPieceDesciption

  // Base pieces
  it('should return the correct description for a pawn', () => {
    expect(fn(PawnPiece)).toBe('Pawn')
  })
  it('should return the correct description for a rook', () => {
    expect(fn(RookPiece)).toBe('Rook')
  })
  it('should return the correct description for a knight', () => {
    expect(fn(KnightPiece)).toBe('Knight')
  })
  it('should return the correct description for a bishop', () => {
    expect(fn(BishopPiece)).toBe('Bishop')
  })
  it('should return the correct description for a queen', () => {
    expect(fn(QueenPiece)).toBe('Queen')
  })
  it('should return the correct description for a king', () => {
    expect(fn(KingPiece)).toBe('King')
  })

  // Promoted pieces
  it('should return the correct description for a promoted rook', () => {
    expect(fn(RookPiece | PromotedPiece)).toBe('Rook (Promoted)')
  })
  it('should return the correct description for a promoted knight', () => {
    expect(fn(KnightPiece | PromotedPiece)).toBe('Knight (Promoted)')
  })
  it('should return the correct description for a promoted bishop', () => {
    expect(fn(BishopPiece | PromotedPiece)).toBe('Bishop (Promoted)')
  })
  it('should return the correct description for a promoted queen', () => {
    expect(fn(QueenPiece | PromotedPiece)).toBe('Queen (Promoted)')
  })

  // Black pieces
  it('should return the correct description for a black pawn', () => {
    expect(fn(BlackPiece | PawnPiece)).toBe('Black Pawn')
  })
  it('should return the correct description for a black rook', () => {
    expect(fn(BlackPiece | RookPiece)).toBe('Black Rook')
  })
  it('should return the correct description for a black knight', () => {
    expect(fn(BlackPiece | KnightPiece)).toBe('Black Knight')
  })
  it('should return the correct description for a black bishop', () => {
    expect(fn(BlackPiece | BishopPiece)).toBe('Black Bishop')
  })
  it('should return the correct description for a black queen', () => {
    expect(fn(BlackPiece | QueenPiece)).toBe('Black Queen')
  })
  it('should return the correct description for a black king', () => {
    expect(fn(BlackPiece | KingPiece)).toBe('Black King')
  })

  // Black Promoted pieces
  it('should return the correct description for a black promoted rook', () => {
    expect(fn(BlackPiece | RookPiece | PromotedPiece)).toBe('Black Rook (Promoted)')
  })
  it('should return the correct description for a black promoted knight', () => {
    expect(fn(BlackPiece | KnightPiece | PromotedPiece)).toBe('Black Knight (Promoted)')
  })
  it('should return the correct description for a black promoted bishop', () => {
    expect(fn(BlackPiece | BishopPiece | PromotedPiece)).toBe('Black Bishop (Promoted)')
  })
  it('should return the correct description for a black promoted queen', () => {
    expect(fn(BlackPiece | QueenPiece | PromotedPiece)).toBe('Black Queen (Promoted)')
  })

  // White pieces
  it('should return the correct description for a white pawn', () => {
    expect(fn(WhitePiece | PawnPiece)).toBe('White Pawn')
  })
  it('should return the correct description for a white rook', () => {
    expect(fn(WhitePiece | RookPiece)).toBe('White Rook')
  })
  it('should return the correct description for a white knight', () => {
    expect(fn(WhitePiece | KnightPiece)).toBe('White Knight')
  })
  it('should return the correct description for a white bishop', () => {
    expect(fn(WhitePiece | BishopPiece)).toBe('White Bishop')
  })
  it('should return the correct description for a white queen', () => {
    expect(fn(WhitePiece | QueenPiece)).toBe('White Queen')
  })
  it('should return the correct description for a white king', () => {
    expect(fn(WhitePiece | KingPiece)).toBe('White King')
  })

  // White Promoted pieces
  it('should return the correct description for a white promoted rook', () => {
    expect(fn(WhitePiece | RookPiece | PromotedPiece)).toBe('White Rook (Promoted)')
  })
  it('should return the correct description for a white promoted knight', () => {
    expect(fn(WhitePiece | KnightPiece | PromotedPiece)).toBe('White Knight (Promoted)')
  })
  it('should return the correct description for a white promoted bishop', () => {
    expect(fn(WhitePiece | BishopPiece | PromotedPiece)).toBe('White Bishop (Promoted)')
  })
  it('should return the correct description for a white promoted queen', () => {
    expect(fn(WhitePiece | QueenPiece | PromotedPiece)).toBe('White Queen (Promoted)')
  })

  // No piece (empty tile)
  it('should return None for no piece (empty tile)', () => {
    expect(fn(0)).toBe('None')
  })

  // Unknown piece (empty tile)
  it('should return Unknown for indetermined piece', () => {
    expect(fn(BasePieces)).toBe('Unknown')
    expect(fn(BasePieces | PromotedPiece)).toBe('Unknown (Promoted)')
    expect(fn(BlackPiece | BasePieces | PromotedPiece)).toBe('Black Unknown (Promoted)')
    expect(fn(WhitePiece | BasePieces | PromotedPiece)).toBe('White Unknown (Promoted)')
  })

  // Invalid pieces
  it('should return Invalid for invalid pieces', () => {
    expect(fn(undefined as unknown as number)).toBe('Invalid')
    expect(fn(null as unknown as number)).toBe('Invalid')
    expect(fn(false as unknown as number)).toBe('Invalid')
    expect(fn(-1 as number)).toBe('Invalid')
  })
})

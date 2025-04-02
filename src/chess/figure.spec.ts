import { describe, it, expect } from 'vitest'
import {
  BlackFigure,
  WhiteFigure,
  PromotedFigure,
  PawnFigure,
  RookFigure,
  KnightFigure,
  BishopFigure,
  QueenFigure,
  KingFigure,
  isPawnFigure,
  isRookFigure,
  isKnightFigure,
  isBishopFigure,
  isQueenFigure,
  isKingFigure,
  isFigure,
  isPromotedFigure,
  isBlackFigure,
  isWhiteFigure,
  isEnemyFigure,
  getFigureKind,
  getFigureDesciption,
  MovedOnce,
  hasFigureMoved,
  BaseFigures,
} from './figure'

describe('isPawnFigure', () => {
  const fn = isPawnFigure
  it('should return true for pawn figures', () => {
    expect(fn(PawnFigure)).toBe(true)
    expect(fn(BlackFigure | PawnFigure)).toBe(true)
    expect(fn(WhiteFigure | PawnFigure)).toBe(true)
  })
  it('should return false for non-pawn figures', () => {
    expect(fn(RookFigure)).toBe(false)
    expect(fn(KnightFigure)).toBe(false)
    expect(fn(BishopFigure)).toBe(false)
    expect(fn(QueenFigure)).toBe(false)
    expect(fn(KingFigure)).toBe(false)
    expect(fn(RookFigure | PromotedFigure)).toBe(false)
    expect(fn(KnightFigure | PromotedFigure)).toBe(false)
    expect(fn(BishopFigure | PromotedFigure)).toBe(false)
    expect(fn(QueenFigure | PromotedFigure)).toBe(false)
    expect(fn(BlackFigure | RookFigure)).toBe(false)
    expect(fn(BlackFigure | KnightFigure)).toBe(false)
    expect(fn(BlackFigure | BishopFigure)).toBe(false)
    expect(fn(BlackFigure | QueenFigure)).toBe(false)
    expect(fn(BlackFigure | KingFigure)).toBe(false)
    expect(fn(BlackFigure | RookFigure | PromotedFigure)).toBe(false)
    expect(fn(BlackFigure | KnightFigure | PromotedFigure)).toBe(false)
    expect(fn(BlackFigure | BishopFigure | PromotedFigure)).toBe(false)
    expect(fn(BlackFigure | QueenFigure | PromotedFigure)).toBe(false)
    expect(fn(WhiteFigure | RookFigure)).toBe(false)
    expect(fn(WhiteFigure | KnightFigure)).toBe(false)
    expect(fn(WhiteFigure | BishopFigure)).toBe(false)
    expect(fn(WhiteFigure | QueenFigure)).toBe(false)
    expect(fn(WhiteFigure | KingFigure)).toBe(false)
    expect(fn(WhiteFigure | RookFigure | PromotedFigure)).toBe(false)
    expect(fn(WhiteFigure | KnightFigure | PromotedFigure)).toBe(false)
    expect(fn(WhiteFigure | BishopFigure | PromotedFigure)).toBe(false)
    expect(fn(WhiteFigure | QueenFigure | PromotedFigure)).toBe(false)
  })
})

describe('isRookFigure', () => {
  const fn = isRookFigure
  it('should return true for rook figures', () => {
    expect(fn(RookFigure)).toBe(true)
    expect(fn(RookFigure | BlackFigure)).toBe(true)
    expect(fn(RookFigure | WhiteFigure)).toBe(true)
    expect(fn(RookFigure | PromotedFigure)).toBe(true)
    expect(fn(BlackFigure | RookFigure | PromotedFigure)).toBe(true)
    expect(fn(WhiteFigure | RookFigure | PromotedFigure)).toBe(true)
  })
  it('should return false for non-rook figures', () => {
    expect(fn(PawnFigure)).toBe(false)
    expect(fn(KnightFigure)).toBe(false)
    expect(fn(BishopFigure)).toBe(false)
    expect(fn(QueenFigure)).toBe(false)
    expect(fn(KingFigure)).toBe(false)
    expect(fn(KnightFigure | PromotedFigure)).toBe(false)
    expect(fn(BishopFigure | PromotedFigure)).toBe(false)
    expect(fn(QueenFigure | PromotedFigure)).toBe(false)
    expect(fn(BlackFigure | PawnFigure)).toBe(false)
    expect(fn(BlackFigure | KnightFigure)).toBe(false)
    expect(fn(BlackFigure | BishopFigure)).toBe(false)
    expect(fn(BlackFigure | QueenFigure)).toBe(false)
    expect(fn(BlackFigure | KingFigure)).toBe(false)
    expect(fn(BlackFigure | KnightFigure | PromotedFigure)).toBe(false)
    expect(fn(BlackFigure | BishopFigure | PromotedFigure)).toBe(false)
    expect(fn(BlackFigure | QueenFigure | PromotedFigure)).toBe(false)
    expect(fn(WhiteFigure | PawnFigure)).toBe(false)
    expect(fn(WhiteFigure | KnightFigure)).toBe(false)
    expect(fn(WhiteFigure | BishopFigure)).toBe(false)
    expect(fn(WhiteFigure | QueenFigure)).toBe(false)
    expect(fn(WhiteFigure | KingFigure)).toBe(false)
    expect(fn(WhiteFigure | KnightFigure | PromotedFigure)).toBe(false)
    expect(fn(WhiteFigure | BishopFigure | PromotedFigure)).toBe(false)
    expect(fn(WhiteFigure | QueenFigure | PromotedFigure)).toBe(false)
  })
})

describe('isKnightFigure', () => {
  const fn = isKnightFigure
  it('should return true for knight figures', () => {
    expect(fn(KnightFigure)).toBe(true)
    expect(fn(KnightFigure | PromotedFigure)).toBe(true)
    expect(fn(BlackFigure | KnightFigure)).toBe(true)
    expect(fn(BlackFigure | KnightFigure | PromotedFigure)).toBe(true)
    expect(fn(WhiteFigure | KnightFigure)).toBe(true)
    expect(fn(WhiteFigure | KnightFigure | PromotedFigure)).toBe(true)
  })
  it('should return false for non-knight figures', () => {
    expect(fn(PawnFigure)).toBe(false)
    expect(fn(RookFigure)).toBe(false)
    expect(fn(BishopFigure)).toBe(false)
    expect(fn(QueenFigure)).toBe(false)
    expect(fn(KingFigure)).toBe(false)
    expect(fn(RookFigure | PromotedFigure)).toBe(false)
    expect(fn(BishopFigure | PromotedFigure)).toBe(false)
    expect(fn(QueenFigure | PromotedFigure)).toBe(false)
    expect(fn(BlackFigure | PawnFigure)).toBe(false)
    expect(fn(BlackFigure | RookFigure)).toBe(false)
    expect(fn(BlackFigure | BishopFigure)).toBe(false)
    expect(fn(BlackFigure | QueenFigure)).toBe(false)
    expect(fn(BlackFigure | KingFigure)).toBe(false)
    expect(fn(BlackFigure | RookFigure | PromotedFigure)).toBe(false)
    expect(fn(BlackFigure | BishopFigure | PromotedFigure)).toBe(false)
    expect(fn(BlackFigure | QueenFigure | PromotedFigure)).toBe(false)
    expect(fn(WhiteFigure | PawnFigure)).toBe(false)
    expect(fn(WhiteFigure | RookFigure)).toBe(false)
    expect(fn(WhiteFigure | BishopFigure)).toBe(false)
    expect(fn(WhiteFigure | QueenFigure)).toBe(false)
    expect(fn(WhiteFigure | KingFigure)).toBe(false)
    expect(fn(WhiteFigure | RookFigure | PromotedFigure)).toBe(false)
    expect(fn(WhiteFigure | BishopFigure | PromotedFigure)).toBe(false)
    expect(fn(WhiteFigure | QueenFigure | PromotedFigure)).toBe(false)
  })
})

describe('isBishopFigure', () => {
  const fn = isBishopFigure
  it('should return true for bishop figures', () => {
    expect(fn(BishopFigure)).toBe(true)
    expect(fn(BishopFigure | PromotedFigure)).toBe(true)
    expect(fn(BlackFigure | BishopFigure)).toBe(true)
    expect(fn(BlackFigure | BishopFigure | PromotedFigure)).toBe(true)
    expect(fn(WhiteFigure | BishopFigure)).toBe(true)
    expect(fn(WhiteFigure | BishopFigure | PromotedFigure)).toBe(true)
  })
  it('should return false for non-bishop figures', () => {
    expect(fn(PawnFigure)).toBe(false)
    expect(fn(RookFigure)).toBe(false)
    expect(fn(KnightFigure)).toBe(false)
    expect(fn(QueenFigure)).toBe(false)
    expect(fn(KingFigure)).toBe(false)
    expect(fn(RookFigure | PromotedFigure)).toBe(false)
    expect(fn(KnightFigure | PromotedFigure)).toBe(false)
    expect(fn(QueenFigure | PromotedFigure)).toBe(false)
    expect(fn(BlackFigure | PawnFigure)).toBe(false)
    expect(fn(BlackFigure | RookFigure)).toBe(false)
    expect(fn(BlackFigure | KnightFigure)).toBe(false)
    expect(fn(BlackFigure | QueenFigure)).toBe(false)
    expect(fn(BlackFigure | KingFigure)).toBe(false)
    expect(fn(BlackFigure | RookFigure | PromotedFigure)).toBe(false)
    expect(fn(BlackFigure | KnightFigure | PromotedFigure)).toBe(false)
    expect(fn(BlackFigure | QueenFigure | PromotedFigure)).toBe(false)
    expect(fn(WhiteFigure | PawnFigure)).toBe(false)
    expect(fn(WhiteFigure | RookFigure)).toBe(false)
    expect(fn(WhiteFigure | KnightFigure)).toBe(false)
    expect(fn(WhiteFigure | QueenFigure)).toBe(false)
    expect(fn(WhiteFigure | KingFigure)).toBe(false)
    expect(fn(WhiteFigure | RookFigure | PromotedFigure)).toBe(false)
    expect(fn(WhiteFigure | KnightFigure | PromotedFigure)).toBe(false)
    expect(fn(WhiteFigure | QueenFigure | PromotedFigure)).toBe(false)
  })
})

describe('isQueenFigure', () => {
  const fn = isQueenFigure
  it('should return true for queen figures', () => {
    expect(fn(QueenFigure)).toBe(true)
    expect(fn(QueenFigure | PromotedFigure)).toBe(true)
    expect(fn(BlackFigure | QueenFigure)).toBe(true)
    expect(fn(BlackFigure | QueenFigure | PromotedFigure)).toBe(true)
    expect(fn(WhiteFigure | QueenFigure)).toBe(true)
    expect(fn(WhiteFigure | QueenFigure | PromotedFigure)).toBe(true)
  })
  it('should return false for non-queen figures', () => {
    expect(fn(PawnFigure)).toBe(false)
    expect(fn(RookFigure)).toBe(false)
    expect(fn(KnightFigure)).toBe(false)
    expect(fn(BishopFigure)).toBe(false)
    expect(fn(KingFigure)).toBe(false)
    expect(fn(RookFigure | PromotedFigure)).toBe(false)
    expect(fn(KnightFigure | PromotedFigure)).toBe(false)
    expect(fn(BishopFigure | PromotedFigure)).toBe(false)
    expect(fn(BlackFigure | PawnFigure)).toBe(false)
    expect(fn(BlackFigure | RookFigure)).toBe(false)
    expect(fn(BlackFigure | KnightFigure)).toBe(false)
    expect(fn(BlackFigure | BishopFigure)).toBe(false)
    expect(fn(BlackFigure | KingFigure)).toBe(false)
    expect(fn(BlackFigure | RookFigure | PromotedFigure)).toBe(false)
    expect(fn(BlackFigure | KnightFigure | PromotedFigure)).toBe(false)
    expect(fn(BlackFigure | BishopFigure | PromotedFigure)).toBe(false)
    expect(fn(WhiteFigure | PawnFigure)).toBe(false)
    expect(fn(WhiteFigure | RookFigure)).toBe(false)
    expect(fn(WhiteFigure | KnightFigure)).toBe(false)
    expect(fn(WhiteFigure | BishopFigure)).toBe(false)
    expect(fn(WhiteFigure | KingFigure)).toBe(false)
    expect(fn(WhiteFigure | RookFigure | PromotedFigure)).toBe(false)
    expect(fn(WhiteFigure | KnightFigure | PromotedFigure)).toBe(false)
    expect(fn(WhiteFigure | BishopFigure | PromotedFigure)).toBe(false)
  })
})

describe('isKingFigure', () => {
  const fn = isKingFigure
  it('should return true for king figures', () => {
    expect(fn(KingFigure)).toBe(true)
    expect(fn(BlackFigure | KingFigure)).toBe(true)
    expect(fn(WhiteFigure | KingFigure)).toBe(true)
  })
  it('should return false for non-king figures', () => {
    expect(fn(PawnFigure)).toBe(false)
    expect(fn(RookFigure)).toBe(false)
    expect(fn(KnightFigure)).toBe(false)
    expect(fn(BishopFigure)).toBe(false)
    expect(fn(QueenFigure)).toBe(false)
    expect(fn(RookFigure | PromotedFigure)).toBe(false)
    expect(fn(KnightFigure | PromotedFigure)).toBe(false)
    expect(fn(BishopFigure | PromotedFigure)).toBe(false)
    expect(fn(QueenFigure | PromotedFigure)).toBe(false)
    expect(fn(BlackFigure | PawnFigure)).toBe(false)
    expect(fn(BlackFigure | RookFigure)).toBe(false)
    expect(fn(BlackFigure | KnightFigure)).toBe(false)
    expect(fn(BlackFigure | BishopFigure)).toBe(false)
    expect(fn(BlackFigure | QueenFigure)).toBe(false)
    expect(fn(BlackFigure | RookFigure | PromotedFigure)).toBe(false)
    expect(fn(BlackFigure | KnightFigure | PromotedFigure)).toBe(false)
    expect(fn(BlackFigure | BishopFigure | PromotedFigure)).toBe(false)
    expect(fn(BlackFigure | QueenFigure | PromotedFigure)).toBe(false)
    expect(fn(WhiteFigure | PawnFigure)).toBe(false)
    expect(fn(WhiteFigure | RookFigure)).toBe(false)
    expect(fn(WhiteFigure | KnightFigure)).toBe(false)
    expect(fn(WhiteFigure | BishopFigure)).toBe(false)
    expect(fn(WhiteFigure | QueenFigure)).toBe(false)
    expect(fn(WhiteFigure | RookFigure | PromotedFigure)).toBe(false)
    expect(fn(WhiteFigure | KnightFigure | PromotedFigure)).toBe(false)
    expect(fn(WhiteFigure | BishopFigure | PromotedFigure)).toBe(false)
    expect(fn(WhiteFigure | QueenFigure | PromotedFigure)).toBe(false)
  })
})

describe('isPromotedFigure', () => {
  const fn = isPromotedFigure
  it('should return true for promoted figures', () => {
    expect(fn(RookFigure | PromotedFigure)).toBe(true)
    expect(fn(KnightFigure | PromotedFigure)).toBe(true)
    expect(fn(BishopFigure | PromotedFigure)).toBe(true)
    expect(fn(QueenFigure | PromotedFigure)).toBe(true)
    expect(fn(BlackFigure | RookFigure | PromotedFigure)).toBe(true)
    expect(fn(BlackFigure | KnightFigure | PromotedFigure)).toBe(true)
    expect(fn(BlackFigure | BishopFigure | PromotedFigure)).toBe(true)
    expect(fn(BlackFigure | QueenFigure | PromotedFigure)).toBe(true)
    expect(fn(WhiteFigure | RookFigure | PromotedFigure)).toBe(true)
    expect(fn(WhiteFigure | KnightFigure | PromotedFigure)).toBe(true)
    expect(fn(WhiteFigure | BishopFigure | PromotedFigure)).toBe(true)
    expect(fn(WhiteFigure | QueenFigure | PromotedFigure)).toBe(true)
  })
  it('should return false for non-promoted figures', () => {
    expect(fn(PawnFigure)).toBe(false)
    expect(fn(RookFigure)).toBe(false)
    expect(fn(KnightFigure)).toBe(false)
    expect(fn(BishopFigure)).toBe(false)
    expect(fn(QueenFigure)).toBe(false)
    expect(fn(BlackFigure | PawnFigure)).toBe(false)
    expect(fn(BlackFigure | RookFigure)).toBe(false)
    expect(fn(BlackFigure | KnightFigure)).toBe(false)
    expect(fn(BlackFigure | BishopFigure)).toBe(false)
    expect(fn(BlackFigure | QueenFigure)).toBe(false)
    expect(fn(WhiteFigure | PawnFigure)).toBe(false)
    expect(fn(WhiteFigure | RookFigure)).toBe(false)
    expect(fn(WhiteFigure | KnightFigure)).toBe(false)
    expect(fn(WhiteFigure | BishopFigure)).toBe(false)
    expect(fn(WhiteFigure | QueenFigure)).toBe(false)
  })
})

describe('isFigure', () => {
  const fn = isFigure
  it('should return true for any valid figure', () => {
    expect(fn(PawnFigure)).toBe(true)
    expect(fn(RookFigure)).toBe(true)
    expect(fn(KnightFigure)).toBe(true)
    expect(fn(BishopFigure)).toBe(true)
    expect(fn(QueenFigure)).toBe(true)
    expect(fn(KingFigure)).toBe(true)
    expect(fn(RookFigure | PromotedFigure)).toBe(true)
    expect(fn(KnightFigure | PromotedFigure)).toBe(true)
    expect(fn(BishopFigure | PromotedFigure)).toBe(true)
    expect(fn(QueenFigure | PromotedFigure)).toBe(true)
    expect(fn(BlackFigure | PawnFigure)).toBe(true)
    expect(fn(BlackFigure | RookFigure)).toBe(true)
    expect(fn(BlackFigure | KnightFigure)).toBe(true)
    expect(fn(BlackFigure | BishopFigure)).toBe(true)
    expect(fn(BlackFigure | QueenFigure)).toBe(true)
    expect(fn(BlackFigure | KingFigure)).toBe(true)
    expect(fn(BlackFigure | RookFigure | PromotedFigure)).toBe(true)
    expect(fn(BlackFigure | KnightFigure | PromotedFigure)).toBe(true)
    expect(fn(BlackFigure | BishopFigure | PromotedFigure)).toBe(true)
    expect(fn(BlackFigure | QueenFigure | PromotedFigure)).toBe(true)
    expect(fn(WhiteFigure | PawnFigure)).toBe(true)
    expect(fn(WhiteFigure | RookFigure)).toBe(true)
    expect(fn(WhiteFigure | KnightFigure)).toBe(true)
    expect(fn(WhiteFigure | BishopFigure)).toBe(true)
    expect(fn(WhiteFigure | QueenFigure)).toBe(true)
    expect(fn(WhiteFigure | KingFigure)).toBe(true)
    expect(fn(WhiteFigure | RookFigure | PromotedFigure)).toBe(true)
    expect(fn(WhiteFigure | KnightFigure | PromotedFigure)).toBe(true)
    expect(fn(WhiteFigure | BishopFigure | PromotedFigure)).toBe(true)
    expect(fn(WhiteFigure | QueenFigure | PromotedFigure)).toBe(true)
  })
  it('should return false for invalid figures', () => {
    expect(fn(0)).toBe(false)
  })
})

describe('isBlackFigure', () => {
  it('should return true for valid black figures', () => {
    expect(isBlackFigure(BlackFigure | PawnFigure)).toBe(true)
    expect(isBlackFigure(BlackFigure | RookFigure)).toBe(true)
    expect(isBlackFigure(BlackFigure | KnightFigure)).toBe(true)
    expect(isBlackFigure(BlackFigure | BishopFigure)).toBe(true)
    expect(isBlackFigure(BlackFigure | QueenFigure)).toBe(true)
    expect(isBlackFigure(BlackFigure | KingFigure)).toBe(true)
    expect(isBlackFigure(BlackFigure | RookFigure | PromotedFigure)).toBe(true)
    expect(isBlackFigure(BlackFigure | KnightFigure | PromotedFigure)).toBe(true)
    expect(isBlackFigure(BlackFigure | BishopFigure | PromotedFigure)).toBe(true)
    expect(isBlackFigure(BlackFigure | QueenFigure | PromotedFigure)).toBe(true)
  })
  it('should return false for invalid black figures', () => {
    expect(isBlackFigure(BlackFigure)).toBe(false) // not a figure, only black flag
    expect(isBlackFigure(WhiteFigure)).toBe(false)
    expect(isBlackFigure(WhiteFigure | PawnFigure)).toBe(false)
    expect(isBlackFigure(WhiteFigure | RookFigure)).toBe(false)
    expect(isBlackFigure(WhiteFigure | KnightFigure)).toBe(false)
    expect(isBlackFigure(WhiteFigure | BishopFigure)).toBe(false)
    expect(isBlackFigure(WhiteFigure | QueenFigure)).toBe(false)
    expect(isBlackFigure(WhiteFigure | KingFigure)).toBe(false)
    expect(isBlackFigure(WhiteFigure | RookFigure | PromotedFigure)).toBe(false)
    expect(isBlackFigure(WhiteFigure | KnightFigure | PromotedFigure)).toBe(false)
    expect(isBlackFigure(WhiteFigure | BishopFigure | PromotedFigure)).toBe(false)
    expect(isBlackFigure(WhiteFigure | QueenFigure | PromotedFigure)).toBe(false)
  })
})

describe('isWhiteFigure', () => {
  it('should return true for valid white figures', () => {
    expect(isWhiteFigure(WhiteFigure | PawnFigure)).toBe(true)
    expect(isWhiteFigure(WhiteFigure | RookFigure)).toBe(true)
    expect(isWhiteFigure(WhiteFigure | KnightFigure)).toBe(true)
    expect(isWhiteFigure(WhiteFigure | BishopFigure)).toBe(true)
    expect(isWhiteFigure(WhiteFigure | QueenFigure)).toBe(true)
    expect(isWhiteFigure(WhiteFigure | KingFigure)).toBe(true)
    expect(isWhiteFigure(WhiteFigure | RookFigure | PromotedFigure)).toBe(true)
    expect(isWhiteFigure(WhiteFigure | KnightFigure | PromotedFigure)).toBe(true)
    expect(isWhiteFigure(WhiteFigure | BishopFigure | PromotedFigure)).toBe(true)
    expect(isWhiteFigure(WhiteFigure | QueenFigure | PromotedFigure)).toBe(true)
  })
  it('should return false for invalid white figures', () => {
    expect(isWhiteFigure(WhiteFigure)).toBe(false) // not a figure, only white flag
    expect(isWhiteFigure(BlackFigure)).toBe(false)
    expect(isWhiteFigure(BlackFigure | PawnFigure)).toBe(false)
    expect(isWhiteFigure(BlackFigure | RookFigure)).toBe(false)
    expect(isWhiteFigure(BlackFigure | KnightFigure)).toBe(false)
    expect(isWhiteFigure(BlackFigure | BishopFigure)).toBe(false)
    expect(isWhiteFigure(BlackFigure | QueenFigure)).toBe(false)
    expect(isWhiteFigure(BlackFigure | KingFigure)).toBe(false)
    expect(isWhiteFigure(BlackFigure | RookFigure | PromotedFigure)).toBe(false)
    expect(isWhiteFigure(BlackFigure | KnightFigure | PromotedFigure)).toBe(false)
    expect(isWhiteFigure(BlackFigure | BishopFigure | PromotedFigure)).toBe(false)
    expect(isWhiteFigure(BlackFigure | QueenFigure | PromotedFigure)).toBe(false)
  })
})

describe('isEnemyFigure', () => {
  it('should return true for valid enemy figures', () => {
    expect(isEnemyFigure(WhiteFigure | PawnFigure, BlackFigure | PawnFigure)).toBe(true)
    expect(isEnemyFigure(BlackFigure | PawnFigure, WhiteFigure | PawnFigure)).toBe(true)
  })
  it('should return false for valid friendly figures', () => {
    expect(isEnemyFigure(WhiteFigure | PawnFigure, WhiteFigure | PawnFigure)).toBe(false)
    expect(isEnemyFigure(BlackFigure | PawnFigure, BlackFigure | PawnFigure)).toBe(false)
  })
  it('should return null for invalid/uncolored figures', () => {
    expect(isEnemyFigure(PawnFigure, PawnFigure)).toBe(null)
    expect(isEnemyFigure(BlackFigure | PawnFigure, PawnFigure)).toBe(null)
    expect(isEnemyFigure(PawnFigure, BlackFigure | PawnFigure)).toBe(null)
    expect(isEnemyFigure(WhiteFigure | PawnFigure, PawnFigure)).toBe(null)
    expect(isEnemyFigure(PawnFigure, WhiteFigure | PawnFigure)).toBe(null)
  })
})

describe('hasFigureMoved', () => {
  const fn = hasFigureMoved
  it('should return true for any valid figure which moved once', () => {
    expect(fn(BlackFigure | PawnFigure | MovedOnce)).toBe(true)
    expect(fn(WhiteFigure | PawnFigure | MovedOnce)).toBe(true)
  })
  it('should return false for any valid figure which did not move yet', () => {
    expect(fn(BlackFigure | PawnFigure)).toBe(false)
    expect(fn(WhiteFigure | PawnFigure)).toBe(false)
  })
})

describe('getFigureKind', () => {
  it('should return pawn for any valid pawn figure', () => {
    expect(getFigureKind(PawnFigure)).toBe('pawn')
    expect(getFigureKind(PawnFigure | MovedOnce)).toBe('pawn')
    expect(getFigureKind(BlackFigure | PawnFigure)).toBe('pawn')
    expect(getFigureKind(BlackFigure | PawnFigure | MovedOnce)).toBe('pawn')
    expect(getFigureKind(WhiteFigure | PawnFigure)).toBe('pawn')
    expect(getFigureKind(WhiteFigure | PawnFigure | MovedOnce)).toBe('pawn')
  })
  it('should return rook for any valid rook figure', () => {
    expect(getFigureKind(RookFigure)).toBe('rook')
    expect(getFigureKind(RookFigure | MovedOnce)).toBe('rook')
    expect(getFigureKind(BlackFigure | RookFigure)).toBe('rook')
    expect(getFigureKind(BlackFigure | RookFigure | MovedOnce)).toBe('rook')
    expect(getFigureKind(BlackFigure | RookFigure | PromotedFigure)).toBe('rook')
    expect(getFigureKind(WhiteFigure | RookFigure)).toBe('rook')
    expect(getFigureKind(WhiteFigure | RookFigure | MovedOnce)).toBe('rook')
    expect(getFigureKind(WhiteFigure | RookFigure | PromotedFigure)).toBe('rook')
  })
  it('should return knight for any valid knight figure', () => {
    expect(getFigureKind(KnightFigure)).toBe('knight')
    expect(getFigureKind(KnightFigure | MovedOnce)).toBe('knight')
    expect(getFigureKind(BlackFigure | KnightFigure)).toBe('knight')
    expect(getFigureKind(BlackFigure | KnightFigure | MovedOnce)).toBe('knight')
    expect(getFigureKind(BlackFigure | KnightFigure | MovedOnce)).toBe('knight')
    expect(getFigureKind(WhiteFigure | KnightFigure)).toBe('knight')
    expect(getFigureKind(WhiteFigure | KnightFigure | MovedOnce)).toBe('knight')
    expect(getFigureKind(WhiteFigure | KnightFigure | PromotedFigure)).toBe('knight')
  })
  it('should return bishop for any valid bishop figure', () => {
    expect(getFigureKind(BishopFigure)).toBe('bishop')
    expect(getFigureKind(BishopFigure | MovedOnce)).toBe('bishop')
    expect(getFigureKind(BlackFigure | BishopFigure)).toBe('bishop')
    expect(getFigureKind(BlackFigure | BishopFigure | MovedOnce)).toBe('bishop')
    expect(getFigureKind(BlackFigure | BishopFigure | PromotedFigure)).toBe('bishop')
    expect(getFigureKind(WhiteFigure | BishopFigure)).toBe('bishop')
    expect(getFigureKind(WhiteFigure | BishopFigure | MovedOnce)).toBe('bishop')
    expect(getFigureKind(WhiteFigure | BishopFigure | PromotedFigure)).toBe('bishop')
  })
  it('should return queen for any valid queen figure', () => {
    expect(getFigureKind(QueenFigure)).toBe('queen')
    expect(getFigureKind(QueenFigure | MovedOnce)).toBe('queen')
    expect(getFigureKind(BlackFigure | QueenFigure)).toBe('queen')
    expect(getFigureKind(BlackFigure | QueenFigure | MovedOnce)).toBe('queen')
    expect(getFigureKind(BlackFigure | QueenFigure | PromotedFigure)).toBe('queen')
    expect(getFigureKind(WhiteFigure | QueenFigure)).toBe('queen')
    expect(getFigureKind(WhiteFigure | QueenFigure | MovedOnce)).toBe('queen')
    expect(getFigureKind(WhiteFigure | QueenFigure | PromotedFigure)).toBe('queen')
  })
  it('should return king for any valid king figure', () => {
    expect(getFigureKind(KingFigure)).toBe('king')
    expect(getFigureKind(KingFigure | MovedOnce)).toBe('king')
    expect(getFigureKind(BlackFigure | KingFigure)).toBe('king')
    expect(getFigureKind(BlackFigure | KingFigure | MovedOnce)).toBe('king')
    expect(getFigureKind(WhiteFigure | KingFigure)).toBe('king')
    expect(getFigureKind(WhiteFigure | KingFigure | MovedOnce)).toBe('king')
  })
  it('should return invalid for any invalid figure', () => {
    expect(getFigureKind(BlackFigure)).toBe('invalid')
    expect(getFigureKind(WhiteFigure)).toBe('invalid')
  })
})

describe('getFigureDesciption', () => {
  const fn = getFigureDesciption

  // Base figures
  it('should return the correct description for a pawn', () => {
    expect(fn(PawnFigure)).toBe('Pawn')
  })
  it('should return the correct description for a rook', () => {
    expect(fn(RookFigure)).toBe('Rook')
  })
  it('should return the correct description for a knight', () => {
    expect(fn(KnightFigure)).toBe('Knight')
  })
  it('should return the correct description for a bishop', () => {
    expect(fn(BishopFigure)).toBe('Bishop')
  })
  it('should return the correct description for a queen', () => {
    expect(fn(QueenFigure)).toBe('Queen')
  })
  it('should return the correct description for a king', () => {
    expect(fn(KingFigure)).toBe('King')
  })

  // Promoted figures
  it('should return the correct description for a promoted rook', () => {
    expect(fn(RookFigure | PromotedFigure)).toBe('Rook (Promoted)')
  })
  it('should return the correct description for a promoted knight', () => {
    expect(fn(KnightFigure | PromotedFigure)).toBe('Knight (Promoted)')
  })
  it('should return the correct description for a promoted bishop', () => {
    expect(fn(BishopFigure | PromotedFigure)).toBe('Bishop (Promoted)')
  })
  it('should return the correct description for a promoted queen', () => {
    expect(fn(QueenFigure | PromotedFigure)).toBe('Queen (Promoted)')
  })

  // Black figures
  it('should return the correct description for a black pawn', () => {
    expect(fn(BlackFigure | PawnFigure)).toBe('Black Pawn')
  })
  it('should return the correct description for a black rook', () => {
    expect(fn(BlackFigure | RookFigure)).toBe('Black Rook')
  })
  it('should return the correct description for a black knight', () => {
    expect(fn(BlackFigure | KnightFigure)).toBe('Black Knight')
  })
  it('should return the correct description for a black bishop', () => {
    expect(fn(BlackFigure | BishopFigure)).toBe('Black Bishop')
  })
  it('should return the correct description for a black queen', () => {
    expect(fn(BlackFigure | QueenFigure)).toBe('Black Queen')
  })
  it('should return the correct description for a black king', () => {
    expect(fn(BlackFigure | KingFigure)).toBe('Black King')
  })

  // Black Promoted figures
  it('should return the correct description for a black promoted rook', () => {
    expect(fn(BlackFigure | RookFigure | PromotedFigure)).toBe('Black Rook (Promoted)')
  })
  it('should return the correct description for a black promoted knight', () => {
    expect(fn(BlackFigure | KnightFigure | PromotedFigure)).toBe('Black Knight (Promoted)')
  })
  it('should return the correct description for a black promoted bishop', () => {
    expect(fn(BlackFigure | BishopFigure | PromotedFigure)).toBe('Black Bishop (Promoted)')
  })
  it('should return the correct description for a black promoted queen', () => {
    expect(fn(BlackFigure | QueenFigure | PromotedFigure)).toBe('Black Queen (Promoted)')
  })

  // White figures
  it('should return the correct description for a white pawn', () => {
    expect(fn(WhiteFigure | PawnFigure)).toBe('White Pawn')
  })
  it('should return the correct description for a white rook', () => {
    expect(fn(WhiteFigure | RookFigure)).toBe('White Rook')
  })
  it('should return the correct description for a white knight', () => {
    expect(fn(WhiteFigure | KnightFigure)).toBe('White Knight')
  })
  it('should return the correct description for a white bishop', () => {
    expect(fn(WhiteFigure | BishopFigure)).toBe('White Bishop')
  })
  it('should return the correct description for a white queen', () => {
    expect(fn(WhiteFigure | QueenFigure)).toBe('White Queen')
  })
  it('should return the correct description for a white king', () => {
    expect(fn(WhiteFigure | KingFigure)).toBe('White King')
  })

  // White Promoted figures
  it('should return the correct description for a white promoted rook', () => {
    expect(fn(WhiteFigure | RookFigure | PromotedFigure)).toBe('White Rook (Promoted)')
  })
  it('should return the correct description for a white promoted knight', () => {
    expect(fn(WhiteFigure | KnightFigure | PromotedFigure)).toBe('White Knight (Promoted)')
  })
  it('should return the correct description for a white promoted bishop', () => {
    expect(fn(WhiteFigure | BishopFigure | PromotedFigure)).toBe('White Bishop (Promoted)')
  })
  it('should return the correct description for a white promoted queen', () => {
    expect(fn(WhiteFigure | QueenFigure | PromotedFigure)).toBe('White Queen (Promoted)')
  })

  // No figure (empty tile)
  it('should return None for no figure (empty tile)', () => {
    expect(fn(0)).toBe('None')
  })

  // Unknown figure (empty tile)
  it('should return Unknown for indetermined figure', () => {
    expect(fn(BaseFigures)).toBe('Unknown')
    expect(fn(BaseFigures | PromotedFigure)).toBe('Unknown (Promoted)')
    expect(fn(BlackFigure | BaseFigures | PromotedFigure)).toBe('Black Unknown (Promoted)')
    expect(fn(WhiteFigure | BaseFigures | PromotedFigure)).toBe('White Unknown (Promoted)')
  })

  // Invalid figures
  it('should return Invalid for invalid figures', () => {
    expect(fn(undefined as unknown as number)).toBe('Invalid')
    expect(fn(null as unknown as number)).toBe('Invalid')
    expect(fn(false as unknown as number)).toBe('Invalid')
    expect(fn(-1 as number)).toBe('Invalid')
  })
})

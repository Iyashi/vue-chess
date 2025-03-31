import { describe, it, expect } from 'vitest'
import {
  BlackFigure,
  WhiteFigure,
  PawnFigure,
  RookFigure,
  KnightFigure,
  BishopFigure,
  QueenFigure,
  KingFigure,
  PromotedRookFigure,
  PromotedKnightFigure,
  PromotedBishopFigure,
  PromotedQueenFigure,
  BlackPawnFigure,
  BlackRookFigure,
  BlackKnightFigure,
  BlackBishopFigure,
  BlackQueenFigure,
  BlackKingFigure,
  BlackPromotedRookFigure,
  BlackPromotedKnightFigure,
  BlackPromotedBishopFigure,
  BlackPromotedQueenFigure,
  WhitePawnFigure,
  WhiteRookFigure,
  WhiteKnightFigure,
  WhiteBishopFigure,
  WhiteQueenFigure,
  WhiteKingFigure,
  WhitePromotedRookFigure,
  WhitePromotedKnightFigure,
  WhitePromotedBishopFigure,
  WhitePromotedQueenFigure,
  isPawnFigure,
  isRookFigure,
  isKnightFigure,
  isBishopFigure,
  isQueenFigure,
  isKingFigure,
  isPromotedFigure,
  isBlackFigure,
  isWhiteFigure,
  getFigureDesciption,
  isAnyFigure,
  MovedOnce,
  hasMovedOnce,
} from './figure'

describe('isPawnFigure', () => {
  const fn = isPawnFigure
  it('should return true for pawn figures', () => {
    expect(fn(PawnFigure)).toBe(true)
    expect(fn(BlackPawnFigure)).toBe(true)
    expect(fn(WhitePawnFigure)).toBe(true)
  })
  it('should return false for non-pawn figures', () => {
    expect(fn(RookFigure)).toBe(false)
    expect(fn(KnightFigure)).toBe(false)
    expect(fn(BishopFigure)).toBe(false)
    expect(fn(QueenFigure)).toBe(false)
    expect(fn(KingFigure)).toBe(false)
    expect(fn(PromotedRookFigure)).toBe(false)
    expect(fn(PromotedKnightFigure)).toBe(false)
    expect(fn(PromotedBishopFigure)).toBe(false)
    expect(fn(PromotedQueenFigure)).toBe(false)
    expect(fn(BlackRookFigure)).toBe(false)
    expect(fn(BlackKnightFigure)).toBe(false)
    expect(fn(BlackBishopFigure)).toBe(false)
    expect(fn(BlackQueenFigure)).toBe(false)
    expect(fn(BlackKingFigure)).toBe(false)
    expect(fn(BlackPromotedRookFigure)).toBe(false)
    expect(fn(BlackPromotedKnightFigure)).toBe(false)
    expect(fn(BlackPromotedBishopFigure)).toBe(false)
    expect(fn(BlackPromotedQueenFigure)).toBe(false)
    expect(fn(WhiteRookFigure)).toBe(false)
    expect(fn(WhiteKnightFigure)).toBe(false)
    expect(fn(WhiteBishopFigure)).toBe(false)
    expect(fn(WhiteQueenFigure)).toBe(false)
    expect(fn(WhiteKingFigure)).toBe(false)
    expect(fn(WhitePromotedRookFigure)).toBe(false)
    expect(fn(WhitePromotedKnightFigure)).toBe(false)
    expect(fn(WhitePromotedBishopFigure)).toBe(false)
    expect(fn(WhitePromotedQueenFigure)).toBe(false)
  })
})

describe('isRookFigure', () => {
  const fn = isRookFigure
  it('should return true for rook figures', () => {
    expect(fn(RookFigure)).toBe(true)
    expect(fn(BlackRookFigure)).toBe(true)
    expect(fn(WhiteRookFigure)).toBe(true)
    expect(fn(PromotedRookFigure)).toBe(true)
    expect(fn(BlackPromotedRookFigure)).toBe(true)
    expect(fn(WhitePromotedRookFigure)).toBe(true)
  })
  it('should return false for non-rook figures', () => {
    expect(fn(PawnFigure)).toBe(false)
    expect(fn(KnightFigure)).toBe(false)
    expect(fn(BishopFigure)).toBe(false)
    expect(fn(QueenFigure)).toBe(false)
    expect(fn(KingFigure)).toBe(false)
    expect(fn(PromotedKnightFigure)).toBe(false)
    expect(fn(PromotedBishopFigure)).toBe(false)
    expect(fn(PromotedQueenFigure)).toBe(false)
    expect(fn(BlackPawnFigure)).toBe(false)
    expect(fn(BlackKnightFigure)).toBe(false)
    expect(fn(BlackBishopFigure)).toBe(false)
    expect(fn(BlackQueenFigure)).toBe(false)
    expect(fn(BlackKingFigure)).toBe(false)
    expect(fn(BlackPromotedKnightFigure)).toBe(false)
    expect(fn(BlackPromotedBishopFigure)).toBe(false)
    expect(fn(BlackPromotedQueenFigure)).toBe(false)
    expect(fn(WhitePawnFigure)).toBe(false)
    expect(fn(WhiteKnightFigure)).toBe(false)
    expect(fn(WhiteBishopFigure)).toBe(false)
    expect(fn(WhiteQueenFigure)).toBe(false)
    expect(fn(WhiteKingFigure)).toBe(false)
    expect(fn(WhitePromotedKnightFigure)).toBe(false)
    expect(fn(WhitePromotedBishopFigure)).toBe(false)
    expect(fn(WhitePromotedQueenFigure)).toBe(false)
  })
})

describe('isKnightFigure', () => {
  const fn = isKnightFigure
  it('should return true for knight figures', () => {
    expect(fn(KnightFigure)).toBe(true)
    expect(fn(PromotedKnightFigure)).toBe(true)
    expect(fn(BlackKnightFigure)).toBe(true)
    expect(fn(BlackPromotedKnightFigure)).toBe(true)
    expect(fn(WhiteKnightFigure)).toBe(true)
    expect(fn(WhitePromotedKnightFigure)).toBe(true)
  })
  it('should return false for non-knight figures', () => {
    expect(fn(PawnFigure)).toBe(false)
    expect(fn(RookFigure)).toBe(false)
    expect(fn(BishopFigure)).toBe(false)
    expect(fn(QueenFigure)).toBe(false)
    expect(fn(KingFigure)).toBe(false)
    expect(fn(PromotedRookFigure)).toBe(false)
    expect(fn(PromotedBishopFigure)).toBe(false)
    expect(fn(PromotedQueenFigure)).toBe(false)
    expect(fn(BlackPawnFigure)).toBe(false)
    expect(fn(BlackRookFigure)).toBe(false)
    expect(fn(BlackBishopFigure)).toBe(false)
    expect(fn(BlackQueenFigure)).toBe(false)
    expect(fn(BlackKingFigure)).toBe(false)
    expect(fn(BlackPromotedRookFigure)).toBe(false)
    expect(fn(BlackPromotedBishopFigure)).toBe(false)
    expect(fn(BlackPromotedQueenFigure)).toBe(false)
    expect(fn(WhitePawnFigure)).toBe(false)
    expect(fn(WhiteRookFigure)).toBe(false)
    expect(fn(WhiteBishopFigure)).toBe(false)
    expect(fn(WhiteQueenFigure)).toBe(false)
    expect(fn(WhiteKingFigure)).toBe(false)
    expect(fn(WhitePromotedRookFigure)).toBe(false)
    expect(fn(WhitePromotedBishopFigure)).toBe(false)
    expect(fn(WhitePromotedQueenFigure)).toBe(false)
  })
})

describe('isBishopFigure', () => {
  const fn = isBishopFigure
  it('should return true for bishop figures', () => {
    expect(fn(BishopFigure)).toBe(true)
    expect(fn(PromotedBishopFigure)).toBe(true)
    expect(fn(BlackBishopFigure)).toBe(true)
    expect(fn(BlackPromotedBishopFigure)).toBe(true)
    expect(fn(WhiteBishopFigure)).toBe(true)
    expect(fn(WhitePromotedBishopFigure)).toBe(true)
  })
  it('should return false for non-bishop figures', () => {
    expect(fn(PawnFigure)).toBe(false)
    expect(fn(RookFigure)).toBe(false)
    expect(fn(KnightFigure)).toBe(false)
    expect(fn(QueenFigure)).toBe(false)
    expect(fn(KingFigure)).toBe(false)
    expect(fn(PromotedRookFigure)).toBe(false)
    expect(fn(PromotedKnightFigure)).toBe(false)
    expect(fn(PromotedQueenFigure)).toBe(false)
    expect(fn(BlackPawnFigure)).toBe(false)
    expect(fn(BlackRookFigure)).toBe(false)
    expect(fn(BlackKnightFigure)).toBe(false)
    expect(fn(BlackQueenFigure)).toBe(false)
    expect(fn(BlackKingFigure)).toBe(false)
    expect(fn(BlackPromotedRookFigure)).toBe(false)
    expect(fn(BlackPromotedKnightFigure)).toBe(false)
    expect(fn(BlackPromotedQueenFigure)).toBe(false)
    expect(fn(WhitePawnFigure)).toBe(false)
    expect(fn(WhiteRookFigure)).toBe(false)
    expect(fn(WhiteKnightFigure)).toBe(false)
    expect(fn(WhiteQueenFigure)).toBe(false)
    expect(fn(WhiteKingFigure)).toBe(false)
    expect(fn(WhitePromotedRookFigure)).toBe(false)
    expect(fn(WhitePromotedKnightFigure)).toBe(false)
    expect(fn(WhitePromotedQueenFigure)).toBe(false)
  })
})

describe('isQueenFigure', () => {
  const fn = isQueenFigure
  it('should return true for queen figures', () => {
    expect(fn(QueenFigure)).toBe(true)
    expect(fn(PromotedQueenFigure)).toBe(true)
    expect(fn(BlackQueenFigure)).toBe(true)
    expect(fn(BlackPromotedQueenFigure)).toBe(true)
    expect(fn(WhiteQueenFigure)).toBe(true)
    expect(fn(WhitePromotedQueenFigure)).toBe(true)
  })
  it('should return false for non-queen figures', () => {
    expect(fn(PawnFigure)).toBe(false)
    expect(fn(RookFigure)).toBe(false)
    expect(fn(KnightFigure)).toBe(false)
    expect(fn(BishopFigure)).toBe(false)
    expect(fn(KingFigure)).toBe(false)
    expect(fn(PromotedRookFigure)).toBe(false)
    expect(fn(PromotedKnightFigure)).toBe(false)
    expect(fn(PromotedBishopFigure)).toBe(false)
    expect(fn(BlackPawnFigure)).toBe(false)
    expect(fn(BlackRookFigure)).toBe(false)
    expect(fn(BlackKnightFigure)).toBe(false)
    expect(fn(BlackBishopFigure)).toBe(false)
    expect(fn(BlackKingFigure)).toBe(false)
    expect(fn(BlackPromotedRookFigure)).toBe(false)
    expect(fn(BlackPromotedKnightFigure)).toBe(false)
    expect(fn(BlackPromotedBishopFigure)).toBe(false)
    expect(fn(WhitePawnFigure)).toBe(false)
    expect(fn(WhiteRookFigure)).toBe(false)
    expect(fn(WhiteKnightFigure)).toBe(false)
    expect(fn(WhiteBishopFigure)).toBe(false)
    expect(fn(WhiteKingFigure)).toBe(false)
    expect(fn(WhitePromotedRookFigure)).toBe(false)
    expect(fn(WhitePromotedKnightFigure)).toBe(false)
    expect(fn(WhitePromotedBishopFigure)).toBe(false)
  })
})

describe('isKingFigure', () => {
  const fn = isKingFigure
  it('should return true for king figures', () => {
    expect(fn(KingFigure)).toBe(true)
    expect(fn(BlackKingFigure)).toBe(true)
    expect(fn(WhiteKingFigure)).toBe(true)
  })
  it('should return false for non-king figures', () => {
    expect(fn(PawnFigure)).toBe(false)
    expect(fn(RookFigure)).toBe(false)
    expect(fn(KnightFigure)).toBe(false)
    expect(fn(BishopFigure)).toBe(false)
    expect(fn(QueenFigure)).toBe(false)
    expect(fn(PromotedRookFigure)).toBe(false)
    expect(fn(PromotedKnightFigure)).toBe(false)
    expect(fn(PromotedBishopFigure)).toBe(false)
    expect(fn(PromotedQueenFigure)).toBe(false)
    expect(fn(BlackPawnFigure)).toBe(false)
    expect(fn(BlackRookFigure)).toBe(false)
    expect(fn(BlackKnightFigure)).toBe(false)
    expect(fn(BlackBishopFigure)).toBe(false)
    expect(fn(BlackQueenFigure)).toBe(false)
    expect(fn(BlackPromotedRookFigure)).toBe(false)
    expect(fn(BlackPromotedKnightFigure)).toBe(false)
    expect(fn(BlackPromotedBishopFigure)).toBe(false)
    expect(fn(BlackPromotedQueenFigure)).toBe(false)
    expect(fn(WhitePawnFigure)).toBe(false)
    expect(fn(WhiteRookFigure)).toBe(false)
    expect(fn(WhiteKnightFigure)).toBe(false)
    expect(fn(WhiteBishopFigure)).toBe(false)
    expect(fn(WhiteQueenFigure)).toBe(false)
    expect(fn(WhitePromotedRookFigure)).toBe(false)
    expect(fn(WhitePromotedKnightFigure)).toBe(false)
    expect(fn(WhitePromotedBishopFigure)).toBe(false)
    expect(fn(WhitePromotedQueenFigure)).toBe(false)
  })
})

describe('isPromotedFigure', () => {
  const fn = isPromotedFigure
  it('should return true for promoted figures', () => {
    expect(fn(PromotedRookFigure)).toBe(true)
    expect(fn(PromotedKnightFigure)).toBe(true)
    expect(fn(PromotedBishopFigure)).toBe(true)
    expect(fn(PromotedQueenFigure)).toBe(true)
    expect(fn(BlackPromotedRookFigure)).toBe(true)
    expect(fn(BlackPromotedKnightFigure)).toBe(true)
    expect(fn(BlackPromotedBishopFigure)).toBe(true)
    expect(fn(BlackPromotedQueenFigure)).toBe(true)
    expect(fn(WhitePromotedRookFigure)).toBe(true)
    expect(fn(WhitePromotedKnightFigure)).toBe(true)
    expect(fn(WhitePromotedBishopFigure)).toBe(true)
    expect(fn(WhitePromotedQueenFigure)).toBe(true)
  })
  it('should return false for non-promoted figures', () => {
    expect(fn(PawnFigure)).toBe(false)
    expect(fn(RookFigure)).toBe(false)
    expect(fn(KnightFigure)).toBe(false)
    expect(fn(BishopFigure)).toBe(false)
    expect(fn(QueenFigure)).toBe(false)
    expect(fn(BlackPawnFigure)).toBe(false)
    expect(fn(BlackRookFigure)).toBe(false)
    expect(fn(BlackKnightFigure)).toBe(false)
    expect(fn(BlackBishopFigure)).toBe(false)
    expect(fn(BlackQueenFigure)).toBe(false)
    expect(fn(WhitePawnFigure)).toBe(false)
    expect(fn(WhiteRookFigure)).toBe(false)
    expect(fn(WhiteKnightFigure)).toBe(false)
    expect(fn(WhiteBishopFigure)).toBe(false)
    expect(fn(WhiteQueenFigure)).toBe(false)
  })
})

describe('isAnyFigure', () => {
  const fn = isAnyFigure
  it('should return true for any valid figure', () => {
    expect(fn(PawnFigure)).toBe(true)
    expect(fn(RookFigure)).toBe(true)
    expect(fn(KnightFigure)).toBe(true)
    expect(fn(BishopFigure)).toBe(true)
    expect(fn(QueenFigure)).toBe(true)
    expect(fn(KingFigure)).toBe(true)
    expect(fn(PromotedRookFigure)).toBe(true)
    expect(fn(PromotedKnightFigure)).toBe(true)
    expect(fn(PromotedBishopFigure)).toBe(true)
    expect(fn(PromotedQueenFigure)).toBe(true)
    expect(fn(BlackPawnFigure)).toBe(true)
    expect(fn(BlackRookFigure)).toBe(true)
    expect(fn(BlackKnightFigure)).toBe(true)
    expect(fn(BlackBishopFigure)).toBe(true)
    expect(fn(BlackQueenFigure)).toBe(true)
    expect(fn(BlackKingFigure)).toBe(true)
    expect(fn(BlackPromotedRookFigure)).toBe(true)
    expect(fn(BlackPromotedKnightFigure)).toBe(true)
    expect(fn(BlackPromotedBishopFigure)).toBe(true)
    expect(fn(BlackPromotedQueenFigure)).toBe(true)
    expect(fn(WhitePawnFigure)).toBe(true)
    expect(fn(WhiteRookFigure)).toBe(true)
    expect(fn(WhiteKnightFigure)).toBe(true)
    expect(fn(WhiteBishopFigure)).toBe(true)
    expect(fn(WhiteQueenFigure)).toBe(true)
    expect(fn(WhiteKingFigure)).toBe(true)
    expect(fn(WhitePromotedRookFigure)).toBe(true)
    expect(fn(WhitePromotedKnightFigure)).toBe(true)
    expect(fn(WhitePromotedBishopFigure)).toBe(true)
    expect(fn(WhitePromotedQueenFigure)).toBe(true)
  })
  it('should return false for invalid figures', () => {
    expect(fn(0)).toBe(false)
  })
})

describe('hasMovedOnce', () => {
  const fn = hasMovedOnce
  it('should return true for any valid figure which moved once', () => {
    expect(fn(BlackPawnFigure | MovedOnce)).toBe(true)
    expect(fn(WhitePawnFigure | MovedOnce)).toBe(true)
  })
  it('should return false for any valid figure which did not move yet', () => {
    expect(fn(BlackPawnFigure)).toBe(false)
    expect(fn(WhitePawnFigure)).toBe(false)
  })
})

describe('isBlackFigure', () => {
  it('should return true for valid black figures', () => {
    expect(isBlackFigure(BlackFigure)).toBe(true)
  })
  it('should return false for invalid black figures', () => {
    expect(isBlackFigure(WhiteFigure)).toBe(false)
  })
})

describe('isWhiteFigure', () => {
  it('should return true for valid white figures', () => {
    expect(isWhiteFigure(WhiteFigure)).toBe(true)
  })
  it('should return false for invalid white figures', () => {
    expect(isWhiteFigure(BlackFigure)).toBe(false)
  })
})

describe('getFigureDesciption', () => {
  const fn = getFigureDesciption

  // No figure (empty tile)
  it('should return empty string for no figure (empty tile)', () => {
    expect(fn(0)).toBe('')
  })

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
    expect(fn(PromotedRookFigure)).toBe('Rook (Promoted)')
  })
  it('should return the correct description for a promoted knight', () => {
    expect(fn(PromotedKnightFigure)).toBe('Knight (Promoted)')
  })
  it('should return the correct description for a promoted bishop', () => {
    expect(fn(PromotedBishopFigure)).toBe('Bishop (Promoted)')
  })
  it('should return the correct description for a promoted queen', () => {
    expect(fn(PromotedQueenFigure)).toBe('Queen (Promoted)')
  })

  // Black figures
  it('should return the correct description for a black pawn', () => {
    expect(fn(BlackPawnFigure)).toBe('Black Pawn')
  })
  it('should return the correct description for a black rook', () => {
    expect(fn(BlackRookFigure)).toBe('Black Rook')
  })
  it('should return the correct description for a black knight', () => {
    expect(fn(BlackKnightFigure)).toBe('Black Knight')
  })
  it('should return the correct description for a black bishop', () => {
    expect(fn(BlackBishopFigure)).toBe('Black Bishop')
  })
  it('should return the correct description for a black queen', () => {
    expect(fn(BlackQueenFigure)).toBe('Black Queen')
  })
  it('should return the correct description for a black king', () => {
    expect(fn(BlackKingFigure)).toBe('Black King')
  })

  // Black Promoted figures
  it('should return the correct description for a black promoted rook', () => {
    expect(fn(BlackPromotedRookFigure)).toBe('Black Rook (Promoted)')
  })
  it('should return the correct description for a black promoted knight', () => {
    expect(fn(BlackPromotedKnightFigure)).toBe('Black Knight (Promoted)')
  })
  it('should return the correct description for a black promoted bishop', () => {
    expect(fn(BlackPromotedBishopFigure)).toBe('Black Bishop (Promoted)')
  })
  it('should return the correct description for a black promoted queen', () => {
    expect(fn(BlackPromotedQueenFigure)).toBe('Black Queen (Promoted)')
  })

  // White figures
  it('should return the correct description for a white pawn', () => {
    expect(fn(WhitePawnFigure)).toBe('White Pawn')
  })
  it('should return the correct description for a white rook', () => {
    expect(fn(WhiteRookFigure)).toBe('White Rook')
  })
  it('should return the correct description for a white knight', () => {
    expect(fn(WhiteKnightFigure)).toBe('White Knight')
  })
  it('should return the correct description for a white bishop', () => {
    expect(fn(WhiteBishopFigure)).toBe('White Bishop')
  })
  it('should return the correct description for a white queen', () => {
    expect(fn(WhiteQueenFigure)).toBe('White Queen')
  })
  it('should return the correct description for a white king', () => {
    expect(fn(WhiteKingFigure)).toBe('White King')
  })

  // White Promoted figures
  it('should return the correct description for a white promoted rook', () => {
    expect(fn(WhitePromotedRookFigure)).toBe('White Rook (Promoted)')
  })
  it('should return the correct description for a white promoted knight', () => {
    expect(fn(WhitePromotedKnightFigure)).toBe('White Knight (Promoted)')
  })
  it('should return the correct description for a white promoted bishop', () => {
    expect(fn(WhitePromotedBishopFigure)).toBe('White Bishop (Promoted)')
  })
  it('should return the correct description for a white promoted queen', () => {
    expect(fn(WhitePromotedQueenFigure)).toBe('White Queen (Promoted)')
  })

  // Invalid figures
  it('should return unknown for invalid figures', () => {
    expect(fn(undefined as unknown as number)).toBe('Unknown')
    expect(fn(null as unknown as number)).toBe('Unknown')
    expect(fn(false as unknown as number)).toBe('Unknown')
    expect(fn(-1 as number)).toBe('Unknown')
  })
})

export const FigureFlags = 0b1111111111

/* prettier-ignore */ export const PawnFigure   = 0b0000000001
/* prettier-ignore */ export const RookFigure   = 0b0000000010
/* prettier-ignore */ export const KnightFigure = 0b0000000100
/* prettier-ignore */ export const BishopFigure = 0b0000001000
/* prettier-ignore */ export const QueenFigure  = 0b0000010000
/* prettier-ignore */ export const KingFigure   = 0b0000100000
export const BaseFigures =
  PawnFigure | RookFigure | KnightFigure | BishopFigure | QueenFigure | KingFigure

export function isPawnFigure(v: unknown): v is typeof PawnFigure {
  return typeof v === 'number' && (v & PawnFigure) === PawnFigure
}
export function isRookFigure(v: unknown): v is typeof RookFigure {
  return typeof v === 'number' && (v & RookFigure) === RookFigure
}
export function isKnightFigure(v: unknown): v is typeof KnightFigure {
  return typeof v === 'number' && (v & KnightFigure) === KnightFigure
}
export function isBishopFigure(v: unknown): v is typeof BishopFigure {
  return typeof v === 'number' && (v & BishopFigure) === BishopFigure
}
export function isQueenFigure(v: unknown): v is typeof QueenFigure {
  return typeof v === 'number' && (v & QueenFigure) === QueenFigure
}
export function isKingFigure(v: unknown): v is typeof KingFigure {
  return typeof v === 'number' && (v & KingFigure) === KingFigure
}

/* prettier-ignore */ export const PromotedFigure       = 0b0001000000
/* prettier-ignore */ export const PromotedRookFigure   = PromotedFigure | RookFigure
/* prettier-ignore */ export const PromotedKnightFigure = PromotedFigure | KnightFigure
/* prettier-ignore */ export const PromotedBishopFigure = PromotedFigure | BishopFigure
/* prettier-ignore */ export const PromotedQueenFigure  = PromotedFigure | QueenFigure
export const PromotedFigures = BaseFigures | PromotedFigure

export function isPromotedFigure(v: unknown): v is typeof PromotedFigure {
  return typeof v === 'number' && (v & PromotedFigure) === PromotedFigure
}

/* prettier-ignore */ export const BlackFigure = 0b0010000000
/* prettier-ignore */ export const WhiteFigure = 0b0100000000

export function isBlackFigure(v: unknown): v is typeof BlackFigure {
  return typeof v === 'number' && (v & BlackFigure) === BlackFigure
}
export function isWhiteFigure(v: unknown): v is typeof WhiteFigure {
  return typeof v === 'number' && (v & WhiteFigure) === WhiteFigure
}

/* prettier-ignore */ export const BlackPawnFigure           = BlackFigure | PawnFigure
/* prettier-ignore */ export const BlackRookFigure           = BlackFigure | RookFigure
/* prettier-ignore */ export const BlackKnightFigure         = BlackFigure | KnightFigure
/* prettier-ignore */ export const BlackBishopFigure         = BlackFigure | BishopFigure
/* prettier-ignore */ export const BlackQueenFigure          = BlackFigure | QueenFigure
/* prettier-ignore */ export const BlackKingFigure           = BlackFigure | KingFigure
/* prettier-ignore */ export const BlackPromotedRookFigure   = BlackFigure | PromotedFigure | RookFigure
/* prettier-ignore */ export const BlackPromotedKnightFigure = BlackFigure | PromotedFigure | KnightFigure
/* prettier-ignore */ export const BlackPromotedBishopFigure = BlackFigure | PromotedFigure | BishopFigure
/* prettier-ignore */ export const BlackPromotedQueenFigure  = BlackFigure | PromotedFigure | QueenFigure
export type AnyBlackFigure =
  | typeof BlackPawnFigure
  | typeof BlackRookFigure
  | typeof BlackKnightFigure
  | typeof BlackBishopFigure
  | typeof BlackQueenFigure
  | typeof BlackKingFigure
  | typeof BlackPromotedRookFigure
  | typeof BlackPromotedKnightFigure
  | typeof BlackPromotedBishopFigure
  | typeof BlackPromotedQueenFigure

/* prettier-ignore */ export const WhitePawnFigure           = WhiteFigure | PawnFigure
/* prettier-ignore */ export const WhiteRookFigure           = WhiteFigure | RookFigure
/* prettier-ignore */ export const WhiteKnightFigure         = WhiteFigure | KnightFigure
/* prettier-ignore */ export const WhiteBishopFigure         = WhiteFigure | BishopFigure
/* prettier-ignore */ export const WhiteQueenFigure          = WhiteFigure | QueenFigure
/* prettier-ignore */ export const WhiteKingFigure           = WhiteFigure | KingFigure
/* prettier-ignore */ export const WhitePromotedRookFigure   = WhiteFigure | PromotedFigure | RookFigure
/* prettier-ignore */ export const WhitePromotedKnightFigure = WhiteFigure | PromotedFigure | KnightFigure
/* prettier-ignore */ export const WhitePromotedBishopFigure = WhiteFigure | PromotedFigure | BishopFigure
/* prettier-ignore */ export const WhitePromotedQueenFigure  = WhiteFigure | PromotedFigure | QueenFigure
export type AnyWhiteFigure =
  | typeof WhitePawnFigure
  | typeof WhiteRookFigure
  | typeof WhiteKnightFigure
  | typeof WhiteBishopFigure
  | typeof WhiteQueenFigure
  | typeof WhiteKingFigure
  | typeof WhitePromotedRookFigure
  | typeof WhitePromotedKnightFigure
  | typeof WhitePromotedBishopFigure
  | typeof WhitePromotedQueenFigure

export type AnyFigure = AnyBlackFigure | AnyWhiteFigure

export function isAnyFigure(v: unknown): v is AnyFigure {
  return (
    isPawnFigure(v) ||
    isRookFigure(v) ||
    isKnightFigure(v) ||
    isBishopFigure(v) ||
    isQueenFigure(v) ||
    isKingFigure(v)
  )
}

/* prettier-ignore */ export const MovedOnce = 0b1000000000

export function hasMovedOnce(v: unknown): v is typeof MovedOnce {
  return typeof v === 'number' && (v & MovedOnce) === MovedOnce
}

export function getFigureDesciption(v: AnyFigure): string {
  if (typeof v !== 'number') return 'Unknown'
  switch (v & FigureFlags) {
    default:
      return 'Unknown'
    case 0:
      return ''
    case PawnFigure:
      return 'Pawn'
    case RookFigure:
      return 'Rook'
    case KnightFigure:
      return 'Knight'
    case BishopFigure:
      return 'Bishop'
    case QueenFigure:
      return 'Queen'
    case KingFigure:
      return 'King'
    case PromotedRookFigure:
      return 'Rook (Promoted)'
    case PromotedKnightFigure:
      return 'Knight (Promoted)'
    case PromotedBishopFigure:
      return 'Bishop (Promoted)'
    case PromotedQueenFigure:
      return 'Queen (Promoted)'
    case BlackPawnFigure:
      return 'Black Pawn'
    case BlackRookFigure:
      return 'Black Rook'
    case BlackKnightFigure:
      return 'Black Knight'
    case BlackBishopFigure:
      return 'Black Bishop'
    case BlackQueenFigure:
      return 'Black Queen'
    case BlackKingFigure:
      return 'Black King'
    case BlackPromotedRookFigure:
      return 'Black Rook (Promoted)'
    case BlackPromotedKnightFigure:
      return 'Black Knight (Promoted)'
    case BlackPromotedBishopFigure:
      return 'Black Bishop (Promoted)'
    case BlackPromotedQueenFigure:
      return 'Black Queen (Promoted)'
    case WhitePawnFigure:
      return 'White Pawn'
    case WhiteRookFigure:
      return 'White Rook'
    case WhiteKnightFigure:
      return 'White Knight'
    case WhiteBishopFigure:
      return 'White Bishop'
    case WhiteQueenFigure:
      return 'White Queen'
    case WhiteKingFigure:
      return 'White King'
    case WhitePromotedRookFigure:
      return 'White Rook (Promoted)'
    case WhitePromotedKnightFigure:
      return 'White Knight (Promoted)'
    case WhitePromotedBishopFigure:
      return 'White Bishop (Promoted)'
    case WhitePromotedQueenFigure:
      return 'White Queen (Promoted)'
  }
}

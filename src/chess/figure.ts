/* prettier-ignore */ export const PawnFigure   = 0b0000000001
/* prettier-ignore */ export const RookFigure   = 0b0000000010
/* prettier-ignore */ export const KnightFigure = 0b0000000100
/* prettier-ignore */ export const BishopFigure = 0b0000001000
/* prettier-ignore */ export const QueenFigure  = 0b0000010000
/* prettier-ignore */ export const KingFigure   = 0b0000100000
export const BaseFigures =
  PawnFigure | RookFigure | KnightFigure | BishopFigure | QueenFigure | KingFigure

export function isPawnFigure(v: unknown): v is typeof PawnFigure {
  return typeof v === 'number' && v >= 0 && (v & PawnFigure) === PawnFigure
}
export function isRookFigure(v: unknown): v is typeof RookFigure {
  return typeof v === 'number' && v >= 0 && (v & RookFigure) === RookFigure
}
export function isKnightFigure(v: unknown): v is typeof KnightFigure {
  return typeof v === 'number' && v >= 0 && (v & KnightFigure) === KnightFigure
}
export function isBishopFigure(v: unknown): v is typeof BishopFigure {
  return typeof v === 'number' && v >= 0 && (v & BishopFigure) === BishopFigure
}
export function isQueenFigure(v: unknown): v is typeof QueenFigure {
  return typeof v === 'number' && v >= 0 && (v & QueenFigure) === QueenFigure
}
export function isKingFigure(v: unknown): v is typeof KingFigure {
  return typeof v === 'number' && v >= 0 && (v & KingFigure) === KingFigure
}

export function isFigure(v: unknown): v is Figure {
  return (
    isPawnFigure(v) ||
    isRookFigure(v) ||
    isKnightFigure(v) ||
    isBishopFigure(v) ||
    isQueenFigure(v) ||
    isKingFigure(v)
  )
}

/* prettier-ignore */ export const PromotedFigure       = 0b0001000000
export const PromotedFigures =
  RookFigure | KnightFigure | BishopFigure | QueenFigure | PromotedFigure

export function isPromotedFigure(v: unknown): v is typeof PromotedFigure {
  return typeof v === 'number' && (v & PromotedFigure) === PromotedFigure
}

/* prettier-ignore */ export const BlackFigure = 0b0010000000
/* prettier-ignore */ export const WhiteFigure = 0b0100000000

export function isBlackFigure(v: unknown): v is typeof BlackFigure {
  return isFigure(v) && (v & BlackFigure) === BlackFigure
}
export function isWhiteFigure(v: unknown): v is typeof WhiteFigure {
  return isFigure(v) && (v & WhiteFigure) === WhiteFigure
}

export function isEnemyFigure(figure: Figure, target: Figure): boolean | null {
  if (isBlackFigure(figure)) {
    return isWhiteFigure(target)
  } else if (isWhiteFigure(figure)) {
    return isBlackFigure(target)
  }
  return null
}

export const Figures = BaseFigures | PromotedFigures | BlackFigure | WhiteFigure

export type Figure = typeof Figures

/* prettier-ignore */ export const MovedOnce = 0b1000000000

export function hasMovedOnce(v: unknown): v is typeof MovedOnce {
  return typeof v === 'number' && (v & MovedOnce) === MovedOnce
}

export function getFigureDesciption(figure: Figure): string {
  if (typeof figure !== 'number' || figure < 0) return 'Invalid'

  const parts: string[] = []
  if (isBlackFigure(figure)) {
    parts.push('Black')
  } else if (isWhiteFigure(figure)) {
    parts.push('White')
  }

  switch (figure & BaseFigures) {
    case PawnFigure:
      parts.push('Pawn')
      break
    case RookFigure:
      parts.push('Rook')
      break
    case KnightFigure:
      parts.push('Knight')
      break
    case BishopFigure:
      parts.push('Bishop')
      break
    case QueenFigure:
      parts.push('Queen')
      break
    case KingFigure:
      parts.push('King')
      break
    case 0:
      parts.push('None')
      break
    default:
      parts.push('Unknown')
      break
  }

  if (isPromotedFigure(figure)) {
    parts.push('(Promoted)')
  }

  return parts.join(' ')
}

/* prettier-ignore */ export const PawnPiece   = 0b0000000001
/* prettier-ignore */ export const RookPiece   = 0b0000000010
/* prettier-ignore */ export const KnightPiece = 0b0000000100
/* prettier-ignore */ export const BishopPiece = 0b0000001000
/* prettier-ignore */ export const QueenPiece  = 0b0000010000
/* prettier-ignore */ export const KingPiece   = 0b0000100000
export const BasePieces = PawnPiece | RookPiece | KnightPiece | BishopPiece | QueenPiece | KingPiece

export function isPawnPiece(v: unknown): v is typeof PawnPiece {
  return typeof v === 'number' && v >= 0 && (v & PawnPiece) === PawnPiece
}
export function isRookPiece(v: unknown): v is typeof RookPiece {
  return typeof v === 'number' && v >= 0 && (v & RookPiece) === RookPiece
}
export function isKnightPiece(v: unknown): v is typeof KnightPiece {
  return typeof v === 'number' && v >= 0 && (v & KnightPiece) === KnightPiece
}
export function isBishopPiece(v: unknown): v is typeof BishopPiece {
  return typeof v === 'number' && v >= 0 && (v & BishopPiece) === BishopPiece
}
export function isQueenPiece(v: unknown): v is typeof QueenPiece {
  return typeof v === 'number' && v >= 0 && (v & QueenPiece) === QueenPiece
}
export function isKingPiece(v: unknown): v is typeof KingPiece {
  return typeof v === 'number' && v >= 0 && (v & KingPiece) === KingPiece
}

export function isPiece(v: unknown): v is Piece {
  return (
    isPawnPiece(v) ||
    isRookPiece(v) ||
    isKnightPiece(v) ||
    isBishopPiece(v) ||
    isQueenPiece(v) ||
    isKingPiece(v)
  )
}

/* prettier-ignore */ export const PromotedPiece       = 0b0001000000
export const PromotedPieces = RookPiece | KnightPiece | BishopPiece | QueenPiece | PromotedPiece

export function isPromotedPiece(v: unknown): v is typeof PromotedPiece {
  return typeof v === 'number' && (v & PromotedPiece) === PromotedPiece
}

/* prettier-ignore */ export const BlackPiece = 0b0010000000
/* prettier-ignore */ export const WhitePiece = 0b0100000000

export function isBlackPiece(v: unknown): v is typeof BlackPiece {
  return isPiece(v) && (v & BlackPiece) === BlackPiece
}
export function isWhitePiece(v: unknown): v is typeof WhitePiece {
  return isPiece(v) && (v & WhitePiece) === WhitePiece
}

export function isEnemyPiece(piece: Piece, target: Piece): boolean | null {
  const pieceIsBlack = isBlackPiece(piece)
  const pieceIsWhite = isWhitePiece(piece)
  const targetIsBlack = isBlackPiece(target)
  const targetIsWhite = isWhitePiece(target)
  if ((pieceIsBlack && targetIsWhite) || (pieceIsWhite && targetIsBlack)) {
    return true
  } else if ((pieceIsBlack && targetIsBlack) || (pieceIsWhite && targetIsWhite)) {
    return false
  }
  return null
}

export const Pieces = BasePieces | PromotedPieces | BlackPiece | WhitePiece

export type Piece = typeof Pieces

/* prettier-ignore */ export const MovedOnce = 0b1000000000

export function hasPieceMoved(v: unknown): v is typeof MovedOnce {
  return typeof v === 'number' && (v & MovedOnce) === MovedOnce
}

export function getPieceKind(
  piece: Piece,
): 'pawn' | 'rook' | 'bishop' | 'knight' | 'queen' | 'king' | 'invalid' {
  if (isPawnPiece(piece)) {
    return 'pawn'
  } else if (isRookPiece(piece)) {
    return 'rook'
  } else if (isKnightPiece(piece)) {
    return 'knight'
  } else if (isBishopPiece(piece)) {
    return 'bishop'
  } else if (isQueenPiece(piece)) {
    return 'queen'
  } else if (isKingPiece(piece)) {
    return 'king'
  }
  return 'invalid'
}

export function getPieceDesciption(piece: Piece): string {
  if (typeof piece !== 'number' || piece < 0) return 'Invalid'

  const parts: string[] = []
  if (isBlackPiece(piece)) {
    parts.push('Black')
  } else if (isWhitePiece(piece)) {
    parts.push('White')
  }

  switch (piece & BasePieces) {
    case PawnPiece:
      parts.push('Pawn')
      break
    case RookPiece:
      parts.push('Rook')
      break
    case KnightPiece:
      parts.push('Knight')
      break
    case BishopPiece:
      parts.push('Bishop')
      break
    case QueenPiece:
      parts.push('Queen')
      break
    case KingPiece:
      parts.push('King')
      break
    case 0:
      parts.push('None')
      break
    default:
      parts.push('Unknown')
      break
  }

  if (isPromotedPiece(piece)) {
    parts.push('(Promoted)')
  }

  return parts.join(' ')
}

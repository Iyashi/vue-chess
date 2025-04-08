import type { Player } from './types'

export const BlackPlayer: Player = 'black' as const

export const WhitePlayer: Player = 'white' as const

export function isPlayer(v: unknown): v is Player {
  return typeof v === 'string' && (v === BlackPlayer || v === WhitePlayer)
}

import { describe, it, expect } from 'vitest'
import { BlackPlayer, WhitePlayer, isPlayer } from './player'

describe('isPlayer', () => {
  it('should return true for valid black player', () => {
    expect(isPlayer(BlackPlayer)).toBe(true)
    expect(isPlayer('black')).toBe(true)
  })
  it('should return true for valid white player', () => {
    expect(isPlayer(WhitePlayer)).toBe(true)
    expect(isPlayer('white')).toBe(true)
  })
  it('should return false for invalid players', () => {
    expect(isPlayer(undefined)).toBe(false)
    expect(isPlayer(null)).toBe(false)
    expect(isPlayer([])).toBe(false)
    expect(isPlayer({})).toBe(false)
    expect(isPlayer(NaN)).toBe(false)
    expect(isPlayer(-1)).toBe(false)
    expect(isPlayer(0)).toBe(false)
    expect(isPlayer(1)).toBe(false)
    expect(isPlayer('')).toBe(false)
    expect(isPlayer('invalid')).toBe(false)
  })
})

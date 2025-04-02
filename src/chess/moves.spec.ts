import { describe, it, expect } from 'vitest'
import * as Moves from './moves'

describe('moves', () => {
  it('should have all moves defined', () => {
    expect(Moves.WalkOnEmpty).toBeDefined()
    expect(Moves.WalkOnFriend).toBeDefined()
    expect(Moves.WalkOnEnemy).toBeDefined()
    expect(Moves.WalkOnAny).toBeDefined()
    expect(Moves.JumpOnEmpty).toBeDefined()
    expect(Moves.JumpOnFriend).toBeDefined()
    expect(Moves.JumpOnEnemy).toBeDefined()
    expect(Moves.JumpOnAny).toBeDefined()
    expect(Moves.AnyMove).toBeDefined()
    expect(Moves.NoMove).toBeDefined()
  })
})

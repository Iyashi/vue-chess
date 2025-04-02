import { describe, expect, it } from 'vitest'
import * as Directions from './directions'

describe('directions', () => {
  it('should have all directions defined', () => {
    expect(Directions.Up).toBeDefined()
    expect(Directions.Down).toBeDefined()
    expect(Directions.Right).toBeDefined()
    expect(Directions.Left).toBeDefined()
    expect(Directions.Horizontal).toBeDefined()
    expect(Directions.Vertical).toBeDefined()
    expect(Directions.HorizontalVertical).toBeDefined()
    expect(Directions.DiagonalUpLeft).toBeDefined()
    expect(Directions.DiagonalUpRight).toBeDefined()
    expect(Directions.DiagonalUp).toBeDefined()
    expect(Directions.DiagonalDownLeft).toBeDefined()
    expect(Directions.DiagonalDownRight).toBeDefined()
    expect(Directions.DiagonalDown).toBeDefined()
    expect(Directions.DiagonalLeft).toBeDefined()
    expect(Directions.DiagonalRight).toBeDefined()
    expect(Directions.Diagonal).toBeDefined()
    expect(Directions.AnyDirection).toBeDefined()
    expect(Directions.NoDirection).toBeDefined()
  })
})

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import ChessPromotionDialog from '../ChessPromotionDialog.vue'
import {
  BlackFigure,
  WhiteFigure,
  PawnFigure,
  isBlackFigure,
  isWhiteFigure,
  isBishopFigure,
  isKnightFigure,
  isQueenFigure,
  isRookFigure,
} from '@/chess/figure'

describe('ChessPromotionDialog', () => {
  it('renders properly', () => {
    const wrapper = mount(ChessPromotionDialog, { props: { figure: PawnFigure } })
    expect(wrapper.element.classList.toString()).toContain('promotion-dialog-container')
  })
})

describe('ChessPromotionDialog @promote event', () => {
  it('emits promote event when a black figure is selected', () => {
    ;['rook', 'knight', 'bishop', 'queen'].forEach((figureName) => {
      const figure = BlackFigure | PawnFigure
      const wrapper = mount(ChessPromotionDialog, { props: { figure } })
      const figureButton = wrapper.vm.$el.querySelector('button.' + figureName)
      figureButton.click()
      const emitted = wrapper.emitted()
      expect('promote' in emitted).toBe(true)
      expect(emitted.promote.length).toEqual(1)
      const promoteEvent = emitted.promote[0] as [number, number]
      expect(promoteEvent[1]).toEqual(figure)
      expect(isBlackFigure(promoteEvent[0])).toBe(true)
      switch (figureName) {
        case 'rook':
          expect(isRookFigure(promoteEvent[0])).toBe(true)
          break
        case 'knight':
          expect(isKnightFigure(promoteEvent[0])).toBe(true)
          break
        case 'bishop':
          expect(isBishopFigure(promoteEvent[0])).toBe(true)
          break
        case 'queen':
          expect(isQueenFigure(promoteEvent[0])).toBe(true)
          break
      }
    })
  })

  it('emits promote event when a white figure is selected', () => {
    ;['rook', 'knight', 'bishop', 'queen'].forEach((figureName) => {
      const figure = WhiteFigure | PawnFigure
      const wrapper = mount(ChessPromotionDialog, { props: { figure } })
      const figureButton = wrapper.vm.$el.querySelector('button.' + figureName)
      figureButton.click()
      const emitted = wrapper.emitted()
      expect('promote' in emitted).toBe(true)
      expect(emitted.promote.length).toEqual(1)
      const promoteEvent = emitted.promote[0] as [number, number]
      expect(promoteEvent[1]).toEqual(figure)
      expect(isWhiteFigure(promoteEvent[0])).toBe(true)
      switch (figureName) {
        case 'rook':
          expect(isRookFigure(promoteEvent[0])).toBe(true)
          break
        case 'knight':
          expect(isKnightFigure(promoteEvent[0])).toBe(true)
          break
        case 'bishop':
          expect(isBishopFigure(promoteEvent[0])).toBe(true)
          break
        case 'queen':
          expect(isQueenFigure(promoteEvent[0])).toBe(true)
          break
      }
    })
  })
})

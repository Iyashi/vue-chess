import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import ChessPromotionDialog from '../ChessPromotionDialog.vue'
import {
  BlackPiece,
  WhitePiece,
  PawnPiece,
  isBlackPiece,
  isWhitePiece,
  isBishopPiece,
  isKnightPiece,
  isQueenPiece,
  isRookPiece,
} from '@/chess/piece'

describe('ChessPromotionDialog', () => {
  it('renders properly', () => {
    const wrapper = mount(ChessPromotionDialog, { props: { piece: PawnPiece } })
    expect(wrapper.element.classList.toString()).toContain('promotion-dialog-container')
  })
})

describe('ChessPromotionDialog @promote event', () => {
  it('emits promote event when a black piece is selected', () => {
    ;['rook', 'knight', 'bishop', 'queen'].forEach((pieceName) => {
      const piece = BlackPiece | PawnPiece
      const wrapper = mount(ChessPromotionDialog, { props: { piece } })
      const pieceButton = wrapper.vm.$el.querySelector('button.' + pieceName)
      pieceButton.click()
      const emitted = wrapper.emitted()
      expect('promote' in emitted).toBe(true)
      expect(emitted.promote.length).toEqual(1)
      const promoteEvent = emitted.promote[0] as [number, number]
      expect(promoteEvent[1]).toEqual(piece)
      expect(isBlackPiece(promoteEvent[0])).toBe(true)
      switch (pieceName) {
        case 'rook':
          expect(isRookPiece(promoteEvent[0])).toBe(true)
          break
        case 'knight':
          expect(isKnightPiece(promoteEvent[0])).toBe(true)
          break
        case 'bishop':
          expect(isBishopPiece(promoteEvent[0])).toBe(true)
          break
        case 'queen':
          expect(isQueenPiece(promoteEvent[0])).toBe(true)
          break
      }
    })
  })

  it('emits promote event when a white piece is selected', () => {
    ;['rook', 'knight', 'bishop', 'queen'].forEach((pieceName) => {
      const piece = WhitePiece | PawnPiece
      const wrapper = mount(ChessPromotionDialog, { props: { piece } })
      const pieceButton = wrapper.vm.$el.querySelector('button.' + pieceName)
      pieceButton.click()
      const emitted = wrapper.emitted()
      expect('promote' in emitted).toBe(true)
      expect(emitted.promote.length).toEqual(1)
      const promoteEvent = emitted.promote[0] as [number, number]
      expect(promoteEvent[1]).toEqual(piece)
      expect(isWhitePiece(promoteEvent[0])).toBe(true)
      switch (pieceName) {
        case 'rook':
          expect(isRookPiece(promoteEvent[0])).toBe(true)
          break
        case 'knight':
          expect(isKnightPiece(promoteEvent[0])).toBe(true)
          break
        case 'bishop':
          expect(isBishopPiece(promoteEvent[0])).toBe(true)
          break
        case 'queen':
          expect(isQueenPiece(promoteEvent[0])).toBe(true)
          break
      }
    })
  })
})

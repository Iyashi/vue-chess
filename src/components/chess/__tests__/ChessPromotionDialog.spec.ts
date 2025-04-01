import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import ChessPromotionDialog from '../ChessPromotionDialog.vue'
import { BlackFigure, PawnFigure } from '@/chess/figure'

describe('ChessPromotionDialog', () => {
  it('renders properly', () => {
    const wrapper = mount(ChessPromotionDialog, { props: { figure: BlackFigure | PawnFigure } })
    expect(wrapper.element.classList.toString()).toContain('promotion-dialog-container')
  })
})

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import ChessGame from '../ChessGame.vue'

describe('ChessGame', () => {
  it('renders properly', () => {
    const wrapper = mount(ChessGame)
    expect(wrapper.element.classList.toString()).toContain('chess-game')
  })
})

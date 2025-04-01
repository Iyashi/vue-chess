import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import ChessBoard from '../ChessBoard.vue'
import { createBoard } from '@/chess/board'

describe('ChessBoard', () => {
  it('renders properly', () => {
    const board = createBoard()
    const wrapper = mount(ChessBoard, { props: { board } })
    expect(wrapper.element.classList.toString()).toContain('chess-board')
  })
})

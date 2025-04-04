import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import { createBoard } from '@/chess/board'
import ChessBoard from '../ChessBoard.vue'

describe('ChessBoard', () => {
  it('renders properly', () => {
    const board = createBoard()
    const wrapper = mount(ChessBoard, { props: { board } })
    expect(wrapper.element.classList.toString()).toContain('chess-board')
  })
})

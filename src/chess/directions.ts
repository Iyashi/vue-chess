/**
 * Exports contains for directions.
 *
 * @name Directions
 * @module chess/directions
 * @author Jannik Lohaus <jannik@lo.haus>
 */

/**
 * Up direction (or North).
 *
 * @constant {number} Up - Up direction
 * @example x is the starting point
 * +---------+
 * |    ^    |
 * |    |    |
 * |    x    |
 * |         |
 * +---------+
 */
export const Up = 0b00000001

/**
 * Down direction (or South).
 *
 * @constant {number} Down - Down direction
 * @example x is the starting point
 * +---------+
 * |         |
 * |    x    |
 * |    |    |
 * |    v    |
 * +---------+
 */
export const Down = 0b00000010

/**
 * Right direction (or East).
 *
 * @constant {number} Right - Right direction
 * @example x is the starting point
 * +---------+
 * |         |
 * |  x----> |
 * |         |
 * +---------+
 */
export const Right = 0b00001000

/**
 * Left direction (or West).
 *
 * @constant {number} Left - Left direction
 * @example x is the starting point
 * +---------+
 * |         |
 * |  <----x |
 * |         |
 * +---------+
 */
export const Left = 0b00000100

/**
 * Horizontal direction is a combination of Left and Right directions (or East and West).
 *
 * @constant {number} Horizontal - Left and Right directions
 * @example x is the starting point
 * +---------+
 * |         |
 * | <--x--> |
 * |         |
 * +---------+
 */
export const Horizontal = Left | Right

/**
 * Vertical direction is a combination of Up and Down directions.
 *
 * @constant {number} Vertical - Up and Down directions
 * @example x is the starting point
 * +---------+
 * |    ^    |
 * |    |    |
 * |    x    |
 * |    |    |
 * |    v    |
 * +---------+
 */
export const Vertical = Up | Down

/**
 * HorizontalVertical is a combination of Horizontal and Vertical directions.
 *
 * @constant {number} HorizontalVertical - towards HorizontalVertical
 * @example x is the starting point
 * +---------+
 * |    ^    |
 * |    |    |
 * | <--x--> |
 * |    |    |
 * |    v    |
 * +---------+
 */
export const HorizontalVertical = Horizontal | Vertical

/**
 * Diagonally Up-Left (or North-West)
 *
 * @constant {number} DiagonalUpLeft - Towards North-West
 * @example x is the starting point
 * +---------+
 * |  \      |
 * |   \     |
 * |    x    |
 * |         |
 * |         |
 * +---------+
 */
export const DiagonalUpLeft = 0b00010000

/**
 * Diagonally Up-Right (or North-East)
 *
 * @constant {number} DiagonalUpRight - Towards North-East
 * @example x is the starting point
 * +---------+
 * |      /  |
 * |     /   |
 * |    x    |
 * |         |
 * |         |
 * +---------+
 */
export const DiagonalUpRight = 0b00100000

/**
 * Both upper diagonals, meaning Up-Left and Up-Right or North-West and North-East
 *
 * @constant {number} DiagonalUp - Towards upper diagonals (North-West and North-East)
 * @example x is the starting point
 * +---------+
 * |  \   /  |
 * |   \ /   |
 * |    x    |
 * |         |
 * |         |
 * +---------+
 */
export const DiagonalUp = DiagonalUpLeft | DiagonalUpRight

/**
 * Down-Left
 *
 * @constant {number} DiagonalDownLeft - towards Down-Left
 * @example x is the starting point
 * +---------+
 * |         |
 * |         |
 * |    x    |
 * |   /     |
 * |  /      |
 * +---------+
 */
export const DiagonalDownLeft = 0b01000000

/**
 * Down-Right
 *
 * @constant {number} DiagonalDownRight - towards Down-Right
 * @example x is the starting point
 * +---------+
 * |         |
 * |         |
 * |    x    |
 * |     \   |
 * |      \  |
 * +---------+
 */
export const DiagonalDownRight = 0b10000000

/**
 * Down-Left and Down-Right
 *
 * @constant {number} DiagonalDown - towards Diagonal-Down
 * @example x is the starting point
 * +---------+
 * |         |
 * |         |
 * |    x    |
 * |   /     |
 * |  /      |
 * +---------+
 */
export const DiagonalDown = 0b11000000

/**
 * Up-Left and Down-Left
 *
 * @constant {number} DiagonalLeft - towards Diagonal-Left
 */
export const DiagonalLeft = 0b01010000

/**
 * Up-Right and Down-Right
 *
 * @constant {number} DiagonalRight - towards Diagonal-Right
 */
export const DiagonalRight = 0b10100000

/**
 * Up-Left and Up-Right and Down-Left and Down-Right
 *
 * @constant {number} Diagonal - towards Diagonal
 */
export const Diagonal = 0b11110000

/**
 * All directions combined.
 *
 * Meaning all of Horizontal, Vertical and Diagonal directions.
 *
 * @constant {number} AnyDirection - All directions combined.
 */
export const AnyDirection = 0b11111111

/**
 * None of the directions
 *
 * @constant {number} NoDirection - None of the directions.
 */
export const NoDirection = 0b00000000

/**
 * Exports constants for movement types.
 *
 * There are `Walk` and `Jump` variants.
 * - `Walk*` means moving to a tile step-by-step, stopping/failing on first occupied tile.
 * - `Jump*` means moving to a tile in one step.
 *
 * Target limits:
 * - `*OnEmpty` means the target should be an empty tile.
 * - `*OnFriend` means the target should be a friendly piece.
 * - `*OnEnemy` means the target should be an enemy piece.
 *
 * @name Moves
 * @module chess/moves
 * @author Jannik Lohaus <jannik@lo.haus>
 */

/**
 * Move by walking if target is empty.
 *
 * @constant {number} WalkOnEmpty - Move to an empty tile
 */
export const WalkOnEmpty = 0b000001

/**
 * Move by walking if target is enemy.
 *
 * @constant {number} WalkOnEnemy - Move to an enemy's tile
 */
export const WalkOnEnemy = 0b000010

/**
 * Move by walking if target is friend.
 *
 * @constant {number} WalkOnFriend - Move to a friend's tile
 */
export const WalkOnFriend = 0b000100

/**
 * Move by walking to any target (friend, enemy or empty tile).
 *
 * @constant {number} WalkOnAny - Move to any target (friend, enemy or empty tile)
 */
export const WalkOnAny = WalkOnEmpty | WalkOnEnemy | WalkOnFriend

/**
 * Move by jumping if target is empty.
 *
 * @constant {number} JumpOnEmpty - Jump to an empty tile
 */
export const JumpOnEmpty = 0b001000

/**
 * Move by jumping if target is enemy.
 *
 * @constant {number} JumpOnEnemy - Jump to an enemy's tile
 */
export const JumpOnEnemy = 0b010000

/**
 * Move by jumping if target is friend.
 *
 * @constant {number} JumpOnFriend - Jump to a friend's tile
 */
export const JumpOnFriend = 0b100000

/**
 * Move by jumping on any target (friend, enemy or empty tile).
 *
 * @constant {number} JumpOnAny - Jump to any target (friend, enemy or empty tile)
 */
export const JumpOnAny = JumpOnEmpty | JumpOnEnemy | JumpOnFriend

/**
 * All movement types combined.
 *
 * @constant {number} AnyMove - All movement types combined
 */
export const AnyMove = WalkOnAny | JumpOnAny

/**
 * None of the movement types.
 *
 * @constant {number} NoMove - None of the movement types
 */
export const NoMove = 0b000000

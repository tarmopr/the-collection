// player.ts
namespace Player {
    export function init() {
        playerSprite = sprites.create(img`
            . . . . . . . . . . . . . . . .
            . . . . . e e e e e . . . . . .
            . . . . e e e e e e e . . . . .
            . . . . e c c c c c e . . . . .
            . . . . e c c c c c e . . . . .
            . . . . e e e e e e e . . . . .
            . . . . . e e e e e . . . . . .
            . . . . e e e e e e e . . . . .
            . . . . e e e e e e e . . . . .
            . . . . e e e e e e e . . . . .
            . . . . . e e e e e . . . . . .
            . . . . . . e . e . . . . . . .
            . . . . . . e . e . . . . . . .
            . . . . . . e . e . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `, SpriteKind.Player)
        playerSprite.setPosition(ROOM_ENTRY_X, ROOM_ENTRY_Y)
        scene.cameraFollowSprite(playerSprite)
        shadowcasting.setLightRadius(playerSprite, 5)

        controller.moveSprite(playerSprite, 60, 60)
        playerSprite.setFlag(SpriteFlag.StayInScreen, false)

        controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
            interactWithNearest()
        })
    }

    export function interactWithNearest() {
        let closest: Rooms.RoomObject = null
        let closestDist = 9999
        for (const obj of Rooms.activeObjects) {
            if (!obj.sprite || obj.sprite.isDestroyed()) continue
            const dx = obj.sprite.x - playerSprite.x
            const dy = obj.sprite.y - playerSprite.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < 24 && dist < closestDist) {
                closestDist = dist
                closest = obj
            }
        }
        if (!closest) return
        handleObjectInteraction(closest)
    }

    export function playerOnSafeZone(): boolean {
        return false // stubbed — implemented in Task 6
    }
}

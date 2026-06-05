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
        // stubbed — implemented in Task 6
    }

    export function playerOnSafeZone(): boolean {
        return false // stubbed — implemented in Task 6
    }
}

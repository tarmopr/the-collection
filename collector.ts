// collector.ts
namespace Collector {
    export enum State { Dormant, Hunting, Retreating }
    export let state = State.Dormant

    let shadow: Sprite = null
    let huntTimer = 0
    const HUNT_DURATION = 8000   // ms before retreating if player stays hidden
    const SHADOW_SPEED = 30

    export function triggerScare() {
        if (state !== State.Dormant) return
        state = State.Hunting
        huntTimer = 0
        scene.cameraShake(4, 400)
        music.play(
            music.stringPlayable("C2:4 R:2 B1:4 R:2 A1:6 R:4", 60),
            music.PlaybackMode.LoopingInBackground
        )
        shadow = sprites.create(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . 1 1 1 . . . . . . .
            . . . . . 1 1 1 1 1 . . . . . .
            . . . . . 1 1 1 1 1 . . . . . .
            . . . . . 1 1 1 1 1 . . . . . .
            . . . . . . 1 1 1 . . . . . . .
            . . . . . 1 1 1 1 1 . . . . . .
            . . . . 1 1 1 1 1 1 1 . . . . .
            . . . . 1 1 1 1 1 1 1 . . . . .
            . . . . 1 1 1 1 1 1 1 . . . . .
            . . . . . 1 . . . 1 . . . . . .
            . . . . . 1 . . . 1 . . . . . .
            . . . . . 1 . . . 1 . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `, SpriteKind.Enemy)
        const spawnX = playerSprite.x < 80 ? 140 : 20
        const spawnY = playerSprite.y < 60 ? 100 : 20
        shadow.setPosition(spawnX, spawnY)
    }

    export function retreatCollector() {
        state = State.Retreating
        music.stopAllSounds()
        if (shadow) {
            shadow.destroy(effects.disintegrate, 500)
            shadow = null
        }
        pause(600)
        state = State.Dormant
    }

    export function triggerScareExtended() {
        if (state !== State.Dormant) return
        triggerScare()
        huntTimer = -4000  // effectively 12s total (8000 + 4000ms offset)
    }

    game.onUpdateInterval(200, function () {
        if (state !== State.Hunting || !shadow) return
        huntTimer += 200

        if (Player.playerOnSafeZone()) {
            if (huntTimer >= HUNT_DURATION) retreatCollector()
            return
        }

        // Move shadow toward player
        const dx = playerSprite.x - shadow.x
        const dy = playerSprite.y - shadow.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist > 4) {
            shadow.setPosition(
                shadow.x + (dx / dist) * (SHADOW_SPEED * 0.2),
                shadow.y + (dy / dist) * (SHADOW_SPEED * 0.2)
            )
        }

        // Caught
        if (shadow.overlapsWith(playerSprite)) {
            retreatCollector()
            playerCaught()
        }
    })
}

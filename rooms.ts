// rooms.ts
namespace Rooms {
    export const MIDDLE_ROOMS = [
        "specimenHall", "study", "workshop",
        "gallery", "greenhouse", "records"
    ]
    export let roomOrder: string[] = []

    export enum ObjectKind {
        Memory,      // shows a memory fragment
        ScareOnly,   // only triggers scare (scare trigger objects)
        Key,         // gives a key
        Jar,         // frees a specimen (triggers scare)
        EscapeShaft  // triggers ending
    }

    export interface RoomObject {
        sprite: Sprite
        kind: ObjectKind
        data: number  // fragment index for Memory; key index for Key; jar index for Jar
    }

    export let activeObjects: RoomObject[] = []

    export function registerObject(s: Sprite, kind: ObjectKind, data: number) {
        activeObjects.push({ sprite: s, kind: kind, data: data })
    }

    export function clearActiveObjects() {
        activeObjects = []
    }

    export function spawnInteractable(x: number, y: number, kind: ObjectKind, data: number): Sprite {
        const s = sprites.create(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . f f f f f . . . . . .
            . . . . f . . . . . f . . . . .
            . . . . f . . . . . f . . . . .
            . . . . f . . . . . f . . . . .
            . . . . f . . . . . f . . . . .
            . . . . f . . . . . f . . . . .
            . . . . . f f f f f . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `, SpriteKind.Interactable)
        s.setPosition(x, y)
        s.setFlag(SpriteFlag.Ghost, true)
        registerObject(s, kind, data)
        roomSprites.push(s)
        return s
    }

    export function shuffleRooms() {
        roomOrder = []
        for (const r of MIDDLE_ROOMS) roomOrder.push(r)
        for (let i = roomOrder.length - 1; i > 0; i--) {
            const j = Math.randomRange(0, i)
            const tmp = roomOrder[i]
            roomOrder[i] = roomOrder[j]
            roomOrder[j] = tmp
        }
    }

    export function spawnRoomObjects(index: number) {
        clearActiveObjects()
        if (index === 0) spawnWakingRoom()
        else if (index >= 1 && index <= 6) spawnMiddleRoom(roomOrder[index - 1], index - 1)
        else if (index === 7) spawnDeepVault()
    }

    function spawnWakingRoom() {
        // Broken jar — tutorial interaction, shows label text (Fragment 0 special case)
        spawnInteractable(48, 64, ObjectKind.Memory, 0)
        // Key on hook — keysHeld[0] opens door 2 (first middle room)
        spawnInteractable(128, 96, ObjectKind.Key, 0)
    }

    function spawnMiddleRoom(name: string, keyIndex: number) {
        // Stubbed — filled in Tasks 12-17
    }

    function spawnDeepVault() {
        // Stubbed — filled in Task 18
    }
}

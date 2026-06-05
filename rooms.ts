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
        if (name === "specimenHall")    spawnSpecimenHall(keyIndex)
        else if (name === "study")      spawnStudy(keyIndex)
        else if (name === "workshop")   spawnWorkshop(keyIndex)
        else if (name === "gallery")    spawnGallery(keyIndex)
        else if (name === "greenhouse") spawnGreenhouse(keyIndex)
        else if (name === "records")    spawnRecords(keyIndex)
    }

    function spawnSpecimenHall(keyIndex: number) {
        // Memory trigger: name card on floor
        spawnInteractable(64, 48, ObjectKind.Memory, 1)
        // Scare trigger: acquisition ledger on desk
        spawnInteractable(140, 48, ObjectKind.ScareOnly, 0)
        // Specimen jar on shelf
        spawnInteractable(80, 32, ObjectKind.Jar, 1)
        // Key under the ledger (collected after scare)
        spawnInteractable(140, 56, ObjectKind.Key, keyIndex)
    }

    function spawnStudy(keyIndex: number) {
        // Memory trigger: letters on desk
        spawnInteractable(64, 64, ObjectKind.Memory, 2)
        // Scare trigger: portrait on wall
        spawnInteractable(128, 48, ObjectKind.ScareOnly, 0)
        // Bookshelf key — data=98 (special: shows narrative text, doesn't open doors)
        spawnInteractable(32, 48, ObjectKind.Key, 98)
        // Specimen jar in display case
        spawnInteractable(128, 64, ObjectKind.Jar, 2)
        // Room key inside display case
        spawnInteractable(140, 64, ObjectKind.Key, keyIndex)
    }

    function spawnWorkshop(keyIndex: number) {
        // Memory trigger: locket on floor (also triggers scare — handled in main.ts Memory branch)
        spawnInteractable(80, 80, ObjectKind.Memory, 3)
        // Cage key — data=97 (special: shows narrative text, needed to access jar)
        spawnInteractable(48, 64, ObjectKind.Key, 97)
        // Specimen jar in cage (near right wall)
        spawnInteractable(140, 64, ObjectKind.Jar, 3)
        // Room key on hook by exit
        spawnInteractable(152, 64, ObjectKind.Key, keyIndex)
    }

    function spawnGallery(keyIndex: number) {
        // Memory trigger: newspaper clipping in display case
        spawnInteractable(48, 64, ObjectKind.Memory, 4)
        // Scare trigger: visitor's book on pedestal
        spawnInteractable(96, 64, ObjectKind.ScareOnly, 0)
        // Specimen jar in glass case (smashing also triggers scare — handled by freeSpecimen)
        spawnInteractable(140, 48, ObjectKind.Jar, 4)
        // Room key in newspaper clipping case
        spawnInteractable(56, 64, ObjectKind.Key, keyIndex)
    }

    function spawnGreenhouse(keyIndex: number) {
        // Memory trigger: wilted flower pot with field notes
        spawnInteractable(48, 80, ObjectKind.Memory, 5)
        // Scare trigger: Collector's gardening journal
        spawnInteractable(96, 80, ObjectKind.ScareOnly, 0)
        // Specimen jar tangled in roots
        spawnInteractable(148, 64, ObjectKind.Jar, 5)
        // Room key on plant hook
        spawnInteractable(112, 48, ObjectKind.Key, keyIndex)
    }

    function spawnRecords(keyIndex: number) {
        // Stubbed — implemented in Task 17
    }

    function spawnDeepVault() {
        // Stubbed — filled in Task 18
    }
}

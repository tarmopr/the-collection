// main.ts
let playerSprite: Sprite = null
let currentRoomIndex = 0
let memoriesFound: boolean[] = []
let memoriesCount = 0
let specimensCount = 0
let keysHeld: boolean[] = []
let hasEscapeKey = false
let roomSprites: Sprite[] = []

const ROOM_ENTRY_X = 20
const ROOM_ENTRY_Y = 60

game.splash("THE COLLECTION", "You wake. Something is broken.")
startGame()

function startGame() {
    for (let i = 0; i < 8; i++) memoriesFound.push(false)
    for (let i = 0; i < 7; i++) keysHeld.push(false)
    memoriesCount = 0
    specimensCount = 0
    hasEscapeKey = false
    currentRoomIndex = 0
    info.setLife(3)
    Rooms.shuffleRooms()
    Player.init()
    loadRoom(0)
}

function loadRoom(index: number) {
    destroyRoomSprites()
    if (index === 0) {
        tiles.setTilemap(assets.tilemap`wakingRoom`)
    } else if (index <= 6) {
        loadRoomByName(Rooms.roomOrder[index - 1])
    } else {
        tiles.setTilemap(assets.tilemap`deepVault`)
    }
    currentRoomIndex = index
    if (playerSprite) {
        playerSprite.setPosition(ROOM_ENTRY_X, ROOM_ENTRY_Y)
    }
    Rooms.spawnRoomObjects(index)
    scene.onOverlapTile(SpriteKind.Player, assets.tile`exitPoint`, function (sprite, location) {
        tryProgressToNextRoom()
    })
}

function loadRoomByName(name: string) {
    if      (name === "specimenHall") tiles.setTilemap(assets.tilemap`specimenHall`)
    else if (name === "study")        tiles.setTilemap(assets.tilemap`study`)
    else if (name === "workshop")     tiles.setTilemap(assets.tilemap`workshop`)
    else if (name === "gallery")      tiles.setTilemap(assets.tilemap`gallery`)
    else if (name === "greenhouse")   tiles.setTilemap(assets.tilemap`greenhouse`)
    else if (name === "records")      tiles.setTilemap(assets.tilemap`records`)
    else {
        game.showLongText("Error: unknown room " + name, DialogLayout.Bottom)
    }
}

function destroyRoomSprites() {
    for (const s of roomSprites) s.destroy()
    roomSprites = []
}

function showDoorInterstitial(doorNumber: number, locked: boolean) {
    if (locked) {
        game.splash("DOOR " + doorNumber + " — LOCKED", "You need a key.")
    } else {
        game.splash("DOOR " + doorNumber, "Press A to enter.")
        loadRoom(doorNumber)
    }
}

function tryProgressToNextRoom() {
    const next = currentRoomIndex + 1
    if (next > 7) {
        // Already in Deep Vault — escape shaft is separate (Task 11)
        return
    }
    // Door 1 (index 1) is always unlocked; others need the previous room's key
    const needsKey = next > 1
    const hasKey = needsKey ? keysHeld[next - 2] : true
    showDoorInterstitial(next, !hasKey)
}

function playerCaught() {
    // stubbed — implemented in Task 8
}

function triggerEnding() {
    // stubbed — implemented in Task 11
}

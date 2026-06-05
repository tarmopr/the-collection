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

scene.setBackgroundColor(1)  // black background
game.splash("THE COLLECTION", "")
game.showLongText(
    "You open your eyes.\n\nGlass. Amber fluid. A label: SPECIMEN #47.\n\nSomething is broken. You are out.",
    DialogLayout.Full
)
startGame()

function startGame() {
    for (let i = 0; i < 9; i++) memoriesFound.push(false)
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
    transitions.fadeToBlack(350)
    pause(350)
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
    if (index === 7) {
        shadowcasting.setLightRadius(playerSprite, 4)
    } else {
        shadowcasting.setLightRadius(playerSprite, 5)
    }
    transitions.fadeFromBlack(350)
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
    if (next >= 8) return  // In Deep Vault — escape shaft handled separately

    // Door 1 (going from waking room to first middle room) is always open
    // Door N (going to middle room N) needs keysHeld[N-2]
    // Door 7 (going from last middle room to deep vault) needs keysHeld[5]
    const needsKey = next >= 2
    const keyIndex = next - 2  // keysHeld[0] opens door 2, keysHeld[5] opens door 7
    const hasKey = !needsKey || keysHeld[keyIndex]
    showDoorInterstitial(next, !hasKey)
}

function handleObjectInteraction(obj: Rooms.RoomObject) {
    if (obj.kind === Rooms.ObjectKind.Memory) {
        Story.showMemory(obj.data)
        if (obj.data !== 0) {
            obj.sprite.destroy()
            Rooms.activeObjects = Rooms.activeObjects.filter(o => o !== obj)
        }
        // Deep Vault journal (fragment 8): extended scare
        if (obj.data === 8) {
            Collector.triggerScareExtended()
        // Workshop locket (any memory interaction while in workshop room): regular scare
        } else if (currentRoomIndex >= 1 && Rooms.roomOrder[currentRoomIndex - 1] === "workshop") {
            Collector.triggerScare()
        }
    } else if (obj.kind === Rooms.ObjectKind.ScareOnly) {
        Collector.triggerScare()
        obj.sprite.destroy()
        Rooms.activeObjects = Rooms.activeObjects.filter(o => o !== obj)
    } else if (obj.kind === Rooms.ObjectKind.Key) {
        if (obj.data === 97) {
            // Cage key (Workshop) — narrative item only
            game.showLongText("A rusted cage key. Something inside the cage is still.", DialogLayout.Bottom)
            obj.sprite.destroy()
            Rooms.activeObjects = Rooms.activeObjects.filter(o => o !== obj)
        } else if (obj.data === 98) {
            // Bookshelf key (Study) — narrative item, unlocks display case
            game.showLongText("A small brass key. It fits the display case lock.", DialogLayout.Bottom)
            obj.sprite.destroy()
            Rooms.activeObjects = Rooms.activeObjects.filter(o => o !== obj)
        } else if (obj.data === 99) {
            // Escape key (Deep Vault)
            hasEscapeKey = true
            music.play(music.stringPlayable("C5:1 E5:1 G5:1 C6:3", 180), music.PlaybackMode.UntilDone)
            game.splash("Escape key found", "The shaft at the heart of the vault...")
            obj.sprite.destroy()
            Rooms.activeObjects = Rooms.activeObjects.filter(o => o !== obj)
        } else {
            // Normal door key
            keysHeld[obj.data] = true
            music.play(music.stringPlayable("C5:1 E5:1 G5:2", 180), music.PlaybackMode.UntilDone)
            game.splash("Key found", "A door in this estate will open.")
            obj.sprite.destroy()
            Rooms.activeObjects = Rooms.activeObjects.filter(o => o !== obj)
        }
    } else if (obj.kind === Rooms.ObjectKind.Jar) {
        freeSpecimen(obj)
    } else if (obj.kind === Rooms.ObjectKind.EscapeShaft) {
        if (hasEscapeKey) {
            triggerEnding()
        } else {
            game.showLongText("The shaft is sealed. You need to find the escape key.", DialogLayout.Bottom)
        }
    }
}

function freeSpecimen(obj: Rooms.RoomObject) {
    specimensCount++
    obj.sprite.destroy()
    Rooms.activeObjects = Rooms.activeObjects.filter(o => o !== obj)
    music.play(music.stringPlayable("G4:1 A4:1 B4:1 C5:2", 160), music.PlaybackMode.UntilDone)
    game.showLongText(
        "Freed: " + specimensCount + "/7 specimens.\n\nA sound. Somewhere above you, something stirs.",
        DialogLayout.Bottom
    )
    Collector.triggerScare()
}

function playerCaught() {
    scene.cameraShake(6, 600)
    info.changeLifeBy(-1)
    if (info.life() <= 0) {
        scene.cameraShake(8, 800)
        pause(800)
        effects.melt.startScreenEffect()
        pause(600)
        effects.melt.endScreenEffect()
        game.showLongText(
            "The Collector has returned you to the shelf.\n\nSpecimen #47. Back where you belong.",
            DialogLayout.Full
        )
        pause(500)
        // Full restart with new shuffle
        for (let i = 0; i < 9; i++) memoriesFound[i] = false
        for (let i = 0; i < 7; i++) keysHeld[i] = false
        memoriesCount = 0
        specimensCount = 0
        hasEscapeKey = false
        info.setLife(3)
        Rooms.shuffleRooms()
        loadRoom(0)
    } else {
        game.showLongText("You were found.\n\nLives remaining: " + info.life(), DialogLayout.Bottom)
        playerSprite.setPosition(ROOM_ENTRY_X, ROOM_ENTRY_Y)
    }
}

function triggerEnding() {
    transitions.fadeToBlack(800)
    pause(800)
    Story.showEnding(memoriesCount, specimensCount)
    game.over(true)
}

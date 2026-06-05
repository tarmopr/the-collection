// main.ts
let playerSprite: Sprite = null
let currentRoomIndex = 0
let memoriesFound: boolean[] = []
let memoriesCount = 0
let specimensCount = 0
let keysHeld: boolean[] = []
let hasEscapeKey = false

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
    // stubbed — implemented in Task 3
    game.splash("Room " + index, "loading...")
}

function tryProgressToNextRoom() {
    // stubbed — implemented in Task 7
}

function playerCaught() {
    // stubbed — implemented in Task 8
}

function triggerEnding() {
    // stubbed — implemented in Task 11
}

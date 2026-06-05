# The Collection — Game Design Spec

**Date:** 2026-06-05
**Platform:** KittenBot Meowbit (STM32F401, 96 KB RAM, 160×120 px, 16-colour palette)
**Engine:** Microsoft MakeCode Arcade (TypeScript)
**Genre:** Horror-mystery exploration
**Estimated playtime:** 35–45 min first run; highly replayable via randomisation

---

## Overview

You are Specimen #47. You wake in a broken jar somewhere deep underground with no memory. You are inside the Collector's estate — a hidden labyrinth beneath a manor where an obsessive figure has gathered rare things, including people. Scattered across eight rooms are eight memory fragments and seven specimen jars. To escape you must find the key chain through the estate. What you remember — and who you leave behind — determines your ending.

**Protagonist:** Elara Voss, botanist. She discovered a rare organism in an old-growth forest. The Collector didn't want the specimen — he wanted the only person who knew where to find more.

**Antagonist:** The Collector. Never shown directly. Only a shadow on the wall, deliberate footsteps, a gloved hand reaching around a doorframe.

**Tone:** Quiet dread punctuated by sudden terror. Bittersweet rather than triumphant. Closest references: *Little Nightmares* (atmosphere, vulnerability), *Amnesia* (investigation, identity recovery).

---

## Section 1: Story Arc

Memory fragments are collected in randomised order across the six middle rooms. Together they reconstruct Elara's identity:

| Fragment | Content |
|----------|---------|
| I | Her name — not a number |
| II | Her profession — delicate instruments, small living things |
| III | Someone who loved her and looked for her |
| IV | The morning she was taken — coffee going cold |
| V | Her garden, the unnamed plant, the mistake of finding it |
| VI | Her acquisition file — "voluntary transfer", a forged signature |
| VII | Her full name: Elara Voss, botanist |
| VIII | Why the Collector wanted her specifically — to seal her knowledge away |

The final two fragments (VII and VIII) are always in the Deep Vault, so the full truth lands at the end regardless of room order.

---

## Section 2: Structure & Systems

### Estate Layout

```
[WAKING ROOM] — Door 1 — Door 2 — Door 3 — Door 4 — Door 5 — Door 6 — [DEEP VAULT] — [ESCAPE SHAFT]
  (fixed)         🔓        🔒       🔒       🔒       🔒       🔒       (fixed last)
               Room ?    Room ?   Room ?   Room ?   Room ?   Room ?
```

There is **no separate corridor tilemap**. Moving between rooms uses a fade transition triggered by reaching the exit tile of a room. Between rooms a brief interstitial screen shows the next door status ("DOOR 3 — LOCKED" / "DOOR 3 — OPEN") and the player presses A to enter. This keeps memory usage to 8 tilemaps only.

- **Waking Room** (fixed): tutorial, no scare, gives Key 1
- **Middle rooms 1–6** (randomised): each gives one memory fragment, one specimen jar, and the key to the next door
- **Deep Vault** (fixed last): two memory fragments, Specimen Jar #7, escape key
- **Escape shaft**: activated with escape key; triggers ending based on counters

### Randomisation

Six middle rooms are shuffled with Fisher-Yates at game start:

```typescript
const MIDDLE_ROOMS = [
    "specimenHall", "study", "workshop",
    "gallery", "greenhouse", "records"
]
// Shuffle at game.start() and on each game-over restart
```

6! = **720 possible orderings** per playthrough. Room internal content is fixed; only position in the corridor changes. The story feels different depending on the order fragments are discovered.

### Key Chain

Each room contains the key to the next locked door. The player must visit all rooms in corridor order. The Deep Vault key (escape key) is always in the final middle room.

### Scare System

Each middle room and the Deep Vault has exactly one **scare trigger** — a specific object that summons the Collector when interacted with. Freeing any specimen jar also triggers a scare.

**Scare sequence:**
1. `scene.cameraShake(4, 300)`
2. Footstep audio loop begins
3. Shadow sprite spawns at far end of room, moves toward player
4. Player must reach a **safe zone tile** (wardrobe, under desk, root curtain, etc.)
5. If on safe zone: Collector patrols for 8 seconds, then retreats
6. If caught: lose one life; `playerCaught()` fires

**Lives:** 3. Reaching zero restarts the run with a new random room order. Progress (memories, specimens) is lost — each run is complete.

### Ending Matrix

Checked when player activates the escape shaft:

| `memoriesCount` | `specimensCount` | Ending |
|-----------------|------------------|--------|
| 8 | 7 | **True Ending** — remembers everything, freed everyone |
| 6–8 | 0–6 | **Bittersweet** — escaped knowing herself, left some behind |
| 0–5 | 5–7 | **Hollow Freedom** — freed many, still doesn't know her name |
| 0–5 | 0–4 | **Bare Escape** — out alive, haunted by what remains |

*Rows are checked top-to-bottom; first match wins. True Ending requires both conditions. Bittersweet fires before Hollow Freedom when memories ≥ 6 regardless of specimen count.*

---

## Section 3: Room-by-Room Content

### Room 0 — The Waking Room *(fixed, tutorial)*
**Visual:** Stone alcove, one flickering lantern, broken jar and amber fluid on the floor, drain, locked door.

- Teaches movement and interaction (A button)
- Objects: broken jar (tutorial), floor label, key hook
- Label text: *"SPECIMEN #47 — ACQUIRED: VOLUNTARY TRANSFER"*
- No scare trigger, no memory fragment, no specimen
- Key: plainly visible on wall hook

---

### Room 1 — The Specimen Hall
**Visual:** Floor-to-ceiling shelves of numbered jars, dim green bioluminescent glow, acquisition ledger on a desk.

- **Memory Fragment I:** *"My name. I had a name. It's at the tip of my tongue — not #47. Something real. Something mine."*
- **Memory trigger:** Name card fallen from a jar: *"ELARA VOSS — BOTANIST — #23"*
- **Scare trigger:** Opening the acquisition ledger
- **Specimen Jar #1:** Middle shelf — freeing it also triggers scare
- **Safe zone:** Tall wardrobe in the corner
- **Key:** Under the ledger on the desk

---

### Room 2 — The Study
**Visual:** Mahogany desk, bookshelves, taxidermy, candlelight, portrait with face in shadow, scattered letters.

- **Memory Fragment II:** *"Hands. My hands knew instruments — delicate ones. I fixed things. Small living things. I was good at it. I was careful."*
- **Memory trigger:** Letters on the desk
- **Scare trigger:** Approaching the portrait
- **Specimen Jar #2:** In a locked display case; small key is on the bookshelf
- **Safe zone:** Under the large desk
- **Key:** Inside the display case alongside the jar

---

### Room 3 — The Workshop
**Visual:** Stone floor, rusted workbenches, stacked cages, chains, half-finished preservation equipment, sickly yellow-green palette.

- **Memory Fragment III:** *"A face. Warm. Someone who looked for me when I didn't come home. I don't know if they're still looking."*
- **Memory trigger:** A locket on the floor engraved with initials
- **Scare trigger:** Picking up the locket — it belongs to the Collector
- **Specimen Jar #3:** Inside a locked cage; cage key on the workbench
- **Safe zone:** Under a low workbench
- **Key:** Hanging on a hook by the exit, directly past the locket

---

### Room 4 — The Gallery
**Visual:** Narrow room lined with glass cases, artifacts under dim spotlights, red velvet, a visitor's book on a pedestal.

- **Memory Fragment IV:** *"A morning. Ordinary. Coffee going cold on a field desk. Then a sound behind me. Then nothing. Then a jar."*
- **Memory trigger:** Newspaper clipping in a display case — a missing persons notice
- **Scare trigger:** Touching the visitor's book
- **Specimen Jar #4:** In a glass case — must smash it with A button (also triggers a scare, consistent with all jars)
- **Safe zone:** Behind a heavy curtain at the far wall
- **Key:** In the newspaper clipping's smashed display case

---

### Room 5 — The Greenhouse
**Visual:** Underground grow room, pale UV light (blue-purple glow), twisted plants, specimens in amber, roots cracking through ceiling.

- **Memory Fragment V:** *"Sunlight. A garden. I knew every plant by name — the ones with no names too. I found one that had never been found. I should have kept quiet."*
- **Memory trigger:** Wilted flower in a specimen pot, tagged with field notes in Elara's handwriting
- **Scare trigger:** Reading the Collector's gardening journal (he has been cataloguing her garden from above)
- **Specimen Jar #5:** Tangled in exposed roots — must pull it free
- **Safe zone:** Dense root curtain at the back wall
- **Key:** Hanging from a plant hook above a soil bed

---

### Room 6 — The Records Room
**Visual:** Floor-to-ceiling filing cabinets, stamping machine, typewriter, flickering fluorescent light, cold clinical atmosphere.

- **Memory Fragment VI:** *"Acquired: voluntary transfer. That's what the file says. Voluntary. There is a signature at the bottom. It is not mine."*
- **Memory trigger:** Filing cabinet folder labelled #47 — Elara's own acquisition file
- **Scare trigger:** Touching the typewriter (clacks loudly)
- **Specimen Jar #6:** Sealed in an evidence box (interactable tile at normal player level)
- **Safe zone:** Gap behind the tallest cabinet row
- **Key:** Inside the #47 folder

---

### Room 7 — The Deep Vault *(fixed, always last)*
**Visual:** Raw stone and earth, older than all other rooms. Roots and seeping water. Stone plinth at centre. Ancient jars alongside modern ones. Escape shaft sealed with stone mechanism.

- **Memory Fragment VII:** *"Elara Voss. Botanist. I found something in the old growth that had no name and no record. I was the only one who knew where."*
- **Memory trigger 1:** Engraving on the stone plinth
- **Memory Fragment VIII:** *"He didn't want the specimen. He wanted me. The collection was never about objects. It was about keeping knowledge sealed away. Numbered. Quiet."*
- **Memory trigger 2 + scare trigger:** The Collector's oldest journal — longest and most intense patrol in the game
- **Specimen Jar #7:** In the oldest display case
- **Safe zone:** Behind the stone plinth
- **Escape key:** Carved recess in the plinth — press to open the shaft

---

## Section 4: Technical Implementation

### Extensions

| Extension | Source | Purpose |
|-----------|--------|---------|
| `arcade-shadowcasting` | Community | Limits player vision to radius — core atmosphere |
| `arcade-screen-transitions` | Microsoft | Fade-to-black between rooms |

All other functionality uses built-in MakeCode Arcade APIs.

### File Structure

```
main.ts       — game init, room loading, global state
rooms.ts      — room definitions, tilemap assignments, object positions
collector.ts  — scare trigger, shadow patrol, retreat logic
player.ts     — movement, interaction, safe zone detection
story.ts      — all memory fragment texts, ending texts
hud.ts        — memory counter and specimen counter sprites
```

### Tile Types

| Tile | Purpose |
|------|---------|
| `wall` | Collision boundary |
| `floor` | Walkable |
| `safeZone` | Collector ignores player here |
| `doorLocked` | Impassable until key held |
| `doorOpen` | Passable after key used |
| `interactable` | Examinable objects |
| `specimenJar` | Jar positions |
| `key` | Key pickup positions |
| `exitShaft` | Escape mechanism tile |

### Tilemaps Required

`wakingRoom`, `specimenHall`, `study`, `workshop`, `gallery`, `greenhouse`, `records`, `deepVault`

### Key Code Patterns

**Room shuffle (main.ts):**
```typescript
function shuffleRooms() {
    roomOrder = [...MIDDLE_ROOMS]
    for (let i = roomOrder.length - 1; i > 0; i--) {
        const j = Math.randomRange(0, i)
        const tmp = roomOrder[i]
        roomOrder[i] = roomOrder[j]
        roomOrder[j] = tmp
    }
}
```

**Room load with transition (main.ts):**
```typescript
function loadRoom(index: number) {
    transitions.fadeToBlack(400)
    if      (index === 0) tiles.setTilemap(tilemaps.wakingRoom)
    else if (index <= 6)  loadRoomByName(roomOrder[index - 1])
    else                  tiles.setTilemap(tilemaps.deepVault)
    spawnRoomObjects(index)
    playerSprite.setPosition(ROOM_ENTRY_X, ROOM_ENTRY_Y)
    transitions.fadeFromBlack(400)
}
```

**Scare trigger (collector.ts):**
```typescript
export function triggerScare() {
    if (state !== CollectorState.Dormant) return
    state = CollectorState.Hunting
    scene.cameraShake(4, 300)
    music.play(footstepSong, music.PlaybackMode.LoopingInBackground)
    shadow = sprites.create(img`shadowImage`, SpriteKind.Enemy)
    shadow.setPosition(SHADOW_SPAWN_X, SHADOW_SPAWN_Y)
}
```

**Safe zone detection (player.ts):**
```typescript
function playerOnSafeZone(): boolean {
    return tiles.tileAtLocationEquals(
        tiles.locationOfSprite(playerSprite),
        assets.tile`safeZone`
    )
}
```

**Ending (main.ts):**
```typescript
function triggerEnding() {
    transitions.fadeToBlack(800)
    let text = ""
    if (memoriesCount === 8 && specimensCount === 7)
        text = "You climb into daylight. Elara Voss. Botanist. You remember everything — and you left no one behind."
    else if (memoriesCount >= 6)
        text = "You climb into daylight knowing who you were. The jars you left sealed will stay sealed. That weight is yours now too."
    else if (specimensCount >= 5)
        text = "You freed them. But standing in the light, you still don't know your own name. The estate kept that for itself."
    else
        text = "You're out. You're alive. You don't know who you were, and you left the others behind. The Collector's collection is still intact."
    game.showLongText(text, DialogLayout.Full)
    game.over(true)
}
```

**Vision radius (player.ts):**
```typescript
shadowcasting.setVisionRadius(playerSprite, 5)
// Drop to 4 in the Deep Vault for added tension
```

**HUD (hud.ts):**
```typescript
// info.setLife(3) for lives (built-in)
// Text sprites with SpriteFlag.RelativeToCamera for memory/specimen counters
// memoriesHUD.say(`${memoriesCount} / 8`)
// specimensHUD.say(`${specimensCount} / 7`)
```

### Build Order

1. Corridor + room swapping with key chain (placeholder tilemaps)
2. Player movement + shadowcasting vision + safe zone detection
3. Waking Room — complete end-to-end with tutorial
4. Specimen Hall — first full room including scare sequence and memory panel
5. Remaining five middle rooms — same pattern, unique tilemap art per room
6. Deep Vault + all four ending texts
7. HUD, dialog frame art, screen shake and audio tuning

---

## Verification Checklist

- [ ] All 8 tilemaps load and unload correctly with no memory overflow
- [ ] Fisher-Yates shuffle produces different room orders across 10 test runs
- [ ] Key chain: each room's key opens exactly the next door
- [ ] Scare sequence triggers, Collector shadow moves, retreats after 8s in safe zone
- [ ] All 8 memory fragments display correct text
- [ ] Freeing each jar increments `specimensCount` and triggers scare
- [ ] All 4 endings play for the correct counter combinations
- [ ] Lives decrement on catch; game restarts with fresh shuffle at 0 lives
- [ ] HUD counters update correctly after each collection
- [ ] Shadowcasting vision radius renders without frame rate drop on Meowbit hardware

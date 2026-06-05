// story.ts
namespace Story {
    export const FRAGMENTS = [
        "",  // 0 unused (waking room label handled separately)
        "My name. I had a name. It's at the tip of my tongue — not #47. Something real. Something mine.",
        "Hands. My hands knew instruments — delicate ones. I fixed things. Small living things. I was good at it. I was careful.",
        "A face. Warm. Someone who looked for me when I didn't come home. I don't know if they're still looking.",
        "A morning. Ordinary. Coffee going cold on a field desk. Then a sound behind me. Then nothing. Then a jar.",
        "Sunlight. A garden. I knew every plant by name — the ones with no names too. I found one that had never been found. I should have kept quiet.",
        "Acquired: voluntary transfer. That's what the file says. Voluntary. There is a signature at the bottom. It is not mine.",
        "Elara Voss. Botanist. I found something in the old growth that had no name and no record. I was the only one who knew where.",
        "He didn't want the specimen. He wanted me. The collection was never about objects. It was about keeping knowledge sealed away. Numbered. Quiet."
    ]

    export function showMemory(index: number) {
        if (index === 0) {
            game.showLongText(
                "SPECIMEN #47\nACQUIRED: VOLUNTARY TRANSFER\n\nThat is what the label says. It does not feel voluntary.",
                DialogLayout.Bottom
            )
            return
        }
        if (memoriesFound[index]) {
            game.showLongText("You have already recovered this memory.", DialogLayout.Bottom)
            return
        }
        memoriesFound[index] = true
        memoriesCount++
        game.setDialogFrame(img`
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
            1 . . . . . . . . . . . . . . 1
            1 . . . . . . . . . . . . . . 1
            1 . . . . . . . . . . . . . . 1
            1 . . . . . . . . . . . . . . 1
            1 . . . . . . . . . . . . . . 1
            1 . . . . . . . . . . . . . . 1
            1 . . . . . . . . . . . . . . 1
            1 . . . . . . . . . . . . . . 1
            1 . . . . . . . . . . . . . . 1
            1 . . . . . . . . . . . . . . 1
            1 . . . . . . . . . . . . . . 1
            1 . . . . . . . . . . . . . . 1
            1 . . . . . . . . . . . . . . 1
            1 . . . . . . . . . . . . . . 1
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        `)
        game.showLongText(
            "Memory " + memoriesCount + " of 8\n\n" + FRAGMENTS[index],
            DialogLayout.Bottom
        )
    }

    export function showEnding(memories: number, specimens: number) {
        let title = ""
        let text = ""
        if (memories === 8 && specimens === 7) {
            title = "TRUE ENDING"
            text = "You climb into daylight. Elara Voss. Botanist. You remember everything — and you left no one behind."
        } else if (memories >= 6) {
            title = "BITTERSWEET"
            text = "You climb into daylight knowing who you were. The jars you left sealed will stay sealed. That weight is yours now too."
        } else if (specimens >= 5) {
            title = "HOLLOW FREEDOM"
            text = "You freed them. But standing in the light, you still don't know your own name. The estate kept that for itself."
        } else {
            title = "BARE ESCAPE"
            text = "You're out. You're alive. You don't know who you were, and you left the others behind. The Collector's collection is still intact."
        }
        game.splash(title, "")
        game.showLongText(text, DialogLayout.Full)
        game.showLongText(
            "Memories recovered: " + memories + " / 8\nSpecimens freed: " + specimens + " / 7",
            DialogLayout.Full
        )
    }
}

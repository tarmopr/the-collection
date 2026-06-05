// rooms.ts
namespace Rooms {
    export const MIDDLE_ROOMS = [
        "specimenHall", "study", "workshop",
        "gallery", "greenhouse", "records"
    ]
    export let roomOrder: string[] = []

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
        // stubbed — implemented per-room in Tasks 12-19
    }
}

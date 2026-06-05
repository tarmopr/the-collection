// assets.ts

// Shared tile images
const safeZoneImage = img`
    7 7 f f f f f f f f f f f f 7 7
    7 f 7 7 7 7 7 7 7 7 7 7 7 7 f 7
    f 7 7 7 7 7 7 7 7 7 7 7 7 7 7 f
    f 7 7 7 7 7 7 7 7 7 7 7 7 7 7 f
    f 7 7 7 7 7 7 7 7 7 7 7 7 7 7 f
    f 7 7 7 7 7 7 7 7 7 7 7 7 7 7 f
    f 7 7 7 7 7 7 7 7 7 7 7 7 7 7 f
    f 7 7 7 7 7 7 7 7 7 7 7 7 7 7 f
    f 7 7 7 7 7 7 7 7 7 7 7 7 7 7 f
    f 7 7 7 7 7 7 7 7 7 7 7 7 7 7 f
    f 7 7 7 7 7 7 7 7 7 7 7 7 7 7 f
    f 7 7 7 7 7 7 7 7 7 7 7 7 7 7 f
    f 7 7 7 7 7 7 7 7 7 7 7 7 7 7 f
    f 7 7 7 7 7 7 7 7 7 7 7 7 7 7 f
    7 f 7 7 7 7 7 7 7 7 7 7 7 7 f 7
    7 7 f f f f f f f f f f f f 7 7
`;

const exitPointImage = img`
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4
    4 e e e e e e e e e e e e e e 4
    4 e 4 4 4 4 4 4 4 4 4 4 4 4 e 4
    4 e 4 c c c c c c c c c c 4 e 4
    4 e 4 c 4 4 4 4 4 4 4 4 c 4 e 4
    4 e 4 c 4 c c c c c c 4 c 4 e 4
    4 e 4 c 4 c 4 4 4 4 c 4 c 4 e 4
    4 e 4 c 4 c 4 9 9 4 c 4 c 4 e 4
    4 e 4 c 4 c 4 9 9 4 c 4 c 4 e 4
    4 e 4 c 4 c 4 4 4 4 c 4 c 4 e 4
    4 e 4 c 4 c c c c c c 4 c 4 e 4
    4 e 4 c 4 4 4 4 4 4 4 4 c 4 e 4
    4 e 4 c c c c c c c c c c 4 e 4
    4 e 4 4 4 4 4 4 4 4 4 4 4 4 e 4
    4 e e e e e e e e e e e e e e 4
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4
`;

// Room-specific Wall Tiles
const wakingRoomWall = img`
    f f f f f f f f f f f f f f f f
    f b b b b b b b b b b b b b b f
    f b c c c c c c c c c c c c b f
    f b c d d d d d d d d d d c b f
    f b c d f f f f f f f f d c b f
    f b c d f c c c c c c f d c b f
    f b c d f c d d d d c f d c b f
    f b c d f c d f f d c f d c b f
    f b c d f c d f f d c f d c b f
    f b c d f c d d d d c f d c b f
    f b c d f c c c c c c f d c b f
    f b c d f f f f f f f f d c b f
    f b c d d d d d d d d d d c b f
    f b c c c c c c c c c c c c b f
    f b b b b b b b b b b b b b b f
    f f f f f f f f f f f f f f f f
`;

const specimenHallWall = img`
    f f f f f f f f f f f f f f f f
    f 7 7 7 7 7 7 7 7 7 7 7 7 7 7 f
    f 7 d d d d d d d d d d d d 7 f
    f 7 d 6 6 6 6 6 6 6 6 6 6 d 7 f
    f 7 d 6 f f f f f f f f 6 d 7 f
    f 7 d 6 f 6 6 6 6 6 6 f 6 d 7 f
    f 7 d 6 f 6 7 7 7 7 6 f 6 d 7 f
    f 7 d 6 f 6 7 d d 7 6 f 6 d 7 f
    f 7 d 6 f 6 7 d d 7 6 f 6 d 7 f
    f 7 d 6 f 6 7 7 7 7 6 f 6 d 7 f
    f 7 d 6 f 6 6 6 6 6 6 f 6 d 7 f
    f 7 d 6 f f f f f f f f 6 d 7 f
    f 7 d 6 6 6 6 6 6 6 6 6 6 d 7 f
    f 7 d d d d d d d d d d d d 7 f
    f 7 7 7 7 7 7 7 7 7 7 7 7 7 7 f
    f f f f f f f f f f f f f f f f
`;

const studyWall = img`
    e e e e e e e e e e e e e e e e
    e f f f f f f f f f f f f f f e
    e f 4 4 4 4 4 4 4 4 4 4 4 4 f e
    e f 4 c c c c c c c c c c 4 f e
    e f 4 c 2 2 2 2 2 2 2 2 c 4 f e
    e f 4 c 2 4 4 4 4 4 4 2 c 4 f e
    e f 4 c 2 4 c c c c 4 2 c 4 f e
    e f 4 c 2 4 c 2 2 c 4 2 c 4 f e
    e f 4 c 2 4 c 2 2 c 4 2 c 4 f e
    e f 4 c 2 4 c c c c 4 2 c 4 f e
    e f 4 c 2 4 4 4 4 4 4 2 c 4 f e
    e f 4 c 2 2 2 2 2 2 2 2 c 4 f e
    e f 4 c c c c c c c c c c 4 f e
    e f 4 4 4 4 4 4 4 4 4 4 4 4 f e
    e f f f f f f f f f f f f f f e
    e e e e e e e e e e e e e e e e
`;

const workshopWall = img`
    f f f f f f f f f f f f f f f f
    f c c c c c c c c c c c c c c f
    f c b b b b b b b b b b b b c f
    f c b 5 5 5 5 5 5 5 5 5 5 b c f
    f c b 5 f f f f f f f f 5 b c f
    f c b 5 f b b b b b b f 5 b c f
    f c b 5 f b c c c c b f 5 b c f
    f c b 5 f b c f f c b f 5 b c f
    f c b 5 f b c f f c b f 5 b c f
    f c b 5 f b c c c c b f 5 b c f
    f c b 5 f b b b b b b f 5 b c f
    f c b 5 f f f f f f f f 5 b c f
    f c b 5 5 5 5 5 5 5 5 5 5 b c f
    f c b b b b b b b b b b b b c f
    f c c c c c c c c c c c c c c f
    f f f f f f f f f f f f f f f f
`;

const galleryWall = img`
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    2 f f f f f f f f f f f f f f 2
    2 f 2 2 2 2 2 2 2 2 2 2 2 2 f 2
    2 f 2 c c c c c c c c c c 2 f 2
    2 f 2 c f f f f f f f f c 2 f 2
    2 f 2 c f 2 2 2 2 2 2 f c 2 f 2
    2 f 2 c f 2 c c c c 2 f c 2 f 2
    2 f 2 c f 2 c 5 5 c 2 f c 2 f 2
    2 f 2 c f 2 c 5 5 c 2 f c 2 f 2
    2 f 2 c f 2 c c c c 2 f c 2 f 2
    2 f 2 c f 2 2 2 2 2 2 f c 2 f 2
    2 f 2 c f f f f f f f f c 2 f 2
    2 f 2 c c c c c c c c c c 2 f 2
    2 f 2 2 2 2 2 2 2 2 2 2 2 2 f 2
    2 f f f f f f f f f f f f f f 2
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
`;

const greenhouseWall = img`
    d d d d d d d d d d d d d d d d
    d f f f f f f f f f f f f f f d
    d f a a a a a a a a a a a a f d
    d f a b b b b b b b b b b a f d
    d f a b f f f f f f f f b a f d
    d f a b f a a a a a a f b a f d
    d f a b f a b b b b a f b a f d
    d f a b f a b 7 7 b a f b a f d
    d f a b f a b 7 7 b a f b a f d
    d f a b f a b b b b a f b a f d
    d f a b f a a a a a a f b a f d
    d f a b f f f f f f f f b a f d
    d f a b b b b b b b b b b a f d
    d f a a a a a a a a a a a a f d
    d f f f f f f f f f f f f f f d
    d d d d d d d d d d d d d d d d
`;

const recordsWall = img`
    f f f f f f f f f f f f f f f f
    f c c c c c c c c c c c c c c f
    f c d d d d d d d d d d d d c f
    f c d 9 9 9 9 9 9 9 9 9 9 d c f
    f c d 9 f f f f f f f f 9 d c f
    f c d 9 f c c c c c c f 9 d c f
    f c d 9 f c d d d d c f 9 d c f
    f c d 9 f c d 9 9 d c f 9 d c f
    f c d 9 f c d 9 9 d c f 9 d c f
    f c d 9 f c d d d d c f 9 d c f
    f c d 9 f c c c c c c f 9 d c f
    f c d 9 f f f f f f f f 9 d c f
    f c d 9 9 9 9 9 9 9 9 9 9 d c f
    f c d d d d d d d d d d d d c f
    f c c c c c c c c c c c c c c f
    f f f f f f f f f f f f f f f f
`;

const deepVaultWall = img`
    f f f f f f f f f f f f f f f f
    f e e e e e e e e e e e e e e f
    f e f f f f f f f f f f f f e f
    f e f c c c c c c c c c c f e f
    f e f c e e e e e e e e f e f f
    f e f c e f f f f f f e f e f f
    f e f c e f c c c c f e f e f f
    f e f c e f c e e c f e f e f f
    f e f c e f c e e c f e f e f f
    f e f c e f c c c c f e f e f f
    f e f c e f f f f f f e f e f f
    f e f c e e e e e e e e f e f f
    f e f c c c c c c c c c c f e f
    f e f f f f f f f f f f f f e f
    f e e e e e e e e e e e e e e f
    f f f f f f f f f f f f f f f f
`;

// Room-specific Floor Tiles
const wakingRoomFloor = img`
    c c c c c c c c c c c c c c c c
    c b b b b b b b b b b b b b b c
    c b c c c c c c c c c c c c b c
    c b c b b b b b b b b b b c b c
    c b c b c c c c c c c c b c b c
    c b c b c b b b b b b c b c b c
    c b c b c b c c c c b c b c b c
    c b c b c b c b b c b c b c b c
    c b c b c b c b b c b c b c b c
    c b c b c b c c c c b c b c b c
    c b c b c b b b b b b c b c b c
    c b c b c c c c c c c c b c b c
    c b c b b b b b b b b b b c b c
    c b c c c c c c c c c c c c b c
    c b b b b b b b b b b b b b b c
    c c c c c c c c c c c c c c c c
`;

const specimenHallFloor = img`
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
    7 d d d d d d d d d d d d d d 7
    7 d 7 7 7 7 7 7 7 7 7 7 7 7 d 7
    7 d 7 d d d d d d d d d d 7 d 7
    7 d 7 d 7 7 7 7 7 7 7 7 d 7 d 7
    7 d 7 d 7 d d d d d d 7 d 7 d 7
    7 d 7 d 7 d 7 7 7 7 d 7 d 7 d 7
    7 d 7 d 7 d 7 d d 7 d 7 d 7 d 7
    7 d 7 d 7 d 7 d d 7 d 7 d 7 d 7
    7 d 7 d 7 d 7 7 7 7 d 7 d 7 d 7
    7 d 7 d 7 d d d d d d 7 d 7 d 7
    7 d 7 d 7 7 7 7 7 7 7 7 d 7 d 7
    7 d 7 d d d d d d d d d d 7 d 7
    7 d 7 7 7 7 7 7 7 7 7 7 7 7 d 7
    7 d d d d d d d d d d d d d d 7
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
`;

const studyFloor = img`
    e e e e e e e e e e e e e e e e
    e d d d d d d d d d d d d d d e
    e d e e e e e e e e e e e e d e
    e d e d d d d d d d d d d e d e
    e d e d e e e e e e e e d e d e
    e d e d e d d d d d d e d e d e
    e d e d e d e e e e d e d e d e
    e d e d e d e d d e d e d e d e
    e d e d e d e d d e d e d e d e
    e d e d e d e e e e d e d e d e
    e d e d e d d d d d d e d e d e
    e d e d e e e e e e e e d e d e
    e d e d d d d d d d d d d e d e
    e d e e e e e e e e e e e e d e
    e d d d d d d d d d d d d d d e
    e e e e e e e e e e e e e e e e
`;

const workshopFloor = img`
    c c c c c c c c c c c c c c c c
    c 5 5 5 5 5 5 5 5 5 5 5 5 5 5 c
    c 5 c c c c c c c c c c c c 5 c
    c 5 c 5 5 5 5 5 5 5 5 5 5 c 5 c
    c 5 c 5 c c c c c c c c 5 c 5 c
    c 5 c 5 c 5 5 5 5 5 5 c 5 c 5 c
    c 5 c 5 c 5 c c c c 5 c 5 c 5 c
    c 5 c 5 c 5 c 5 5 c 5 c 5 c 5 c
    c 5 c 5 c 5 c 5 5 c 5 c 5 c 5 c
    c 5 c 5 c 5 c c c c 5 c 5 c 5 c
    c 5 c 5 c 5 5 5 5 5 5 c 5 c 5 c
    c 5 c 5 c c c c c c c c 5 c 5 c
    c 5 c 5 5 5 5 5 5 5 5 5 5 c 5 c
    c 5 c c c c c c c c c c c c 5 c
    c 5 5 5 5 5 5 5 5 5 5 5 5 5 5 c
    c c c c c c c c c c c c c c c c
`;

const galleryFloor = img`
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    2 d d d d d d d d d d d d d d 2
    2 d 2 2 2 2 2 2 2 2 2 2 2 2 d 2
    2 d 2 d d d d d d d d d d 2 d 2
    2 d 2 d 2 2 2 2 2 2 2 2 d 2 d 2
    2 d 2 d 2 d d d d d d 2 d 2 d 2
    2 d 2 d 2 d 2 2 2 2 d 2 d 2 d 2
    2 d 2 d 2 d 2 d d 2 d 2 d 2 d 2
    2 d 2 d 2 d 2 d d 2 d 2 d 2 d 2
    2 d 2 d 2 d 2 2 2 2 d 2 d 2 d 2
    2 d 2 d 2 d d d d d d 2 d 2 d 2
    2 d 2 d 2 2 2 2 2 2 2 2 d 2 d 2
    2 d 2 d d d d d d d d d d 2 d 2
    2 d 2 2 2 2 2 2 2 2 2 2 2 2 d 2
    2 d d d d d d d d d d d d d d 2
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
`;

const greenhouseFloor = img`
    d d d d d d d d d d d d d d d d
    d a a a a a a a a a a a a a a d
    d a d d d d d d d d d d d d a d
    d a d a a a a a a a a a a d a d
    d a d a d d d d d d d d a d a d
    d a d a d a a a a a a d a d a d
    d a d a d a d d d d a d a d a d
    d a d a d a d a a d a d a d a d
    d a d a d a d a a d a d a d a d
    d a d a d a d d d d a d a d a d
    d a d a d a a a a a a d a d a d
    d a d a d d d d d d d d a d a d
    d a d a a a a a a a a a a d a d
    d a d d d d d d d d d d d d a d
    d a a a a a a a a a a a a a a d
    d d d d d d d d d d d d d d d d
`;

const recordsFloor = img`
    c c c c c c c c c c c c c c c c
    c d d d d d d d d d d d d d d c
    c d c c c c c c c c c c c c d c
    c d c d d d d d d d d d d c d c
    c d c d c c c c c c c c d c d c
    c d c d c d d d d d d c d c d c
    c d c d c d c c c c d c d c d c
    c d c d c d c d d c d c d c d c
    c d c d c d c d d c d c d c d c
    c d c d c d c c c c d c d c d c
    c d c d c d d d d d d c d c d c
    c d c d c c c c c c c c d c d c
    c d c d d d d d d d d d d c d c
    c d c c c c c c c c c c c c d c
    c d d d d d d d d d d d d d d c
    c c c c c c c c c c c c c c c c
`;

const deepVaultFloor = img`
    e e e e e e e e e e e e e e e e
    e c c c c c c c c c c c c c c e
    e c e e e e e e e e e e e e c e
    e c e c c c c c c c c c c e c e
    e c e c e e e e e e e e c e c e
    e c e c e c c c c c c e c e c e
    e c e c e c e e e e c e c e c e
    e c e c e c e c c e c e c e c e
    e c e c e c e c c e c e c e c e
    e c e c e c e e e e c e c e c e
    e c e c e c c c c c c e c e c e
    e c e c e e e e e e e e c e c e
    e c e c c c c c c c c c c e c e
    e c e e e e e e e e e e e e c e
    e c c c c c c c c c c c c c c e
    e e e e e e e e e e e e e e e e
`;

function buildTilemap(width: number, height: number, layoutString: string, tileset: Image[]): tiles.TileMapData {
    const buf = control.createBuffer(4 + width * height);
    buf.setNumber(NumberFormat.UInt16LE, 0, width);
    buf.setNumber(NumberFormat.UInt16LE, 2, height);

    const wallLayer = image.create(width, height);

    let layout = "";
    for (let i = 0; i < layoutString.length; i++) {
        const char = layoutString.charAt(i);
        if (char !== "\n" && char !== "\r" && char !== " ") {
            layout += char;
        }
    }

    for (let i = 0; i < layout.length; i++) {
        const char = layout.charAt(i);
        const x = i % width;
        const y = Math.floor(i / width);

        let tileIndex = 0;
        if (char === "#") {
            tileIndex = 1; // wall
            wallLayer.setPixel(x, y, 1);
        } else if (char === ".") {
            tileIndex = 2; // floor
        } else if (char === "S") {
            tileIndex = 3; // safeZone
        } else if (char === "E") {
            tileIndex = 4; // exitPoint
        }
        buf.setNumber(NumberFormat.UInt8LE, 4 + i, tileIndex);
    }

    return tiles.createTilemap(buf, wallLayer, tileset, TileScale.Sixteen);
}

function buildWakingRoom(): tiles.TileMapData {
    const tileset = [
        img`.`,
        wakingRoomWall,
        wakingRoomFloor,
        safeZoneImage,
        exitPointImage
    ];
    const layout = `
        # # # # # # # # # #
        # S . . . . . . . #
        # . . . . . . . . #
        # . . . . . . . . E
        # . . . . . . . . #
        # . . . . . . . . #
        # . . . . . . . . #
        # # # # # # # # # #
    `;
    return buildTilemap(10, 8, layout, tileset);
}

function buildSpecimenHall(): tiles.TileMapData {
    const tileset = [
        img`.`,
        specimenHallWall,
        specimenHallFloor,
        safeZoneImage,
        exitPointImage
    ];
    const layout = `
        # # # # # # # # # # # #
        # S S . . . . . . . . #
        # . . . . . . . . . . #
        # . . . . . . . . . . E
        # . . . . . . . . . . #
        # . . . . . . . . . . #
        # . . . . . . . . . . #
        # # # # # # # # # # # #
    `;
    return buildTilemap(12, 8, layout, tileset);
}

function buildStudy(): tiles.TileMapData {
    const tileset = [
        img`.`,
        studyWall,
        studyFloor,
        safeZoneImage,
        exitPointImage
    ];
    const layout = `
        # # # # # # # # # # # #
        # . . . . . . . . . . #
        # . . . . . . . . . . #
        # . . . . . . . . . . E
        # . . . S S S . . . . #
        # . . . . . . . . . . #
        # . . . . . . . . . . #
        # # # # # # # # # # # #
    `;
    return buildTilemap(12, 8, layout, tileset);
}

function buildWorkshop(): tiles.TileMapData {
    const tileset = [
        img`.`,
        workshopWall,
        workshopFloor,
        safeZoneImage,
        exitPointImage
    ];
    const layout = `
        # # # # # # # # # # # #
        # . . . . . . . . . . #
        # . . . . . . . . . . #
        # . . . . . . . . . . E
        # . . S S . . . . . . #
        # . . . . . . . . . . #
        # . . . . . . . . . . #
        # # # # # # # # # # # #
    `;
    return buildTilemap(12, 8, layout, tileset);
}

function buildGallery(): tiles.TileMapData {
    const tileset = [
        img`.`,
        galleryWall,
        galleryFloor,
        safeZoneImage,
        exitPointImage
    ];
    const layout = `
        # # # # # # # # # # # #
        # . . . . . . . . S S #
        # . . . . . . . . . . #
        # . . . . . . . . . . E
        # . . . . . . . . . . #
        # . . . . . . . . . . #
        # . . . . . . . . . . #
        # # # # # # # # # # # #
    `;
    return buildTilemap(12, 8, layout, tileset);
}

function buildGreenhouse(): tiles.TileMapData {
    const tileset = [
        img`.`,
        greenhouseWall,
        greenhouseFloor,
        safeZoneImage,
        exitPointImage
    ];
    const layout = `
        # # # # # # # # # # # #
        # . . . . . . . . S S #
        # . . . . . . . . . . #
        # . . . . . . . . . . E
        # . . . . . . . . . . #
        # . . . . . . . . . . #
        # . . . . . . . . . . #
        # # # # # # # # # # # #
    `;
    return buildTilemap(12, 8, layout, tileset);
}

function buildRecords(): tiles.TileMapData {
    const tileset = [
        img`.`,
        recordsWall,
        recordsFloor,
        safeZoneImage,
        exitPointImage
    ];
    const layout = `
        # # # # # # # # # # # #
        # . . . . . . . S S . #
        # . . . . . . . . . . #
        # . . . . . . . . . . E
        # . . . . . . . . . . #
        # . . . . . . . . . . #
        # . . . . . . . . . . #
        # # # # # # # # # # # #
    `;
    return buildTilemap(12, 8, layout, tileset);
}

function buildDeepVault(): tiles.TileMapData {
    const tileset = [
        img`.`,
        deepVaultWall,
        deepVaultFloor,
        safeZoneImage,
        exitPointImage
    ];
    const layout = `
        # # # # # # # # # # # # # #
        # . . . . . . . . . . . . #
        # . . . . . . . . . . . . #
        # . . . . . . . . . . . . #
        # . . . S S S . . . E . . #
        # . . . . . . . . . . . . #
        # . . . . . . . . . . . . #
        # # # # # # # # # # # # # #
    `;
    return buildTilemap(14, 8, layout, tileset);
}

// Register level asset factories with PXT helpers
helpers._registerFactory("tilemap", function(name: string) {
    if (name === "wakingRoom") return buildWakingRoom();
    if (name === "specimenHall") return buildSpecimenHall();
    if (name === "study") return buildStudy();
    if (name === "workshop") return buildWorkshop();
    if (name === "gallery") return buildGallery();
    if (name === "greenhouse") return buildGreenhouse();
    if (name === "records") return buildRecords();
    if (name === "deepVault") return buildDeepVault();
    return null;
});

helpers._registerFactory("tile", function(name: string) {
    if (name === "safeZone") return safeZoneImage;
    if (name === "exitPoint") return exitPointImage;
    return null;
});

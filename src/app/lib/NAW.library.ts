export const enum Terrain {
    Flat,
    Mountain,
    Road,
    Water
}

// Game structure based on Nintendo's Advanced Wars
export class NAW {
    public board: number[][];
    public pieces: number[][];
    public turn: string;

    constructor() {
        this.board = [
            [2, 0, 4, 4, 0, 0, 1, 2],
            [2, 0, 4, 4, 2, 2, 1, 2],
            [2, 2, 2, 4, 0, 2, 2, 2],
            [2, 1, 2, 0, 0, 2, 1, 2],
            [2, 1, 2, 0, 0, 2, 1, 2],
            [2, 2, 2, 0, 4, 2, 2, 2],
            [2, 1, 2, 2, 4, 4, 0, 2],
            [2, 1, 0, 0, 4, 4, 0, 2]
        ];
    }

    public play(): void {
        // play an instance of the game
    }
}

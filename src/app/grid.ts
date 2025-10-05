export type Grid6x5 = [
    [number, number, number, number, number],
    [number, number, number, number, number],
    [number, number, number, number, number],
    [number, number, number, number, number],
    [number, number, number, number, number],
    [number, number, number, number, number],
]

export type GridNames = [string, string, string, string, string, string]

export const getTileColor = (tile: number) => {
    switch (tile) {
        case 0:
            return "bg-[var(--wordle-gray)]"
        case 1:
            return "bg-[var(--wordle-green)]"
        case 2:
            return "bg-[var(--wordle-yellow)]"
    }
}

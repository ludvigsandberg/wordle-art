"use client"

import { getTileColor, Grid6x5, GridNames } from "../grid"

type BigGridProps = {
    grid: Grid6x5
    words: GridNames
}

export default function BigGrid({ grid, words }: BigGridProps) {
    return (
        <div className="flex justify-center flex-col gap-1">
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-1">
                    {row.map((tileIndex, colIndex) => (
                        <div
                            key={`cell-${rowIndex}-${colIndex}`}
                            className={`w-16 h-16 flex justify-center items-center font-sans font-extrabold text-4xl uppercase text-white ${getTileColor(tileIndex)}`}
                        >
                            {words[rowIndex][colIndex]}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

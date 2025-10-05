"use client"

import { useState } from "react"
import { getTileColor, Grid6x5 } from "../grid"

type EditorProps = {
    setCurrentGrid: (pattern: Grid6x5) => void
}

export default function Editor({ setCurrentGrid }: EditorProps) {
    const [grid, setGrid] = useState<Grid6x5>(
        Array.from({ length: 6 }, () => Array(5).fill(0)) as Grid6x5,
    )
    const [currentColor, setCurrentColor] = useState(1)
    const [clickedTile, setClickedTile] = useState<[number, number] | null>(null)

    const handleTileClick = (row: number, col: number) => {
        const newGrid: Grid6x5 = grid.map((r, rIndex) =>
            r.map((cell, cIndex) => (rIndex === row && cIndex === col ? currentColor : cell)),
        ) as Grid6x5

        setGrid(newGrid)
        setCurrentGrid(newGrid)

        // Animate click
        setClickedTile([row, col])
        setTimeout(() => setClickedTile(null), 150)
    }

    return (
        <div className="flex flex-col items-center justify-center gap-6 h-full w-full">
            {/* Grid */}
            <div className="grid grid-rows-6 grid-cols-5 gap-1 shadow-xs mb-2">
                {grid.map((row, rowIndex) =>
                    row.map((cell, colIndex) => {
                        const key = `${rowIndex}-${colIndex}`
                        const isClicked =
                            clickedTile?.[0] === rowIndex && clickedTile?.[1] === colIndex
                        return (
                            <div
                                key={key}
                                className={`w-12 h-12 flex justify-center items-center rounded-xs cursor-pointer font-bold text-white
                  ${getTileColor(cell)}
                  transform transition-all duration-150
                  ${isClicked ? "scale-105 shadow-lg" : "scale-100"}
                `}
                                onClick={() => handleTileClick(rowIndex, colIndex)}
                            />
                        )
                    }),
                )}
            </div>

            {/* Color picker */}
            <div className="flex gap-4 justify-center">
                {[0, 1, 2].map((color) => (
                    <button
                        key={color}
                        onClick={() => setCurrentColor(color)}
                        className={`w-10 h-10 rounded-full shadow-md transition-transform duration-150 cursor-pointer focus:outline-none hover:scale-110 ${getTileColor(color)} ${currentColor === color ? "scale-120 shadow-xl hover:scale-120" : ""}`}
                        aria-label={`Select color ${color}`}
                    />
                ))}
            </div>
        </div>
    )
}

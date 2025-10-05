"use client"

import { useState } from "react"
import { getTileColor, Grid6x5 } from "../grid"

type TabsProps = {
    patterns: { name: string; grid: Grid6x5 }[]
    setCurrentGrid: (pattern: Grid6x5) => void
}

export default function PatternSelector({ patterns, setCurrentGrid }: TabsProps) {
    const [selectedIndex, setSelectedIndex] = useState(0)

    const selectGrid = (pattern: Grid6x5, index: number) => {
        setCurrentGrid(pattern)
        setSelectedIndex(index)
    }

    return (
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 justify-items-center">
            {patterns.map((pattern, index) => (
                <button
                    key={index}
                    onClick={() => selectGrid(pattern.grid, index)}
                    className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all duration-150 transform hover:scale-104 focus:outline-none ${
                        index === selectedIndex
                            ? "shadow-xl scale-105 hover:scale-105 bg-white hover:shadow-xl"
                            : "hover:shadow-md"
                    }`}
                    aria-label={`Select pattern ${pattern.name}`}
                >
                    {/* Pattern grid */}
                    <div className="grid grid-cols-5 gap-1">
                        {pattern.grid.flat().map((cell, idx) => (
                            <div key={idx} className={`w-6 h-6 rounded-xs ${getTileColor(cell)}`} />
                        ))}
                    </div>

                    {/* Pattern name */}
                    <span className="text-xs font-light text-gray-600 text-center">
                        {pattern.name}
                    </span>
                </button>
            ))}
        </div>
    )
}

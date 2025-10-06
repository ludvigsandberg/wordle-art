"use client"

import BigGrid from "./components/BigGrid"
import Tabs from "./components/Tabs"
import { useRef, useState } from "react"
import { Grid6x5, GridNames } from "./grid"
import SolutionInput from "./components/SolutionInput"
import { ALPHANUMERIC_PATTERNS, BLANK_PATTERN, PATTERNS } from "./patterns"
import { solve } from "./solve"

export default function Home() {
    const [selectedTab, setSelectedTab] = useState(0)
    const [currentGrid, setCurrentGrid] = useState<Grid6x5>(PATTERNS[0].grid)
    const [currentWords, setCurrentWords] = useState<GridNames>([
        "horse",
        "horse",
        "horse",
        "horse",
        "horse",
        "horse",
    ])
    const [solution, setSolution] = useState("horse")
    const [loading, setLoading] = useState(false)
    const [noSolution, setNoSolution] = useState(false)
    const controllerRef = useRef<AbortController | null>(null)
    const currentSolveId = useRef(0)

    const solve2 = (grid?: Grid6x5, sol?: string) => {
        // Cancel previous solve
        if (controllerRef.current) controllerRef.current.abort()

        const controller = new AbortController()
        controllerRef.current = controller

        const solveId = ++currentSolveId.current
        setLoading(true)
        setNoSolution(false)

        const gridToUse = grid ?? currentGrid
        const solutionToUse = sol ?? solution

        solve(gridToUse, solutionToUse, controller.signal)
            .then(({ success, words }) => {
                if (solveId === currentSolveId.current) {
                    if (!success) {
                        setNoSolution(true)
                    } else {
                        setCurrentWords(words)
                    }
                }
            })
            .catch((err) => {
                if (err.name !== "AbortError") console.error(err)
            })
            .finally(() => {
                if (solveId === currentSolveId.current) setLoading(false)
            })
    }

    const updateSolution = (s: string) => {
        if (s === solution) return
        setSolution(s)
        solve2(undefined, s) // pass the new solution directly
    }

    const updateGrid = (grid: Grid6x5) => {
        if (currentGrid.flat().join("") === grid.flat().join("")) return
        setCurrentGrid(grid)
        solve2(grid) // pass the new grid directly
    }

    const onTabChange = (tab: number) => {
        setSelectedTab(tab)

        switch (tab) {
            case 0:
                updateGrid(PATTERNS[0].grid)
                break
            case 1:
                updateGrid(ALPHANUMERIC_PATTERNS[0].grid)
                break
            case 2:
                updateGrid(BLANK_PATTERN)
        }
    }

    return (
        <div className="flex flex-col h-screen bg-white">
            {/* Header */}
            <header
                className={`flex flex-col items-center flex-shrink-0 p-3 bg-[var(--wordle-background-gray)]`}
            >
                <a
                    href="https://www.nytimes.com/games/wordle"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div className="flex items-center gap-3">
                        <img src="/wordle-icon.svg" alt="Wordle Icon" className="h-8 xl:h-12" />
                        <h1 className="font-karnak font-semibold text-2xl text-gray-900 xl:text-4xl">
                            Wordle Art Generator
                        </h1>
                    </div>
                </a>
            </header>

            {/* Main */}
            <main className="flex flex-col xl:flex-row flex-1 gap-4 p-4">
                {/* Left column */}
                <div className="flex flex-1 flex-col items-center justify-center mb-4 xl:mb-0">
                    <SolutionInput setSolution={updateSolution} />

                    {/* Output grid and loading icon. */}
                    <div className="relative inline-block">
                        <BigGrid grid={currentGrid} words={currentWords} />

                        {/* Loading overlay */}
                        {loading && (
                            <div className="absolute inset-0 flex items-center justify-center z-20">
                                <img
                                    src="/wordle-icon.svg"
                                    alt="Loading"
                                    className="w-12 h-12 animate-spin"
                                />
                            </div>
                        )}

                        {/* No solution overlay */}
                        {noSolution && !loading && (
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-20">
                                <div className="bg-gray-200 px-6 py-4 m-4 rounded-lg shadow-lg text-gray-600 text-center">
                                    <h1 className="font-karnak text-2xl">Not possible!</h1>
                                    <p className="">Try a different pattern</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right column */}
                <div className="flex flex-1 flex-col h-full">
                    <Tabs
                        selectedTab={selectedTab}
                        setSelectedTab={onTabChange}
                        setCurrentGrid={updateGrid}
                    />
                </div>
            </main>

            {/* Footer */}
            <footer className="text-center pb-4">
                <p className="text-xs font-light text-gray-600">
                    &copy;{" "}
                    <a
                        href="https://ludvigsandberg.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                    >
                        Ludvig Sandberg
                    </a>
                </p>
            </footer>
        </div>
    )
}

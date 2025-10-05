"use client"

import BigGrid from "./components/BigGrid"
import Tabs from "./components/Tabs"
import { useState } from "react"
import { Grid6x5, GridNames } from "./grid"
import SolutionInput from "./components/SolutionInput"
import { ALPHANUMERIC_PATTERNS, BLANK_PATTERN, PATTERNS } from "./patterns"

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

    const onValidInput = (solution: string) => {}

    const onTabChange = (tab: number) => {
        setSelectedTab(tab)

        switch (tab) {
            case 0:
                setCurrentGrid(PATTERNS[0].grid)
                break
            case 1:
                setCurrentGrid(ALPHANUMERIC_PATTERNS[0].grid)
                break
            case 2:
                setCurrentGrid(BLANK_PATTERN)
        }
    }

    return (
        <div className="flex flex-col h-screen bg-white">
            {/* Header */}
            <header
                className={`flex flex-col items-center flex-shrink-0 p-4 bg-[var(--wordle-background-gray)]`}
            >
                <a
                    href="https://www.nytimes.com/games/wordle"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div className="flex items-center gap-3">
                        <img src="/wordle-icon.svg" alt="Wordle Icon" className="h-8 xl:h-10" />
                        <h1 className="font-karnak font-semibold text-2xl xl:text-3xl">
                            Wordle Art Generator
                        </h1>
                    </div>
                </a>
            </header>

            {/* Main */}
            <main className="flex flex-col xl:flex-row flex-1 gap-4 p-4">
                {/* Left column */}
                <div className="flex flex-1 flex-col items-center justify-center mb-4 xl:mb-0">
                    <SolutionInput onValidInput={onValidInput} />
                    <BigGrid grid={currentGrid} words={currentWords} />
                </div>

                {/* Right column */}
                <div className="flex flex-1 flex-col h-full">
                    <Tabs
                        selectedTab={selectedTab}
                        setSelectedTab={onTabChange}
                        setCurrentGrid={setCurrentGrid}
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

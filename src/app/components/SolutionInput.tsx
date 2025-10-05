"use client"

import { useState } from "react"

type SolutionInputProps = {
    onValidInput: (solution: string) => void
}

export default function SolutionInput({ onValidInput }: SolutionInputProps) {
    const [value, setValue] = useState("")

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const cleaned = e.target.value
            .replace(/[^a-zA-Z]/g, "")
            .slice(0, 5)
            .toUpperCase()
        setValue(cleaned)

        if (cleaned.length === 5) {
            onValidInput(cleaned)
        }
    }

    const gridWidth = 5 * 64 + 4 * 4

    return (
        <div className="mb-4 flex flex-col" style={{ width: gridWidth }}>
            <div className="relative w-full">
                <svg
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9"></path>
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z"
                    ></path>
                </svg>

                <input
                    id="solution-input"
                    type="text"
                    value={value}
                    maxLength={5}
                    placeholder="Solution"
                    onChange={handleInput}
                    className="border border-gray-300 rounded-xl px-10 py-2 w-full text-center text-gray-900 bg-gray-100 shadow-inner focus:outline-none focus:bg-gray-200 transition duration-150 ease-in-out"
                />
            </div>
        </div>
    )
}

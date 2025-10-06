import { VALID_GUESSES } from "./words"
import type { Grid6x5, GridNames } from "./grid"

/**
 * Solve a Wordle pattern grid for a given solution word.
 * Handles repeated letters correctly.
 *
 * currentGrid: 6x5 grid of 0=gray, 1=green, 2=yellow
 * solutionWord: 5-letter solution word (uppercase)
 * signal: AbortSignal to cancel async execution
 */
export async function solve(
    currentGrid: Grid6x5,
    solutionWord: string,
    signal: AbortSignal,
): Promise<{ success: boolean; words: GridNames }> {
    return new Promise((resolve, reject) => {
        if (signal.aborted) return resolve({ success: false, words: ["", "", "", "", "", ""] })

        const onAbort = () => {
            clearTimeout(timeout)
            reject(new DOMException("Aborted", "AbortError"))
        }
        signal.addEventListener("abort", onAbort, { once: true })

        const timeout = setTimeout(() => {
            signal.removeEventListener("abort", onAbort)

            const result: GridNames = ["", "", "", "", "", ""]

            const solution = solutionWord.toUpperCase()

            // Helper: check if candidate word fits pattern according to Wordle rules
            const isValid = (word: string, pattern: number[]): boolean => {
                word = word.toUpperCase()

                const solutionLetterCounts: Record<string, number> = {}
                for (let i = 0; i < 5; i++) {
                    solutionLetterCounts[solution[i]] = (solutionLetterCounts[solution[i]] || 0) + 1
                }

                // First, handle green letters
                for (let i = 0; i < 5; i++) {
                    if (pattern[i] === 1) {
                        if (word[i] !== solution[i]) return false
                        solutionLetterCounts[word[i]]--
                    }
                }

                // Then handle yellow letters
                for (let i = 0; i < 5; i++) {
                    if (pattern[i] === 2) {
                        if (word[i] === solution[i]) return false // cannot be same position
                        if (!solution.includes(word[i]) || solutionLetterCounts[word[i]] <= 0)
                            return false
                        solutionLetterCounts[word[i]]--
                    }
                }

                // Finally handle gray letters
                for (let i = 0; i < 5; i++) {
                    if (pattern[i] === 0) {
                        if (solutionLetterCounts[word[i]] > 0) return false
                    }
                }

                return true
            }

            // Generate words for each row
            for (let row = 0; row < 6; row++) {
                const pattern = currentGrid[row]
                let candidate: string | undefined

                // Last row all green must be the solution
                if (row === 5 && pattern.every((v) => v === 1)) {
                    candidate = solution
                } else {
                    candidate = Array.from(VALID_GUESSES).find((w) => isValid(w, pattern))
                }

                if (!candidate) {
                    resolve({ success: false, words: ["", "", "", "", "", ""] })
                    return
                }

                result[row] = candidate.toUpperCase()
            }

            resolve({ success: true, words: result })
        }, 0) // run immediately, async
    })
}

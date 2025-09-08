import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Question {
  value: number
  question: string
  answer: string
  answered?: boolean
}

export interface Category {
  name: string
  questions: Question[]
}

export interface GameData {
  categories: Category[]
}

export interface GameState {
  playerName: string
  score: number
  currentQuestion: Question | null
  gameData: GameData | null
  gameStarted: boolean
  gameCompleted: boolean
  answeredQuestions: Set<string>
  correctAnswers: Set<string>
  incorrectAnswers: Set<string>

  // Actions
  setPlayerName: (name: string) => void
  setGameData: (data: GameData) => void
  startGame: () => void
  selectQuestion: (categoryIndex: number, questionIndex: number) => void
  answerQuestion: (correct: boolean) => void
  closeQuestion: () => void
  resetGame: () => void
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      playerName: "",
      score: 0,
      currentQuestion: null,
      gameData: null,
      gameStarted: false,
      gameCompleted: false,
      answeredQuestions: new Set(),
      correctAnswers: new Set(),
      incorrectAnswers: new Set(),

      setPlayerName: (name: string) => set({ playerName: name }),

      setGameData: (data: GameData) => set({ gameData: data }),

      startGame: () => {
        set({ gameStarted: true })
        window.location.href = "/questions"
      },

      selectQuestion: (categoryIndex: number, questionIndex: number) => {
        const { gameData } = get()
        if (!gameData) return

        const question = gameData.categories[categoryIndex].questions[questionIndex]
        const questionKey = `${categoryIndex}-${questionIndex}`

        if (get().answeredQuestions.has(questionKey)) return

        set({ currentQuestion: question })
      },

      answerQuestion: (correct: boolean) => {
        const { currentQuestion, score, answeredQuestions, gameData, correctAnswers, incorrectAnswers } = get()
        if (!currentQuestion || !gameData) return

        const newScore = correct ? score + currentQuestion.value : score
        const questionKey = `${gameData.categories.findIndex((cat) =>
          cat.questions.some((q) => q === currentQuestion),
        )}-${gameData.categories
          .find((cat) => cat.questions.some((q) => q === currentQuestion))
          ?.questions.findIndex((q) => q === currentQuestion)}`

        const newAnsweredQuestions = new Set(answeredQuestions)
        newAnsweredQuestions.add(questionKey)

        const newCorrectAnswers = new Set(correctAnswers)
        const newIncorrectAnswers = new Set(incorrectAnswers)

        if (correct) {
          newCorrectAnswers.add(questionKey)
        } else {
          newIncorrectAnswers.add(questionKey)
        }

        // Check if game is completed (all 9 questions answered)
        const gameCompleted = newAnsweredQuestions.size === 9

        set({
          score: newScore,
          answeredQuestions: newAnsweredQuestions,
          correctAnswers: newCorrectAnswers,
          incorrectAnswers: newIncorrectAnswers,
          gameCompleted,
          currentQuestion: null,
        })

        if (gameCompleted) {
          window.location.href = "/game-over"
        }
      },

      closeQuestion: () => set({ currentQuestion: null }),

      resetGame: () => {
        // Clear session storage
        sessionStorage.removeItem("jeopardy-game-storage")

        set({
          playerName: "",
          score: 0,
          currentQuestion: null,
          gameStarted: false,
          gameCompleted: false,
          answeredQuestions: new Set(),
          correctAnswers: new Set(),
          incorrectAnswers: new Set(),
        })

        // Redirect to home page
        window.location.href = "/"
      },
    }),
    {
      name: "jeopardy-game-storage",
      storage: {
        getItem: (name) => {
          const str = sessionStorage.getItem(name)
          if (!str) return null

          try {
            const parsed = JSON.parse(str)
            // Convert arrays back to Sets when loading from storage
            if (parsed.state) {
              parsed.state.answeredQuestions = new Set(parsed.state.answeredQuestions || [])
              parsed.state.correctAnswers = new Set(parsed.state.correctAnswers || [])
              parsed.state.incorrectAnswers = new Set(parsed.state.incorrectAnswers || [])
            }

            return parsed
          } catch {
            return null
          }
        },
        setItem: (name, value) => {
          try {
            const stateToSave = { ...value }

            // Convert Sets to arrays for storage
            if (stateToSave.state) {
              stateToSave.state = {
                ...stateToSave.state,
                answeredQuestions: Array.from(stateToSave.state.answeredQuestions || []),
                correctAnswers: Array.from(stateToSave.state.correctAnswers || []),
                incorrectAnswers: Array.from(stateToSave.state.incorrectAnswers || []),
              }
            }

            sessionStorage.setItem(name, JSON.stringify(stateToSave))
          } catch (error) {
            console.error("Failed to save game state:", error)
          }
        },
        removeItem: (name) => sessionStorage.removeItem(name),
      },
    },
  ),
)

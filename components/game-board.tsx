"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useGameStore } from "@/lib/game-state"
import { QuestionModal } from "@/components/question-modal"

export function GameBoard() {
  const {
    playerName,
    score,
    gameData,
    answeredQuestions,
    correctAnswers,
    incorrectAnswers,
    currentQuestion,
    selectQuestion,
    resetGame, // Added resetGame to destructuring
  } = useGameStore()

  if (!gameData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Loading game...</p>
        </div>
      </div>
    )
  }

  const isQuestionAnswered = (categoryIndex: number, questionIndex: number) => {
    return answeredQuestions.has(`${categoryIndex}-${questionIndex}`)
  }

  const getQuestionIcon = (categoryIndex: number, questionIndex: number) => {
    const questionKey = `${categoryIndex}-${questionIndex}`
    if (correctAnswers.has(questionKey)) {
      return "✓"
    } else if (incorrectAnswers.has(questionKey)) {
      return "✗"
    }
    return "✓" // fallback
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header with player info */}
        <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 p-3 sm:p-6 border-2 border-primary/20 rounded-lg shadow-lg">
          <Button
            onClick={() => {
              resetGame()
              window.location.href = "/"
            }}
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 p-2 h-10 w-10 sm:hidden hover:bg-transparent text-lg"
            title="Start Over"
          >
            ↻
          </Button>

          <Button
            onClick={() => {
              resetGame()
              window.location.href = "/"
            }}
            variant="ghost"
            size="sm"
            className="hidden sm:block absolute top-2 right-2 p-2 h-10 w-10 hover:bg-transparent text-lg"
            title="Start Over"
          >
            ↻
          </Button>

          <div className="text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-primary">AI Cloud Jeopardy</h1>
            <p className="text-muted-foreground">
              powered by <span className="text-foreground">▲</span>
            </p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-base sm:text-lg font-semibold text-foreground">Player: {playerName}</p>
          </div>
        </div>

        {/* Game Board */}
        <Card className="border-2 border-primary/20 shadow-xl">
          <CardHeader className="flex items-center justify-center h-12">
            <p className="text-2xl sm:text-3xl font-bold text-primary">${score}</p>
          </CardHeader>

          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-4">
              {/* Category Headers */}
              {gameData.categories.map((category, categoryIndex) => (
                <div
                  key={categoryIndex}
                  className="bg-primary text-primary-foreground p-4 rounded-lg flex items-center justify-center"
                >
                  <h2 className="text-sm sm:text-lg md:text-xl font-bold uppercase tracking-wide leading-tight text-center">
                    {category.name}
                  </h2>
                </div>
              ))}

              {/* Question Cells */}
              {[0, 1, 2].map((questionIndex) =>
                gameData.categories.map((category, categoryIndex) => {
                  const question = category.questions[questionIndex]
                  const answered = isQuestionAnswered(categoryIndex, questionIndex)

                  return (
                    <Button
                      key={`${categoryIndex}-${questionIndex}`}
                      variant="outline"
                      className={`
                        h-24 text-2xl font-bold border-2 transition-all duration-200
                        ${
                          answered
                            ? "bg-muted text-muted-foreground border-muted cursor-not-allowed opacity-50"
                            : "bg-card hover:bg-primary/20 border-primary/30 hover:border-primary hover:scale-105 shadow-md hover:shadow-lg text-foreground hover:text-foreground"
                        }
                      `}
                      onClick={() => !answered && selectQuestion(categoryIndex, questionIndex)}
                      disabled={answered}
                    >
                      {answered ? getQuestionIcon(categoryIndex, questionIndex) : `$${question.value}`}
                    </Button>
                  )
                }),
              )}
            </div>
          </CardContent>
        </Card>

        {/* Question Modal */}
        {currentQuestion && <QuestionModal />}
      </div>
    </div>
  )
}

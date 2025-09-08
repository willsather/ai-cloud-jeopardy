"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog"
import { useGameStore } from "@/lib/game-state"

export function QuestionModal() {
  const { currentQuestion, answerQuestion, closeQuestion } = useGameStore()
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  if (!currentQuestion) return null

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowResult(true)

    const isCorrect = answerIndex === currentQuestion.correctAnswer
    setTimeout(() => {
      answerQuestion(isCorrect)
      setSelectedAnswer(null)
      setShowResult(false)
    }, 2000) // Show result for 2 seconds before closing
  }

  const handleClose = () => {
    closeQuestion()
    setSelectedAnswer(null)
    setShowResult(false)
  }

  return (
    <Dialog open={!!currentQuestion} onOpenChange={handleClose}>
      <DialogOverlay className="bg-black/80 backdrop-blur-sm" />
      <DialogContent className="max-w-2xl w-[95vw] sm:w-full mx-auto my-4 sm:my-8 p-0 shadow-2xl overflow-hidden max-h-[90vh] rounded-xl overflow-y-auto">
        <Card className="border-0 p-0 bg-card overflow-hidden">
          <CardHeader className="bg-primary text-primary-foreground py-4 sm:py-6 relative -m-px">
            <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-left sm:text-center">
              ${currentQuestion.value}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-8 space-y-4 sm:space-y-6">
            {/* Question Display */}
            <div className="text-center space-y-4">
              <div className="bg-primary/5 border-2 border-primary/20 rounded-lg p-4 sm:p-6">
                <p className="text-lg sm:text-xl leading-relaxed text-foreground font-medium">
                  {currentQuestion.question}
                </p>
              </div>
            </div>

            {!showResult && (
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    variant="outline"
                    className="w-full text-left justify-start p-3 sm:p-4 h-auto border-2 border-muted-foreground/20 hover:border-primary/50 hover:bg-primary/5 text-sm sm:text-base"
                  >
                    <span className="font-semibold mr-2 sm:mr-3 text-primary">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </Button>
                ))}
              </div>
            )}

            {showResult && (
              <div className="space-y-4 animate-in fade-in-50 duration-300">
                <div className="text-center mb-4">
                  {selectedAnswer === currentQuestion.correctAnswer ? (
                    <div className="bg-green-100 border-2 border-green-500 rounded-lg p-3 sm:p-4">
                      <p className="text-lg sm:text-xl font-bold text-green-700">
                        ✓ Correct! +${currentQuestion.value}
                      </p>
                    </div>
                  ) : (
                    <div className="bg-red-100 border-2 border-red-500 rounded-lg p-3 sm:p-4">
                      <p className="text-lg sm:text-xl font-bold text-red-700">✗ Incorrect! +$0</p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  {currentQuestion.options.map((option, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border-2 ${
                        index === currentQuestion.correctAnswer
                          ? "bg-green-100 border-green-500 text-green-800"
                          : index === selectedAnswer
                            ? "bg-red-100 border-red-500 text-red-800"
                            : "bg-muted border-muted-foreground/20"
                      }`}
                    >
                      <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}

"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useGameStore } from "@/lib/game-state"

export function Scoreboard() {
  const { playerName, score, resetGame } = useGameStore()

  const getScoreMessage = (score: number) => {
    if (score >= 1800) return { message: "Outstanding! You're a true tech expert!", color: "bg-green-600" }
    if (score >= 1200) return { message: "Great job! You know your stuff!", color: "bg-primary" }
    if (score >= 600) return { message: "Good work! Keep learning!", color: "bg-accent" }
    return { message: "Nice try! There's always room to grow!", color: "bg-secondary" }
  }

  const scoreInfo = getScoreMessage(score)
  const maxPossibleScore = 1800 // 3 categories × 3 questions × (100+200+300)
  const percentage = Math.round((score / maxPossibleScore) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <div className="max-w-4xl mx-auto space-y-8 py-8">
        {/* Header */}
        <div className="text-center md:text-center text-left space-y-4">
          
        </div>

        {/* Score Card */}
        <Card className="border-2 border-primary/20 shadow-xl p-0">
          <CardHeader className="text-center bg-primary/5 p-5">
            <CardTitle className="text-3xl text-foreground">Final Score</CardTitle>
            <CardDescription className="text-lg text-foreground">Player: {playerName}</CardDescription>
          </CardHeader>
          <CardContent className="p-8 text-center space-y-6">
            <div className="space-y-4">
              <div className="text-6xl font-bold text-primary">${score}</div>
              <div className="text-sm text-muted-foreground">{percentage}% of maximum possible score</div>
            </div>
          </CardContent>
        </Card>

        {/* Game Stats */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-2 border-accent/20">
            <CardHeader>
              <CardTitle className="text-xl">Game Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Questions Answered:</span>
                <span className="font-semibold">9 / 9</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Categories Completed:</span>
                <span className="font-semibold">3 / 3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Final Score:</span>
                <span className="font-semibold text-primary">${score}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Accuracy:</span>
                <span className="font-semibold">{percentage}%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-secondary/20">
            <CardHeader>
              <CardTitle className="text-xl">Categories Mastered</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="font-medium">Vercel</span>
                <span className="text-sm text-muted-foreground ml-auto">Deployment & Platform</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-accent rounded-full"></div>
                <span className="font-medium">v0</span>
                <span className="text-sm text-muted-foreground ml-auto">AI Code Generation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-secondary rounded-full"></div>
                <span className="font-medium">AI Cloud</span>
                <span className="text-sm text-muted-foreground ml-auto">Cloud AI Services</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* About Section */}
        <Card className="border-2 border-muted/20">
          <CardHeader>
            <CardTitle className="text-2xl text-center">What is the AI Cloud</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-left">
            <div className="text-muted-foreground leading-relaxed">
              <p className="pb-4">
                {
                  "Vercel provides the developer tools and cloud infrastructure to build, scale, and secure a faster, more personalized web."
                }
              </p>

              <p className="px-0 pb-2">The AI Cloud introduces new AI-first tools and primitives, like:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>AI SDK and AI Gateway to integrate with any model or tool</li>
                <li>
                  Fluid compute with Active CPU pricing for high-concurrency, low-latency, cost-efficient AI execution
                </li>

                <li>Tool support, MCP servers, and queues, for autonomous actions and background task execution</li>

                <li>Secure sandboxes to run untrusted agent-generated code</li>
              </ul>

              <p className="pt-4">
                These solutions all work together so teams can build and iterate on anything from conversational AI
                frontends to an army of end-to-end autonomous agents, without infrastructure or additional resource
                overhead.
              </p>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Powered by <span className="text-foreground">▲</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">Learn more at vercel.com and v0.app</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

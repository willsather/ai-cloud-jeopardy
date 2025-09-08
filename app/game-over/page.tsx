"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGameStore } from "@/lib/game-state";

export default function GameOverPage() {
  const { playerName, score } = useGameStore();

  const getScoreMessage = (score: number) => {
    if (score >= 1800)
      return {
        message: "Outstanding! You're a true tech expert!",
        color: "bg-green-600",
      };
    if (score >= 1200)
      return {
        message: "Great job! You know your stuff!",
        color: "bg-primary",
      };
    if (score >= 600)
      return { message: "Good work! Keep learning!", color: "bg-accent" };
    return {
      message: "Nice try! There's always room to grow!",
      color: "bg-secondary",
    };
  };

  const _scoreInfo = getScoreMessage(score);
  const maxPossibleScore = 1800; // 3 categories × 3 questions × (100+200+300)
  const percentage = Math.round((score / maxPossibleScore) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <div className="mx-auto max-w-4xl space-y-8 py-8">
        {/* Header */}
        <div className="space-y-4 text-left text-center md:text-center"></div>

        {/* Score Card */}
        <Card className="border-2 border-primary/20 p-0 shadow-xl">
          <CardHeader className="bg-primary/5 p-5 text-center">
            <CardTitle className="text-3xl text-foreground">
              Final Score
            </CardTitle>
            <CardDescription className="text-foreground text-lg">
              Player: {playerName}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-8 text-center">
            <div className="space-y-4">
              <div className="font-bold text-6xl text-primary">${score}</div>
              <div className="text-muted-foreground text-sm">
                {percentage}% of maximum possible score
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Game Stats */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-2 border-accent/20">
            <CardHeader>
              <CardTitle className="text-xl">Game Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Questions Answered:
                </span>
                <span className="font-semibold">9 / 9</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Categories Completed:
                </span>
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
                <div className="h-3 w-3 rounded-full bg-primary"></div>
                <span className="font-medium">Vercel</span>
                <span className="ml-auto text-muted-foreground text-sm">
                  Deployment & Platform
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-accent"></div>
                <span className="font-medium">v0</span>
                <span className="ml-auto text-muted-foreground text-sm">
                  AI Code Generation
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-secondary"></div>
                <span className="font-medium">AI Cloud</span>
                <span className="ml-auto text-muted-foreground text-sm">
                  Cloud AI Services
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* About Section */}
        <Card className="border-2 border-muted/20">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              What is the AI Cloud
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-left">
            <div className="text-muted-foreground leading-relaxed">
              <p className="pb-4">
                {
                  "Vercel provides the developer tools and cloud infrastructure to build, scale, and secure a faster, more personalized web."
                }
              </p>

              <p className="px-0 pb-2">
                The AI Cloud introduces new AI-first tools and primitives, like:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  AI SDK and AI Gateway to integrate with any model or tool
                </li>
                <li>
                  Fluid compute with Active CPU pricing for high-concurrency,
                  low-latency, cost-efficient AI execution
                </li>

                <li>
                  Tool support, MCP servers, and queues, for autonomous actions
                  and background task execution
                </li>

                <li>Secure sandboxes to run untrusted agent-generated code</li>
              </ul>

              <p className="pt-4">
                These solutions all work together so teams can build and iterate
                on anything from conversational AI frontends to an army of
                end-to-end autonomous agents, without infrastructure or
                additional resource overhead.
              </p>
            </div>

            <div className="border-border border-t pt-4">
              <p className="text-muted-foreground text-sm">
                Powered by <span className="text-foreground">▲</span>
              </p>
              <p className="mt-1 text-muted-foreground text-xs">
                Learn more at vercel.com and v0.app
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

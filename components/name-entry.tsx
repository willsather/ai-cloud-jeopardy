"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useGameStore } from "@/lib/game-state"

export function NameEntry() {
  const [name, setName] = useState("")
  const { setPlayerName, startGame } = useGameStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      setPlayerName(name.trim())
      startGame()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-primary tracking-tight">AI Cloud Jeopardy</h1>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span>powered by</span>
              <span className="font-semibold text-foreground">▲</span>
            </div>
          </div>
        </div>

        {/* Name Entry Card */}
        <Card className="border-2 shadow-lg border-accent">
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  id="player-name"
                  type="text"
                  placeholder="Enter your name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-lg h-12 border-2 focus:border-primary transition-colors"
                  maxLength={50}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full h-12 text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground transition-colors"
                disabled={!name.trim()}
              >
                Start Game
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useGameStore } from "@/lib/game-state"
import { GameBoard } from "@/components/game-board"

export default function QuestionsPage() {
  const { gameStarted } = useGameStore()
  const router = useRouter()

  useEffect(() => {
    // Redirect to home if game hasn't started
    if (!gameStarted) {
      router.push("/")
    }
  }, [gameStarted, router])

  if (!gameStarted) {
    return null // or loading spinner
  }

  return <GameBoard />
}

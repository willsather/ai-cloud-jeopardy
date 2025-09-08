"use client"

import { useEffect } from "react"
import { useGameStore } from "@/lib/game-state"
import { NameEntry } from "@/components/name-entry"
import questionsData from "@/data/questions.json"

export default function Home() {
  const { setGameData } = useGameStore()

  useEffect(() => {
    // Load game data on component mount
    setGameData(questionsData)
  }, [setGameData])

  return <NameEntry />
}

"use client";

import { useEffect } from "react";

import { NameEntry } from "@/components/name-entry";
import questionsData from "@/data/questions.json";
import { useGameStore } from "@/lib/game-state";

export default function Home() {
  const { setGameData } = useGameStore();

  useEffect(() => {
    setGameData(questionsData);
  }, [setGameData]);

  return <NameEntry />;
}

"use client";

import type React from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useGameStore } from "@/lib/game-state";

export function NameEntry() {
  const [name, setName] = useState("");
  const { setPlayerName, startGame } = useGameStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setPlayerName(name.trim());
      startGame();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header Section */}
        <div className="space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="font-bold text-4xl text-primary tracking-tight">
              AI Cloud Jeopardy
            </h1>
            <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
              <span>powered by</span>
              <span className="font-semibold text-foreground">▲</span>
            </div>
          </div>
        </div>

        {/* Name Entry Card */}
        <Card className="border-2 border-accent shadow-lg">
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  id="player-name"
                  type="text"
                  placeholder="Enter your name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 border-2 text-lg transition-colors focus:border-primary"
                  maxLength={50}
                  required
                />
              </div>
              <Button
                type="submit"
                className="h-12 w-full bg-primary font-semibold text-lg text-primary-foreground transition-colors hover:bg-primary/90 hover:text-primary-foreground"
                disabled={!name.trim()}
              >
                Start Game
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

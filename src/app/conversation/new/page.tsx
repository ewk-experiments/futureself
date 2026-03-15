"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppShell } from "@/components/AppShell";
import { createConversation, getProfile } from "@/lib/store";

const suggestions = [
  "Should I leave my job?",
  "What if I moved to a new city?",
  "Am I on the right path?",
  "What would you tell me about love?",
  "Do I take the risk or play it safe?",
  "What do you wish I had done differently?",
];

export default function NewConversation() {
  const [topic, setTopic] = useState("");
  const profile = typeof window !== 'undefined' ? getProfile() : null;

  const start = (title: string) => {
    if (!title.trim()) return;
    const conv = createConversation(title.trim());
    window.location.href = `/futureself/conversation/${conv.id}`;
  };

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-7 h-7 text-primary" />
            </div>
            <h1 className="font-display text-4xl mb-3">What&apos;s on your mind?</h1>
            <p className="text-muted-foreground">
              Your future self at age {(profile?.age || 30) + 30} is listening.
            </p>
          </div>

          <div className="flex gap-3 mb-8">
            <Input
              placeholder="Ask anything..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && start(topic)}
              className="h-12 text-base"
              autoFocus
            />
            <Button onClick={() => start(topic)} className="h-12 px-6 bg-primary text-primary-foreground hover:bg-primary/90">
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Or start with</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => start(s)}
                  className="px-4 py-2 rounded-full border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AppShell>
  );
}

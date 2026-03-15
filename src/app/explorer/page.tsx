"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Sparkles, Plus, Loader2, Briefcase, Heart, Home, TrendingUp, GraduationCap, Globe, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AppShell } from "@/components/AppShell";
import { getUser, getProfile, getLifePaths, saveLifePath, type LifePathNode, type LifePath } from "@/lib/store";
import { generateLifePath } from "@/lib/gemini";
import { v4 as uuidv4 } from "uuid";

const scenarioSuggestions = [
  "What if I quit my job and start a company?",
  "What if I move to another country?",
  "What if I go back to school?",
  "What if I stay exactly where I am?",
  "What if I pursue my creative passion full-time?",
];

const outcomeColors: Record<string, string> = {
  positive: "border-green-500/30 bg-green-500/5",
  neutral: "border-border bg-card/50",
  mixed: "border-yellow-500/30 bg-yellow-500/5",
};

const outcomeBadge: Record<string, string> = {
  positive: "bg-green-500/10 text-green-400 border-green-500/20",
  neutral: "bg-muted text-muted-foreground border-border",
  mixed: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
};

function PathNodeCard({ node, depth = 0 }: { node: LifePathNode; depth?: number }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: depth * 0.1 }}
        className={`relative w-full max-w-xs rounded-xl border p-5 ${outcomeColors[node.outcome] || outcomeColors.neutral} hover:border-primary/40 transition-colors`}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="font-medium text-sm">{node.label}</p>
            <p className="text-xs text-muted-foreground">Age {node.age}</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed mb-3">{node.description}</p>
        <Badge variant="outline" className={`text-xs ${outcomeBadge[node.outcome] || outcomeBadge.neutral}`}>
          {node.outcome === "positive" ? "✦ Positive" : node.outcome === "mixed" ? "◐ Mixed" : "○ Neutral"}
        </Badge>
      </motion.div>

      {node.children && node.children.length > 0 && (
        <>
          <div className="w-px h-8 bg-border" />
          <div className="flex gap-4 flex-wrap justify-center">
            {node.children.map((child) => (
              <div key={child.id} className="flex flex-col items-center">
                <div className="w-px h-6 bg-border" />
                <PathNodeCard node={child} depth={depth + 1} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Explorer() {
  const [paths, setPaths] = useState<LifePath[]>([]);
  const [scenario, setScenario] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activePath, setActivePath] = useState<LifePath | null>(null);

  useEffect(() => {
    const user = getUser();
    if (!user) { window.location.href = "/futureself/auth/signin"; return; }
    const saved = getLifePaths();
    setPaths(saved);
    if (saved.length > 0) setActivePath(saved[0]);
  }, []);

  const generate = async (scenarioText: string) => {
    if (!scenarioText.trim() || loading) return;
    setLoading(true);
    setError("");
    try {
      const result = await generateLifePath(scenarioText.trim());
      // Parse JSON from response (strip any markdown fences)
      const jsonStr = result.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
      const tree: LifePathNode = JSON.parse(jsonStr);
      const path: LifePath = {
        id: uuidv4(),
        userId: getUser()?.id || 'anon',
        scenario: scenarioText.trim(),
        branches: tree,
        createdAt: new Date().toISOString(),
      };
      saveLifePath(path);
      setPaths(prev => [path, ...prev]);
      setActivePath(path);
      setScenario("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to generate path";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl mb-1">Life Path Explorer</h1>
            <p className="text-sm text-muted-foreground">Ask &ldquo;what if&rdquo; and see how your decisions branch into different futures</p>
          </div>
        </div>

        {/* Scenario input */}
        <div className="mb-8">
          <div className="flex gap-3 mb-4">
            <Input
              placeholder="What if I..."
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && generate(scenario)}
              className="h-12 text-base"
              disabled={loading}
            />
            <Button onClick={() => generate(scenario)} disabled={loading || !scenario.trim()} className="h-12 px-6 bg-primary text-primary-foreground hover:bg-primary/90">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              <span className="ml-2 hidden sm:inline">Generate</span>
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {scenarioSuggestions.map((s) => (
              <button
                key={s}
                onClick={() => generate(s)}
                disabled={loading}
                className="px-3 py-1.5 rounded-full border border-border text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-6 text-sm text-destructive bg-destructive/10 rounded-lg px-4 py-2">{error}</div>
        )}

        {/* Path tabs */}
        {paths.length > 1 && (
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {paths.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePath(p)}
                className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap border transition-all ${
                  activePath?.id === p.id
                    ? 'border-primary/30 bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:border-primary/20'
                }`}
              >
                {p.scenario.slice(0, 40)}...
              </button>
            ))}
          </div>
        )}

        {/* Tree visualization */}
        {activePath ? (
          <div className="overflow-x-auto py-4">
            <div className="min-w-[700px] flex justify-center">
              <PathNodeCard node={activePath.branches} />
            </div>
          </div>
        ) : !loading && (
          <div className="text-center py-20">
            <Sparkles className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Generate your first life path to see it visualized here</p>
          </div>
        )}

        {loading && !activePath && (
          <div className="text-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground text-sm">Generating your life paths...</p>
          </div>
        )}

        {/* Legend */}
        {activePath && (
          <div className="mt-8 flex items-center gap-6 justify-center text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm border border-green-500/30 bg-green-500/10" />
              Positive
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm border border-yellow-500/30 bg-yellow-500/10" />
              Mixed
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm border border-border bg-card/50" />
              Neutral
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Sparkles, Briefcase, Heart, Home, TrendingUp, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PathNode {
  id: string;
  label: string;
  age: number;
  icon: React.ElementType;
  description: string;
  outcome: "positive" | "neutral" | "mixed";
  children?: PathNode[];
}

const pathTree: PathNode = {
  id: "now",
  label: "You — Now",
  age: 32,
  icon: Sparkles,
  description: "Current state: Product Designer, considering major career change",
  outcome: "neutral",
  children: [
    {
      id: "startup",
      label: "Start a Company",
      age: 35,
      icon: TrendingUp,
      description: "Leave your job, bootstrap an AI startup. High risk, high reward.",
      outcome: "mixed",
      children: [
        { id: "startup-success", label: "Company Succeeds", age: 40, icon: TrendingUp, description: "Series A funded, 30 employees, fulfilling but stressful. Net worth: $2.4M", outcome: "positive" },
        { id: "startup-pivot", label: "Pivot to Consulting", age: 38, icon: Briefcase, description: "Startup doesn't scale. Pivot to consulting. Less stress, good income.", outcome: "neutral" },
      ],
    },
    {
      id: "stay",
      label: "Stay at Current Job",
      age: 35,
      icon: Briefcase,
      description: "Get promoted to Senior, then Lead. Stable income, growing influence.",
      outcome: "positive",
      children: [
        { id: "stay-lead", label: "Design Director", age: 42, icon: GraduationCap, description: "Director of Design. Managing 12 people. Great benefits but feel creatively stagnant.", outcome: "mixed" },
        { id: "stay-family", label: "Focus on Family", age: 40, icon: Heart, description: "Work-life balance improves. Kids are thriving. Less career ambition but more fulfillment.", outcome: "positive" },
      ],
    },
    {
      id: "move",
      label: "Move Abroad",
      age: 34,
      icon: Home,
      description: "Relocate to Lisbon. Remote work, new culture, personal growth.",
      outcome: "positive",
      children: [
        { id: "move-settle", label: "Build a Life Abroad", age: 40, icon: Heart, description: "Married locally, thriving creative community. Lower income but higher happiness.", outcome: "positive" },
        { id: "move-return", label: "Return Home", age: 37, icon: Home, description: "Miss family and friends. Return with new perspective and international network.", outcome: "neutral" },
      ],
    },
  ],
};

const outcomeColors = {
  positive: "border-green-500/30 bg-green-500/5",
  neutral: "border-border bg-card/50",
  mixed: "border-yellow-500/30 bg-yellow-500/5",
};

const outcomeBadge = {
  positive: "bg-green-500/10 text-green-400 border-green-500/20",
  neutral: "bg-muted text-muted-foreground border-border",
  mixed: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
};

function PathNodeCard({ node, depth = 0 }: { node: PathNode; depth?: number }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: depth * 0.1 }}
        className={`relative w-full max-w-xs rounded-xl border p-5 ${outcomeColors[node.outcome]} hover:border-primary/40 transition-colors cursor-pointer`}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <node.icon className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="font-medium text-sm">{node.label}</p>
            <p className="text-xs text-muted-foreground">Age {node.age}</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed mb-3">{node.description}</p>
        <Badge variant="outline" className={`text-xs ${outcomeBadge[node.outcome]}`}>
          {node.outcome === "positive" ? "✦ Positive" : node.outcome === "mixed" ? "◐ Mixed" : "○ Neutral"}
        </Badge>
      </motion.div>

      {node.children && node.children.length > 0 && (
        <>
          {/* Connector line */}
          <div className="w-px h-8 bg-border" />
          {/* Children row */}
          <div className="flex gap-6 flex-wrap justify-center">
            {node.children.map((child, i) => (
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
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="font-semibold">Multi-Path Explorer</h1>
              <p className="text-xs text-muted-foreground">Visualize how your decisions branch into different futures</p>
            </div>
          </div>
          <Badge variant="outline" className="border-primary/30 text-primary text-xs">3 paths · 8 outcomes</Badge>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 overflow-x-auto">
        <div className="min-w-[800px] flex justify-center">
          <PathNodeCard node={pathTree} />
        </div>
      </div>

      {/* Legend */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="flex items-center gap-6 justify-center text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm border border-green-500/30 bg-green-500/10" />
            Positive outcome
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm border border-yellow-500/30 bg-yellow-500/10" />
            Mixed outcome
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm border border-border bg-card/50" />
            Neutral
          </div>
        </div>
      </div>
    </div>
  );
}

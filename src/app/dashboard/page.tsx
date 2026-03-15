"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Plus, MessageSquare, Clock, TrendingUp, GitBranch, Settings, Sparkles, ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const conversations = [
  { id: "1", title: "Should I leave my job?", date: "2 hours ago", messages: 24, futureAge: 45, mood: "Encouraging" },
  { id: "2", title: "Moving to a new city", date: "Yesterday", messages: 18, futureAge: 55, mood: "Cautious" },
  { id: "3", title: "Starting a family", date: "3 days ago", messages: 31, futureAge: 65, mood: "Warm" },
  { id: "4", title: "Investment decisions", date: "1 week ago", messages: 12, futureAge: 50, mood: "Analytical" },
];

const stats = [
  { label: "Conversations", value: "12", icon: MessageSquare },
  { label: "Paths Explored", value: "5", icon: GitBranch },
  { label: "Hours Reflected", value: "3.2", icon: Clock },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-64 lg:flex-col border-r border-border bg-card/50">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">FutureSelf</span>
          </Link>
          <nav className="space-y-1">
            {[
              { label: "Dashboard", href: "/dashboard", icon: TrendingUp, active: true },
              { label: "Conversations", href: "/conversation", icon: MessageSquare },
              { label: "Path Explorer", href: "/explorer", icon: GitBranch },
              { label: "Settings", href: "/settings", icon: Settings },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  item.active ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-6 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">EK</div>
            <div>
              <p className="text-sm font-medium">Eli King</p>
              <p className="text-xs text-muted-foreground">Pro Plan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="lg:hidden border-b border-border px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-semibold">FutureSelf</span>
        </Link>
        <Link href="/settings"><Settings className="w-5 h-5 text-muted-foreground" /></Link>
      </div>

      {/* Main */}
      <main className="lg:pl-64">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
            {/* Header */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
              <div>
                <h1 className="text-3xl font-bold">Welcome back, Eli</h1>
                <p className="text-muted-foreground mt-1">Your future self has been thinking about your questions.</p>
              </div>
              <Link href="/conversation/new">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" /> New Conversation
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4 mb-10">
              {stats.map((s) => (
                <Card key={s.label} className="bg-card/50 border-border">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <s.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{s.value}</p>
                        <p className="text-xs text-muted-foreground">{s.label}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>

            {/* Future self card */}
            <motion.div variants={fadeUp}>
              <Card className="bg-gradient-to-br from-primary/5 via-card to-primary/5 border-primary/20 mb-10">
                <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8">
                  <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center shrink-0">
                    <span className="text-3xl">👤</span>
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-semibold mb-1">Your Future Self — Age 55</h3>
                    <p className="text-muted-foreground text-sm mb-4">&ldquo;The decisions you&apos;re making right now are more important than you realize. I&apos;m here when you&apos;re ready to talk.&rdquo;</p>
                    <Link href="/conversation/new">
                      <Button variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary/10">
                        Start Conversation <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Conversations */}
            <motion.div variants={fadeUp}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-semibold">Recent Conversations</h2>
                <Link href="/conversation" className="text-sm text-primary hover:underline">View all</Link>
              </div>
              <div className="space-y-3">
                {conversations.map((c) => (
                  <Link key={c.id} href={`/conversation/${c.id}`}>
                    <Card className="bg-card/50 border-border hover:border-primary/30 transition-all cursor-pointer group">
                      <CardContent className="p-5 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">{c.futureAge}</div>
                          <div>
                            <p className="font-medium group-hover:text-primary transition-colors">{c.title}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-2">
                              <Calendar className="w-3 h-3" /> {c.date} · {c.messages} messages
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-primary/20 text-primary text-xs">{c.mood}</Badge>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Plus, MessageSquare, Clock, GitBranch, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AppShell } from "@/components/AppShell";
import { getUser, getProfile, getConversations, getMessages, getLifePaths, type Conversation } from "@/lib/store";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function Dashboard() {
  const [profile, setProfile] = useState<ReturnType<typeof getProfile>>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [totalMessages, setTotalMessages] = useState(0);
  const [pathCount, setPathCount] = useState(0);

  useEffect(() => {
    const user = getUser();
    if (!user) { window.location.href = "/futureself/auth/signin"; return; }
    const p = getProfile();
    if (!p?.onboardingComplete) { window.location.href = "/futureself/onboarding"; return; }
    setProfile(p);
    const convs = getConversations();
    setConversations(convs);
    let msgCount = 0;
    convs.forEach(c => { msgCount += getMessages(c.id).length; });
    setTotalMessages(msgCount);
    setPathCount(getLifePaths().length);
  }, []);

  if (!profile) return null;

  const futureAge = (profile.age || 30) + 30;

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto px-6 py-10">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Welcome back</p>
              <h1 className="font-display text-4xl tracking-tight">{profile.name}</h1>
            </div>
            <Link href="/conversation/new">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" /> New Conversation
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4 mb-10">
            {[
              { label: "Conversations", value: conversations.length.toString(), icon: MessageSquare },
              { label: "Messages", value: totalMessages.toString(), icon: Clock },
              { label: "Life Paths", value: pathCount.toString(), icon: GitBranch },
            ].map((s) => (
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
                  <span className="font-display text-3xl text-primary">{futureAge}</span>
                </div>
                <div className="text-center md:text-left flex-1">
                  <h3 className="font-display text-2xl mb-1">Your Future Self — Age {futureAge}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    &ldquo;I&apos;ve been thinking about what you told me — about {profile.goals ? profile.goals.slice(0, 60) + '...' : 'your goals'}. Let&apos;s talk.&rdquo;
                  </p>
                  <Link href="/conversation/new">
                    <Button variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary/10">
                      Start Conversation <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent conversations */}
          {conversations.length > 0 && (
            <motion.div variants={fadeUp}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display text-2xl">Recent Conversations</h2>
                <Link href="/conversation" className="text-sm text-primary hover:underline">View all</Link>
              </div>
              <div className="space-y-3">
                {conversations.slice(0, 5).map((c) => {
                  const msgs = getMessages(c.id);
                  return (
                    <Link key={c.id} href={`/conversation/${c.id}`}>
                      <Card className="bg-card/50 border-border hover:border-primary/30 transition-all cursor-pointer group">
                        <CardContent className="p-5 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <MessageSquare className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium group-hover:text-primary transition-colors">{c.title}</p>
                              <p className="text-xs text-muted-foreground">{timeAgo(c.updatedAt)} · {msgs.length} messages</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Empty state */}
          {conversations.length === 0 && (
            <motion.div variants={fadeUp} className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl mb-2">No conversations yet</h3>
              <p className="text-muted-foreground text-sm mb-6">Start your first conversation with your future self</p>
              <Link href="/conversation/new">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" /> Start First Conversation
                </Button>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AppShell>
  );
}

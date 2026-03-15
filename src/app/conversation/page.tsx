"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Plus, MessageSquare, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AppShell } from "@/components/AppShell";
import { getUser, getConversations, getMessages, type Conversation } from "@/lib/store";

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function ConversationList() {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const user = getUser();
    if (!user) { window.location.href = "/futureself/auth/signin"; return; }
    setConversations(getConversations());
  }, []);

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl">Conversations</h1>
          <Link href="/conversation/new">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" /> New
            </Button>
          </Link>
        </div>

        {conversations.length === 0 ? (
          <div className="text-center py-20">
            <MessageSquare className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No conversations yet</p>
            <Link href="/conversation/new">
              <Button variant="outline">Start your first conversation</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {conversations.map((c, i) => {
              const msgs = getMessages(c.id);
              const lastMsg = msgs[msgs.length - 1];
              return (
                <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link href={`/conversation/${c.id}`}>
                    <Card className="bg-card/50 border-border hover:border-primary/30 transition-all cursor-pointer group">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium group-hover:text-primary transition-colors mb-1">{c.title}</p>
                            {lastMsg && (
                              <p className="text-sm text-muted-foreground truncate">
                                {lastMsg.role === 'assistant' ? '🔮 ' : ''}{lastMsg.content.slice(0, 80)}
                              </p>
                            )}
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-xs text-muted-foreground">{timeAgo(c.updatedAt)}</p>
                            <p className="text-xs text-muted-foreground mt-1">{msgs.length} msgs</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </AppShell>
  );
}

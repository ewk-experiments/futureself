"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Send, Sparkles, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  role: "user" | "future";
  content: string;
  timestamp: string;
}

const initialMessages: Message[] = [
  { id: "1", role: "future", content: "Hello. It's strange to look at you and remember being exactly where you are right now. I know what you're going through — the uncertainty, the excitement, the fear. I've been there. What's on your mind?", timestamp: "2:30 PM" },
];

const futureResponses = [
  "I remember that feeling well. When I was your age, I spent too long weighing the perfect option instead of choosing a good one and committing. The truth is, most decisions are reversible. The ones that aren't? You'll know them when you see them.",
  "That's a question I wish someone had asked me to think harder about. Here's what I can tell you from where I stand — the career change was worth it, but not for the reasons I expected. It wasn't about the money or the title. It was about finally doing work that felt like mine.",
  "You're overthinking this. I say that with love, because I know exactly how your brain works. The data you're looking for doesn't exist yet. You have to create it by making a choice and living with it.",
  "Something I didn't understand at your age: the people in your life matter more than the path you choose. Almost any path can lead somewhere meaningful if you're surrounded by the right people.",
  "I'm proud of you for even asking these questions. Most people sleepwalk through the big decisions. The fact that you're here, talking to me — that tells me you're going to be fine.",
];

export default function ConversationPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const responseIndex = useRef(0);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const futureMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "future",
        content: futureResponses[responseIndex.current % futureResponses.length],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      responseIndex.current++;
      setMessages((m) => [...m, futureMsg]);
      setIsTyping(false);
    }, 1500 + Math.random() * 2000);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border px-4 sm:px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                <span className="text-lg">👤</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-background" />
            </div>
            <div>
              <p className="font-medium text-sm">You — Age 55</p>
              <p className="text-xs text-green-500">Online</p>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-4 sm:px-6" ref={scrollRef}>
        <div className="max-w-3xl mx-auto py-6 space-y-6">
          {/* Intro */}
          <div className="text-center py-8">
            <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              This is you, 23 years from now. Based on your current trajectory, life context, and the choices ahead of you.
            </p>
          </div>

          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[85%] sm:max-w-[70%] ${msg.role === "user" ? "order-1" : ""}`}>
                  {msg.role === "future" && (
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xs">👤</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Future You · {msg.timestamp}</span>
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-card border border-border rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>
                  {msg.role === "user" && (
                    <p className="text-xs text-muted-foreground text-right mt-1">{msg.timestamp}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {isTyping && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
              <div className="max-w-[70%]">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs">👤</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Future You is typing...</span>
                </div>
                <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-muted-foreground/40"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t border-border px-4 sm:px-6 py-4 shrink-0">
        <div className="max-w-3xl mx-auto flex gap-3">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Ask your future self anything..."
            className="min-h-[44px] max-h-[120px] resize-none"
            rows={1}
          />
          <Button onClick={sendMessage} disabled={!input.trim()} size="icon" className="shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-11 w-11">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

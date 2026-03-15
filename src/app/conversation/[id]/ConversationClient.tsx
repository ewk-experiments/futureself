"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUser, getConversations, getMessages, addMessage, updateConversation, getProfile, type Message } from "@/lib/store";
import { chat, type ChatMessage } from "@/lib/gemini";

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function ConversationChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [convTitle, setConvTitle] = useState("");
  const [convId, setConvId] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const user = getUser();
    if (!user) { window.location.href = "/futureself/auth/signin"; return; }
    
    // Extract conversation ID from URL
    const pathParts = window.location.pathname.split("/");
    const id = pathParts[pathParts.length - 1];
    setConvId(id);
    
    const convs = getConversations();
    const conv = convs.find(c => c.id === id);
    if (conv) {
      setConvTitle(conv.title);
      setMessages(getMessages(id));
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading || !convId) return;
    const userText = input.trim();
    setInput("");
    setError("");

    // Add user message
    const userMsg = addMessage(convId, "user", userText);
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);

    // Update conversation title if it's the first message
    if (updatedMessages.length === 1) {
      updateConversation(convId, { title: userText.slice(0, 60) });
      setConvTitle(userText.slice(0, 60));
    }

    setLoading(true);
    try {
      // Build chat history for Gemini
      const history: ChatMessage[] = messages.map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));

      const response = await chat(history, userText);
      const assistantMsg = addMessage(convId, "assistant", response);
      setMessages(prev => [...prev, assistantMsg]);
      updateConversation(convId, {});
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Something went wrong";
      setError(errorMsg);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const profile = typeof window !== 'undefined' ? getProfile() : null;
  const futureAge = (profile?.age || 30) + 30;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border px-4 py-3 flex items-center gap-3 bg-background/80 backdrop-blur-xl sticky top-0 z-10">
        <Link href="/conversation">
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="font-medium text-sm truncate">{convTitle || "New Conversation"}</p>
            <p className="text-xs text-muted-foreground">Future Self · Age {futureAge}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Welcome message if no messages */}
          {messages.length === 0 && !loading && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                <span className="font-display text-xl text-primary">{futureAge}</span>
              </div>
              <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                I&apos;m you, {futureAge - (profile?.age || 30)} years from now. Ask me anything — I&apos;ve lived through what you&apos;re about to face.
              </p>
            </motion.div>
          )}

          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${msg.role === 'user' ? 'order-1' : ''}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-md'
                        : 'bg-card border border-border rounded-bl-md'
                    }`}
                  >
                    {msg.content.split('\n').map((line, j) => (
                      <p key={j} className={j > 0 ? 'mt-2' : ''}>{line}</p>
                    ))}
                  </div>
                  <p className={`text-xs text-muted-foreground mt-1 ${msg.role === 'user' ? 'text-right' : ''}`}>
                    {formatTime(msg.createdAt)}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-4 py-2 inline-block">{error}</p>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-border px-4 py-3 bg-background/80 backdrop-blur-xl">
        <div className="max-w-2xl mx-auto flex gap-3">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Talk to your future self..."
            className="flex-1 resize-none bg-card border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 min-h-[44px] max-h-[120px]"
            rows={1}
            disabled={loading}
            autoFocus
          />
          <Button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="bg-primary text-primary-foreground hover:bg-primary/90 h-[44px] w-[44px] p-0 shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

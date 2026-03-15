"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { signIn, getUser, getProfile } from "@/lib/store";

export default function SignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = () => {
    if (!name.trim() || !email.trim()) {
      setError("Please enter your name and email.");
      return;
    }
    signIn(name.trim(), email.trim());
    const profile = getProfile();
    if (profile?.onboardingComplete) {
      window.location.href = "/futureself/dashboard";
    } else {
      window.location.href = "/futureself/onboarding";
    }
  };

  // Check if already signed in
  if (typeof window !== 'undefined') {
    const user = getUser();
    if (user) {
      const profile = getProfile();
      if (profile?.onboardingComplete) {
        window.location.href = "/futureself/dashboard";
      } else {
        window.location.href = "/futureself/onboarding";
      }
      return null;
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
        <Card className="bg-card/80 backdrop-blur-xl border-border">
          <CardContent className="p-8">
            <div className="flex items-center justify-center mb-8">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-display text-2xl tracking-tight">FutureSelf</span>
              </Link>
            </div>
            <h1 className="font-display text-3xl text-center mb-2">Meet your future</h1>
            <p className="text-muted-foreground text-center mb-8 text-sm">Enter your details to begin the journey</p>
            
            <div className="space-y-4 mb-6">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5"
                  onKeyDown={(e) => e.key === 'Enter' && handleSignIn()}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5"
                  onKeyDown={(e) => e.key === 'Enter' && handleSignIn()}
                />
              </div>
            </div>

            {error && <p className="text-sm text-destructive mb-4">{error}</p>}

            <Button
              className="w-full h-12 text-base bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleSignIn}
            >
              Get Started
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-6">
              Your data stays in your browser. Nothing is sent to any server.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

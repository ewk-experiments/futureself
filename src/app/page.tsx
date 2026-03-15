"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, Sparkles, Clock, GitBranch, Shield, Star, ChevronRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const testimonials = [
  { name: "Sarah Chen", role: "Startup Founder", text: "I was about to take a $2M funding deal. FutureSelf showed me the path where I bootstrapped instead. Best decision of my life.", avatar: "SC" },
  { name: "Marcus Rivera", role: "Software Engineer", text: "Talking to my 60-year-old self about whether to move abroad was surreal. The conversation felt genuinely real.", avatar: "MR" },
  { name: "Aisha Patel", role: "Medical Student", text: "I was torn between specialties. Seeing how each path unfolds over 20 years made the choice clear.", avatar: "AP" },
  { name: "James Okonkwo", role: "Creative Director", text: "The multi-path explorer is addictive. I've mapped out 5 different life scenarios. It's like a cheat code for decisions.", avatar: "JO" },
];

const features = [
  { icon: Sparkles, title: "Photorealistic Aging", desc: "Advanced AI generates your actual future appearance based on your photos, genetics, and lifestyle choices." },
  { icon: Clock, title: "Temporal Conversations", desc: "Chat with versions of yourself at 5, 10, 20, or 40 years in the future. Each one remembers your context." },
  { icon: GitBranch, title: "Multi-Path Explorer", desc: "Visualize how different decisions branch into different futures. Compare outcomes side by side." },
  { icon: Shield, title: "Private & Encrypted", desc: "Your conversations and photos are end-to-end encrypted. We never train on your data." },
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg">FutureSelf</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</Link>
            <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
            <Link href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Testimonials</Link>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link href="/auth/signin">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link href="/auth/signin">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Get Started <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl px-6 py-4 space-y-3">
            <Link href="#features" className="block text-sm text-muted-foreground">Features</Link>
            <Link href="/pricing" className="block text-sm text-muted-foreground">Pricing</Link>
            <Link href="/auth/signin"><Button className="w-full mt-2" size="sm">Get Started</Button></Link>
          </motion.div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-5xl mx-auto text-center">
          <motion.div variants={fadeUp}>
            <Badge variant="outline" className="mb-6 border-primary/30 text-primary">
              <Sparkles className="w-3 h-3 mr-1" /> Now in public beta
            </Badge>
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            Talk to your
            <span className="text-primary"> future self</span>
            <br />before you decide.
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            A photorealistic AI generates your future self — aged, wise, and shaped by the choices you&apos;re considering. Have the conversation before you commit.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signin">
              <Button size="lg" className="text-base px-8 bg-primary text-primary-foreground hover:bg-primary/90">
                Meet Your Future Self <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-base px-8 group">
              <Play className="w-4 h-4 mr-2 group-hover:text-primary transition-colors" /> Watch Demo
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Video placeholder */}
      <section className="px-6 pb-24">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-5xl mx-auto">
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-border bg-card">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-primary/30 transition-colors">
                <Play className="w-8 h-8 text-primary ml-1" />
              </div>
            </div>
            <div className="absolute bottom-6 left-6">
              <p className="text-sm text-muted-foreground">Watch: A 32-year-old meets their 55-year-old self</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 pb-24">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">The future is already here.</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">Advanced AI that doesn&apos;t just predict — it embodies who you could become.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Card className="bg-card/50 border-border hover:border-primary/30 transition-colors h-full">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                      <f.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* How it works */}
      <section className="px-6 pb-24">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-4xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Three steps to meet yourself.</h2>
          </motion.div>
          {[
            { step: "01", title: "Upload your photos", desc: "We need a few clear photos of your face. Our AI analyzes bone structure, skin patterns, and aging markers." },
            { step: "02", title: "Share your context", desc: "Tell us about your life — career, relationships, goals, health. This shapes how your future self thinks and speaks." },
            { step: "03", title: "Start the conversation", desc: "Your future self appears. Ask anything. Explore different timelines. Make decisions with wisdom you haven't earned yet." },
          ].map((item, i) => (
            <motion.div key={i} variants={fadeUp} className="flex gap-6 md:gap-10 mb-12 last:mb-0">
              <div className="text-5xl md:text-6xl font-bold text-primary/20">{item.step}</div>
              <div className="pt-2">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="px-6 pb-24">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Life-changing conversations.</h2>
            <p className="text-muted-foreground text-lg">What our users say after talking to their future selves.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Card className="bg-card/50 border-border h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-foreground/90 leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">{t.avatar}</div>
                      <div>
                        <p className="font-medium text-sm">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto text-center">
          <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-primary/5 p-12 md:p-20">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Your future self is waiting.</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">Don&apos;t make your next big decision alone. Get wisdom from the person who knows you best — you.</p>
            <Link href="/auth/signin">
              <Button size="lg" className="text-base px-8 bg-primary text-primary-foreground hover:bg-primary/90">
                Start Free <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <p className="text-xs text-muted-foreground mt-4">Free plan includes 3 conversations per month.</p>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <span className="font-semibold">FutureSelf</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">Talk to a photorealistic AI version of your future self before making major life decisions.</p>
          </div>
          <div className="flex gap-12">
            <div className="space-y-2">
              <p className="text-sm font-medium">Product</p>
              <Link href="#features" className="block text-sm text-muted-foreground hover:text-foreground">Features</Link>
              <Link href="/pricing" className="block text-sm text-muted-foreground hover:text-foreground">Pricing</Link>
              <Link href="/dashboard" className="block text-sm text-muted-foreground hover:text-foreground">Dashboard</Link>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Legal</p>
              <Link href="#" className="block text-sm text-muted-foreground hover:text-foreground">Privacy</Link>
              <Link href="#" className="block text-sm text-muted-foreground hover:text-foreground">Terms</Link>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground">© 2026 FutureSelf, Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

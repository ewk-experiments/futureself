"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Try talking to your future self",
    features: [
      "3 conversations per month",
      "1 future age (10 years)",
      "Basic aging simulation",
      "Text-only conversations",
    ],
    notIncluded: [
      "Multi-path explorer",
      "Voice cloning",
      "Priority generation",
      "Custom age ranges",
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For serious life decisions",
    features: [
      "Unlimited conversations",
      "All future ages (5-50 years)",
      "Photorealistic aging",
      "Voice cloning",
      "Multi-path explorer",
      "Priority generation",
      "Custom scenarios",
      "Export conversations",
    ],
    notIncluded: [],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Lifetime",
    price: "$299",
    period: "one-time",
    description: "Your future self, forever",
    features: [
      "Everything in Pro",
      "Lifetime access",
      "Early access to new features",
      "Family sharing (up to 3)",
      "API access",
      "Priority support",
    ],
    notIncluded: [],
    cta: "Get Lifetime Access",
    popular: false,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b border-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">FutureSelf</span>
          </Link>
          <Link href="/auth/signin">
            <Button size="sm" variant="ghost">Sign in</Button>
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-20">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          <motion.div variants={fadeUp} className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">Simple pricing</Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Invest in clarity.</h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">The cost of a bad decision is always more than the cost of a good conversation.</p>
          </motion.div>

          <motion.div variants={fadeUp} className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative bg-card/50 border-border ${plan.popular ? "border-primary/40 bg-gradient-to-b from-primary/5 to-transparent" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                  </div>
                )}
                <CardContent className="p-8">
                  <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-1">{plan.period}</span>
                  </div>
                  <Link href="/auth/signin">
                    <Button
                      className={`w-full mb-6 ${plan.popular ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.cta} <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                  <ul className="space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                    {plan.notIncluded.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground/50">
                        <span className="w-4 h-4 mt-0.5 shrink-0 text-center">—</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="text-center mt-12">
            <p className="text-sm text-muted-foreground">All plans include end-to-end encryption and a 14-day money-back guarantee.</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

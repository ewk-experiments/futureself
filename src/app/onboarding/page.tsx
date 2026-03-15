"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Upload, Camera, Mic, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

const steps = ["Photos", "Life Context", "Voice", "Ready"];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [photos, setPhotos] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    age: "",
    career: "",
    relationship: "",
    goals: "",
    health: "",
  });

  const progress = ((step + 1) / steps.length) * 100;

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const addPhoto = () => {
    setPhotos((p) => [...p, `photo-${p.length + 1}`]);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-primary/5 pointer-events-none" />
      
      {/* Header */}
      <div className="max-w-2xl mx-auto px-6 pt-8">
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">FutureSelf</span>
          </Link>
          <span className="text-sm text-muted-foreground">Step {step + 1} of {steps.length}</span>
        </div>
        <Progress value={progress} className="h-1 mb-2" />
        <div className="flex justify-between mb-12">
          {steps.map((s, i) => (
            <span key={s} className={`text-xs ${i <= step ? "text-primary" : "text-muted-foreground"}`}>{s}</span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 pb-24">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="photos" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <h1 className="text-3xl font-bold mb-3">Upload your photos</h1>
              <p className="text-muted-foreground mb-8">We need 3-5 clear photos of your face from different angles. This helps our AI generate your photorealistic future appearance.</p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[0, 1, 2, 3, 4].map((i) => (
                  <button
                    key={i}
                    onClick={addPhoto}
                    className={`aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors ${
                      photos[i] ? "border-primary bg-primary/10" : "border-border hover:border-primary/50 bg-card/50"
                    }`}
                  >
                    {photos[i] ? (
                      <Check className="w-6 h-6 text-primary" />
                    ) : (
                      <>
                        <Camera className="w-5 h-5 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Add</span>
                      </>
                    )}
                  </button>
                ))}
              </div>
              <Card className="bg-card/50 border-border">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <Upload className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium mb-1">Photo tips</p>
                      <p className="text-xs text-muted-foreground">Good lighting, no sunglasses, face clearly visible. Front, left profile, and right profile work best.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="context" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <h1 className="text-3xl font-bold mb-3">Tell us about your life</h1>
              <p className="text-muted-foreground mb-8">This context shapes how your future self thinks, speaks, and advises you.</p>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" type="number" placeholder="28" className="mt-2" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="career">Career</Label>
                  <Input id="career" placeholder="Product Designer at a tech company" className="mt-2" value={formData.career} onChange={(e) => setFormData({ ...formData, career: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="relationship">Relationship Status</Label>
                  <Select value={formData.relationship || undefined} onValueChange={(v: string | null) => setFormData({ ...formData, relationship: v || "" })}>
                    <SelectTrigger className="mt-2"><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="relationship">In a Relationship</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="goals">What&apos;s the big decision you&apos;re facing?</Label>
                  <Textarea id="goals" placeholder="I'm considering leaving my job to start a company..." className="mt-2 min-h-[100px]" value={formData.goals} onChange={(e) => setFormData({ ...formData, goals: e.target.value })} />
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="voice" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <h1 className="text-3xl font-bold mb-3">Record your voice</h1>
              <p className="text-muted-foreground mb-8">Your future self will speak in an aged version of your own voice. Record a 30-second sample.</p>
              <div className="flex flex-col items-center py-12">
                <button className="w-32 h-32 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center hover:bg-primary/20 transition-colors mb-6">
                  <Mic className="w-10 h-10 text-primary" />
                </button>
                <p className="text-sm text-muted-foreground mb-2">Tap to record</p>
                <p className="text-xs text-muted-foreground">Read aloud: &ldquo;I believe the best decisions come from understanding who I want to become.&rdquo;</p>
              </div>
              <Card className="bg-card/50 border-border">
                <CardContent className="p-5">
                  <p className="text-xs text-muted-foreground">💡 You can skip this step and use a generated voice instead. You can always add your voice later in Settings.</p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="ready" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <div className="text-center py-12">
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, type: "spring" }} className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mx-auto mb-8">
                  <Sparkles className="w-10 h-10 text-primary" />
                </motion.div>
                <h1 className="text-3xl font-bold mb-3">Your future self is being generated</h1>
                <p className="text-muted-foreground mb-2 max-w-md mx-auto">We&apos;re analyzing your photos and life context to create a photorealistic version of you at different ages.</p>
                <p className="text-sm text-primary mb-8">This usually takes about 2 minutes.</p>
                <Link href="/dashboard">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Go to Dashboard <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        {step < 3 && (
          <div className="flex justify-between mt-12">
            <Button variant="ghost" onClick={prevStep} disabled={step === 0}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            <Button onClick={nextStep} className="bg-primary text-primary-foreground hover:bg-primary/90">
              {step === 2 ? "Generate My Future Self" : "Continue"} <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

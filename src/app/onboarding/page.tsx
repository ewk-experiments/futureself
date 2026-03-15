"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Upload, Camera, Sparkles, Check, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { getUser, saveProfile, getProfile, savePhoto, getPhoto, setApiKey, getApiKey } from "@/lib/store";

const steps = ["About You", "Your Life", "Your Photo", "API Key", "Ready"];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [apiKeyInput, setApiKeyInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    career: "",
    relationship: "",
    goals: "",
    fears: "",
    hopes: "",
  });

  useEffect(() => {
    const user = getUser();
    if (!user) { window.location.href = "/futureself/auth/signin"; return; }
    const profile = getProfile();
    setFormData(f => ({
      ...f,
      name: profile?.name || user.name || "",
      age: profile?.age?.toString() || "",
      career: profile?.career || "",
      goals: profile?.goals || "",
      fears: profile?.fears || "",
      hopes: profile?.hopes || "",
    }));
    const photo = getPhoto("selfie");
    if (photo) setPhotoPreview(photo);
    setApiKeyInput(getApiKey());
  }, []);

  const progress = ((step + 1) / steps.length) * 100;
  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const handlePhotoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setPhotoPreview(dataUrl);
      savePhoto("selfie", dataUrl);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleFinish = () => {
    saveProfile({
      name: formData.name,
      age: parseInt(formData.age) || 30,
      career: formData.career,
      goals: formData.goals,
      fears: formData.fears,
      hopes: formData.hopes,
      relationship: formData.relationship,
      photoUrl: photoPreview || undefined,
      onboardingComplete: true,
    });
    if (apiKeyInput.trim()) setApiKey(apiKeyInput.trim());
    window.location.href = "/futureself/dashboard";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-primary/5 pointer-events-none" />
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
      
      <div className="max-w-2xl mx-auto px-6 pt-8">
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg">FutureSelf</span>
          </Link>
          <span className="text-sm text-muted-foreground">Step {step + 1} of {steps.length}</span>
        </div>
        <Progress value={progress} className="h-1 mb-2" />
        <div className="flex justify-between mb-12">
          {steps.map((s, i) => (
            <span key={s} className={`text-xs transition-colors ${i <= step ? "text-primary" : "text-muted-foreground"}`}>{s}</span>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 pb-24">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="about" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <h1 className="font-display text-4xl mb-3">Tell us about yourself</h1>
              <p className="text-muted-foreground mb-8">This shapes who your future self becomes.</p>
              <div className="space-y-5">
                <div>
                  <Label htmlFor="name">What should we call you?</Label>
                  <Input id="name" placeholder="Your name" className="mt-2" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="age">How old are you?</Label>
                  <Input id="age" type="number" placeholder="28" className="mt-2" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="career">What do you do?</Label>
                  <Input id="career" placeholder="Product Designer at a tech company" className="mt-2" value={formData.career} onChange={(e) => setFormData({ ...formData, career: e.target.value })} />
                </div>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="life" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <h1 className="font-display text-4xl mb-3">What&apos;s on your mind?</h1>
              <p className="text-muted-foreground mb-8">Your future self will use this context to give you real, personal advice.</p>
              <div className="space-y-5">
                <div>
                  <Label htmlFor="goals">What&apos;s the big decision or goal you&apos;re facing?</Label>
                  <Textarea id="goals" placeholder="I'm considering leaving my job to start a company..." className="mt-2 min-h-[100px]" value={formData.goals} onChange={(e) => setFormData({ ...formData, goals: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="fears">What&apos;s your biggest fear right now?</Label>
                  <Textarea id="fears" placeholder="That I'll regret not taking the risk..." className="mt-2 min-h-[80px]" value={formData.fears} onChange={(e) => setFormData({ ...formData, fears: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="hopes">What do you hope for most?</Label>
                  <Textarea id="hopes" placeholder="To build something meaningful and live without regret" className="mt-2 min-h-[80px]" value={formData.hopes} onChange={(e) => setFormData({ ...formData, hopes: e.target.value })} />
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="photo" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <h1 className="font-display text-4xl mb-3">Upload a photo</h1>
              <p className="text-muted-foreground mb-8">We&apos;ll use AI to describe how you might look in the future. (Optional)</p>
              
              <div className="flex flex-col items-center">
                {photoPreview ? (
                  <div className="relative mb-6">
                    <img src={photoPreview} alt="Your photo" className="w-48 h-48 rounded-2xl object-cover border-2 border-primary/30" />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg"
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-48 h-48 rounded-2xl border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center gap-3 transition-colors mb-6"
                  >
                    <Upload className="w-8 h-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Click to upload</span>
                  </button>
                )}
                <p className="text-xs text-muted-foreground text-center max-w-xs">
                  Your photo stays in your browser&apos;s local storage. It&apos;s never uploaded to any server.
                </p>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="apikey" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <h1 className="font-display text-4xl mb-3">Connect to AI</h1>
              <p className="text-muted-foreground mb-8">FutureSelf uses Google Gemini to power conversations. Enter your API key to get started.</p>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="apikey" className="flex items-center gap-2">
                    <Key className="w-4 h-4" /> Gemini API Key
                  </Label>
                  <Input
                    id="apikey"
                    type="password"
                    placeholder="AIza..."
                    className="mt-2 font-mono"
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                  />
                </div>
                <Card className="bg-card/50 border-border">
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground">
                      Get a free API key from{" "}
                      <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        Google AI Studio
                      </a>
                      . Your key stays in your browser and is only used to call Gemini directly.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="ready" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <div className="text-center py-12">
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, type: "spring" }} className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mx-auto mb-8">
                  <Check className="w-10 h-10 text-primary" />
                </motion.div>
                <h1 className="font-display text-4xl mb-3">You&apos;re all set</h1>
                <p className="text-muted-foreground mb-2 max-w-md mx-auto">
                  Your future self is ready to talk. They know about your life, your goals, and your fears.
                </p>
                <p className="text-sm text-primary mb-8">Time to have a conversation that matters.</p>
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleFinish}>
                  Meet Your Future Self <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {step < 4 && (
          <div className="flex justify-between mt-12">
            <Button variant="ghost" onClick={prevStep} disabled={step === 0}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            <Button onClick={nextStep} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Continue <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

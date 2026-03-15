"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Key, Moon, Shield, Download, Trash2, LogOut, Bell, Save, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppShell } from "@/components/AppShell";
import { getUser, getProfile, saveProfile, getApiKey, setApiKey, signOut } from "@/lib/store";

export default function Settings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [career, setCareer] = useState("");
  const [goals, setGoals] = useState("");
  const [fears, setFears] = useState("");
  const [hopes, setHopes] = useState("");
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const user = getUser();
    if (!user) { window.location.href = "/futureself/auth/signin"; return; }
    const profile = getProfile();
    setName(profile?.name || user.name || "");
    setEmail(user.email || "");
    setAge(profile?.age?.toString() || "");
    setCareer(profile?.career || "");
    setGoals(profile?.goals || "");
    setFears(profile?.fears || "");
    setHopes(profile?.hopes || "");
    setApiKeyInput(getApiKey());
  }, []);

  const handleSaveProfile = () => {
    saveProfile({
      name, age: parseInt(age) || 30, career, goals, fears, hopes,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSaveApiKey = () => {
    setApiKey(apiKeyInput.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleExport = () => {
    const data: Record<string, string | null> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('futureself_')) {
        data[key] = localStorage.getItem(key);
      }
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'futureself-export.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteAll = () => {
    if (confirm('This will delete all your data. Are you sure?')) {
      const keys: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('futureself_')) keys.push(key);
      }
      keys.forEach(k => localStorage.removeItem(k));
      window.location.href = "/futureself/auth/signin";
    }
  };

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="font-display text-3xl mb-8">Settings</h1>

        <Tabs defaultValue="profile">
          <TabsList className="mb-8">
            <TabsTrigger value="profile"><User className="w-3.5 h-3.5 mr-1.5" /> Profile</TabsTrigger>
            <TabsTrigger value="api"><Key className="w-3.5 h-3.5 mr-1.5" /> API</TabsTrigger>
            <TabsTrigger value="data"><Shield className="w-3.5 h-3.5 mr-1.5" /> Data</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="bg-card/50 border-border">
                <CardContent className="p-6 space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input id="age" type="number" value={age} onChange={(e) => setAge(e.target.value)} className="mt-1.5" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="career">Career</Label>
                    <Input id="career" value={career} onChange={(e) => setCareer(e.target.value)} className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="goals">Goals / Decisions</Label>
                    <Textarea id="goals" value={goals} onChange={(e) => setGoals(e.target.value)} className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="fears">Fears</Label>
                    <Textarea id="fears" value={fears} onChange={(e) => setFears(e.target.value)} className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="hopes">Hopes</Label>
                    <Textarea id="hopes" value={hopes} onChange={(e) => setHopes(e.target.value)} className="mt-1.5" />
                  </div>
                  <Button onClick={handleSaveProfile} className="bg-primary text-primary-foreground hover:bg-primary/90">
                    {saved ? <><Check className="w-4 h-4 mr-2" /> Saved</> : <><Save className="w-4 h-4 mr-2" /> Save Profile</>}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="api">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="bg-card/50 border-border">
                <CardContent className="p-6 space-y-5">
                  <div>
                    <Label htmlFor="apikey">Gemini API Key</Label>
                    <Input
                      id="apikey"
                      type="password"
                      placeholder="AIza..."
                      value={apiKeyInput}
                      onChange={(e) => setApiKeyInput(e.target.value)}
                      className="mt-1.5 font-mono"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Get a free key from{" "}
                      <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        Google AI Studio
                      </a>
                    </p>
                  </div>
                  <Button onClick={handleSaveApiKey} className="bg-primary text-primary-foreground hover:bg-primary/90">
                    {saved ? <><Check className="w-4 h-4 mr-2" /> Saved</> : <><Save className="w-4 h-4 mr-2" /> Save Key</>}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="data">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <Card className="bg-card/50 border-border">
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="font-medium mb-1">Export your data</h3>
                    <p className="text-sm text-muted-foreground mb-3">Download all your conversations, profile, and life paths as JSON.</p>
                    <Button variant="outline" size="sm" onClick={handleExport}><Download className="w-3.5 h-3.5 mr-2" /> Export</Button>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-medium mb-1">Sign out</h3>
                    <p className="text-sm text-muted-foreground mb-3">Your data stays in this browser.</p>
                    <Button variant="outline" size="sm" onClick={() => { signOut(); window.location.href = "/futureself/auth/signin"; }}>
                      <LogOut className="w-3.5 h-3.5 mr-2" /> Sign Out
                    </Button>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-medium text-destructive mb-1">Delete all data</h3>
                    <p className="text-sm text-muted-foreground mb-3">Permanently delete everything. This cannot be undone.</p>
                    <Button variant="outline" size="sm" className="border-destructive/30 text-destructive hover:bg-destructive/10" onClick={handleDeleteAll}>
                      <Trash2 className="w-3.5 h-3.5 mr-2" /> Delete Everything
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}

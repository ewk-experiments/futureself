"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Sparkles, User, CreditCard, Download, Trash2, LogOut, Bell, Shield, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Settings() {
  const [name, setName] = useState("Eli King");
  const [email, setEmail] = useState("eli@example.com");

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h1 className="font-semibold">Settings</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <Tabs defaultValue="profile">
          <TabsList className="mb-8">
            <TabsTrigger value="profile"><User className="w-3.5 h-3.5 mr-1.5" /> Profile</TabsTrigger>
            <TabsTrigger value="subscription"><CreditCard className="w-3.5 h-3.5 mr-1.5" /> Subscription</TabsTrigger>
            <TabsTrigger value="preferences"><Moon className="w-3.5 h-3.5 mr-1.5" /> Preferences</TabsTrigger>
            <TabsTrigger value="data"><Shield className="w-3.5 h-3.5 mr-1.5" /> Data</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <Card className="bg-card/50 border-border">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center text-xl font-medium text-primary">EK</div>
                    <div>
                      <Button variant="outline" size="sm">Change Photo</Button>
                      <p className="text-xs text-muted-foreground mt-1">JPG, PNG. Max 5MB.</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2" />
                    </div>
                  </div>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Save Changes</Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="subscription">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <Card className="bg-gradient-to-br from-primary/5 via-card to-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">Pro Plan</h3>
                      <p className="text-sm text-muted-foreground">$29/month · Renews March 28, 2026</p>
                    </div>
                    <Badge className="bg-primary text-primary-foreground">Active</Badge>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                    <li>✓ Unlimited conversations</li>
                    <li>✓ Multi-path explorer</li>
                    <li>✓ Voice cloning</li>
                    <li>✓ Priority generation</li>
                  </ul>
                  <div className="flex gap-3">
                    <Link href="/pricing"><Button variant="outline" size="sm">Change Plan</Button></Link>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">Cancel Subscription</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="preferences">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="bg-card/50 border-border">
                <CardContent className="p-6 space-y-6">
                  {[
                    { label: "Dark mode", desc: "Use dark theme", icon: Moon, defaultChecked: true },
                    { label: "Email notifications", desc: "Get notified about new insights", icon: Bell, defaultChecked: true },
                    { label: "Sound effects", desc: "Play sounds during conversations", icon: Bell, defaultChecked: false },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                          <item.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                      <Switch defaultChecked={item.defaultChecked} />
                    </div>
                  ))}
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
                    <p className="text-sm text-muted-foreground mb-3">Download all your conversations, photos, and profile data.</p>
                    <Button variant="outline" size="sm"><Download className="w-3.5 h-3.5 mr-2" /> Export Data</Button>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-medium mb-1">Sign out</h3>
                    <p className="text-sm text-muted-foreground mb-3">Sign out of your account on this device.</p>
                    <Button variant="outline" size="sm"><LogOut className="w-3.5 h-3.5 mr-2" /> Sign Out</Button>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-medium text-destructive mb-1">Delete account</h3>
                    <p className="text-sm text-muted-foreground mb-3">Permanently delete your account, conversations, and all generated data. This cannot be undone.</p>
                    <Button variant="outline" size="sm" className="border-destructive/30 text-destructive hover:bg-destructive/10">
                      <Trash2 className="w-3.5 h-3.5 mr-2" /> Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

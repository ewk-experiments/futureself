"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, TrendingUp, MessageSquare, GitBranch, Settings, LogOut } from "lucide-react";
import { getUser, getProfile, signOut } from "@/lib/store";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: TrendingUp },
  { label: "Conversations", href: "/conversation", icon: MessageSquare },
  { label: "Life Paths", href: "/explorer", icon: GitBranch },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [user, setUser] = useState<ReturnType<typeof getUser>>(null);
  const [profile, setProfile] = useState<ReturnType<typeof getProfile>>(null);

  useEffect(() => {
    setUser(getUser());
    setProfile(getProfile());
  }, []);

  const initials = (profile?.name || user?.name || "?").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col fixed inset-y-0 left-0 border-r border-border bg-card/30 backdrop-blur-sm z-40">
        <div className="p-6 flex-1">
          <Link href="/dashboard" className="flex items-center gap-2.5 mb-12">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Sparkles className="w-4.5 h-4.5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl tracking-tight">FutureSelf</span>
          </Link>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                    active
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="p-6 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                {initials}
              </div>
              <div>
                <p className="text-sm font-medium">{profile?.name || user?.name || "Guest"}</p>
                <p className="text-xs text-muted-foreground">{user?.email || ""}</p>
              </div>
            </div>
            <button
              onClick={() => { signOut(); window.location.href = "/futureself/auth/signin"; }}
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 h-14">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="font-display text-lg">FutureSelf</span>
          </Link>
          <div className="flex items-center gap-1">
            {navItems.slice(0, 4).map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`p-2 rounded-lg transition-colors ${active ? "text-primary bg-primary/10" : "text-muted-foreground"}`}
                >
                  <item.icon className="w-4.5 h-4.5" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 lg:pl-64 pt-14 lg:pt-0">
        {children}
      </main>
    </div>
  );
}

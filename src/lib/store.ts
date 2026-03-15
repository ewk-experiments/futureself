// Client-side localStorage store (replaces SQLite for static export)
import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
  createdAt: string;
}

export interface Profile {
  userId: string;
  name: string;
  age: number;
  career: string;
  relationship: string;
  goals: string;
  fears: string;
  hopes: string;
  photoUrl?: string;
  agedPhotoUrl?: string;
  onboardingComplete: boolean;
}

export interface Conversation {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

export interface LifePath {
  id: string;
  userId: string;
  scenario: string;
  branches: LifePathNode;
  createdAt: string;
}

export interface LifePathNode {
  id: string;
  label: string;
  age: number;
  description: string;
  outcome: 'positive' | 'neutral' | 'mixed';
  children?: LifePathNode[];
}

function get<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const v = localStorage.getItem(`futureself_${key}`);
    return v ? JSON.parse(v) : fallback;
  } catch { return fallback; }
}

function set(key: string, value: unknown) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`futureself_${key}`, JSON.stringify(value));
}

// Auth
export function getUser(): User | null {
  return get<User | null>('user', null);
}

export function signIn(name: string, email: string): User {
  const existing = getUser();
  if (existing) return existing;
  const user: User = { id: uuidv4(), email, name, createdAt: new Date().toISOString() };
  set('user', user);
  return user;
}

export function signOut() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('futureself_user');
}

// Profile
export function getProfile(): Profile | null {
  return get<Profile | null>('profile', null);
}

export function saveProfile(profile: Partial<Profile>) {
  const user = getUser();
  if (!user) return;
  const existing = getProfile();
  const updated: Profile = {
    userId: user.id,
    name: existing?.name || user.name || '',
    age: 0,
    career: '',
    relationship: '',
    goals: '',
    fears: '',
    hopes: '',
    onboardingComplete: false,
    ...existing,
    ...profile,
  };
  set('profile', updated);
  return updated;
}

// Conversations
export function getConversations(): Conversation[] {
  return get<Conversation[]>('conversations', []);
}

export function createConversation(title: string): Conversation {
  const user = getUser();
  const conv: Conversation = {
    id: uuidv4(),
    userId: user?.id || 'anon',
    title,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const convs = getConversations();
  convs.unshift(conv);
  set('conversations', convs);
  return conv;
}

export function updateConversation(id: string, updates: Partial<Conversation>) {
  const convs = getConversations();
  const idx = convs.findIndex(c => c.id === id);
  if (idx >= 0) {
    convs[idx] = { ...convs[idx], ...updates, updatedAt: new Date().toISOString() };
    set('conversations', convs);
  }
}

// Messages
export function getMessages(conversationId: string): Message[] {
  return get<Message[]>(`messages_${conversationId}`, []);
}

export function addMessage(conversationId: string, role: 'user' | 'assistant', content: string): Message {
  const msg: Message = {
    id: uuidv4(),
    conversationId,
    role,
    content,
    createdAt: new Date().toISOString(),
  };
  const msgs = getMessages(conversationId);
  msgs.push(msg);
  set(`messages_${conversationId}`, msgs);
  return msg;
}

// Life Paths
export function getLifePaths(): LifePath[] {
  return get<LifePath[]>('lifepaths', []);
}

export function saveLifePath(path: LifePath) {
  const paths = getLifePaths();
  const idx = paths.findIndex(p => p.id === path.id);
  if (idx >= 0) paths[idx] = path;
  else paths.unshift(path);
  set('lifepaths', paths);
}

// API Key
export function getApiKey(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('futureself_gemini_key') || '';
}

export function setApiKey(key: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('futureself_gemini_key', key);
}

// Photo storage (base64)
export function savePhoto(key: string, dataUrl: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`futureself_photo_${key}`, dataUrl);
}

export function getPhoto(key: string): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(`futureself_photo_${key}`);
}

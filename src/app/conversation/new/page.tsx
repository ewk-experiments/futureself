"use client";

import Link from "next/link";
import { redirect } from "next/navigation";

export default function NewConversation() {
  // In a real app, this would create a new conversation and redirect
  // For now, redirect to a mock conversation
  redirect("/conversation/new-session");
}

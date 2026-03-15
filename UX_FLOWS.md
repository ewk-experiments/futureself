# FutureSelf — Complete UX Flows

> "Talk to the person you'll be in 30 years."

---

## Table of Contents

1. [Sign Up / Log In](#1-sign-up--log-in)
2. [Onboarding Walkthrough](#2-onboarding-walkthrough)
3. [Core First-Time Use Flow](#3-core-first-time-use-flow)
4. [Returning User Experience](#4-returning-user-experience)
5. [Settings / Profile Management](#5-settings--profile-management)
6. [Subscription / Upgrade Flow](#6-subscription--upgrade-flow)
7. [Sharing / Social Features](#7-sharing--social-features)
8. [Notifications & Re-engagement](#8-notifications--re-engagement)
9. [Account Deletion & Data Export](#9-account-deletion--data-export)
10. [Error States, Empty States, Loading States](#10-error-states-empty-states-loading-states)
11. [Mobile vs Desktop Considerations](#11-mobile-vs-desktop-considerations)

---

## 1. Sign Up / Log In

### 1.1 Landing Page → Auth Entry Point

**Screen: Hero Landing**
- Full-bleed video background: slow morph of a young face aging beautifully
- Headline: **"Meet who you'll become."**
- Subhead: "Upload a photo. Share your story. Have a conversation with your future self — 30 years from now."
- Primary CTA: `Get Started` (large, centered, pill button)
- Secondary link: `Already have an account? Log in`
- Trust strip below fold: "Your data is encrypted end-to-end. We never sell your information."

**Transition:** Tapping `Get Started` slides up the auth modal (mobile) or opens centered modal (desktop).

### 1.2 Auth Modal

**Screen: Choose Sign-Up Method**
- Modal title: **"Create your account"**
- `Continue with Google` (Google logo + label, full-width button, top position)
- Divider: "— or —"
- Email input field: placeholder "you@example.com"
- `Continue with Email` button (secondary style)
- Footer text: "By continuing, you agree to our [Terms of Service] and [Privacy Policy]."
- Close X in top-right corner

**Google OAuth Flow:**
1. User taps `Continue with Google`
2. System redirects to Google consent screen
3. Scopes requested: email, profile (display name + avatar)
4. On success → redirect back to app → account created → proceed to Onboarding
5. On cancel → return to auth modal, no error shown
6. On failure → toast: "Google sign-in failed. Please try again or use email."

**Email Flow:**
1. User enters email → taps `Continue with Email`
2. **Screen: Verify Email** — "We sent a 6-digit code to **you@example.com**" + 6 individual digit input boxes, auto-advance on each digit
3. `Resend code` link (greyed out for 30s with countdown: "Resend in 28s")
4. On valid code → **Screen: Set Password** — password field with show/hide toggle, strength meter (weak/fair/strong), requirement hints: "At least 8 characters, one number"
5. `Create Account` button (disabled until password meets requirements)
6. On success → proceed to Onboarding

**Log In Flow:**
- From `Already have an account? Log in`
- Same modal, title changes to **"Welcome back"**
- `Continue with Google` button
- Divider
- Email + Password fields
- `Log In` button
- `Forgot password?` link → sends reset email → 6-digit code → new password screen

### 1.3 Edge Cases

| Scenario | Behavior |
|---|---|
| Email already registered (Google) | "This email is linked to a Google account. Continue with Google?" with `Continue with Google` button |
| Email already registered (email) | "Account exists. Log in instead?" with `Go to Log In` link |
| Google account but trying email login | "This email uses Google sign-in." + `Continue with Google` button |
| Expired verification code | "Code expired. We've sent a new one." (auto-resend) |
| Too many failed code attempts (5x) | "Too many attempts. Please request a new code." + `Send New Code` button |
| Network error during OAuth | Toast: "Connection lost. Check your internet and try again." |

---

## 2. Onboarding Walkthrough

### 2.1 Welcome Screen (Post-Auth, Screen 1 of 5)

**Screen: Welcome**
- Animated illustration: abstract time spiral
- Headline: **"Let's build your future self."**
- Body: "We'll need a few things from you — a photo, some context about your life, and a voice sample. This takes about 5 minutes."
- `Let's Go` (primary CTA)
- `Skip for now` (text link, bottom) — skips to empty dashboard with persistent "Complete setup" banner

**Progress indicator:** 5 dots at top, first filled

### 2.2 Photo Upload (Screen 2 of 5)

**Screen: Upload Your Photo**
- Headline: **"Show us who you are today."**
- Body: "Upload a clear, front-facing photo. This is how we'll generate your future appearance."
- Large dashed upload zone: camera icon + "Tap to upload or take a photo"
- On mobile: opens native picker (Camera / Photo Library)
- On desktop: opens file picker (accepts .jpg, .png, .heic, .webp; max 20MB)
- **Photo requirements hint:** "Front-facing · Good lighting · No sunglasses · Just you"

**After upload:**
- Photo preview with subtle face-detection overlay (green corners around face)
- If no face detected: "We couldn't detect a face. Try a different photo?" + `Replace Photo` button
- If multiple faces: "We detected multiple faces. Please upload a photo of just you." + `Replace Photo`
- If image too blurry: "This photo is a bit blurry. A clearer one will give better results." + `Replace Photo` / `Use Anyway`
- `Continue` button (enabled once valid photo loaded)
- `Replace Photo` secondary action

**Transition:** Slide left to Screen 3

### 2.3 Life Context (Screen 3 of 5)

**Screen: Tell us about your life**
- Headline: **"Your future self needs context."**
- Body: "The more we know, the more realistic the conversation. Share as much or as little as you want."

**Form fields (all optional except age):**

1. **Age** (required) — number stepper, 18-90
2. **What do you do for work?** — text input, placeholder: "e.g., Product designer at a startup"
3. **Relationship status** — select: Single / In a relationship / Married / It's complicated / Prefer not to say
4. **Do you have kids?** — select: No / Yes (how many?) → conditional number input
5. **Where do you live?** — text input, placeholder: "e.g., Seattle, WA"
6. **What's on your mind lately?** — textarea (500 char max), placeholder: "Big decisions, worries, dreams — anything your future self should know about."
7. **Health & lifestyle** — multi-select chips: Active / Sedentary / Healthy diet / Smoker / Social drinker / Other
8. **Life goals** — textarea (300 char max), placeholder: "Where do you want to be in 30 years?"

- Completion indicator: "4 of 8 filled — more detail = better conversation"
- `Continue` button
- `Skip — I'll add this later` text link

### 2.4 Voice Sample (Screen 4 of 5)

**Screen: Record your voice**
- Headline: **"Now let's capture your voice."**
- Body: "Read the passage below out loud. We'll use this to create your future self's voice — deeper, a little weathered, but unmistakably you."
- Prompt text displayed in a card: *"I'm recording this for my future self. Thirty years from now, I hope I'm still curious, still learning, and still a little reckless when it matters."*
- Large record button (pulsing red circle)
- Recording state: waveform animation, timer counting up, `Stop` button
- Minimum 10 seconds; if stopped early: "Try to record at least 10 seconds for a better voice clone."
- After recording: playback controls (play/pause, waveform scrubber)
- `Re-record` button / `Continue` button
- `Skip — use a default voice` text link (generates generic aged voice)

**Microphone permission:**
- If denied: "FutureSelf needs microphone access to clone your voice. [Open Settings] or [Skip with default voice]"
- If browser blocks: fallback to file upload: "You can also upload a voice recording (MP3, WAV, M4A — at least 10 seconds)"

### 2.5 Processing / Generation (Screen 5 of 5)

**Screen: Generating Your Future Self**
- Full-screen dark background
- Center: morphing animation — user's photo slowly aging
- Progress stages with checkmarks appearing sequentially:
  - ✓ Analyzing facial features
  - ✓ Projecting 30-year aging
  - ✓ Generating appearance
  - ◻ Synthesizing voice
  - ◻ Building personality model
- Estimated time: "This usually takes 1-2 minutes"
- Fun facts rotating below: "Did you know? The average person's face changes more between 40-60 than any other period."
- **No back button** — but a `Cancel` text link at very bottom: "Cancel and start over"

**On completion:**
- Dramatic reveal: screen fades to black → aged avatar fades in, life-size, looking at camera
- Headline: **"Meet you. 30 years from now."**
- Subtle breathing animation on the avatar
- `Start Conversation` primary CTA (large, glowing)
- `View Profile First` secondary link

---

## 3. Core First-Time Use Flow

### 3.1 Pre-Conversation

**Screen: Conversation Setup**
- Avatar displayed at top (bust view, subtle idle animation — blinking, slight head movement)
- Name badge: "You, age [current_age + 30]"
- Context card: "Your future self knows about: your career, your goals, your current worries."
- Tip: "Ask about big decisions. Your future self has lived the consequences."
- Suggested conversation starters (tappable chips):
  - "Should I change careers?"
  - "Do I ever get married?"
  - "What do you wish I'd done differently?"
  - "Am I happy?"
- Text input at bottom with microphone button for voice mode
- Toggle: `Text` / `Voice` (default: Voice on mobile, Text on desktop)

### 3.2 Active Conversation

**Screen: Conversation (Voice Mode)**
- Avatar takes up top 60% of screen, animating lips/expressions as it speaks
- Audio waveform at bottom showing the avatar's voice output
- User speaks → speech-to-text live caption appears at bottom
- Conversation transcript scrolls behind the avatar (semi-transparent, swipe up to read)
- Controls: `Mute Mic` / `Switch to Text` / `End Conversation`
- Emotional reactions on avatar: concern when discussing worries, warmth when reminiscing, gravity when giving advice

**Screen: Conversation (Text Mode)**
- Chat bubble interface
- Avatar thumbnail next to its messages
- User messages right-aligned (blue bubbles)
- Future self messages left-aligned (subtle gradient, warm tone)
- Typing indicator: three dots with a clock icon
- Same suggested chips appear contextually when conversation lulls
- `Switch to Voice` button in input bar

**Conversation intelligence:**
- Future self references user's uploaded context naturally: "Back when you were at [company], I remember feeling stuck too…"
- Probes deeper: "Why is that weighing on you right now?"
- Gives advice framed as lived experience: "I took that leap at 38. It was terrifying, but…"
- Never breaks character

### 3.3 Conversation Wrap-Up

**Trigger:** User taps `End Conversation` or conversation reaches 30-minute natural limit

**Screen: Reflection**
- Avatar says a closing line: "Take care of us, okay?"
- Fade to summary card:
  - **"Conversation Summary"**
  - Duration: 18 minutes
  - Topics discussed: Career change, Relationship, Health goals
  - Key insight: "Your future self suggested taking the new role, but investing in the relationship first."
  - `Save Conversation` (primary) — saves full transcript
  - `Share a Moment` — lets user pick a quote to share (see Sharing)
  - `Start New Conversation` (greyed out for Free users — shows "Available in 364 days" or "Upgrade to Pro")

### 3.4 Post-Conversation Dashboard

**Screen: Your FutureSelf Dashboard**
- Avatar card at top: your aged self with name/age, `Edit Profile` link
- **Past Conversations** section:
  - Card per conversation: date, duration, topic tags, "View Transcript" link
- **Insights** section:
  - "Your future self has mentioned [career change] in 1 conversation."
- **Next Conversation:** "Available: March 14, 2027" (Free) or "Anytime" (Pro)
- For Free users: soft upgrade banner at bottom: "Want unlimited conversations? `Upgrade to Pro — $19/mo`"

---

## 4. Returning User Experience

### 4.1 Returning User — Free Tier

**Screen: Dashboard (conversation available)**
- If annual conversation is available: prominent `Start Conversation` button on avatar card, pulsing gently
- Notification dot on app icon / browser tab title: "Your future self is waiting"
- Past conversation transcripts still accessible
- Gentle nudge: "It's been a year. A lot can change. Ready to check in?"

**Screen: Dashboard (conversation used)**
- Avatar card shows: "Next conversation: [date]"
- `Upgrade to Pro` CTA in place of Start button
- Transcript history accessible
- "Update Your Life Context" prompt: "Anything new since last time? Keeping your profile current makes the next conversation better." → links to life context editor

### 4.2 Returning User — Pro Tier

**Screen: Dashboard (Pro)**
- `Start Conversation` always available
- **Multi-path simulation** section (Pro exclusive):
  - "Explore alternate futures" header
  - Cards representing different life paths: "What if you moved to Berlin?" / "What if you started a company?"
  - Each path has its own avatar variant (subtle visual differences — different clothes, hairstyle, setting)
  - Tap to enter a conversation with that timeline's version of you
- Conversation history with search and filters (by date, topic, path)
- "Relationship" meter — how well your future self knows you (increases with more conversations and profile updates)

### 4.3 Session Resumption

- If user left mid-conversation (closed app/browser):
  - On return within 1 hour: "Pick up where you left off?" + `Resume` / `Start Fresh`
  - After 1 hour: conversation auto-saved, shows in history as "(incomplete)"

---

## 5. Settings / Profile Management

### 5.1 Settings Hub

**Screen: Settings**
- Accessed via avatar/gear icon in top-right
- Sections:

**Account**
- Email: shown with `Change` link
- Password: `Change Password`
- Connected accounts: Google (connected/disconnect)
- `Delete Account` (red text, bottom of section)

**Your Profile**
- Photo: current photo with `Update Photo` → re-triggers photo upload flow
- Life context: all fields from onboarding, editable inline
- Voice sample: `Re-record` / `Listen to Current`
- "Last updated 3 months ago" with nudge: "Keep this current for better conversations."

**Your Future Self**
- Avatar preview with `Regenerate` button (re-processes with current photo/context)
- Voice preview: play button
- Age offset: slider, default 30 years (Pro: adjustable 10-50 years)
- Personality traits: sliders for Optimistic ↔ Realistic, Warm ↔ Direct, Adventurous ↔ Cautious

**Preferences**
- Default conversation mode: Voice / Text
- Language: dropdown (English, Spanish, French, German, Japanese, Portuguese, Korean, Mandarin)
- Dark mode: System / Light / Dark
- Notifications: toggle per type (see Notifications section)

**Subscription**
- Current plan: Free / Pro
- `Manage Subscription` → links to subscription flow
- Billing history

### 5.2 Profile Update Flow

- Editing any life context field → `Save Changes` button appears at bottom (sticky)
- On save: brief toast "Profile updated. Your future self will reflect these changes in your next conversation."
- Regenerating avatar after photo change: shows mini processing screen (30 seconds), then before/after comparison: "Your future self got an update." + `Looks Good` / `Revert`

---

## 6. Subscription / Upgrade Flow

### 6.1 Upgrade Triggers

Upgrade prompts appear at:
1. Trying to start a second conversation (Free)
2. Tapping "Multi-path simulation" (Free)
3. Trying to adjust age offset beyond 30 (Free)
4. Banner on dashboard (soft, dismissible)
5. Post-conversation screen (contextual)
6. Settings → Subscription

### 6.2 Upgrade Modal

**Screen: Upgrade to Pro**
- Headline: **"Unlimited conversations with your future self."**
- Side-by-side comparison:

| | Free | Pro — $19/mo |
|---|---|---|
| Conversations | 1 per year | Unlimited |
| Multi-path simulation | — | ✓ |
| Age offset | 30 years | 10-50 years |
| Conversation length | 30 min | Unlimited |
| Priority generation | — | ✓ |
| Export transcripts | — | ✓ |

- `Start 7-Day Free Trial` (primary CTA)
- "Then $19/month. Cancel anytime."
- `Maybe Later` text link
- Trust: "30-day money-back guarantee · Cancel in 2 taps"

### 6.3 Payment Flow

1. `Start 7-Day Free Trial` → payment sheet (Apple Pay / Google Pay on mobile, Stripe card form on desktop)
2. Fields: Card number, Expiry, CVC, ZIP
3. `Start Free Trial` button — label changes to `Subscribe — $19/mo` after trial
4. On success: confetti animation + "Welcome to Pro! Your future self is ready for unlimited conversations." + `Start a Conversation` CTA
5. On payment failure: inline error "Payment failed. Please check your card details." + `Try Again` / `Use Different Card`

### 6.4 Cancellation Flow

1. Settings → Subscription → `Cancel Subscription`
2. **Screen: We're sorry to see you go**
   - "Before you cancel, would any of these help?"
   - Options: "It's too expensive" → offer annual plan ($15/mo billed yearly) / "I don't use it enough" → show engagement tips / "The conversations aren't good enough" → offer to regenerate with more context
3. If user proceeds: `Cancel Anyway`
4. **Screen: Confirm Cancellation**
   - "Your Pro features will remain active until [billing_date]. After that, you'll return to the Free plan."
   - "Your conversations and transcripts will be preserved."
   - `Confirm Cancellation` / `Keep My Subscription`
5. Post-cancel: toast "Subscription cancelled. Pro features active until [date]."

---

## 7. Sharing / Social Features

### 7.1 Share a Moment

**Trigger:** Post-conversation → `Share a Moment` or from transcript → long-press a message

**Screen: Create Shareable**
- Selected quote displayed on a styled card (dark background, quote marks, FutureSelf branding)
- Preview of shareable image
- Attribution: "— My future self, age [X]"
- User can toggle: show/hide their name
- `Customize` → background color options (5 presets: dark, warm, cool, gradient, minimal)
- `Share` → native share sheet (iOS/Android) or copy link (desktop)
- Share targets: Instagram Stories, Twitter/X, iMessage, Copy Link
- Shared link opens a minimal web page with the quote + "Create your own future self" CTA

### 7.2 Invite Friends

**Screen: Invite**
- "What would your friends' future selves say?"
- Unique referral link
- Reward: "Give a friend 1 free Pro month. Get 1 free Pro month when they subscribe."
- Share via: Messages, Email, Copy Link
- Referral tracker: "2 friends invited · 1 subscribed · 1 month earned"

### 7.3 Social Proof / Community (Optional — V2)

- "What are people asking their future selves?" — anonymized trending topics
- No public profiles or social feed — privacy-first product

---

## 8. Notifications & Re-engagement

### 8.1 Notification Types

| Notification | Channel | Timing | Copy |
|---|---|---|---|
| Annual conversation ready (Free) | Push + Email | On anniversary | "Your future self has been waiting. It's time to check in." |
| Trial ending | Push + Email | Day 5 of 7 | "Your free trial ends in 2 days. Keep unlimited conversations?" |
| Trial ended | Email | Day 8 | "Your trial ended, but your future self is still here. Resubscribe anytime." |
| Life context stale | Push | 90 days after last update | "A lot can change in 3 months. Update your profile for better conversations." |
| Multi-path available (Pro) | Push | Weekly | "New simulation available: What if you moved abroad?" |
| Referral converted | Push | On conversion | "Your friend joined! You earned 1 free month." |

### 8.2 Email Templates

**Annual Check-In Email (Free Users)**
- Subject: "Your future self has something to say."
- Hero: user's aged avatar
- Body: "It's been a year since your last conversation. You've lived 365 days your future self is curious about. What's changed?"
- CTA: `Start Your Conversation`
- Unsubscribe link in footer

**Trial Ending Email**
- Subject: "2 days left with your future self (unlimited)"
- Body: "You've had [X] conversations so far. After your trial, you'll be limited to 1 per year. Keep the connection going?"
- CTA: `Subscribe — $19/mo`

### 8.3 Notification Preferences

- Settings → Notifications
- Toggles: Push notifications (on/off), Email updates (on/off), Marketing emails (on/off)
- Frequency: "Remind me about my annual conversation" → 1 week before / On the day / 1 week after / Don't remind me
- Quiet hours: [time] to [time] (push only)

---

## 9. Account Deletion & Data Export

### 9.1 Data Export

**Settings → Account → `Export My Data`**
1. Tap → confirmation: "We'll prepare a download of all your data. This includes your profile, photos, voice samples, conversation transcripts, and avatar data."
2. `Request Export` button
3. Processing: "Preparing your export… We'll email you when it's ready (usually within 1 hour)."
4. Email arrives with secure download link (expires in 7 days)
5. Export format: ZIP containing:
   - `profile.json` (all life context data)
   - `photos/` (original uploads)
   - `voice/` (audio samples)
   - `conversations/` (transcripts as Markdown + JSON)
   - `avatar/` (generated images)
   - `metadata.json` (account creation date, subscription history)

### 9.2 Account Deletion

**Settings → Account → `Delete Account`**
1. **Screen: Delete Account**
   - Warning icon (red)
   - "Deleting your account will permanently remove:"
   - Bullet list: Your profile and life context / Your photos and voice samples / All conversation transcripts / Your generated future self avatar / Your subscription (no refund for current period)
   - "This action cannot be undone."
   - `Export My Data First` button (secondary)
   - `I Understand, Delete My Account` button (red)
2. **Screen: Confirm Identity**
   - "For security, please confirm your identity."
   - Google users: `Verify with Google` → OAuth re-auth
   - Email users: password field + `Confirm`
3. **Screen: Final Confirmation**
   - "Type **DELETE** to confirm."
   - Text input
   - `Permanently Delete Account` (red, disabled until "DELETE" typed)
4. On deletion:
   - Immediate: logged out, redirected to landing page
   - Toast: "Your account has been deleted."
   - Backend: data queued for deletion within 30 days (GDPR), anonymized analytics retained
   - Confirmation email sent to registered address

---

## 10. Error States, Empty States, Loading States

### 10.1 Loading States

| Context | Loading Treatment |
|---|---|
| App launch | Splash screen: FutureSelf logo + tagline fade-in (max 2s) |
| Avatar generation | Full-screen morphing animation with staged progress (see Onboarding 2.5) |
| Starting conversation | Avatar "waking up" animation: eyes opening, slight smile. "Your future self is getting ready…" (3-5s) |
| Sending message (text) | Typing indicator with clock icon |
| Sending message (voice) | Waveform processing animation |
| Loading transcripts | Skeleton cards (3 placeholder cards with shimmer) |
| Exporting data | Progress bar + "Preparing your data…" |

### 10.2 Empty States

| Context | Empty State |
|---|---|
| Dashboard — no conversations yet | Avatar card + "You haven't spoken with your future self yet." + `Start Your First Conversation` CTA |
| Conversation history (new user) | Illustration of two chairs facing each other. "Your conversation history will appear here." |
| Search results (no match) | "No conversations match your search." + `Clear Search` |
| Multi-path simulations (new Pro) | "No alternate paths yet. Start a conversation and ask 'What if…?' to create your first simulation." |
| Referrals (none sent) | "No referrals yet. Share FutureSelf and earn free months." + `Invite Friends` |

### 10.3 Error States

| Error | Treatment |
|---|---|
| Network lost (passive) | Top banner: "You're offline. Conversations require an internet connection." (yellow) |
| Network lost (mid-conversation) | "Connection lost. Trying to reconnect…" + auto-retry 3x → "Couldn't reconnect. Your conversation has been saved up to this point." + `Try Again` / `View Saved Transcript` |
| Avatar generation failed | "Something went wrong generating your future self. This sometimes happens with unusual photos." + `Try a Different Photo` / `Retry` |
| Voice clone failed | "We couldn't process your voice sample. Try recording in a quieter environment." + `Re-record` / `Use Default Voice` |
| Payment failed | Inline card error + `Try Again` / `Use Different Card` |
| Server error (500) | Full-screen: illustration of broken hourglass. "Something went wrong on our end. We're looking into it." + `Try Again` / `Contact Support` |
| Rate limit (Pro) | "Your future self needs a breather. Try again in a few minutes." (shouldn't happen often) |
| Photo upload too large | "That file is too large (max 20MB). Try a smaller image." + `Choose Another` |
| Unsupported file type | "We support JPG, PNG, HEIC, and WebP images." + `Choose Another` |
| Microphone permission denied | "Microphone access is needed for voice recording. [Open Settings]" + `Skip — Use Default Voice` |

---

## 11. Mobile vs Desktop Considerations

### 11.1 Layout Philosophy

- **Mobile-first design** — core experience is intimate, personal, best on phone
- **Desktop** — enhanced for longer text conversations and transcript browsing

### 11.2 Mobile-Specific

| Feature | Mobile Treatment |
|---|---|
| Conversation (voice) | Full-screen avatar, bottom sheet for controls. Feels like a FaceTime call with your future self. |
| Conversation (text) | Standard chat UI. Avatar pinned at top (small), keyboard pushes chat up. |
| Photo upload | Native camera integration — "Take a Photo" option first |
| Voice recording | Large, thumb-friendly record button. Haptic feedback on start/stop. |
| Navigation | Bottom tab bar: Home / Conversations / Paths (Pro) / Settings |
| Onboarding | Single-column, swipeable screens. Progress dots at top. |
| Share | Native share sheet integration |
| Notifications | Push notifications with avatar as icon |

### 11.3 Desktop-Specific

| Feature | Desktop Treatment |
|---|---|
| Conversation (voice) | Avatar in center-left, transcript panel on right. Webcam preview (opt-in) in corner. |
| Conversation (text) | Two-panel: avatar + chat side by side |
| Photo upload | Drag-and-drop zone + file picker |
| Voice recording | Waveform visualization more prominent. System audio device selector. |
| Navigation | Left sidebar: Home / Conversations / Paths (Pro) / Settings |
| Onboarding | Centered card layout, max-width 600px. Same flow, more breathing room. |
| Transcript browsing | Full-page layout with search, filters, and date grouping |
| Multi-path (Pro) | Side-by-side path comparison — two avatars, two timelines |

### 11.4 Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| < 640px | Mobile — single column, bottom nav |
| 640-1024px | Tablet — single column with wider margins, bottom nav |
| > 1024px | Desktop — sidebar nav, multi-panel layouts |

### 11.5 Platform-Specific Details

**iOS:**
- Support Dynamic Island for active conversation (shows timer + waveform)
- Live Activity for avatar generation progress
- Haptic feedback: light tap on message sent, medium on conversation end
- Face ID / Touch ID for account deletion confirmation

**Android:**
- Material You theming support (dynamic color from wallpaper)
- Notification channels: Conversations, Reminders, Account
- Back gesture returns to previous screen (not close conversation without confirmation)

**Web (Desktop):**
- Keyboard shortcuts: Enter to send (text mode), Space to start/stop recording (voice mode), Escape to end conversation
- Browser notifications with permission prompt on first visit
- PWA support for app-like experience

---

## Appendix: Microcopy Reference

### Conversation Starters (Randomized Pool)
- "Should I take the job?"
- "What's the biggest surprise about getting older?"
- "Do I still talk to [person]?"
- "What should I stop worrying about?"
- "Am I where I wanted to be?"
- "What's my biggest regret?"
- "Did the risk pay off?"
- "What do you wish I knew right now?"

### Avatar Closing Lines (Randomized)
- "Take care of us, okay?"
- "I'll be here when you're ready to talk again."
- "You're doing better than you think."
- "See you next time. I'll be older, but I'll still be you."
- "Trust yourself. I turned out alright."

### Tooltip / Helper Text
- On voice mode toggle: "Voice mode creates a more immersive experience. Your future self will speak in an aged version of your voice."
- On multi-path: "Explore how different choices could change your life. Each path creates a unique version of your future self."
- On age offset: "Default is 30 years. Younger offsets show a more similar version of you. Older offsets show more dramatic changes."

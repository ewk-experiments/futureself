// Gemini API client (browser-side)
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getApiKey, getProfile } from './store';

function getClient() {
  const key = getApiKey();
  if (!key) throw new Error('No Gemini API key configured. Go to Settings to add one.');
  return new GoogleGenerativeAI(key);
}

function buildSystemPrompt(): string {
  const profile = getProfile();
  const name = profile?.name || 'friend';
  const age = profile?.age || 30;
  const futureAge = age + 30;
  const goals = profile?.goals || 'living a good life';
  const fears = profile?.fears || 'the unknown';
  const hopes = profile?.hopes || 'happiness and fulfillment';
  const career = profile?.career || '';

  return `You are ${name}'s future self, ${futureAge} years old (they are currently ${age}). You are wise, reflective, warm, and slightly humorous. You speak in first person as if you ARE them, just older.

Context about who you're talking to:
- Name: ${name}, Age: ${age}
- Career: ${career}
- Goals/decisions: ${goals}
- Biggest fears: ${fears}  
- Hopes: ${hopes}

Guidelines:
- Reference their specific life context naturally — don't just give generic advice
- Be warm but honest. Sometimes the hard truth matters more than comfort
- Share "memories" of decisions you made (their future) and how they played out
- Use phrases like "I remember when I was your age..." or "Looking back..."
- Be conversational, not preachy. You're them, not a therapist
- Occasionally be funny or self-deprecating
- Keep responses concise (2-4 paragraphs usually)
- Never break character — you ARE their future self`;
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export async function chat(
  history: ChatMessage[],
  userMessage: string
): Promise<string> {
  const client = getClient();
  const model = client.getGenerativeModel({ 
    model: 'gemini-2.0-flash',
    systemInstruction: buildSystemPrompt(),
  });

  const chatSession = model.startChat({ history });
  const result = await chatSession.sendMessage(userMessage);
  return result.response.text();
}

export async function generateLifePath(scenario: string): Promise<string> {
  const client = getClient();
  const profile = getProfile();
  const model = client.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = `You are a life path simulator. Given a person's context and a "what if" scenario, generate a branching decision tree showing how their life could unfold.

Person context:
- Name: ${profile?.name || 'User'}, Age: ${profile?.age || 30}
- Career: ${profile?.career || 'professional'}
- Goals: ${profile?.goals || 'success'}
- Fears: ${profile?.fears || 'failure'}

Scenario: "${scenario}"

Respond with ONLY valid JSON (no markdown, no code fences) in this exact structure:
{
  "id": "root",
  "label": "You — Now",
  "age": ${profile?.age || 30},
  "description": "Current situation description",
  "outcome": "neutral",
  "children": [
    {
      "id": "path1",
      "label": "Choice A label",
      "age": ${(profile?.age || 30) + 3},
      "description": "What happens if they choose this",
      "outcome": "positive|neutral|mixed",
      "children": [
        {
          "id": "path1a",
          "label": "Outcome label",
          "age": ${(profile?.age || 30) + 8},
          "description": "Long-term result",
          "outcome": "positive|neutral|mixed"
        }
      ]
    }
  ]
}

Generate 3 main branches with 2 sub-outcomes each. Make it personal and specific. Use "positive", "neutral", or "mixed" for outcomes (pick one, don't use the pipe syntax).`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}

export async function describeAndAgePhoto(imageBase64: string): Promise<string> {
  const client = getClient();
  const model = client.getGenerativeModel({ model: 'gemini-2.0-flash' });
  const profile = getProfile();
  const age = profile?.age || 30;
  const futureAge = age + 30;

  // Use Gemini vision to describe the photo, then generate an aged description
  const result = await model.generateContent([
    {
      inlineData: {
        mimeType: 'image/jpeg',
        data: imageBase64.replace(/^data:image\/\w+;base64,/, ''),
      },
    },
    {
      text: `Look at this photo of a ${age}-year-old person. Describe how they would look at age ${futureAge} in vivid detail — their hair (graying patterns), facial lines, expression, overall appearance. Be specific and warm, not clinical. Write 2-3 sentences as if describing a real person you know well. Start with "At ${futureAge}, you..."`,
    },
  ]);
  return result.response.text();
}

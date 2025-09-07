// Simple types for Vercel functions (no package needed)
interface VercelRequest {
  method?: string;
  body: any;
}

interface VercelResponse {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => VercelResponse;
  json: (data: any) => void;
  end: () => void;
}
import OpenAI from 'openai';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Fallback function for when OpenAI API is unavailable
function generateFallbackChatResponse(messages: ChatMessage[]): string {
  const lastMessage = messages[messages.length - 1]?.content.toLowerCase() || '';
  const conversationLength = messages.length;
  const allMessages = messages.map(msg => msg.content.toLowerCase()).join(' ');
  
  // Detect age for age-appropriate responses
  const ageMatch = allMessages.match(/\b(1[0-8]|[6-9])\b/);
  const userAge = ageMatch ? parseInt(ageMatch[0]) : null;
  const isYounger = userAge && userAge <= 13;
  const isOlder = userAge && userAge >= 16;
  
  // First interaction
  if (conversationLength <= 1 || lastMessage.includes('hello') || lastMessage.includes('hi') || lastMessage.includes('hey')) {
    return "Hello! I'm your Swervy AI assistant! 💖 I'm here to help you discover your perfect self-care kit. What's your name and how old are you?";
  }
  
  // Name and age response - ask about makeup style with age-appropriate language
  if (conversationLength === 2 || lastMessage.includes('my name is') || lastMessage.includes("i'm ") || (!allMessages.includes('makeup') && !allMessages.includes('style') && conversationLength < 4)) {
    if (isYounger) {
      return "Nice to meet you! I love helping girls discover fun self-care routines. What kind of makeup looks do you like - natural and simple for everyday, or do you like experimenting with fun colors?";
    } else if (isOlder) {
      return "Nice to meet you! I'm excited to help you create the perfect self-care kit. Tell me about your makeup style - do you prefer natural everyday looks, bold and dramatic styles, or trendy experimental looks?";
    } else {
      return "Nice to meet you! I love helping girls find their perfect self-care kit. Tell me about your makeup style - do you prefer natural everyday looks, bold and dramatic styles, or something trendy and fun?";
    }
  }
  
  // Default encouraging responses
  return "I love learning about your style! Tell me more - what makeup looks do you gravitate toward? What colors make you feel most confident? Any favorite scents that make you happy?";
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    try {
      // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
      const completion = await openai.chat.completions.create({
        model: "gpt-5",
        messages: [
          {
            role: "system",
            content: `You are a helpful AI assistant for Swervy Cares, a nonprofit that creates personalized self-care kits for young girls aged 6-18. Your role is to have friendly, age-appropriate conversations to understand their preferences for makeup colors, scents, and styles.

Guidelines:
- Be warm, encouraging, and age-appropriate
- Ask about makeup style preferences (natural, bold, trendy)
- Ask about color preferences (warm/cool tones, specific colors)
- Ask about scent preferences (sweet, fruity, unique)
- Ask about lashes (natural, dramatic, none)
- Ask about lip products (glossy vs matte)
- Adapt language based on age (simpler for younger girls)
- Focus on building confidence and self-expression
- Keep responses encouraging and positive
- Once you have enough information, suggest they're ready for recommendations

Remember: You're helping them discover their personal style to create the perfect self-care kit that will make them feel confident and beautiful.`
          },
          ...messages.map((msg: ChatMessage) => ({
            role: msg.role as 'user' | 'assistant',
            content: msg.content
          }))
        ],
        max_tokens: 300,
        temperature: 0.7,
      });

      const response = completion.choices[0]?.message?.content || "I'm here to help you find your perfect self-care kit! Tell me more about your style preferences.";
      res.json({ message: response });
    } catch (openaiError) {
      console.error('OpenAI API error:', openaiError);
      // Use fallback response if OpenAI fails
      const fallbackResponse = generateFallbackChatResponse(messages);
      res.json({ message: fallbackResponse });
    }
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: "Failed to generate chat response" });
  }
}
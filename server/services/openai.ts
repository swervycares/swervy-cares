import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface KitRecommendations {
  lipShade: string;
  scent: string;
  lashes: string;
  oil: string;
  additionalItems: string[];
  reasoning: string;
}

export async function generateChatResponse(messages: ChatMessage[]): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are Swervy AI, a friendly and supportive assistant for Swervy Cares, a nonprofit that creates personalized self-care kits for young girls aged 6-17. Your goal is to help girls feel confident and empowered.

Guidelines:
- Be warm, encouraging, and age-appropriate
- Ask thoughtful questions about their preferences, style, and what makes them feel confident
- Focus on self-care, confidence-building, and celebrating individuality
- Keep responses concise but engaging
- Use emojis sparingly but effectively
- Always maintain a positive, supportive tone`
        },
        ...messages
      ],
      max_tokens: 300,
    });

    return response.choices[0].message.content || "I'm here to help you find your perfect self-care kit!";
  } catch (error) {
    console.error('OpenAI chat error:', error);
    return "I'm sorry, I'm having trouble connecting right now. Let me know what you'd like in your self-care kit and I'll do my best to help!";
  }
}

export async function generateKitRecommendations(chatHistory: ChatMessage[]): Promise<KitRecommendations> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an AI assistant for Swervy Cares that analyzes chat conversations to recommend personalized self-care kit items for young girls.

Based on the conversation, recommend:
- lipShade: Choose from "Coral", "Rose", "Nude", or "Berry"
- scent: Choose from "Vanilla", "Floral", "Citrus", or "Mint"
- lashes: Choose from "Natural", "Glam", or "No Lashes"
- oil: Choose "Yes" or "No" for lip oil
- additionalItems: Array of 2-4 additional items that would boost confidence
- reasoning: Brief explanation of recommendations

Respond in JSON format only.`
        },
        {
          role: "user",
          content: `Based on this conversation, what would you recommend for this girl's self-care kit? Chat history: ${JSON.stringify(chatHistory)}`
        }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      lipShade: result.lipShade || "Rose",
      scent: result.scent || "Vanilla",
      lashes: result.lashes || "Natural",
      oil: result.oil || "Yes",
      additionalItems: result.additionalItems || ["Confidence journal", "Motivational stickers"],
      reasoning: result.reasoning || "These recommendations are based on your preferences and what makes you feel confident!"
    };
  } catch (error) {
    console.error('OpenAI recommendations error:', error);
    return {
      lipShade: "Rose",
      scent: "Vanilla", 
      lashes: "Natural",
      oil: "Yes",
      additionalItems: ["Confidence journal", "Motivational stickers"],
      reasoning: "These are our popular recommendations that help girls feel confident and beautiful!"
    };
  }
}

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

interface KitRecommendations {
  lipShade: string;
  scent: string;
  lashes: string;
  oil: string;
  additionalItems: string[];
  reasoning: string;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Fallback function for when OpenAI API is unavailable
function generateFallbackKitRecommendations(chatHistory: ChatMessage[]): KitRecommendations {
  const conversation = chatHistory.map(msg => msg.content.toLowerCase()).join(' ');
  
  // Detect age for age-appropriate recommendations
  const ageMatch = conversation.match(/\b(1[0-8]|[6-9])\b/);
  const userAge = ageMatch ? parseInt(ageMatch[0]) : null;
  const isYounger = userAge && userAge <= 13;
  
  // Analyze makeup style preference
  let makeupStyle = 'natural';
  if (conversation.includes('bold') || conversation.includes('dramatic') || conversation.includes('glam')) {
    makeupStyle = 'bold';
  } else if (conversation.includes('trendy') || conversation.includes('fun') || conversation.includes('creative') || conversation.includes('experimental')) {
    makeupStyle = 'trendy';
  }
  
  // Smart lip shade recommendations
  let lipShade = "Rose Pink";
  if (makeupStyle === 'natural') {
    if (conversation.includes('warm') || conversation.includes('coral')) {
      lipShade = isYounger ? "Soft Coral" : "Coral Crush";
    } else if (conversation.includes('peach')) {
      lipShade = isYounger ? "Peach Fizz" : "Peachy Keen";
    } else if (conversation.includes('berry')) {
      lipShade = isYounger ? "Berry Sweet" : "Berry Bliss";
    } else if (conversation.includes('nude')) {
      lipShade = "Natural Nude";
    }
  } else if (makeupStyle === 'bold') {
    if (conversation.includes('red')) {
      lipShade = isYounger ? "Cherry Pop" : "Cherry Red";
    } else if (conversation.includes('purple')) {
      lipShade = isYounger ? "Purple Dream" : "Plum Perfect";
    } else if (conversation.includes('pink')) {
      lipShade = isYounger ? "Bright Pink" : "Hot Pink";
    }
  } else if (makeupStyle === 'trendy') {
    if (conversation.includes('cotton candy')) {
      lipShade = "Cotton Candy";
    } else if (conversation.includes('orange') || conversation.includes('sunset')) {
      lipShade = "Sunset Orange";
    } else if (conversation.includes('galaxy') || conversation.includes('purple')) {
      lipShade = "Galaxy Purple";
    }
  }
  
  // Smart scent recommendations
  let scent = "Vanilla";
  if (conversation.includes('vanilla')) {
    scent = "Vanilla";
  } else if (conversation.includes('cotton candy')) {
    scent = "Cotton Candy";
  } else if (conversation.includes('strawberry')) {
    scent = "Strawberry Fields";
  } else if (conversation.includes('peach')) {
    scent = "Peach Bellini";
  } else if (conversation.includes('coconut')) {
    scent = "Coconut Paradise";
  } else if (conversation.includes('raspberry')) {
    scent = "Raspberry Fizz";
  } else if (conversation.includes('cake')) {
    scent = "Cake Batter";
  } else if (conversation.includes('root beer')) {
    scent = "Root Beer";
  }
  
  // Lashes based on style
  let lashes = "Natural";
  if (conversation.includes('glam') || conversation.includes('dramatic') || makeupStyle === 'bold') {
    lashes = "Glam";
  } else if (conversation.includes('no lash') || conversation.includes('skip')) {
    lashes = "No Lashes";
  }
  
  // Lip oil preference
  let oil = "Yes";
  if (conversation.includes('matte') || conversation.includes('no oil')) {
    oil = "No";
  }
  
  // Age-appropriate additional items
  const additionalItems: string[] = [];
  if (isYounger) {
    additionalItems.push("Daily Confidence Journal");
    additionalItems.push("Positive Affirmations Sticker Sheet");
    additionalItems.push("Self-Care Routine Guide");
  } else {
    additionalItems.push("Confidence Reminder Card");
    additionalItems.push("Self-Care Planner");
    additionalItems.push("Motivational Quote Collection");
  }
  
  // Thoughtful reasoning
  let reasoning = `Based on our conversation, I can tell you have wonderful taste! `;
  if (userAge) {
    reasoning += `At ${userAge}, you're at such an exciting stage of discovering your personal style. `;
  }
  reasoning += `I chose the ${lipShade} shade because it perfectly matches your preference for ${makeupStyle} looks. The ${scent} scent was chosen because it aligns with your personality and will make you smile every time you use it. Remember, you're beautiful, worthy, and deserving of all the care and attention this kit represents! 💕`;

  return {
    lipShade,
    scent,
    lashes,
    oil,
    additionalItems,
    reasoning
  };
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
    const { chatHistory } = req.body;
    
    if (!chatHistory || !Array.isArray(chatHistory)) {
      return res.status(400).json({ error: "Chat history is required" });
    }

    try {
      const conversationSummary = chatHistory.map((msg: ChatMessage) => `${msg.role}: ${msg.content}`).join('\n');
      
      // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
      const completion = await openai.chat.completions.create({
        model: "gpt-5",
        messages: [
          {
            role: "system",
            content: `Based on the conversation with a young girl about her self-care preferences, generate personalized kit recommendations. 

Available options:
Lip Shades: Rose Pink, Coral Crush, Peachy Keen, Berry Bliss, Natural Nude, Honey Nude, Cherry Red, Purple Dream, Hot Pink, Cotton Candy, Sunset Orange, Galaxy Purple, Rose Gold, Golden Honey, Plum Perfect, Wine Berry, Midnight Blue, Fuchsia, Violet, and more

Scents: Vanilla, Cotton Candy, Cake Batter, Caramel Swirl, Root Beer, Strawberry Fields, Raspberry Fizz, Peach Bellini, Watermelon Splash, Banana Split, Blueberry Muffin, Coconut Paradise, Cherry Bomb, Grape Soda, Spring Flowers, Citrus Burst, Mint, and more

Lashes: Natural, Glam, No Lashes
Lip Oil: Yes, No

Respond in this exact JSON format:
{
  "lipShade": "[shade name]",
  "scent": "[scent name]",
  "lashes": "[lash preference]",
  "oil": "[Yes or No]",
  "additionalItems": ["item1", "item2", "item3"],
  "reasoning": "[1-2 sentences explaining why these choices fit their personality and preferences]"
}

Additional items should be confidence-building items like journals, affirmation cards, self-care guides, etc.`
          },
          {
            role: "user",
            content: `Please analyze this conversation and create personalized recommendations:\n\n${conversationSummary}`
          }
        ],
        max_tokens: 500,
        temperature: 0.3,
      });

      const responseContent = completion.choices[0]?.message?.content;
      if (responseContent) {
        try {
          const recommendations = JSON.parse(responseContent);
          res.json(recommendations);
        } catch (parseError) {
          console.error('Failed to parse AI recommendations:', parseError);
          const fallbackRecommendations = generateFallbackKitRecommendations(chatHistory);
          res.json(fallbackRecommendations);
        }
      } else {
        const fallbackRecommendations = generateFallbackKitRecommendations(chatHistory);
        res.json(fallbackRecommendations);
      }
    } catch (openaiError) {
      console.error('OpenAI API error for recommendations:', openaiError);
      const fallbackRecommendations = generateFallbackKitRecommendations(chatHistory);
      res.json(fallbackRecommendations);
    }
  } catch (error) {
    console.error('Recommendations error:', error);
    res.status(500).json({ error: "Failed to generate recommendations" });
  }
}
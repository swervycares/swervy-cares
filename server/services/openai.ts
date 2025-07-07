// OpenAI temporarily disabled while API key issues are resolved
// Will be re-enabled once a valid API key is provided

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
  // Temporary smart chatbot while OpenAI API key is being fixed
  const lastMessage = messages[messages.length - 1]?.content.toLowerCase() || '';
  const conversationLength = messages.length;
  
  // First interaction
  if (conversationLength <= 1 || lastMessage.includes('hello') || lastMessage.includes('hi')) {
    return "Hello! I'm your Swervy AI assistant! 💖 I'm here to help you discover your perfect self-care kit. What's your name?";
  }
  
  // Name response
  if (conversationLength === 2 || lastMessage.includes('my name is') || lastMessage.includes("i'm ")) {
    return "Nice to meet you! I love helping girls find their perfect self-care kit. What are your favorite colors? Do you like bright, bold colors or soft, gentle ones?";
  }
  
  // Color preferences
  if (lastMessage.includes('color') || lastMessage.includes('pink') || lastMessage.includes('purple') || lastMessage.includes('blue') || lastMessage.includes('red') || lastMessage.includes('green')) {
    return "Great choice! Those colors are beautiful! Now, what about scents? Do you prefer sweet scents like vanilla, fresh scents like citrus, or floral scents like rose?";
  }
  
  // Scent preferences
  if (lastMessage.includes('scent') || lastMessage.includes('vanilla') || lastMessage.includes('citrus') || lastMessage.includes('floral') || lastMessage.includes('sweet') || lastMessage.includes('fresh')) {
    return "Perfect! I'm getting a great sense of your style! Do you like natural-looking lashes or do you prefer a bit more glam? And would you like a lip oil to keep your lips soft and shiny?";
  }
  
  // Lash/makeup preferences
  if (lastMessage.includes('lash') || lastMessage.includes('natural') || lastMessage.includes('glam') || lastMessage.includes('makeup') || lastMessage.includes('oil') || lastMessage.includes('lip')) {
    return "Awesome! I think I have enough information to make some great recommendations for you. Would you like me to suggest a personalized kit based on what you've told me?";
  }
  
  // Ready for recommendations
  if (lastMessage.includes('yes') || lastMessage.includes('sure') || lastMessage.includes('recommend') || conversationLength >= 6) {
    return "Perfect! Based on our chat, I'll create personalized recommendations just for you. Let me generate your custom kit suggestions now! ✨";
  }
  
  // Default encouraging response
  return "I love learning about your style! Tell me more about what makes you feel confident and beautiful. What are your favorite colors, scents, or beauty looks?";
}

export async function generateKitRecommendations(chatHistory: ChatMessage[]): Promise<KitRecommendations> {
  // Smart recommendations based on chat history
  const conversation = chatHistory.map(msg => msg.content.toLowerCase()).join(' ');
  
  // Analyze preferences from conversation
  let lipShade = "Rose";
  let scent = "Vanilla";
  let lashes = "Natural";
  let oil = "Yes";
  let additionalItems = ["Confidence journal", "Motivational stickers"];
  let reasoning = "These recommendations are based on your style preferences!";
  
  // Lip shade based on color preferences
  if (conversation.includes('pink') || conversation.includes('coral')) {
    lipShade = "Coral";
  } else if (conversation.includes('red') || conversation.includes('berry')) {
    lipShade = "Berry";
  } else if (conversation.includes('nude') || conversation.includes('natural')) {
    lipShade = "Nude";
  } else if (conversation.includes('rose') || conversation.includes('purple')) {
    lipShade = "Rose";
  }
  
  // Scent based on preferences
  if (conversation.includes('vanilla') || conversation.includes('sweet')) {
    scent = "Vanilla";
  } else if (conversation.includes('floral') || conversation.includes('rose') || conversation.includes('flower')) {
    scent = "Floral";
  } else if (conversation.includes('citrus') || conversation.includes('fresh') || conversation.includes('lemon')) {
    scent = "Citrus";
  } else if (conversation.includes('mint') || conversation.includes('cool')) {
    scent = "Mint";
  }
  
  // Lashes based on style preferences
  if (conversation.includes('glam') || conversation.includes('dramatic') || conversation.includes('bold')) {
    lashes = "Glam";
  } else if (conversation.includes('no lash') || conversation.includes('without lash')) {
    lashes = "No Lashes";
  } else {
    lashes = "Natural";
  }
  
  // Additional items based on interests
  if (conversation.includes('confident') || conversation.includes('strong')) {
    additionalItems.push("Empowerment bracelet");
  }
  if (conversation.includes('creative') || conversation.includes('art')) {
    additionalItems.push("Rainbow gel pens");
  }
  if (conversation.includes('glitter') || conversation.includes('sparkle')) {
    additionalItems.push("Body glitter");
  }
  if (conversation.includes('hair') || conversation.includes('style')) {
    additionalItems.push("Hair scrunchies");
  }
  
  reasoning = `Based on your love of ${lipShade.toLowerCase()} tones and ${scent.toLowerCase()} scents, these items will help you express your unique style and feel amazing!`;
  
  return {
    lipShade,
    scent,
    lashes,
    oil,
    additionalItems: additionalItems.slice(0, 4), // Keep max 4 items
    reasoning
  };
}

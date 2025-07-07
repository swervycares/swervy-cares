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
  const lastMessage = messages[messages.length - 1]?.content.toLowerCase() || '';
  const conversationLength = messages.length;
  const allMessages = messages.map(msg => msg.content.toLowerCase()).join(' ');
  
  // First interaction
  if (conversationLength <= 1 || lastMessage.includes('hello') || lastMessage.includes('hi') || lastMessage.includes('hey')) {
    return "Hello! I'm your Swervy AI assistant! 💖 I'm here to help you discover your perfect self-care kit. What's your name?";
  }
  
  // Name response - ask about makeup style first
  if (conversationLength === 2 || lastMessage.includes('my name is') || lastMessage.includes("i'm ") || (!allMessages.includes('makeup') && !allMessages.includes('style') && conversationLength < 4)) {
    return "Nice to meet you! I love helping girls find their perfect self-care kit. Tell me about your makeup style - do you prefer natural everyday looks, bold and dramatic styles, or something trendy and fun?";
  }
  
  // Makeup style responses
  if (lastMessage.includes('natural') || lastMessage.includes('everyday') || lastMessage.includes('simple') || lastMessage.includes('minimal')) {
    return "I love natural beauty! For everyday looks, what colors make you feel most confident? Are you drawn to warm tones like corals and peaches, cool tones like roses and berries, or neutral earth tones?";
  }
  
  if (lastMessage.includes('bold') || lastMessage.includes('dramatic') || lastMessage.includes('glam') || lastMessage.includes('statement')) {
    return "Yes, dramatic looks are so empowering! For bold styles, do you gravitate toward rich jewel tones like deep purples and emeralds, classic dramatic colors like deep reds and blacks, or fun bright colors like hot pinks and electric blues?";
  }
  
  if (lastMessage.includes('trendy') || lastMessage.includes('fun') || lastMessage.includes('creative') || lastMessage.includes('experimental')) {
    return "I love your creative spirit! For trendy looks, are you into soft pastels and dreamy colors, vibrant rainbow and neon shades, or unique color combinations like sunset oranges and galaxy purples?";
  }
  
  // Color preference responses - more detailed based on what they mentioned
  if (lastMessage.includes('warm') || lastMessage.includes('coral') || lastMessage.includes('peach') || lastMessage.includes('orange') || lastMessage.includes('gold')) {
    return "Warm tones are gorgeous on everyone! Since you love warm colors, what about scents? Do you prefer sweet treats like vanilla and caramel, fruity flavors like peach and strawberry, or warm spices like cinnamon?";
  }
  
  if (lastMessage.includes('cool') || lastMessage.includes('rose') || lastMessage.includes('berry') || lastMessage.includes('purple') || lastMessage.includes('blue')) {
    return "Cool tones are so elegant! With your love for cool colors, what scents call to you? Sweet berries like raspberry and blueberry, fresh and clean scents, or floral fragrances?";
  }
  
  if (lastMessage.includes('neutral') || lastMessage.includes('earth') || lastMessage.includes('brown') || lastMessage.includes('nude') || lastMessage.includes('beige')) {
    return "Neutral tones are so versatile and chic! For scents that match your earthy style, do you like cozy scents like vanilla and coconut, fresh fruit like banana and watermelon, or unique treats like cake batter and root beer?";
  }
  
  // Handle any color mentions
  const colors = ['pink', 'purple', 'blue', 'red', 'green', 'yellow', 'black', 'white', 'silver', 'gold', 'teal', 'turquoise'];
  if (colors.some(color => lastMessage.includes(color))) {
    return "Beautiful color choice! Those shades would look amazing on you. Now let's talk scents - what makes you feel happy and confident? Sweet dessert scents, fresh fruity ones, or something unique and fun?";
  }
  
  // Scent responses - much more detailed
  const sweetScents = ['vanilla', 'caramel', 'cake batter', 'cotton candy', 'sweet'];
  const fruityScents = ['strawberry', 'raspberry', 'peach', 'watermelon', 'banana', 'blueberry', 'fruit'];
  const uniqueScents = ['root beer', 'coconut', 'unique', 'different'];
  
  if (sweetScents.some(scent => lastMessage.includes(scent))) {
    return "Mmm, sweet scents are the best! Since you love dessert-inspired scents, let's talk lashes. Do you prefer a natural flutter that enhances your eyes, dramatic lashes that make a statement, or would you rather skip lashes and focus on other features?";
  }
  
  if (fruityScents.some(scent => lastMessage.includes(scent))) {
    return "Fruity scents are so fresh and fun! Perfect for someone with your vibrant personality. For lashes, what matches your fruity, fresh vibe - natural wispy lashes, fun colorful lashes, or clean no-lash looks?";
  }
  
  if (uniqueScents.some(scent => lastMessage.includes(scent)) || lastMessage.includes('coconut')) {
    return "I love that you're drawn to unique scents! You definitely have your own style. For lashes to match your individuality, are you thinking bold dramatic lashes, subtle natural ones, or maybe experimenting with no lashes at all?";
  }
  
  // Lash preferences
  if (lastMessage.includes('lash') || lastMessage.includes('dramatic') || lastMessage.includes('natural') || lastMessage.includes('no lash') || lastMessage.includes('skip')) {
    return "Perfect! I'm getting such a clear picture of your amazing style. One last question - do you love glossy, shiny lips with lip oils, or do you prefer a more matte, natural lip feel?";
  }
  
  // Lip preference
  if (lastMessage.includes('gloss') || lastMessage.includes('shiny') || lastMessage.includes('oil') || lastMessage.includes('matte') || lastMessage.includes('natural lip')) {
    return "Amazing! I have everything I need to create the perfect kit for you. Should I put together some personalized recommendations based on your unique style?";
  }
  
  // Ready for recommendations
  if (lastMessage.includes('yes') || lastMessage.includes('sure') || lastMessage.includes('recommend') || conversationLength >= 8) {
    return "Perfect! Based on our chat about your style, I'll create personalized recommendations just for you. Let me generate your custom kit suggestions now! ✨";
  }
  
  // Default encouraging responses based on context
  if (allMessages.includes('color') && !allMessages.includes('scent')) {
    return "I love your color choices! Now tell me about scents - what kind of fragrances make you smile? Sweet like vanilla and cotton candy, fruity like strawberry and peach, or something unique?";
  }
  
  if (allMessages.includes('scent') && !allMessages.includes('lash')) {
    return "Your scent preferences are perfect! Let's talk about lashes - do you like natural, dramatic, or prefer to skip them entirely?";
  }
  
  return "I love learning about your style! Tell me more - what makeup looks do you gravitate toward? What colors make you feel most confident? Any favorite scents that make you happy?";
}

export async function generateKitRecommendations(chatHistory: ChatMessage[]): Promise<KitRecommendations> {
  const conversation = chatHistory.map(msg => msg.content.toLowerCase()).join(' ');
  
  // Analyze makeup style preference
  let makeupStyle = 'natural';
  if (conversation.includes('bold') || conversation.includes('dramatic') || conversation.includes('glam')) {
    makeupStyle = 'bold';
  } else if (conversation.includes('trendy') || conversation.includes('fun') || conversation.includes('creative')) {
    makeupStyle = 'trendy';
  }
  
  // Enhanced lip shade recommendations based on style and color preferences
  let lipShade = "Rose Pink";
  
  // For natural/everyday style
  if (makeupStyle === 'natural') {
    if (conversation.includes('warm') || conversation.includes('coral') || conversation.includes('peach')) {
      lipShade = "Coral";
    } else if (conversation.includes('cool') || conversation.includes('rose') || conversation.includes('berry')) {
      lipShade = "Rose Pink";
    } else if (conversation.includes('nude') || conversation.includes('neutral') || conversation.includes('beige')) {
      lipShade = "Nude";
    } else if (conversation.includes('pink')) {
      lipShade = "Baby Pink";
    }
  }
  
  // For bold/dramatic style
  else if (makeupStyle === 'bold') {
    if (conversation.includes('red') || conversation.includes('cherry')) {
      lipShade = "Cherry Red";
    } else if (conversation.includes('purple') || conversation.includes('plum')) {
      lipShade = "Plum";
    } else if (conversation.includes('berry') || conversation.includes('wine')) {
      lipShade = "Wine";
    } else if (conversation.includes('pink')) {
      lipShade = "Hot Pink";
    }
  }
  
  // For trendy/fun style
  else if (makeupStyle === 'trendy') {
    if (conversation.includes('pink')) {
      lipShade = "Fuchsia";
    } else if (conversation.includes('orange') || conversation.includes('sunset')) {
      lipShade = "Sunset Orange";
    } else if (conversation.includes('purple')) {
      lipShade = "Violet";
    } else if (conversation.includes('gold') || conversation.includes('metallic')) {
      lipShade = "Rose Gold";
    }
  }
  
  // Enhanced scent recommendations
  let scent = "Vanilla";
  
  // Sweet treats
  if (conversation.includes('vanilla') || conversation.includes('sweet')) {
    scent = "Vanilla";
  } else if (conversation.includes('cotton candy')) {
    scent = "Cotton Candy";
  } else if (conversation.includes('cake batter') || conversation.includes('birthday')) {
    scent = "Cake Batter";
  } else if (conversation.includes('caramel')) {
    scent = "Caramel";
  } else if (conversation.includes('root beer') || conversation.includes('unique')) {
    scent = "Root Beer";
  }
  
  // Fruity scents
  else if (conversation.includes('strawberry')) {
    scent = "Strawberry";
  } else if (conversation.includes('raspberry')) {
    scent = "Raspberry";
  } else if (conversation.includes('peach')) {
    scent = "Peach";
  } else if (conversation.includes('watermelon')) {
    scent = "Watermelon";
  } else if (conversation.includes('banana')) {
    scent = "Banana";
  } else if (conversation.includes('blueberry')) {
    scent = "Blueberry";
  } else if (conversation.includes('coconut')) {
    scent = "Coconut";
  }
  
  // Classic scents
  else if (conversation.includes('floral') || conversation.includes('flower')) {
    scent = "Floral";
  } else if (conversation.includes('citrus') || conversation.includes('fresh')) {
    scent = "Citrus";
  } else if (conversation.includes('mint')) {
    scent = "Mint";
  }
  
  // Lashes based on style
  let lashes = "Natural";
  if (conversation.includes('glam') || conversation.includes('dramatic') || makeupStyle === 'bold') {
    lashes = "Glam";
  } else if (conversation.includes('no lash') || conversation.includes('skip') || conversation.includes('without')) {
    lashes = "No Lashes";
  }
  
  // Lip oil preference
  let oil = "Yes";
  if (conversation.includes('matte') || conversation.includes('no oil') || conversation.includes('without oil')) {
    oil = "No";
  }
  
  // Additional items based on style and interests
  let additionalItems = ["Confidence journal", "Motivational stickers"];
  
  if (makeupStyle === 'bold') {
    additionalItems = ["Empowerment bracelet", "Statement hair clips", "Bold nail stickers", "Confidence affirmations"];
  } else if (makeupStyle === 'trendy') {
    additionalItems = ["Rainbow gel pens", "Holographic stickers", "Trendy hair scrunchies", "Color-changing lip balm"];
  } else {
    additionalItems = ["Soft headband", "Natural beauty tips", "Gentle face masks", "Inspirational bookmark"];
  }
  
  if (conversation.includes('creative') || conversation.includes('art')) {
    additionalItems.push("Art supplies set");
  }
  if (conversation.includes('confident') || conversation.includes('strong')) {
    additionalItems.push("Empowerment journal");
  }
  
  const reasoning = `Based on your ${makeupStyle} style preferences and love for ${scent.toLowerCase()} scents, I've chosen ${lipShade} to perfectly match your personality. These items will help you express your unique style!`;
  
  return {
    lipShade,
    scent,
    lashes,
    oil,
    additionalItems: additionalItems.slice(0, 4),
    reasoning
  };
}

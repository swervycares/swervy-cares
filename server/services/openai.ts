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
  
  // Makeup style responses with age-appropriate suggestions
  if (lastMessage.includes('natural') || lastMessage.includes('everyday') || lastMessage.includes('simple') || lastMessage.includes('minimal')) {
    if (isYounger) {
      return "Natural looks are perfect for school! What colors make you feel happy and confident? Do you like soft pinks and corals, berry colors like strawberry, or maybe neutral shades that go with everything?";
    } else {
      return "I love natural beauty! For everyday looks, what colors make you feel most confident? Are you drawn to warm tones like corals and peaches, cool tones like roses and berries, or neutral earth tones?";
    }
  }
  
  if (lastMessage.includes('bold') || lastMessage.includes('dramatic') || lastMessage.includes('glam') || lastMessage.includes('statement')) {
    if (isYounger) {
      return "Fun bold colors are amazing! What bright colors make you smile? Pretty purples and blues, classic reds and pinks, or maybe rainbow colors?";
    } else {
      return "Yes, dramatic looks are so empowering! For bold styles, do you gravitate toward rich jewel tones like deep purples and emeralds, classic dramatic colors like deep reds and blacks, or fun bright colors like hot pinks and electric blues?";
    }
  }
  
  if (lastMessage.includes('trendy') || lastMessage.includes('fun') || lastMessage.includes('creative') || lastMessage.includes('experimental')) {
    if (isYounger) {
      return "I love that you like trying new things! Are you into pretty pastel colors like cotton candy pink, bright fun colors like sunshine yellow, or maybe sunset colors like orange and pink together?";
    } else {
      return "I love your creative spirit! For trendy looks, are you into soft pastels and dreamy colors, vibrant rainbow and neon shades, or unique color combinations like sunset oranges and galaxy purples?";
    }
  }
  
  // Color preference responses - more detailed and age-appropriate
  if (lastMessage.includes('warm') || lastMessage.includes('coral') || lastMessage.includes('peach') || lastMessage.includes('orange') || lastMessage.includes('gold')) {
    if (isYounger) {
      return "Warm colors are so pretty on you! Now for scents - what smells make you happy? Sweet treats like vanilla and birthday cake, yummy fruits like peach and strawberry, or cozy scents like cinnamon?";
    } else {
      return "Warm tones are gorgeous on everyone! Since you love warm colors, what about scents? Do you prefer sweet treats like vanilla and caramel, fruity flavors like peach and strawberry, or warm spices like cinnamon?";
    }
  }
  
  if (lastMessage.includes('cool') || lastMessage.includes('rose') || lastMessage.includes('berry') || lastMessage.includes('purple') || lastMessage.includes('blue')) {
    if (isYounger) {
      return "Cool colors are so beautiful! What scents do you love? Sweet berries like raspberry and blueberry, fresh clean scents, or pretty flower scents?";
    } else {
      return "Cool tones are so elegant! With your love for cool colors, what scents call to you? Sweet berries like raspberry and blueberry, fresh and clean scents, or floral fragrances?";
    }
  }
  
  if (lastMessage.includes('neutral') || lastMessage.includes('earth') || lastMessage.includes('brown') || lastMessage.includes('nude') || lastMessage.includes('beige')) {
    if (isYounger) {
      return "Neutral colors go with everything! For scents, do you like cozy ones like vanilla and coconut, fresh fruit like banana and watermelon, or fun treats like cake batter?";
    } else {
      return "Neutral tones are so versatile and chic! For scents that match your earthy style, do you like cozy scents like vanilla and coconut, fresh fruit like banana and watermelon, or unique treats like cake batter and root beer?";
    }
  }
  
  // Handle any color mentions with memory of school context
  const colors = ['pink', 'purple', 'blue', 'red', 'green', 'yellow', 'black', 'white', 'silver', 'gold', 'teal', 'turquoise'];
  if (colors.some(color => lastMessage.includes(color))) {
    // Remember if they mentioned school context
    const schoolContext = allMessages.includes('school') || allMessages.includes('class') || allMessages.includes('homework');
    if (schoolContext && isYounger) {
      return "Beautiful color choice! That would look perfect for school. Now let's talk scents - what smells make you smile? Sweet ones like cotton candy, fruity ones like strawberry, or fresh ones?";
    } else if (isYounger) {
      return "Beautiful color choice! Those colors would look so pretty on you. What scents do you love? Sweet treats, yummy fruits, or fresh clean scents?";
    } else {
      return "Beautiful color choice! Those shades would look amazing on you. Now let's talk scents - what makes you feel happy and confident? Sweet dessert scents, fresh fruity ones, or something unique and fun?";
    }
  }
  
  // Scent responses - much more detailed with confidence-building language
  const sweetScents = ['vanilla', 'caramel', 'cake batter', 'cotton candy', 'sweet', 'birthday'];
  const fruityScents = ['strawberry', 'raspberry', 'peach', 'watermelon', 'banana', 'blueberry', 'fruit'];
  const uniqueScents = ['root beer', 'coconut', 'unique', 'different'];
  
  if (sweetScents.some(scent => lastMessage.includes(scent))) {
    if (isYounger) {
      return "Sweet scents are amazing! You have such great taste. Now for lashes - do you like natural ones that make your eyes sparkle, or would you rather skip lashes and keep it simple?";
    } else {
      return "Mmm, sweet scents are the best! Since you love dessert-inspired scents, let's talk lashes. Do you prefer a natural flutter that enhances your eyes, dramatic lashes that make a statement, or would you rather skip lashes and focus on other features?";
    }
  }
  
  if (fruityScents.some(scent => lastMessage.includes(scent))) {
    if (isYounger) {
      return "Fruity scents are so fun and fresh! You clearly know what you like. For lashes, do you want natural ones that look pretty, or prefer to keep your look simple without lashes?";
    } else {
      return "Fruity scents are so fresh and fun! Perfect for someone with your vibrant personality. For lashes, what matches your fruity, fresh vibe - natural wispy lashes, fun colorful lashes, or clean no-lash looks?";
    }
  }
  
  if (uniqueScents.some(scent => lastMessage.includes(scent)) || lastMessage.includes('coconut')) {
    if (isYounger) {
      return "Unique scents are so cool! You definitely have your own special style. For lashes, do you like natural ones or prefer to skip them completely?";
    } else {
      return "I love that you're drawn to unique scents! You definitely have your own style. For lashes to match your individuality, are you thinking bold dramatic lashes, subtle natural ones, or maybe experimenting with no lashes at all?";
    }
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
  
  // Detect age for age-appropriate recommendations
  const ageMatch = conversation.match(/\b(1[0-8]|[6-9])\b/);
  const userAge = ageMatch ? parseInt(ageMatch[0]) : null;
  const isYounger = userAge && userAge <= 13;
  
  // Analyze makeup style preference with more nuance
  let makeupStyle = 'natural';
  if (conversation.includes('bold') || conversation.includes('dramatic') || conversation.includes('glam')) {
    makeupStyle = 'bold';
  } else if (conversation.includes('trendy') || conversation.includes('fun') || conversation.includes('creative') || conversation.includes('experimental')) {
    makeupStyle = 'trendy';
  }
  
  // Enhanced lip shade recommendations - over 30 options based on conversation context
  let lipShade = "Rose Pink";
  
  // For natural/everyday style
  if (makeupStyle === 'natural') {
    if (conversation.includes('warm') || conversation.includes('coral')) {
      lipShade = isYounger ? "Soft Coral" : "Coral Crush";
    } else if (conversation.includes('peach')) {
      lipShade = isYounger ? "Peach Fizz" : "Peachy Keen";
    } else if (conversation.includes('cool') || conversation.includes('rose')) {
      lipShade = isYounger ? "Rose Petal" : "Rose Pink";
    } else if (conversation.includes('berry') || conversation.includes('strawberry')) {
      lipShade = isYounger ? "Berry Sweet" : "Berry Bliss";
    } else if (conversation.includes('nude') || conversation.includes('neutral')) {
      lipShade = isYounger ? "Natural Nude" : "Nude Glow";
    } else if (conversation.includes('beige') || conversation.includes('brown')) {
      lipShade = "Honey Nude";
    } else if (conversation.includes('pink')) {
      lipShade = isYounger ? "Baby Pink" : "Blush Pink";
    }
  }
  
  // For bold/dramatic style (age-appropriate)
  else if (makeupStyle === 'bold') {
    if (conversation.includes('red') || conversation.includes('cherry')) {
      lipShade = isYounger ? "Cherry Pop" : "Cherry Red";
    } else if (conversation.includes('purple') || conversation.includes('plum')) {
      lipShade = isYounger ? "Purple Dream" : "Plum Perfect";
    } else if (conversation.includes('berry') || conversation.includes('wine')) {
      lipShade = isYounger ? "Berry Bold" : "Wine Berry";
    } else if (conversation.includes('pink')) {
      lipShade = isYounger ? "Bright Pink" : "Hot Pink";
    } else if (conversation.includes('blue')) {
      lipShade = isYounger ? "Blue Berry" : "Midnight Blue";
    }
  }
  
  // For trendy/fun style
  else if (makeupStyle === 'trendy') {
    if (conversation.includes('pink') || conversation.includes('cotton candy')) {
      lipShade = isYounger ? "Cotton Candy" : "Fuchsia";
    } else if (conversation.includes('orange') || conversation.includes('sunset')) {
      lipShade = isYounger ? "Sunset Glow" : "Sunset Orange";
    } else if (conversation.includes('purple') || conversation.includes('galaxy')) {
      lipShade = isYounger ? "Galaxy Purple" : "Violet";
    } else if (conversation.includes('gold') || conversation.includes('metallic')) {
      lipShade = "Rose Gold";
    } else if (conversation.includes('yellow') || conversation.includes('sunshine')) {
      lipShade = "Golden Honey";
    }
  }
  
  // Enhanced scent recommendations - 16+ varieties based on conversation
  let scent = "Vanilla";
  
  // Sweet treats (age-appropriate names)
  if (conversation.includes('vanilla') || conversation.includes('sweet')) {
    scent = isYounger ? "Vanilla Dream" : "Vanilla";
  } else if (conversation.includes('cotton candy')) {
    scent = "Cotton Candy";
  } else if (conversation.includes('cake batter') || conversation.includes('birthday')) {
    scent = isYounger ? "Birthday Cake" : "Cake Batter";
  } else if (conversation.includes('caramel')) {
    scent = "Caramel Swirl";
  } else if (conversation.includes('root beer') || conversation.includes('unique')) {
    scent = isYounger ? "Root Beer Float" : "Root Beer";
  } else if (conversation.includes('chocolate')) {
    scent = "Chocolate Chip";
  } else if (conversation.includes('marshmallow')) {
    scent = "Marshmallow";
  }
  
  // Fruity scents
  else if (conversation.includes('strawberry')) {
    scent = "Strawberry Fields";
  } else if (conversation.includes('raspberry')) {
    scent = "Raspberry Fizz";
  } else if (conversation.includes('peach')) {
    scent = "Peach Bellini";
  } else if (conversation.includes('watermelon')) {
    scent = "Watermelon Splash";
  } else if (conversation.includes('banana')) {
    scent = "Banana Split";
  } else if (conversation.includes('blueberry')) {
    scent = "Blueberry Muffin";
  } else if (conversation.includes('coconut')) {
    scent = "Coconut Paradise";
  } else if (conversation.includes('cherry')) {
    scent = "Cherry Bomb";
  } else if (conversation.includes('grape')) {
    scent = "Grape Soda";
  }
  
  // Fresh/Clean scents
  else if (conversation.includes('floral') || conversation.includes('flower')) {
    scent = isYounger ? "Spring Flowers" : "Floral Bouquet";
  } else if (conversation.includes('citrus') || conversation.includes('fresh')) {
    scent = "Citrus Burst";
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
  
  // Smart additional items based on conversation context and age
  const additionalItems = [];
  
  // Age-appropriate confidence items
  if (isYounger) {
    additionalItems.push("Daily Confidence Journal");
    additionalItems.push("Positive Affirmations Sticker Sheet");
    additionalItems.push("Self-Care Routine Guide");
  } else {
    additionalItems.push("Confidence Reminder Card");
    additionalItems.push("Self-Care Planner");
    additionalItems.push("Motivational Quote Collection");
  }
  
  // Add items based on conversation themes
  if (conversation.includes('school') || conversation.includes('class')) {
    additionalItems.push(isYounger ? "School Confidence Tips" : "Academic Success Guide");
  }
  
  if (conversation.includes('friends') || conversation.includes('social')) {
    additionalItems.push("Friendship & Social Confidence Tips");
  }
  
  if (conversation.includes('nervous') || conversation.includes('anxious') || conversation.includes('worry')) {
    additionalItems.push("Calming Breathing Exercise Card");
  }
  
  // Keep only top 3-4 most relevant items
  const finalItems = additionalItems.slice(0, Math.min(4, additionalItems.length));
  
  // Thoughtful reasoning that shows the AI "understood" them
  let reasoning = `Based on our conversation, I can tell you have wonderful taste! `;
  
  if (userAge) {
    reasoning += `At ${userAge}, you're at such an exciting stage of discovering your personal style. `;
  }
  
  reasoning += `I chose the ${lipShade} shade because it perfectly matches your preference for ${makeupStyle} looks`;
  
  if (conversation.includes('warm') || conversation.includes('cool') || conversation.includes('neutral')) {
    const tonePreference = conversation.includes('warm') ? 'warm' : conversation.includes('cool') ? 'cool' : 'neutral';
    reasoning += ` and your love for ${tonePreference} tones`;
  }
  
  reasoning += `. The ${scent} scent was chosen because it aligns with your personality and will make you smile every time you use it. `;
  
  if (conversation.includes('school')) {
    reasoning += `Since you mentioned school, this kit is perfect for building confidence in your daily routine. `;
  }
  
  reasoning += `The additional items are specially selected to support your confidence journey. Remember, you're beautiful, worthy, and deserving of all the care and attention this kit represents! 💕`;

  return {
    lipShade,
    scent,
    lashes,
    oil,
    additionalItems: finalItems,
    reasoning
  };
}

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";
import { z as z2 } from "zod";

// server/services/openai.ts
import OpenAI from "openai";
var openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
async function generateChatResponse(messages) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
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
        ...messages.map((msg) => ({
          role: msg.role,
          content: msg.content
        }))
      ],
      max_tokens: 300,
      temperature: 0.7
    });
    return completion.choices[0]?.message?.content || "I'm here to help you find your perfect self-care kit! Tell me more about your style preferences.";
  } catch (error) {
    console.error("OpenAI API error:", error);
    return generateFallbackChatResponse(messages);
  }
}
function generateFallbackChatResponse(messages) {
  const lastMessage = messages[messages.length - 1]?.content.toLowerCase() || "";
  const conversationLength = messages.length;
  const allMessages = messages.map((msg) => msg.content.toLowerCase()).join(" ");
  const ageMatch = allMessages.match(/\b(1[0-8]|[6-9])\b/);
  const userAge = ageMatch ? parseInt(ageMatch[0]) : null;
  const isYounger = userAge && userAge <= 13;
  const isOlder = userAge && userAge >= 16;
  if (conversationLength <= 1 || lastMessage.includes("hello") || lastMessage.includes("hi") || lastMessage.includes("hey")) {
    return "Hello! I'm your Swervy AI assistant! \u{1F496} I'm here to help you discover your perfect self-care kit. What's your name and how old are you?";
  }
  if (conversationLength === 2 || lastMessage.includes("my name is") || lastMessage.includes("i'm ") || !allMessages.includes("makeup") && !allMessages.includes("style") && conversationLength < 4) {
    if (isYounger) {
      return "Nice to meet you! I love helping girls discover fun self-care routines. What kind of makeup looks do you like - natural and simple for everyday, or do you like experimenting with fun colors?";
    } else if (isOlder) {
      return "Nice to meet you! I'm excited to help you create the perfect self-care kit. Tell me about your makeup style - do you prefer natural everyday looks, bold and dramatic styles, or trendy experimental looks?";
    } else {
      return "Nice to meet you! I love helping girls find their perfect self-care kit. Tell me about your makeup style - do you prefer natural everyday looks, bold and dramatic styles, or something trendy and fun?";
    }
  }
  if (lastMessage.includes("natural") || lastMessage.includes("everyday") || lastMessage.includes("simple") || lastMessage.includes("minimal")) {
    if (isYounger) {
      return "Natural looks are perfect for school! What colors make you feel happy and confident? Do you like soft pinks and corals, berry colors like strawberry, or maybe neutral shades that go with everything?";
    } else {
      return "I love natural beauty! For everyday looks, what colors make you feel most confident? Are you drawn to warm tones like corals and peaches, cool tones like roses and berries, or neutral earth tones?";
    }
  }
  if (lastMessage.includes("bold") || lastMessage.includes("dramatic") || lastMessage.includes("glam") || lastMessage.includes("statement")) {
    if (isYounger) {
      return "Fun bold colors are amazing! What bright colors make you smile? Pretty purples and blues, classic reds and pinks, or maybe rainbow colors?";
    } else {
      return "Yes, dramatic looks are so empowering! For bold styles, do you gravitate toward rich jewel tones like deep purples and emeralds, classic dramatic colors like deep reds and blacks, or fun bright colors like hot pinks and electric blues?";
    }
  }
  if (lastMessage.includes("trendy") || lastMessage.includes("fun") || lastMessage.includes("creative") || lastMessage.includes("experimental")) {
    if (isYounger) {
      return "I love that you like trying new things! Are you into pretty pastel colors like cotton candy pink, bright fun colors like sunshine yellow, or maybe sunset colors like orange and pink together?";
    } else {
      return "I love your creative spirit! For trendy looks, are you into soft pastels and dreamy colors, vibrant rainbow and neon shades, or unique color combinations like sunset oranges and galaxy purples?";
    }
  }
  if (lastMessage.includes("warm") || lastMessage.includes("coral") || lastMessage.includes("peach") || lastMessage.includes("orange") || lastMessage.includes("gold")) {
    if (isYounger) {
      return "Warm colors are so pretty on you! Now for scents - what smells make you happy? Sweet treats like vanilla and birthday cake, yummy fruits like peach and strawberry, or cozy scents like cinnamon?";
    } else {
      return "Warm tones are gorgeous on everyone! Since you love warm colors, what about scents? Do you prefer sweet treats like vanilla and caramel, fruity flavors like peach and strawberry, or warm spices like cinnamon?";
    }
  }
  if (lastMessage.includes("cool") || lastMessage.includes("rose") || lastMessage.includes("berry") || lastMessage.includes("purple") || lastMessage.includes("blue")) {
    if (isYounger) {
      return "Cool colors are so beautiful! What scents do you love? Sweet berries like raspberry and blueberry, fresh clean scents, or pretty flower scents?";
    } else {
      return "Cool tones are so elegant! With your love for cool colors, what scents call to you? Sweet berries like raspberry and blueberry, fresh and clean scents, or floral fragrances?";
    }
  }
  if (lastMessage.includes("neutral") || lastMessage.includes("earth") || lastMessage.includes("brown") || lastMessage.includes("nude") || lastMessage.includes("beige")) {
    if (isYounger) {
      return "Neutral colors go with everything! For scents, do you like cozy ones like vanilla and coconut, fresh fruit like banana and watermelon, or fun treats like cake batter?";
    } else {
      return "Neutral tones are so versatile and chic! For scents that match your earthy style, do you like cozy scents like vanilla and coconut, fresh fruit like banana and watermelon, or unique treats like cake batter and root beer?";
    }
  }
  const colors = ["pink", "purple", "blue", "red", "green", "yellow", "black", "white", "silver", "gold", "teal", "turquoise"];
  if (colors.some((color) => lastMessage.includes(color))) {
    const schoolContext = allMessages.includes("school") || allMessages.includes("class") || allMessages.includes("homework");
    if (schoolContext && isYounger) {
      return "Beautiful color choice! That would look perfect for school. Now let's talk scents - what smells make you smile? Sweet ones like cotton candy, fruity ones like strawberry, or fresh ones?";
    } else if (isYounger) {
      return "Beautiful color choice! Those colors would look so pretty on you. What scents do you love? Sweet treats, yummy fruits, or fresh clean scents?";
    } else {
      return "Beautiful color choice! Those shades would look amazing on you. Now let's talk scents - what makes you feel happy and confident? Sweet dessert scents, fresh fruity ones, or something unique and fun?";
    }
  }
  const sweetScents = ["vanilla", "caramel", "cake batter", "cotton candy", "sweet", "birthday"];
  const fruityScents = ["strawberry", "raspberry", "peach", "watermelon", "banana", "blueberry", "fruit"];
  const uniqueScents = ["root beer", "coconut", "unique", "different"];
  if (sweetScents.some((scent) => lastMessage.includes(scent))) {
    if (isYounger) {
      return "Sweet scents are amazing! You have such great taste. Now for lashes - do you like natural ones that make your eyes sparkle, or would you rather skip lashes and keep it simple?";
    } else {
      return "Mmm, sweet scents are the best! Since you love dessert-inspired scents, let's talk lashes. Do you prefer a natural flutter that enhances your eyes, dramatic lashes that make a statement, or would you rather skip lashes and focus on other features?";
    }
  }
  if (fruityScents.some((scent) => lastMessage.includes(scent))) {
    if (isYounger) {
      return "Fruity scents are so fun and fresh! You clearly know what you like. For lashes, do you want natural ones that look pretty, or prefer to keep your look simple without lashes?";
    } else {
      return "Fruity scents are so fresh and fun! Perfect for someone with your vibrant personality. For lashes, what matches your fruity, fresh vibe - natural wispy lashes, fun colorful lashes, or clean no-lash looks?";
    }
  }
  if (uniqueScents.some((scent) => lastMessage.includes(scent)) || lastMessage.includes("coconut")) {
    if (isYounger) {
      return "Unique scents are so cool! You definitely have your own special style. For lashes, do you like natural ones or prefer to skip them completely?";
    } else {
      return "I love that you're drawn to unique scents! You definitely have your own style. For lashes to match your individuality, are you thinking bold dramatic lashes, subtle natural ones, or maybe experimenting with no lashes at all?";
    }
  }
  if (lastMessage.includes("lash") || lastMessage.includes("dramatic") || lastMessage.includes("natural") || lastMessage.includes("no lash") || lastMessage.includes("skip")) {
    return "Perfect! I'm getting such a clear picture of your amazing style. One last question - do you love glossy, shiny lips with lip oils, or do you prefer a more matte, natural lip feel?";
  }
  if (lastMessage.includes("gloss") || lastMessage.includes("shiny") || lastMessage.includes("oil") || lastMessage.includes("matte") || lastMessage.includes("natural lip")) {
    return "Amazing! I have everything I need to create the perfect kit for you. Should I put together some personalized recommendations based on your unique style?";
  }
  if (lastMessage.includes("yes") || lastMessage.includes("sure") || lastMessage.includes("recommend") || conversationLength >= 8) {
    return "Perfect! Based on our chat about your style, I'll create personalized recommendations just for you. Let me generate your custom kit suggestions now! \u2728";
  }
  if (allMessages.includes("color") && !allMessages.includes("scent")) {
    return "I love your color choices! Now tell me about scents - what kind of fragrances make you smile? Sweet like vanilla and cotton candy, fruity like strawberry and peach, or something unique?";
  }
  if (allMessages.includes("scent") && !allMessages.includes("lash")) {
    return "Your scent preferences are perfect! Let's talk about lashes - do you like natural, dramatic, or prefer to skip them entirely?";
  }
  return "I love learning about your style! Tell me more - what makeup looks do you gravitate toward? What colors make you feel most confident? Any favorite scents that make you happy?";
}
async function generateKitRecommendations(chatHistory) {
  try {
    const conversationSummary = chatHistory.map((msg) => `${msg.role}: ${msg.content}`).join("\n");
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
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
          content: `Please analyze this conversation and create personalized recommendations:

${conversationSummary}`
        }
      ],
      max_tokens: 500,
      temperature: 0.3
    });
    const responseContent = completion.choices[0]?.message?.content;
    if (responseContent) {
      try {
        const recommendations = JSON.parse(responseContent);
        return recommendations;
      } catch (parseError) {
        console.error("Failed to parse AI recommendations:", parseError);
        return generateFallbackKitRecommendations(chatHistory);
      }
    }
    return generateFallbackKitRecommendations(chatHistory);
  } catch (error) {
    console.error("OpenAI API error for recommendations:", error);
    return generateFallbackKitRecommendations(chatHistory);
  }
}
function generateFallbackKitRecommendations(chatHistory) {
  const conversation = chatHistory.map((msg) => msg.content.toLowerCase()).join(" ");
  const ageMatch = conversation.match(/\b(1[0-8]|[6-9])\b/);
  const userAge = ageMatch ? parseInt(ageMatch[0]) : null;
  const isYounger = userAge && userAge <= 13;
  let makeupStyle = "natural";
  if (conversation.includes("bold") || conversation.includes("dramatic") || conversation.includes("glam")) {
    makeupStyle = "bold";
  } else if (conversation.includes("trendy") || conversation.includes("fun") || conversation.includes("creative") || conversation.includes("experimental")) {
    makeupStyle = "trendy";
  }
  let lipShade = "Rose Pink";
  if (makeupStyle === "natural") {
    if (conversation.includes("warm") || conversation.includes("coral")) {
      lipShade = isYounger ? "Soft Coral" : "Coral Crush";
    } else if (conversation.includes("peach")) {
      lipShade = isYounger ? "Peach Fizz" : "Peachy Keen";
    } else if (conversation.includes("cool") || conversation.includes("rose")) {
      lipShade = isYounger ? "Rose Petal" : "Rose Pink";
    } else if (conversation.includes("berry") || conversation.includes("strawberry")) {
      lipShade = isYounger ? "Berry Sweet" : "Berry Bliss";
    } else if (conversation.includes("nude") || conversation.includes("neutral")) {
      lipShade = isYounger ? "Natural Nude" : "Nude Glow";
    } else if (conversation.includes("beige") || conversation.includes("brown")) {
      lipShade = "Honey Nude";
    } else if (conversation.includes("pink")) {
      lipShade = isYounger ? "Baby Pink" : "Blush Pink";
    }
  } else if (makeupStyle === "bold") {
    if (conversation.includes("red") || conversation.includes("cherry")) {
      lipShade = isYounger ? "Cherry Pop" : "Cherry Red";
    } else if (conversation.includes("purple") || conversation.includes("plum")) {
      lipShade = isYounger ? "Purple Dream" : "Plum Perfect";
    } else if (conversation.includes("berry") || conversation.includes("wine")) {
      lipShade = isYounger ? "Berry Bold" : "Wine Berry";
    } else if (conversation.includes("pink")) {
      lipShade = isYounger ? "Bright Pink" : "Hot Pink";
    } else if (conversation.includes("blue")) {
      lipShade = isYounger ? "Blue Berry" : "Midnight Blue";
    }
  } else if (makeupStyle === "trendy") {
    if (conversation.includes("pink") || conversation.includes("cotton candy")) {
      lipShade = isYounger ? "Cotton Candy" : "Fuchsia";
    } else if (conversation.includes("orange") || conversation.includes("sunset")) {
      lipShade = isYounger ? "Sunset Glow" : "Sunset Orange";
    } else if (conversation.includes("purple") || conversation.includes("galaxy")) {
      lipShade = isYounger ? "Galaxy Purple" : "Violet";
    } else if (conversation.includes("gold") || conversation.includes("metallic")) {
      lipShade = "Rose Gold";
    } else if (conversation.includes("yellow") || conversation.includes("sunshine")) {
      lipShade = "Golden Honey";
    }
  }
  let scent = "Vanilla";
  if (conversation.includes("vanilla") || conversation.includes("sweet")) {
    scent = isYounger ? "Vanilla Dream" : "Vanilla";
  } else if (conversation.includes("cotton candy")) {
    scent = "Cotton Candy";
  } else if (conversation.includes("cake batter") || conversation.includes("birthday")) {
    scent = isYounger ? "Birthday Cake" : "Cake Batter";
  } else if (conversation.includes("caramel")) {
    scent = "Caramel Swirl";
  } else if (conversation.includes("root beer") || conversation.includes("unique")) {
    scent = isYounger ? "Root Beer Float" : "Root Beer";
  } else if (conversation.includes("chocolate")) {
    scent = "Chocolate Chip";
  } else if (conversation.includes("marshmallow")) {
    scent = "Marshmallow";
  } else if (conversation.includes("strawberry")) {
    scent = "Strawberry Fields";
  } else if (conversation.includes("raspberry")) {
    scent = "Raspberry Fizz";
  } else if (conversation.includes("peach")) {
    scent = "Peach Bellini";
  } else if (conversation.includes("watermelon")) {
    scent = "Watermelon Splash";
  } else if (conversation.includes("banana")) {
    scent = "Banana Split";
  } else if (conversation.includes("blueberry")) {
    scent = "Blueberry Muffin";
  } else if (conversation.includes("coconut")) {
    scent = "Coconut Paradise";
  } else if (conversation.includes("cherry")) {
    scent = "Cherry Bomb";
  } else if (conversation.includes("grape")) {
    scent = "Grape Soda";
  } else if (conversation.includes("floral") || conversation.includes("flower")) {
    scent = isYounger ? "Spring Flowers" : "Floral Bouquet";
  } else if (conversation.includes("citrus") || conversation.includes("fresh")) {
    scent = "Citrus Burst";
  } else if (conversation.includes("mint")) {
    scent = "Mint";
  }
  let lashes = "Natural";
  if (conversation.includes("glam") || conversation.includes("dramatic") || makeupStyle === "bold") {
    lashes = "Glam";
  } else if (conversation.includes("no lash") || conversation.includes("skip") || conversation.includes("without")) {
    lashes = "No Lashes";
  }
  let oil = "Yes";
  if (conversation.includes("matte") || conversation.includes("no oil") || conversation.includes("without oil")) {
    oil = "No";
  }
  const additionalItems = [];
  if (isYounger) {
    additionalItems.push("Daily Confidence Journal");
    additionalItems.push("Positive Affirmations Sticker Sheet");
    additionalItems.push("Self-Care Routine Guide");
  } else {
    additionalItems.push("Confidence Reminder Card");
    additionalItems.push("Self-Care Planner");
    additionalItems.push("Motivational Quote Collection");
  }
  if (conversation.includes("school") || conversation.includes("class")) {
    additionalItems.push(isYounger ? "School Confidence Tips" : "Academic Success Guide");
  }
  if (conversation.includes("friends") || conversation.includes("social")) {
    additionalItems.push("Friendship & Social Confidence Tips");
  }
  if (conversation.includes("nervous") || conversation.includes("anxious") || conversation.includes("worry")) {
    additionalItems.push("Calming Breathing Exercise Card");
  }
  const finalItems = additionalItems.slice(0, Math.min(4, additionalItems.length));
  let reasoning = `Based on our conversation, I can tell you have wonderful taste! `;
  if (userAge) {
    reasoning += `At ${userAge}, you're at such an exciting stage of discovering your personal style. `;
  }
  reasoning += `I chose the ${lipShade} shade because it perfectly matches your preference for ${makeupStyle} looks`;
  if (conversation.includes("warm") || conversation.includes("cool") || conversation.includes("neutral")) {
    const tonePreference = conversation.includes("warm") ? "warm" : conversation.includes("cool") ? "cool" : "neutral";
    reasoning += ` and your love for ${tonePreference} tones`;
  }
  reasoning += `. The ${scent} scent was chosen because it aligns with your personality and will make you smile every time you use it. `;
  if (conversation.includes("school")) {
    reasoning += `Since you mentioned school, this kit is perfect for building confidence in your daily routine. `;
  }
  reasoning += `The additional items are specially selected to support your confidence journey. Remember, you're beautiful, worthy, and deserving of all the care and attention this kit represents! \u{1F495}`;
  return {
    lipShade,
    scent,
    lashes,
    oil,
    additionalItems: finalItems,
    reasoning
  };
}

// shared/schema.ts
import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var kitRequests = pgTable("kit_requests", {
  id: serial("id").primaryKey(),
  requestType: text("request_type").notNull(),
  // Individual/Recipient fields
  name: text("name"),
  age: text("age"),
  address: text("address"),
  email: text("email"),
  phone: text("phone"),
  // Organization fields
  organizationName: text("organization_name"),
  staffName: text("staff_name"),
  // Staff member's name making the request
  staffRole: text("staff_role"),
  // Staff member's role (case manager, volunteer, etc.)
  contactEmail: text("contact_email"),
  contactPhone: text("contact_phone"),
  organizationType: text("organization_type"),
  quantity: integer("quantity"),
  ageGroups: text("age_groups"),
  specialNeeds: text("special_needs"),
  bulkCustomization: text("bulk_customization"),
  // For bulk order preferences
  // Product preferences
  shade: text("shade"),
  scent: text("scent"),
  lashes: text("lashes"),
  oil: text("oil"),
  scrub: text("scrub"),
  confidence: text("confidence"),
  aiSuggestions: text("ai_suggestions"),
  createdAt: timestamp("created_at").defaultNow()
});
var chatSessions = pgTable("chat_sessions", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  messages: text("messages").notNull(),
  // JSON string of messages
  recommendations: text("recommendations"),
  // JSON string of AI recommendations
  createdAt: timestamp("created_at").defaultNow()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertKitRequestSchema = createInsertSchema(kitRequests).omit({
  id: true,
  createdAt: true
});
var kitRequestValidationSchema = z.object({
  requestType: z.enum(["individual", "organization"], {
    required_error: "Please select a request type"
  }),
  // Individual/Recipient fields (optional for bulk org orders)
  name: z.string().optional(),
  age: z.string().optional(),
  address: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  // Organization fields
  organizationName: z.string().optional(),
  staffName: z.string().optional(),
  // Staff member's name making the request
  staffRole: z.string().optional(),
  // Staff member's role
  contactEmail: z.string().optional(),
  contactPhone: z.string().optional(),
  organizationType: z.string().optional(),
  quantity: z.union([z.string(), z.number()]).optional(),
  ageGroups: z.string().optional(),
  specialNeeds: z.string().optional(),
  bulkCustomization: z.string().optional(),
  // For bulk order preferences
  // Product preferences (conditional based on request type)
  shade: z.string().optional(),
  scent: z.string().optional(),
  lashes: z.string().optional(),
  oil: z.string().optional(),
  scrub: z.string().optional(),
  confidence: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, "Consent is required"),
  // Not stored in DB, just for form validation
  aiSuggestions: z.string().optional()
}).superRefine((data, ctx) => {
  if (data.requestType === "individual") {
    if (!data.name || data.name.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Name is required for individual requests",
        path: ["name"]
      });
    }
    if (!data.age || data.age.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Age range is required for individual requests",
        path: ["age"]
      });
    }
    if (!data.address || data.address.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Address is required for individual requests",
        path: ["address"]
      });
    }
    if (!data.shade || data.shade.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Lip shade preference is required",
        path: ["shade"]
      });
    }
    if (!data.scent || data.scent.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Scent preference is required",
        path: ["scent"]
      });
    }
    if (!data.lashes || data.lashes.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Lashes preference is required",
        path: ["lashes"]
      });
    }
    if (!data.oil || data.oil.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Lip oil preference is required",
        path: ["oil"]
      });
    }
    if (!data.scrub || data.scrub.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Lip scrub preferences are required",
        path: ["scrub"]
      });
    }
    if (!data.confidence || data.confidence.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please share what makes you feel confident",
        path: ["confidence"]
      });
    }
  }
  if (data.requestType === "organization") {
    if (!data.organizationName || data.organizationName.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Organization name is required",
        path: ["organizationName"]
      });
    }
    if (!data.staffName || data.staffName.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Your name is required",
        path: ["staffName"]
      });
    }
    if (!data.staffRole || data.staffRole.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Your role is required",
        path: ["staffRole"]
      });
    }
    if (!data.contactEmail || data.contactEmail.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Contact email is required",
        path: ["contactEmail"]
      });
    } else if (data.contactEmail && !z.string().email().safeParse(data.contactEmail).success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please enter a valid email address",
        path: ["contactEmail"]
      });
    }
    if (!data.quantity || typeof data.quantity === "string" && data.quantity.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Number of kits is required",
        path: ["quantity"]
      });
    } else if (data.quantity && (typeof data.quantity === "string" && (isNaN(Number(data.quantity)) || Number(data.quantity) <= 0) || typeof data.quantity === "number" && data.quantity <= 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please enter a valid number greater than 0",
        path: ["quantity"]
      });
    }
  }
});
var insertChatSessionSchema = createInsertSchema(chatSessions).omit({
  id: true,
  createdAt: true
});

// server/routes.ts
async function registerRoutes(app2) {
  app2.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array is required" });
      }
      const response = await generateChatResponse(messages);
      res.json({ message: response });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ error: "Failed to generate chat response" });
    }
  });
  app2.post("/api/recommendations", async (req, res) => {
    try {
      const { chatHistory } = req.body;
      if (!chatHistory || !Array.isArray(chatHistory)) {
        return res.status(400).json({ error: "Chat history is required" });
      }
      const recommendations = await generateKitRecommendations(chatHistory);
      res.json(recommendations);
    } catch (error) {
      console.error("Recommendations error:", error);
      res.status(500).json({ error: "Failed to generate recommendations" });
    }
  });
  app2.post("/api/kit-request", async (req, res) => {
    try {
      const validatedData = kitRequestValidationSchema.parse(req.body);
      const { consent, ...submissionData } = validatedData;
      const organizationSubmissionData = {
        submissionDate: (/* @__PURE__ */ new Date()).toISOString(),
        requestType: submissionData.requestType,
        // Individual/Recipient Information  
        name: submissionData.name || "",
        age: submissionData.age || "",
        address: submissionData.address || "",
        email: submissionData.email || "",
        phone: submissionData.phone || "",
        // Organization Information (for bulk orders)
        organizationName: submissionData.organizationName || "",
        staffName: submissionData.staffName || "",
        staffRole: submissionData.staffRole || "",
        contactEmail: submissionData.contactEmail || "",
        contactPhone: submissionData.contactPhone || "",
        organizationType: submissionData.organizationType || "",
        quantity: submissionData.requestType === "organization" && submissionData.quantity ? Number(submissionData.quantity) : submissionData.quantity || "",
        ageGroups: submissionData.ageGroups || "",
        specialNeeds: submissionData.specialNeeds || "",
        bulkCustomization: submissionData.bulkCustomization || "",
        // Product Preferences (optional for organization requests)
        shade: submissionData.shade || "",
        scent: submissionData.scent || "",
        lashes: submissionData.lashes || "",
        oil: submissionData.oil || "",
        scrub: submissionData.scrub || "",
        confidence: submissionData.confidence || "",
        aiSuggestions: submissionData.aiSuggestions || ""
      };
      const sheetResponse = await fetch("https://api.sheety.co/b8ee76e1f97b11355b5b90a8e37eab16/swervyCares/sheet1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.SHEETY_API_KEY || ""}`
        },
        body: JSON.stringify({ sheet1: organizationSubmissionData })
      });
      if (!sheetResponse.ok) {
        const errorText = await sheetResponse.text();
        console.error("Sheety API Error:", sheetResponse.status, errorText);
        throw new Error(`Failed to submit to Google Sheets: ${sheetResponse.status} - ${errorText}`);
      }
      const result = await sheetResponse.json();
      res.json({ success: true, data: result });
    } catch (error) {
      console.error("Kit request error:", error);
      res.status(500).json({ error: "Failed to submit kit request" });
    }
  });
  app2.post("/api/volunteer", async (req, res) => {
    try {
      const volunteerSchema = z2.object({
        name: z2.string().min(1),
        email: z2.string().email(),
        phone: z2.string().min(1),
        age: z2.string().min(1),
        location: z2.string().min(1),
        opportunities: z2.string().min(1),
        time: z2.string().min(1),
        skills: z2.string().min(1),
        motivation: z2.string().min(1),
        comments: z2.string().optional()
      });
      const validatedData = volunteerSchema.parse(req.body);
      const sheetResponse = await fetch("https://api.sheety.co/b8ee76e1f97b11355b5b90a8e37eab16/volunteer/sheet1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ sheet1: validatedData })
      });
      if (!sheetResponse.ok) {
        throw new Error("Failed to submit to Google Sheets");
      }
      const result = await sheetResponse.json();
      res.json({ success: true, data: result });
    } catch (error) {
      console.error("Volunteer request error:", error);
      res.status(500).json({ error: "Failed to submit volunteer application" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();

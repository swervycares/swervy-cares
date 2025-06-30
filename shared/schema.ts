import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const kitRequests = pgTable("kit_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  age: text("age").notNull(),
  address: text("address").notNull(),
  email: text("email"),
  phone: text("phone"),
  shade: text("shade").notNull(),
  scent: text("scent").notNull(),
  lashes: text("lashes").notNull(),
  oil: text("oil").notNull(),
  scrub: text("scrub").notNull(),
  confidence: text("confidence").notNull(),
  aiSuggestions: text("ai_suggestions"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const chatSessions = pgTable("chat_sessions", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  messages: text("messages").notNull(), // JSON string of messages
  recommendations: text("recommendations"), // JSON string of AI recommendations
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertKitRequestSchema = createInsertSchema(kitRequests).omit({
  id: true,
  createdAt: true,
});

export const insertChatSessionSchema = createInsertSchema(chatSessions).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type KitRequest = typeof kitRequests.$inferSelect;
export type InsertKitRequest = z.infer<typeof insertKitRequestSchema>;
export type ChatSession = typeof chatSessions.$inferSelect;
export type InsertChatSession = z.infer<typeof insertChatSessionSchema>;

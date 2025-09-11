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
  requestType: text("request_type").notNull(),
  // Individual/Recipient fields
  name: text("name"),
  age: text("age"),
  address: text("address"),
  email: text("email"),
  phone: text("phone"),
  // Organization fields
  organizationName: text("organization_name"),
  contactPerson: text("contact_person"),
  contactEmail: text("contact_email"),
  contactPhone: text("contact_phone"),
  organizationType: text("organization_type"),
  quantity: integer("quantity"),
  ageGroups: text("age_groups"),
  specialNeeds: text("special_needs"),
  // Product preferences
  shade: text("shade"),
  scent: text("scent"),
  lashes: text("lashes"),
  oil: text("oil"),
  scrub: text("scrub"),
  confidence: text("confidence"),
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

// Comprehensive kit request validation schema with conditional requirements
export const kitRequestValidationSchema = z.object({
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
  contactPerson: z.string().optional(),
  contactEmail: z.string().optional(),
  contactPhone: z.string().optional(),
  organizationType: z.string().optional(),
  quantity: z.union([z.string(), z.number()]).optional(),
  ageGroups: z.string().optional(),
  specialNeeds: z.string().optional(),
  // Product preferences (conditional based on request type)
  shade: z.string().optional(),
  scent: z.string().optional(),
  lashes: z.string().optional(),
  oil: z.string().optional(),
  scrub: z.string().optional(),
  confidence: z.string().optional(),
  consent: z.boolean().refine(val => val === true, "Consent is required"), // Not stored in DB, just for form validation
  aiSuggestions: z.string().optional()
}).superRefine((data, ctx) => {
  // Individual requests require personal details and product preferences
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
    // Product preferences are required for individual requests
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
  
  // Organization requests require org details but product preferences are optional
  if (data.requestType === "organization") {
    if (!data.organizationName || data.organizationName.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Organization name is required",
        path: ["organizationName"]
      });
    }
    if (!data.contactPerson || data.contactPerson.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Contact person is required",
        path: ["contactPerson"]
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
    if (!data.quantity || (typeof data.quantity === 'string' && data.quantity.length === 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Number of kits is required",
        path: ["quantity"]
      });
    } else if (data.quantity && (
      (typeof data.quantity === 'string' && (isNaN(Number(data.quantity)) || Number(data.quantity) <= 0)) ||
      (typeof data.quantity === 'number' && data.quantity <= 0)
    )) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please enter a valid number greater than 0",
        path: ["quantity"]
      });
    }
  }
});

export const insertChatSessionSchema = createInsertSchema(chatSessions).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type KitRequest = typeof kitRequests.$inferSelect;
export type InsertKitRequest = z.infer<typeof insertKitRequestSchema>;
export type KitRequestForm = z.infer<typeof kitRequestValidationSchema>;
export type ChatSession = typeof chatSessions.$inferSelect;
export type InsertChatSession = z.infer<typeof insertChatSessionSchema>;

import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { generateChatResponse, generateKitRecommendations, type ChatMessage } from "./services/openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // AI Chat endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array is required" });
      }

      const response = await generateChatResponse(messages);
      res.json({ message: response });
    } catch (error) {
      console.error('Chat error:', error);
      res.status(500).json({ error: "Failed to generate chat response" });
    }
  });

  // AI Kit Recommendations endpoint
  app.post("/api/recommendations", async (req, res) => {
    try {
      const { chatHistory } = req.body;
      
      if (!chatHistory || !Array.isArray(chatHistory)) {
        return res.status(400).json({ error: "Chat history is required" });
      }

      const recommendations = await generateKitRecommendations(chatHistory);
      res.json(recommendations);
    } catch (error) {
      console.error('Recommendations error:', error);
      res.status(500).json({ error: "Failed to generate recommendations" });
    }
  });

  // Kit Request submission (maintains existing Google Sheets integration)
  app.post("/api/kit-request", async (req, res) => {
    try {
      const kitRequestSchema = z.object({
        name: z.string().min(1),
        age: z.string().min(1),
        address: z.string().min(1),
        email: z.string().optional(),
        phone: z.string().optional(),
        shade: z.string().min(1),
        scent: z.string().min(1),
        lashes: z.string().min(1),
        oil: z.string().min(1),
        scrub: z.string().min(1),
        confidence: z.string().min(1),
        aiSuggestions: z.string().optional()
      });

      const validatedData = kitRequestSchema.parse(req.body);

      // Submit to Google Sheets (existing Sheety API)
      const sheetResponse = await fetch('https://api.sheety.co/b8ee76e1f97b11355b5b90a8e37eab16/swervy/sheet1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sheet1: validatedData })
      });

      if (!sheetResponse.ok) {
        throw new Error('Failed to submit to Google Sheets');
      }

      const result = await sheetResponse.json();
      res.json({ success: true, data: result });
    } catch (error) {
      console.error('Kit request error:', error);
      res.status(500).json({ error: "Failed to submit kit request" });
    }
  });

  // Volunteer form submission (maintains existing Google Sheets integration)
  app.post("/api/volunteer", async (req, res) => {
    try {
      const volunteerSchema = z.object({
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().min(1),
        age: z.string().min(1),
        location: z.string().min(1),
        opportunities: z.string().min(1),
        time: z.string().min(1),
        skills: z.string().min(1),
        motivation: z.string().min(1),
        comments: z.string().optional()
      });

      const validatedData = volunteerSchema.parse(req.body);

      // Submit to Google Sheets (existing Sheety API for volunteers)
      const sheetResponse = await fetch('https://api.sheety.co/b8ee76e1f97b11355b5b90a8e37eab16/volunteer/sheet1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sheet1: validatedData })
      });

      if (!sheetResponse.ok) {
        throw new Error('Failed to submit to Google Sheets');
      }

      const result = await sheetResponse.json();
      res.json({ success: true, data: result });
    } catch (error) {
      console.error('Volunteer request error:', error);
      res.status(500).json({ error: "Failed to submit volunteer application" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

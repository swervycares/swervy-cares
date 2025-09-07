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
import { z } from 'zod';

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
}
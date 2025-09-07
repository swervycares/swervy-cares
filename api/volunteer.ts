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
}
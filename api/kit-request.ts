// Simple types for Vercel functions (no package needed)
interface VercelRequest {
  method?: string;
  body: any;
  headers?: Record<string, string>;
}

interface VercelResponse {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => VercelResponse;
  json: (data: any) => void;
  end: () => void;
}
import { ZodError, z } from 'zod';

// Inline validation schema for Vercel serverless environment
const kitRequestValidationSchema = z.object({
  requestType: z.enum(['individual', 'organization']),
  
  // Individual/Recipient fields (always optional now)
  name: z.string().optional(),
  age: z.string().optional(), 
  address: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  
  // Organization fields (required when requestType is 'organization')
  organizationName: z.string().optional(),
  staffName: z.string().optional(),
  staffRole: z.string().optional(), 
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
  organizationType: z.string().optional(),
  quantity: z.union([z.string(), z.number()]).optional(),
  ageGroups: z.string().optional(),
  specialNeeds: z.string().optional(),
  bulkCustomization: z.string().optional(),
  
  // Product preferences (all optional)
  shade: z.string().optional(),
  scent: z.string().optional(),
  lashes: z.string().optional(),
  oil: z.string().optional(),
  scrub: z.string().optional(),
  confidence: z.string().optional(),
  aiSuggestions: z.string().optional(),
  
  // Required consent
  consent: z.boolean().refine((val) => val === true, {
    message: "You must consent to receive a kit"
  })
}).refine((data) => {
  // When requestType is 'organization', require organization fields
  if (data.requestType === 'organization') {
    return data.organizationName && data.staffName && data.staffRole && data.contactEmail && data.quantity;
  }
  return true;
}, {
  message: "Organization requests require: organizationName, staffName, staffRole, contactEmail, and quantity",
  path: ["organizationName"]
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS - restrict to specific domains for security
  const allowedOrigins = [
    'https://swervycares.com',
    'https://www.swervycares.com', 
    'https://swervycares.github.io',
    'http://localhost:5173',
    'http://127.0.0.1:5173'
  ];
  const origin = req.headers?.origin || '';
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check if API key is configured
    const apiKey = (process.env.SHEETY_API_KEY || '').trim().replace(/^Bearer\s+/i, '');
    if (!apiKey) {
      return res.status(500).json({ error: 'SHEETY_API_KEY not configured' });
    }

    const validatedData = kitRequestValidationSchema.parse(req.body);

    // Organize data for Google Sheets with proper structure (consent field is removed by destructuring)
    const { consent, ...submissionData } = validatedData;
    const organizationSubmissionData = {
      submissionDate: new Date().toISOString(),
      requestType: submissionData.requestType,
      // Individual/Recipient Information
      name: submissionData.name || '',
      age: submissionData.age || '',
      address: submissionData.address || '',
      email: submissionData.email || '',
      phone: submissionData.phone || '',
      // Organization Information (for bulk orders)
      organizationName: submissionData.organizationName || '',
      staffName: submissionData.staffName || '',
      staffRole: submissionData.staffRole || '',
      contactEmail: submissionData.contactEmail || '',
      contactPhone: submissionData.contactPhone || '',
      organizationType: submissionData.organizationType || '',
      quantity: submissionData.requestType === 'organization' && submissionData.quantity ? Number(submissionData.quantity) : submissionData.quantity || '',
      ageGroups: submissionData.ageGroups || '',
      specialNeeds: submissionData.specialNeeds || '',
      bulkCustomization: submissionData.bulkCustomization || '',
      // Product Preferences (optional for organization requests)
      shade: submissionData.shade || '',
      scent: submissionData.scent || '',
      lashes: submissionData.lashes || '',
      oil: submissionData.oil || '',
      scrub: submissionData.scrub || '',
      confidence: submissionData.confidence || '',
      aiSuggestions: submissionData.aiSuggestions || ''
    };

    // Submit to Google Sheets (existing Sheety API)
    const sheetResponse = await fetch('https://api.sheety.co/b8ee76e1f97b11355b5b90a8e37eab16/swervyCares/sheet1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({ sheet1: organizationSubmissionData })
    });

    if (!sheetResponse.ok) {
      const errorText = await sheetResponse.text();
      console.error('Sheety error:', sheetResponse.status, errorText);
      return res.status(502).json({ 
        error: 'Sheety request failed', 
        status: sheetResponse.status,
        details: errorText
      });
    }

    const result = await sheetResponse.json();
    res.json({ success: true, data: result, requestType: validatedData.requestType });
  } catch (error) {
    console.error('Kit request error:', error);
    
    // Handle Zod validation errors with 400 status
    if (error instanceof ZodError) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        issues: error.flatten() 
      });
    }
    
    // Handle other errors (like Sheety API failures) with 500 status
    res.status(500).json({ error: "Failed to submit kit request" });
  }
}
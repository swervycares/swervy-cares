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
import { ZodError } from 'zod';
import { kitRequestValidationSchema } from '../shared/schema';

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
    const sheetResponse = await fetch('https://api.sheety.co/b8ee76e1f97b11355b5b90a8e37eab16/swervy/sheet1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sheet1: organizationSubmissionData })
    });

    if (!sheetResponse.ok) {
      throw new Error('Failed to submit to Google Sheets');
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
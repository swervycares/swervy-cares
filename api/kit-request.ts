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
import { z, ZodError } from 'zod';

const kitRequestSchema = z.object({
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
  quantity: z.string().optional(),
  ageGroups: z.string().optional(),
  specialNeeds: z.string().optional(),
  // Product preferences
  shade: z.string().min(1, "Lip shade preference is required"),
  scent: z.string().min(1, "Scent preference is required"),
  lashes: z.string().min(1, "Lashes preference is required"),
  oil: z.string().min(1, "Lip oil preference is required"),
  scrub: z.string().min(1, "Lip scrub preferences are required"),
  confidence: z.string().min(1, "Please share what makes you feel confident"),
  aiSuggestions: z.string().optional()
}).superRefine((data, ctx) => {
  // Individual requests require personal details
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
  }
  
  // Organization requests require org details
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
    if (!data.quantity || data.quantity.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Number of kits is required",
        path: ["quantity"]
      });
    } else if (data.quantity && (isNaN(Number(data.quantity)) || Number(data.quantity) <= 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please enter a valid number greater than 0",
        path: ["quantity"]
      });
    }
  }
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

    // Organize data for Google Sheets with better structure
    const submissionData = {
      submissionDate: new Date().toISOString(),
      requestType: validatedData.requestType,
      // Individual/Recipient Information
      name: validatedData.name || '',
      age: validatedData.age || '',
      address: validatedData.address || '',
      email: validatedData.email || '',
      phone: validatedData.phone || '',
      // Organization Information (for bulk orders)
      organizationName: validatedData.organizationName || '',
      contactPerson: validatedData.contactPerson || '',
      contactEmail: validatedData.contactEmail || '',
      contactPhone: validatedData.contactPhone || '',
      organizationType: validatedData.organizationType || '',
      quantity: validatedData.requestType === 'organization' && validatedData.quantity ? Number(validatedData.quantity) : validatedData.quantity || '',
      ageGroups: validatedData.ageGroups || '',
      specialNeeds: validatedData.specialNeeds || '',
      // Product Preferences
      shade: validatedData.shade,
      scent: validatedData.scent,
      lashes: validatedData.lashes,
      oil: validatedData.oil,
      scrub: validatedData.scrub,
      confidence: validatedData.confidence,
      aiSuggestions: validatedData.aiSuggestions || ''
    };

    // Submit to Google Sheets (existing Sheety API)
    const sheetResponse = await fetch('https://api.sheety.co/b8ee76e1f97b11355b5b90a8e37eab16/swervy/sheet1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sheet1: submissionData })
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
import { z } from 'zod';

// Calculate age from date of birth
const isValidAge = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  const now = new Date();
  const age = (now.getTime() - date.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
  return age >= 18 && age <= 100;
};

// Alumni registration schema
export const alumniRegistrationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s.'-]+$/, "Name contains invalid characters"),
  
  register_number: z
    .string()
    .trim()
    .min(3, "Register number is required")
    .max(20, "Register number must be less than 20 characters")
    .regex(/^[0-9A-Za-z]+$/, "Register number must be alphanumeric"),
  
  date_of_birth: z
    .string()
    .refine((date) => {
      if (!date) return false;
      const parsed = new Date(date);
      return !isNaN(parsed.getTime());
    }, "Invalid date format")
    .refine(isValidAge, "Date of birth indicates an unrealistic age (must be 18-100 years old)"),
  
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(100, "Email must be less than 100 characters")
    .optional()
    .or(z.literal("")),
  
  phone: z
    .string()
    .trim()
    .regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .optional()
    .or(z.literal("")),
  
  graduation_year: z
    .string()
    .trim()
    .regex(/^(19|20)\d{2}$/, "Invalid graduation year")
    .optional()
    .or(z.literal("")),
  
  department: z
    .string()
    .trim()
    .max(100, "Department must be less than 100 characters")
    .optional()
    .or(z.literal("")),
  
  degree: z
    .string()
    .trim()
    .max(50, "Degree must be less than 50 characters")
    .optional()
    .or(z.literal("")),
  
  current_job: z
    .string()
    .trim()
    .max(100, "Job title must be less than 100 characters")
    .optional()
    .or(z.literal("")),
  
  company: z
    .string()
    .trim()
    .max(100, "Company name must be less than 100 characters")
    .optional()
    .or(z.literal("")),
  
  achievements: z
    .string()
    .trim()
    .max(2000, "Achievements must be less than 2000 characters")
    .optional()
    .or(z.literal("")),
  
  address: z
    .string()
    .trim()
    .max(500, "Address must be less than 500 characters")
    .optional()
    .or(z.literal("")),
  
  areas_of_expertise: z
    .string()
    .trim()
    .max(500, "Areas of expertise must be less than 500 characters")
    .optional()
    .or(z.literal("")),
});

export type AlumniRegistrationData = z.infer<typeof alumniRegistrationSchema>;

// Inquiry submission schema
export const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(100, "Email must be less than 100 characters"),
  
  subject: z
    .string()
    .trim()
    .max(200, "Subject must be less than 200 characters")
    .optional()
    .or(z.literal("")),
  
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
});

export type InquiryData = z.infer<typeof inquirySchema>;

// Alumni login schema
export const alumniLoginSchema = z.object({
  registerNumber: z
    .string()
    .trim()
    .min(3, "Register number is required")
    .max(20, "Register number must be less than 20 characters"),
  
  dob: z
    .string()
    .refine((date) => {
      if (!date) return false;
      const parsed = new Date(date);
      return !isNaN(parsed.getTime());
    }, "Invalid date format"),
});

export type AlumniLoginData = z.infer<typeof alumniLoginSchema>;

// Helper function to format Zod errors for display
export function formatValidationErrors(errors: z.ZodError): string[] {
  return errors.errors.map((err) => err.message);
}

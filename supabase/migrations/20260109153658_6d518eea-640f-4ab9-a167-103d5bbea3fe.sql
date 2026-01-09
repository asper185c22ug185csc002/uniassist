-- Create function to update timestamps first
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create alumni table with full professional profile
CREATE TABLE public.alumni (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    register_number TEXT NOT NULL UNIQUE,
    date_of_birth DATE NOT NULL,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    graduation_year TEXT,
    department TEXT,
    degree TEXT,
    current_job TEXT,
    company TEXT,
    achievements TEXT,
    profile_photo_url TEXT,
    address TEXT,
    social_links JSONB DEFAULT '{}',
    areas_of_expertise TEXT[],
    availability_status TEXT DEFAULT 'available',
    is_approved BOOLEAN DEFAULT false,
    is_self_registered BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on alumni table
ALTER TABLE public.alumni ENABLE ROW LEVEL SECURITY;

-- Public can read approved alumni
CREATE POLICY "Public read access for approved alumni"
ON public.alumni
FOR SELECT
USING (is_approved = true);

-- Admins can do everything
CREATE POLICY "Admins can insert alumni"
ON public.alumni
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update alumni"
ON public.alumni
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete alumni"
ON public.alumni
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow self-registration (insert without auth for pending approval)
CREATE POLICY "Allow alumni self-registration"
ON public.alumni
FOR INSERT
WITH CHECK (is_self_registered = true AND is_approved = false);

-- Create internship_areas table for the departments and expertise
CREATE TABLE public.internship_areas (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    department TEXT NOT NULL,
    head_of_department TEXT,
    email TEXT,
    whatsapp_number TEXT,
    areas_of_expertise TEXT[],
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on internship_areas
ALTER TABLE public.internship_areas ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read access for internship_areas"
ON public.internship_areas
FOR SELECT
USING (true);

-- Admin management
CREATE POLICY "Admins can insert internship_areas"
ON public.internship_areas
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update internship_areas"
ON public.internship_areas
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete internship_areas"
ON public.internship_areas
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create inquiries table for storing contact form submissions
CREATE TABLE public.inquiries (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on inquiries
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Anyone can submit inquiry
CREATE POLICY "Anyone can submit inquiry"
ON public.inquiries
FOR INSERT
WITH CHECK (true);

-- Only admins can read inquiries
CREATE POLICY "Admins can read inquiries"
ON public.inquiries
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update inquiry status
CREATE POLICY "Admins can update inquiries"
ON public.inquiries
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete inquiries
CREATE POLICY "Admins can delete inquiries"
ON public.inquiries
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create updated_at trigger for alumni
CREATE TRIGGER update_alumni_updated_at
BEFORE UPDATE ON public.alumni
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
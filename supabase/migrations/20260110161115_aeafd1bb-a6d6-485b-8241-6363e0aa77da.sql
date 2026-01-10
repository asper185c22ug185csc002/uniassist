-- Create industrial_visits table for IV information
CREATE TABLE public.industrial_visits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  title TEXT NOT NULL,
  department TEXT,
  destination TEXT,
  duration TEXT,
  description TEXT,
  objectives TEXT[],
  coordinator_name TEXT,
  coordinator_contact TEXT,
  visit_date DATE,
  status TEXT DEFAULT 'upcoming'
);

-- Enable RLS
ALTER TABLE public.industrial_visits ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Public read access for industrial_visits" 
ON public.industrial_visits FOR SELECT USING (true);

CREATE POLICY "Admins can insert industrial_visits" 
ON public.industrial_visits FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update industrial_visits" 
ON public.industrial_visits FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete industrial_visits" 
ON public.industrial_visits FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));
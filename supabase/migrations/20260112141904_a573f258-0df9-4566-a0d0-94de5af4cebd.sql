-- Fix SECURITY DEFINER view issues by setting views to SECURITY INVOKER

-- Drop and recreate views with SECURITY INVOKER

-- 1. Alumni public view
DROP VIEW IF EXISTS public.alumni_public;
CREATE VIEW public.alumni_public 
WITH (security_invoker = true) AS
SELECT 
  id,
  name,
  register_number,
  degree,
  department,
  graduation_year,
  company,
  current_job,
  achievements,
  areas_of_expertise,
  availability_status,
  profile_photo_url,
  social_links,
  is_approved,
  is_self_registered,
  created_at,
  updated_at
FROM public.alumni
WHERE is_approved = true;

GRANT SELECT ON public.alumni_public TO anon;
GRANT SELECT ON public.alumni_public TO authenticated;

-- 2. Internship areas public view
DROP VIEW IF EXISTS public.internship_areas_public;
CREATE VIEW public.internship_areas_public 
WITH (security_invoker = true) AS
SELECT 
  id,
  department,
  head_of_department,
  areas_of_expertise,
  created_at
FROM public.internship_areas;

GRANT SELECT ON public.internship_areas_public TO anon;
GRANT SELECT ON public.internship_areas_public TO authenticated;

-- 3. Industrial visits public view
DROP VIEW IF EXISTS public.industrial_visits_public;
CREATE VIEW public.industrial_visits_public 
WITH (security_invoker = true) AS
SELECT 
  id,
  title,
  department,
  destination,
  duration,
  visit_date,
  description,
  objectives,
  coordinator_name,
  status,
  created_at
FROM public.industrial_visits;

GRANT SELECT ON public.industrial_visits_public TO anon;
GRANT SELECT ON public.industrial_visits_public TO authenticated;

-- Add anon SELECT policies so views can read base tables
CREATE POLICY "Anon can select via public view" 
ON public.alumni 
FOR SELECT 
TO anon 
USING (is_approved = true);

CREATE POLICY "Anon can select internship areas via public view" 
ON public.internship_areas 
FOR SELECT 
TO anon 
USING (true);

CREATE POLICY "Anon can select industrial visits via public view" 
ON public.industrial_visits 
FOR SELECT 
TO anon 
USING (true);
-- Create public views that hide sensitive personal information

-- 1. Alumni public view - hides email, phone, DOB, address
CREATE OR REPLACE VIEW public.alumni_public AS
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

-- Grant SELECT on view to anon and authenticated
GRANT SELECT ON public.alumni_public TO anon;
GRANT SELECT ON public.alumni_public TO authenticated;

-- 2. Internship areas public view - hides email and whatsapp
CREATE OR REPLACE VIEW public.internship_areas_public AS
SELECT 
  id,
  department,
  head_of_department,
  areas_of_expertise,
  created_at
FROM public.internship_areas;

-- Grant SELECT on view to anon and authenticated
GRANT SELECT ON public.internship_areas_public TO anon;
GRANT SELECT ON public.internship_areas_public TO authenticated;

-- 3. Industrial visits public view - hides coordinator contact
CREATE OR REPLACE VIEW public.industrial_visits_public AS
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

-- Grant SELECT on view to anon and authenticated
GRANT SELECT ON public.industrial_visits_public TO anon;
GRANT SELECT ON public.industrial_visits_public TO authenticated;

-- 4. Update RLS policies for full data access (authenticated users only)

-- Alumni: Drop existing public SELECT policy if exists, create authenticated-only policy for full data
DROP POLICY IF EXISTS "Approved alumni are viewable by everyone" ON public.alumni;
DROP POLICY IF EXISTS "Anyone can view approved alumni" ON public.alumni;

-- Create policy for authenticated users to see full alumni data
CREATE POLICY "Authenticated users can view full alumni data"
ON public.alumni
FOR SELECT
TO authenticated
USING (true);

-- Internship areas: Update to require auth for full data
DROP POLICY IF EXISTS "Anyone can view internship areas" ON public.internship_areas;
DROP POLICY IF EXISTS "Internship areas are viewable by everyone" ON public.internship_areas;

CREATE POLICY "Authenticated users can view full internship areas"
ON public.internship_areas
FOR SELECT
TO authenticated
USING (true);

-- Industrial visits: Update to require auth for full data
DROP POLICY IF EXISTS "Anyone can view industrial visits" ON public.industrial_visits;
DROP POLICY IF EXISTS "Industrial visits are viewable by everyone" ON public.industrial_visits;

CREATE POLICY "Authenticated users can view full industrial visits"
ON public.industrial_visits
FOR SELECT
TO authenticated
USING (true);
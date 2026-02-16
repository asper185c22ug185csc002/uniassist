
-- Fix 1: Alumni table - restrict full data access to admins only
DROP POLICY IF EXISTS "Authenticated users can view full alumni data" ON public.alumni;
DROP POLICY IF EXISTS "Anon blocked from alumni base table" ON public.alumni;

-- Only admins can see full alumni data (with PII)
CREATE POLICY "Admins can view all alumni data"
ON public.alumni FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Anon users blocked from base table (use alumni_public view)
CREATE POLICY "Anon blocked from alumni base table"
ON public.alumni FOR SELECT TO anon
USING (false);

-- Fix 2: Internship areas - restrict full data to admins, authenticated use public view
DROP POLICY IF EXISTS "Public read access for internship_areas" ON public.internship_areas;
DROP POLICY IF EXISTS "Anon can select internship areas via public view" ON public.internship_areas;
DROP POLICY IF EXISTS "Authenticated users can view full internship areas" ON public.internship_areas;

-- Only admins can see full internship_areas (with email/whatsapp)
CREATE POLICY "Admins can view full internship areas"
ON public.internship_areas FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Anon users use the public view
CREATE POLICY "Anon blocked from internship_areas base table"
ON public.internship_areas FOR SELECT TO anon
USING (false);

-- Fix 3: Industrial visits - same pattern, restrict full data to admins
DROP POLICY IF EXISTS "Public read access for industrial_visits" ON public.industrial_visits;
DROP POLICY IF EXISTS "Anon can select industrial visits via public view" ON public.industrial_visits;
DROP POLICY IF EXISTS "Authenticated users can view full industrial visits" ON public.industrial_visits;

-- Only admins can see full industrial_visits (with coordinator_contact)
CREATE POLICY "Admins can view full industrial visits"
ON public.industrial_visits FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Anon users use the public view
CREATE POLICY "Anon blocked from industrial_visits base table"
ON public.industrial_visits FOR SELECT TO anon
USING (false);

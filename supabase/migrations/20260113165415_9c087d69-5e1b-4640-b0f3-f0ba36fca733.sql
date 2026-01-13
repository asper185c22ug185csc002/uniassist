-- Remove the public read access policies that expose sensitive alumni data
DROP POLICY IF EXISTS "Public read access for approved alumni" ON public.alumni;
DROP POLICY IF EXISTS "Anon can select via public view" ON public.alumni;

-- Create a restrictive policy for anon users (they should use alumni_public view)
CREATE POLICY "Anon blocked from alumni base table" 
ON public.alumni 
FOR SELECT 
TO anon 
USING (false);

-- Keep authenticated users policy for full data access
-- The "Authenticated users can view full alumni data" policy already exists
-- Ensure the client role can call the role-check function
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

-- (Optional safety) allow logged-out role checks to still return false without throwing
-- If you prefer stricter behavior, remove this.
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO anon;
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Create Supabase client with service role for admin operations
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

// Validate admin role server-side
async function validateAdminRole(authHeader: string): Promise<{ valid: boolean; userId: string | null }> {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { valid: false, userId: null };
  }

  const token = authHeader.replace("Bearer ", "");
  
  // Create client with user's token to verify their identity
  const supabaseUser = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } }
  });

  // Get the authenticated user
  const { data: { user }, error: userError } = await supabaseUser.auth.getUser();
  
  if (userError || !user) {
    console.error("Auth error:", userError?.message);
    return { valid: false, userId: null };
  }

  // Use service role to check admin status
  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
  const { data: roleData, error: roleError } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .eq("role", "admin")
    .maybeSingle();

  if (roleError) {
    console.error("Role check error:", roleError.message);
    return { valid: false, userId: user.id };
  }

  return { valid: !!roleData, userId: user.id };
}

// Validate command parameters
function validateCommand(command: any): { valid: boolean; error?: string } {
  if (!command || typeof command !== "object") {
    return { valid: false, error: "Invalid command format" };
  }

  const { action } = command;

  switch (action) {
    case "update_hostel":
      if (!command.field || !command.value) {
        return { valid: false, error: "Missing field or value for hostel update" };
      }
      const validHostelFields = ["monthly_rent", "mess_charges", "room_capacity", "total_capacity", "location"];
      if (!validHostelFields.includes(command.field)) {
        return { valid: false, error: `Invalid hostel field: ${command.field}` };
      }
      if (typeof command.value !== "string" || command.value.length > 100) {
        return { valid: false, error: "Invalid value format" };
      }
      break;

    case "update_university_info":
      if (!command.key || !command.value) {
        return { valid: false, error: "Missing key or value for university info update" };
      }
      if (typeof command.key !== "string" || command.key.length > 50) {
        return { valid: false, error: "Invalid key format" };
      }
      if (typeof command.value !== "string" || command.value.length > 500) {
        return { valid: false, error: "Invalid value format" };
      }
      break;

    case "add_news":
      if (!command.title) {
        return { valid: false, error: "Missing title for news" };
      }
      if (typeof command.title !== "string" || command.title.length > 200) {
        return { valid: false, error: "Invalid title format" };
      }
      if (command.description && (typeof command.description !== "string" || command.description.length > 2000)) {
        return { valid: false, error: "Invalid description format" };
      }
      break;

    case "add_iv":
      if (!command.title || !command.department) {
        return { valid: false, error: "Missing required fields for industrial visit" };
      }
      if (typeof command.title !== "string" || command.title.length > 200) {
        return { valid: false, error: "Invalid title format" };
      }
      break;

    case "approve_alumni":
      if (!command.register_number || typeof command.approve !== "boolean") {
        return { valid: false, error: "Missing register_number or approve status" };
      }
      if (typeof command.register_number !== "string" || command.register_number.length > 50) {
        return { valid: false, error: "Invalid register number format" };
      }
      break;

    default:
      return { valid: false, error: `Unknown action: ${action}` };
  }

  return { valid: true };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate admin role server-side
    const authHeader = req.headers.get("Authorization") || "";
    const { valid: isAdmin, userId } = await validateAdminRole(authHeader);

    if (!isAdmin) {
      console.error("Unauthorized admin command attempt", { userId });
      return new Response(
        JSON.stringify({ success: false, error: "Unauthorized. Admin access required." }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const command = await req.json();
    console.log("Admin command received:", { action: command.action, userId });

    // Validate command parameters
    const validation = validateCommand(command);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ success: false, error: validation.error }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Use service role for database operations
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    let result;
    switch (command.action) {
      case "update_hostel":
        result = await supabase
          .from("hostel_info")
          .update({ [command.field]: command.value })
          .neq("id", "00000000-0000-0000-0000-000000000000");
        break;

      case "update_university_info":
        result = await supabase
          .from("university_info")
          .update({ value: command.value })
          .eq("key", command.key);
        break;

      case "add_news":
        result = await supabase
          .from("news_feed")
          .insert({
            title: command.title,
            description: command.description || null,
            category: command.category || "Announcement",
            is_active: true,
          });
        break;

      case "add_iv":
        result = await supabase
          .from("industrial_visits")
          .insert({
            title: command.title,
            department: command.department,
            destination: command.destination || null,
            duration: command.duration || null,
            visit_date: command.visit_date || null,
          });
        break;

      case "approve_alumni":
        result = await supabase
          .from("alumni")
          .update({ is_approved: command.approve })
          .eq("register_number", command.register_number);
        break;

      default:
        return new Response(
          JSON.stringify({ success: false, error: "Unknown action" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }

    if (result.error) {
      console.error("Database operation error:", result.error);
      return new Response(
        JSON.stringify({ success: false, error: "Database operation failed" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Admin command executed successfully:", { action: command.action, userId });
    return new Response(
      JSON.stringify({ success: true, action: command.action }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Admin command error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to process command" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

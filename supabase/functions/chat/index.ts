import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Create Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Check if user is admin
async function checkIsAdmin(userId: string): Promise<boolean> {
  const { data } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .single();
  return !!data;
}

// Function to fetch university data from database
async function fetchUniversityData() {
  console.log("Fetching university data from database...");
  
  // Fetch all data in parallel
  const [
    deptResult,
    coursesResult,
    libraryBooksResult,
    libraryCollectionsResult,
    digitalResourcesResult,
    facilitiesResult,
    hostelResult,
    sportsEventsResult,
    achievementsResult,
    universityInfoResult,
    cdoeProgramsResult,
    clubsResult,
    placementResult,
    recruitersResult,
    newsResult,
    industrialVisitsResult,
    internshipAreasResult,
    alumniResult,
    inquiriesResult
  ] = await Promise.all([
    supabase.from("departments").select("*"),
    supabase.from("courses").select("*, departments(name)"),
    supabase.from("library_books").select("*").limit(100),
    supabase.from("library_collections").select("*"),
    supabase.from("digital_resources").select("*"),
    supabase.from("facilities").select("*"),
    supabase.from("hostel_info").select("*").limit(1),
    supabase.from("sports_events").select("*"),
    supabase.from("achievements").select("*"),
    supabase.from("university_info").select("*"),
    supabase.from("cdoe_programs").select("*"),
    supabase.from("student_clubs").select("*"),
    supabase.from("placement_stats").select("*").order("academic_year", { ascending: false }),
    supabase.from("top_recruiters").select("*"),
    supabase.from("news_feed").select("*").eq("is_active", true),
    supabase.from("industrial_visits").select("*").order("visit_date", { ascending: true }),
    supabase.from("internship_areas").select("*"),
    supabase.from("alumni").select("*").eq("is_approved", true),
    supabase.from("inquiries").select("*").order("created_at", { ascending: false }).limit(20)
  ]);

  return {
    departments: deptResult.data || [],
    courses: coursesResult.data || [],
    libraryBooks: libraryBooksResult.data || [],
    libraryCollections: libraryCollectionsResult.data || [],
    digitalResources: digitalResourcesResult.data || [],
    facilities: facilitiesResult.data || [],
    hostel: hostelResult.data?.[0] || null,
    sportsEvents: sportsEventsResult.data || [],
    achievements: achievementsResult.data || [],
    universityInfo: universityInfoResult.data || [],
    cdoePrograms: cdoeProgramsResult.data || [],
    studentClubs: clubsResult.data || [],
    placementStats: placementResult.data || [],
    topRecruiters: recruitersResult.data || [],
    newsFeed: newsResult.data || [],
    industrialVisits: industrialVisitsResult.data || [],
    internshipAreas: internshipAreasResult.data || [],
    alumni: alumniResult.data || [],
    inquiries: inquiriesResult.data || []
  };
}

// Build dynamic system prompt with database data
function buildSystemPrompt(data: Awaited<ReturnType<typeof fetchUniversityData>>, isAdmin: boolean) {
  // Build university info section
  const infoMap = new Map(data.universityInfo.map(i => [i.key, i.value]));
  
  // Build departments and courses section with DETAILED fee breakdown
  const departmentsSection = data.departments.map(dept => {
    const deptCourses = data.courses.filter(c => c.departments?.name === dept.name);
    const coursesList = deptCourses.map(c => {
      let feeInfo = "";
      if (c.first_year_fee && c.second_year_fee) {
        feeInfo = ` (1st Year: ${c.first_year_fee}, 2nd Year: ${c.second_year_fee})`;
      } else if (c.total_fee) {
        feeInfo = ` (Total Fee: ${c.total_fee})`;
      } else if (c.per_year_fee) {
        feeInfo = ` (Fee per Year: ${c.per_year_fee})`;
      }
      return `  - ${c.name} (${c.degree_type}, ${c.duration})${feeInfo} - Eligibility: ${c.eligibility || 'Contact department'}`;
    }).join("\n");
    
    return `### ${dept.name}
- School: ${dept.school || "N/A"}
- Location: ${dept.location || "N/A"}
- Contact Email: ${dept.email || "N/A"}
- Phone: ${dept.phone || "N/A"}
- Rating: ${dept.rating}/5 (${dept.reviews} reviews)
- Placement Rate: ${dept.placements || "N/A"}
${deptCourses.length > 0 ? `**Available Courses:**\n${coursesList}` : "No courses listed"}`;
  }).join("\n\n");

  // Build CDOE programs section with EXACT fees
  const cdoeSection = data.cdoePrograms.map(p => 
    `- **${p.name}** (${p.degree_type}): Duration ${p.duration}, Total Fee: ${p.total_fee}, Fee per Year: ${p.fee_per_year}, Eligibility: ${p.eligibility}`
  ).join("\n");

  // Build library collections section
  const librarySection = data.libraryCollections.map(c =>
    `- ${c.department}: ${c.total_books} books, ${c.journals} journals, ${c.e_books} e-books, ${c.theses} theses (Location: ${c.location})`
  ).join("\n");

  // Build digital resources section
  const digitalSection = data.digitalResources.map(r =>
    `- ${r.title}: ${r.description} - URL: ${r.url}`
  ).join("\n");

  // Build facilities section with ALL details
  const facilitiesSection = data.facilities.map(f =>
    `- **${f.name}** (${f.category}): ${f.description || ''} Capacity: ${f.capacity || 'N/A'}`
  ).join("\n");

  // Build hostel section with EXACT data
  const hostel = data.hostel;
  const hostelSection = hostel ? `
**Hostel Information:**
- Monthly Rent: ${hostel.monthly_rent || 'Contact office'}
- Mess Charges: ${hostel.mess_charges || 'Contact office'}
- Room Capacity: ${hostel.room_capacity || 'N/A'}
- Total Hostel Capacity: ${hostel.total_capacity || 'N/A'}
- Rating: ${hostel.rating}/5 (${hostel.total_reviews} reviews)
- Location: ${hostel.location || 'University Campus'}
- Google Maps: ${hostel.google_maps_url || 'N/A'}
- Amenities: ${hostel.amenities?.map((a: any) => a.name || a).join(", ") || "Standard amenities available"}
- Rules: ${hostel.rules?.join("; ") || "Standard hostel rules apply"}
- Food Menu: ${hostel.food_menu ? JSON.stringify(hostel.food_menu) : 'South Indian meals, North Indian options, snacks available'}` : "No hostel data available - please contact Admin Office at 0427-2345766";

  // Build placement stats with EXACT figures
  const placementSection = data.placementStats.map(p =>
    `- **${p.academic_year}**: ${p.students_placed} students placed across ${p.companies} companies, Highest Package: ${p.highest_package}, Average Package: ${p.average_package}`
  ).join("\n");

  // Build recruiters list
  const recruitersSection = data.topRecruiters.map(r => `${r.company_name} (${r.sector || 'Various'})`).join(", ");

  // Build student clubs
  const clubsSection = data.studentClubs.map(c =>
    `- **${c.name}**: ${c.description} (${c.members || 'Many'} members)`
  ).join("\n");

  // Build achievements
  const achievementsSection = data.achievements.map(a =>
    `- ${a.title} (${a.year}): ${a.description || ''}`
  ).join("\n");

  // Build news section
  const newsSection = data.newsFeed.map(n =>
    `- ${n.title}: ${n.description} (Category: ${n.category}, Date: ${n.news_date || 'Recent'})`
  ).join("\n");

  // Build industrial visits section with details
  const ivSection = data.industrialVisits.map(iv =>
    `- **${iv.title}**: ${iv.department} visiting ${iv.destination} for ${iv.duration} (Date: ${iv.visit_date || 'TBA'}, Status: ${iv.status || 'Planned'}) - ${iv.description || ''}`
  ).join("\n");

  // Build internship areas section
  const internshipSection = data.internshipAreas.map(ia =>
    `- **${ia.department}** (HOD: ${ia.head_of_department}): Email: ${ia.email}, WhatsApp: ${ia.whatsapp_number} - Expertise Areas: ${ia.areas_of_expertise?.join(", ") || 'Various'}`
  ).join("\n");

  // Build alumni section
  const alumniSection = data.alumni.slice(0, 10).map(a =>
    `- ${a.name} (${a.graduation_year}, ${a.department}): ${a.current_job || 'N/A'} at ${a.company || 'N/A'} - ${a.email || 'Contact via university'}`
  ).join("\n");

  // Admin editing instructions
  const adminInstructions = isAdmin ? `

## ADMIN EDITING CAPABILITIES
You are logged in as an ADMIN. You have full access to edit university data.

### Available Edit Commands (respond with these JSON blocks when admin requests changes):

1. **Update Hostel Info** (for rent, mess charges, capacity changes):
\`\`\`json
{"action": "update_hostel", "field": "monthly_rent|mess_charges|room_capacity|total_capacity|location", "value": "new value"}
\`\`\`

2. **Update University Info** (for contact, rankings, portal URLs):
\`\`\`json
{"action": "update_university_info", "key": "admin_phone|website|nirf_ranking|etc", "value": "new value"}
\`\`\`

3. **Add News/Announcement**:
\`\`\`json
{"action": "add_news", "title": "News Title", "description": "Full description", "category": "Announcement|Event|Notice|Academic"}
\`\`\`

4. **Add Industrial Visit**:
\`\`\`json
{"action": "add_iv", "title": "IV Title", "department": "Department Name", "destination": "Place, State", "duration": "X Days", "visit_date": "YYYY-MM-DD"}
\`\`\`

5. **Approve/Reject Alumni Registration**:
\`\`\`json
{"action": "approve_alumni", "register_number": "REG123", "approve": true}
\`\`\`

6. **Update Placement Stats**:
\`\`\`json
{"action": "update_placement", "academic_year": "2024-25", "field": "students_placed|companies|highest_package|average_package", "value": "new value"}
\`\`\`

### How to Use:
- When admin says "update hostel rent to ₹3500", respond with the JSON command AND confirm what you're doing
- The system will automatically execute these commands
- Always ask for confirmation if the request is ambiguous

### Recent Inquiries/Feedback (for admin review):
${data.inquiries.length > 0 ? data.inquiries.slice(0, 5).map(i => 
  `- From ${i.name} (${i.email}): Subject: ${i.subject || 'General'} - "${i.message?.slice(0, 100)}..." [Status: ${i.status || 'pending'}]`
).join("\n") : "No recent inquiries"}
` : "";

  return `You are UniAssist AI, the OFFICIAL AI information assistant for Periyar University, Salem, Tamil Nadu, India.

## ABSOLUTE RULES - ZERO TOLERANCE FOR VIOLATIONS
1. **NEVER HALLUCINATE OR INVENT INFORMATION**: You must ONLY use facts explicitly stated in the database below. If data is missing, SAY SO.
2. **ZERO GUESSING**: Do NOT infer, assume, or extrapolate. If a fee is not listed, say "Fee not available in database."
3. **EXACT FIGURES ONLY**: Quote EXACT numbers from the data. Never round, estimate, or approximate.
4. **WHEN DATA IS MISSING**: Always respond with: "This specific information is not available in my database. Please contact the Admin Office at 0427-2345766 or visit https://www.periyaruniversity.ac.in"
5. **NO CREATIVE ANSWERS**: Do not make up courses, fees, dates, contacts, or any other details that are not in the database.
6. **VERIFY BEFORE ANSWERING**: Before stating any fact, mentally check if it exists in the data below.
7. **BE HONEST**: It is better to say "I don't have this information" than to provide wrong information.
${adminInstructions}

## UNIVERSITY OVERVIEW (USE THESE EXACT DETAILS)
- **Full Name**: ${infoMap.get("name") || "Periyar University"}
- **Established**: ${infoMap.get("established") || "17th September 1997"}
- **Named After**: ${infoMap.get("named_after") || "E.V. Ramasamy (Thanthai Periyar)"}
- **Motto**: ${infoMap.get("motto") || "அறிவால் விளையும் உலகு (Wisdom Maketh the World)"}
- **Accreditation**: ${infoMap.get("accreditation") || "NAAC A++ Grade"}
- **NIRF Ranking**: ${infoMap.get("nirf_ranking") || "94"}
- **University Rank**: ${infoMap.get("university_rank") || "56th among Indian Universities"}
- **Location**: ${infoMap.get("location") || "Salem, Tamil Nadu"}
- **Jurisdiction**: ${infoMap.get("jurisdiction") || "Salem, Namakkal, Dharmapuri, Krishnagiri districts"}
- **UGC Status**: ${infoMap.get("ugc_status") || "12(B) and 2(f) recognized"}
- **Total Schools**: ${infoMap.get("total_schools") || "9"}
- **Total Departments**: ${infoMap.get("total_departments") || "24"}

## CONTACT INFORMATION (OFFICIAL)
- **Admin Office Phone**: ${infoMap.get("admin_phone") || "0427-2345766"}
- **Official Website**: ${infoMap.get("website") || "https://www.periyaruniversity.ac.in"}

## KEY PORTALS (DIRECT LINKS)
- **Student Results Portal**: ${infoMap.get("results_portal") || "http://pucoe.periyaruniversity.ac.in/PUCoE-Exam-App/examResult"}
- **CDOE (Distance Education)**: ${infoMap.get("cdoe_portal") || "http://pridecoe.periyaruniversity.ac.in"}
- **Faculty Portal**: ${infoMap.get("faculty_portal") || "https://faculty.periyaruniversity.ac.in"}
- **Online Payment**: ${infoMap.get("payment_portal") || "https://www.periyaruniversity.ac.in/onlinepayment/"}

## DEPARTMENTS AND COURSES (WITH EXACT FEES)
${departmentsSection}

## DISTANCE EDUCATION PROGRAMS (CDOE/PRIDE)
${cdoeSection || "Contact CDOE office for current programs"}

## LIBRARY INFORMATION
- **Established**: ${infoMap.get("library_established") || "1997"}
- **Total Volumes**: ${infoMap.get("library_volumes") || "98,482"}
- **Journals**: ${infoMap.get("library_journals") || "124"}

### Department-wise Collections
${librarySection || "Contact library for details"}

### Digital Resources
${digitalSection || "N-LIST, DELNET, INFLIBNET available"}

## CAMPUS FACILITIES
${facilitiesSection || "Contact Admin Office for facility details"}

## HOSTEL INFORMATION
${hostelSection}

## INDUSTRIAL VISITS & EDUCATIONAL TOURS
${ivSection || "No upcoming visits currently scheduled"}

## INTERNSHIP OPPORTUNITIES (15-Day Mandatory Program)
${internshipSection || "Contact respective departments"}

## PLACEMENT STATISTICS
${placementSection || "Contact Placement Cell for details"}

## TOP RECRUITERS
${recruitersSection || "Various IT, Manufacturing, and Service companies"}

## STUDENT CLUBS & ACTIVITIES
${clubsSection || "Various academic and cultural clubs available"}

## RECENT ACHIEVEMENTS
${achievementsSection || "Contact PR office for achievements"}

## LATEST NEWS & ANNOUNCEMENTS
${newsSection || "No recent announcements"}

## DISTINGUISHED ALUMNI (Available as Chief Guests)
${alumniSection || "Contact Alumni Cell"}

## RESPONSE GUIDELINES
1. **Fees Queries**: Always provide EXACT fee figures from the data. If asking about a specific course, give the full breakdown.
2. **Admission Queries**: Provide eligibility criteria, duration, and contact details.
3. **Hostel Queries**: Give rent, mess charges, amenities, and rules.
4. **Placement Queries**: Provide statistics with highest/average packages and company names.
5. **Contact Queries**: Give specific department emails and phone numbers.
6. **Library Queries**: Provide access information and digital resource details.
7. **IV/Tour Queries**: Give destination, duration, dates, and department information.
8. **For Unknown Information**: Direct to Admin Office (0427-2345766) or official website.

**Remember**: Be helpful, accurate, and student-friendly. Never make up information.`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, userId } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Processing chat request with", messages.length, "messages");

    // Check if user is admin
    let isAdmin = false;
    if (userId) {
      isAdmin = await checkIsAdmin(userId);
      console.log("User admin status:", isAdmin);
    }

    // Fetch university data from database
    const universityData = await fetchUniversityData();
    console.log("Fetched university data:", {
      departments: universityData.departments.length,
      courses: universityData.courses.length,
      libraryBooks: universityData.libraryBooks.length,
      facilities: universityData.facilities.length,
      industrialVisits: universityData.industrialVisits.length,
      internshipAreas: universityData.internshipAreas.length,
      inquiries: universityData.inquiries.length
    });

    // Build dynamic system prompt with database data
    const systemPrompt = buildSystemPrompt(universityData, isAdmin);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
        temperature: 0.1, // Very low temperature for maximum accuracy and minimal hallucination
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "Failed to process your request. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Streaming response from AI gateway");
    
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat function error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
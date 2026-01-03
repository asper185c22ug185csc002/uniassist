import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Fetch departments with courses
export function useDepartments() {
  return useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("departments")
        .select("*")
        .order("name");
      if (error) throw error;
      return data;
    },
  });
}

// Fetch courses with department info
export function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*, departments(name, school)")
        .eq("is_active", true)
        .order("name");
      if (error) throw error;
      return data;
    },
  });
}

// Fetch library books
export function useLibraryBooks() {
  return useQuery({
    queryKey: ["library_books"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("library_books")
        .select("*")
        .order("title");
      if (error) throw error;
      return data;
    },
  });
}

// Fetch library collections
export function useLibraryCollections() {
  return useQuery({
    queryKey: ["library_collections"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("library_collections")
        .select("*")
        .order("department");
      if (error) throw error;
      return data;
    },
  });
}

// Fetch digital resources
export function useDigitalResources() {
  return useQuery({
    queryKey: ["digital_resources"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("digital_resources")
        .select("*")
        .order("title");
      if (error) throw error;
      return data;
    },
  });
}

// Fetch facilities
export function useFacilities() {
  return useQuery({
    queryKey: ["facilities"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("facilities")
        .select("*")
        .order("name");
      if (error) throw error;
      return data;
    },
  });
}

// Fetch hostel info
export function useHostelInfo() {
  return useQuery({
    queryKey: ["hostel_info"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("hostel_info")
        .select("*")
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });
}

// Fetch sports events
export function useSportsEvents() {
  return useQuery({
    queryKey: ["sports_events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sports_events")
        .select("*")
        .order("event_date");
      if (error) throw error;
      return data;
    },
  });
}

// Fetch achievements
export function useAchievements() {
  return useQuery({
    queryKey: ["achievements"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("achievements")
        .select("*")
        .order("year", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

// Fetch university info
export function useUniversityInfo() {
  return useQuery({
    queryKey: ["university_info"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("university_info")
        .select("*");
      if (error) throw error;
      // Convert to a map for easy access
      const infoMap: Record<string, string> = {};
      data?.forEach((item) => {
        infoMap[item.key] = item.value || "";
      });
      return infoMap;
    },
  });
}

// Fetch CDOE programs
export function useCdoePrograms() {
  return useQuery({
    queryKey: ["cdoe_programs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cdoe_programs")
        .select("*")
        .order("name");
      if (error) throw error;
      return data;
    },
  });
}

// Fetch student clubs
export function useStudentClubs() {
  return useQuery({
    queryKey: ["student_clubs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("student_clubs")
        .select("*")
        .order("name");
      if (error) throw error;
      return data;
    },
  });
}

// Fetch placement stats
export function usePlacementStats() {
  return useQuery({
    queryKey: ["placement_stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("placement_stats")
        .select("*")
        .order("academic_year", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

// Fetch top recruiters
export function useTopRecruiters() {
  return useQuery({
    queryKey: ["top_recruiters"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("top_recruiters")
        .select("*")
        .order("company_name");
      if (error) throw error;
      return data;
    },
  });
}

// Fetch news feed
export function useNewsFeed() {
  return useQuery({
    queryKey: ["news_feed"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news_feed")
        .select("*")
        .eq("is_active", true)
        .order("news_date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

// Combined hook for departments with their courses
export function useDepartmentsWithCourses() {
  return useQuery({
    queryKey: ["departments_with_courses"],
    queryFn: async () => {
      const [deptResult, coursesResult] = await Promise.all([
        supabase.from("departments").select("*").order("name"),
        supabase.from("courses").select("*").eq("is_active", true),
      ]);

      if (deptResult.error) throw deptResult.error;
      if (coursesResult.error) throw coursesResult.error;

      // Combine departments with their courses
      return deptResult.data.map((dept) => ({
        ...dept,
        courses: coursesResult.data.filter((c) => c.department_id === dept.id),
      }));
    },
  });
}

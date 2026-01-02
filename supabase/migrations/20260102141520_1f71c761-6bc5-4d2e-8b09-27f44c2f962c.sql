-- =====================================================
-- PERIYAR UNIVERSITY COMPREHENSIVE DATABASE SCHEMA
-- =====================================================

-- 1. Departments Table
CREATE TABLE public.departments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  url TEXT,
  school TEXT,
  phone TEXT DEFAULT '0427-2345766',
  email TEXT,
  location TEXT,
  rating DECIMAL(2,1) DEFAULT 4.0,
  reviews INTEGER DEFAULT 0,
  placements TEXT,
  highlights TEXT[],
  icon_name TEXT,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 2. Courses Table
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  department_id UUID REFERENCES public.departments(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  degree_type TEXT NOT NULL, -- 'PG', 'PhD', 'Integrated', 'Distance'
  duration TEXT,
  first_year_fee TEXT,
  second_year_fee TEXT,
  third_sem_fee TEXT,
  fourth_sem_fee TEXT,
  per_year_fee TEXT,
  total_fee TEXT,
  eligibility TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 3. Library Books Table
CREATE TABLE public.library_books (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  category TEXT NOT NULL,
  available BOOLEAN DEFAULT true,
  location TEXT,
  isbn TEXT,
  department TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 4. Library Department Collections
CREATE TABLE public.library_collections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  department TEXT NOT NULL UNIQUE,
  total_books INTEGER DEFAULT 0,
  journals INTEGER DEFAULT 0,
  e_books INTEGER DEFAULT 0,
  theses INTEGER DEFAULT 0,
  location TEXT,
  icon_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 5. Digital Resources
CREATE TABLE public.digital_resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  url TEXT,
  resource_type TEXT NOT NULL,
  icon_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 6. Facilities Table (Sports, Hostel, etc.)
CREATE TABLE public.facilities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'sports', 'hostel', 'academic'
  description TEXT,
  capacity TEXT,
  features TEXT[],
  icon_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 7. Hostel Information
CREATE TABLE public.hostel_info (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  monthly_rent TEXT,
  mess_charges TEXT,
  room_capacity TEXT,
  total_capacity TEXT,
  rating DECIMAL(2,1),
  total_reviews INTEGER,
  location TEXT,
  google_maps_url TEXT,
  amenities JSONB,
  food_menu JSONB,
  rules TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 8. Sports Events
CREATE TABLE public.sports_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  event_date DATE,
  venue TEXT,
  description TEXT,
  category TEXT,
  status TEXT DEFAULT 'upcoming',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 9. Achievements
CREATE TABLE public.achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  year TEXT,
  category TEXT,
  description TEXT,
  icon_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 10. University Info (General)
CREATE TABLE public.university_info (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 11. CDOE (Distance Education) Programs
CREATE TABLE public.cdoe_programs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  duration TEXT,
  fee_per_year TEXT,
  total_fee TEXT,
  eligibility TEXT,
  degree_type TEXT, -- 'UG', 'PG'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 12. Student Clubs
CREATE TABLE public.student_clubs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  members TEXT,
  icon_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 13. Placement Statistics
CREATE TABLE public.placement_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  academic_year TEXT NOT NULL,
  students_placed INTEGER,
  companies INTEGER,
  highest_package TEXT,
  average_package TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 14. Top Recruiters
CREATE TABLE public.top_recruiters (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  sector TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 15. News and Announcements
CREATE TABLE public.news_feed (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  news_date DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables (public read access)
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.library_books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.library_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.digital_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hostel_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sports_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.university_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cdoe_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.placement_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.top_recruiters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_feed ENABLE ROW LEVEL SECURITY;

-- Create public read policies for all tables (university info should be publicly accessible)
CREATE POLICY "Public read access for departments" ON public.departments FOR SELECT USING (true);
CREATE POLICY "Public read access for courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Public read access for library_books" ON public.library_books FOR SELECT USING (true);
CREATE POLICY "Public read access for library_collections" ON public.library_collections FOR SELECT USING (true);
CREATE POLICY "Public read access for digital_resources" ON public.digital_resources FOR SELECT USING (true);
CREATE POLICY "Public read access for facilities" ON public.facilities FOR SELECT USING (true);
CREATE POLICY "Public read access for hostel_info" ON public.hostel_info FOR SELECT USING (true);
CREATE POLICY "Public read access for sports_events" ON public.sports_events FOR SELECT USING (true);
CREATE POLICY "Public read access for achievements" ON public.achievements FOR SELECT USING (true);
CREATE POLICY "Public read access for university_info" ON public.university_info FOR SELECT USING (true);
CREATE POLICY "Public read access for cdoe_programs" ON public.cdoe_programs FOR SELECT USING (true);
CREATE POLICY "Public read access for student_clubs" ON public.student_clubs FOR SELECT USING (true);
CREATE POLICY "Public read access for placement_stats" ON public.placement_stats FOR SELECT USING (true);
CREATE POLICY "Public read access for top_recruiters" ON public.top_recruiters FOR SELECT USING (true);
CREATE POLICY "Public read access for news_feed" ON public.news_feed FOR SELECT USING (true);

-- Create indexes for common queries
CREATE INDEX idx_courses_department ON public.courses(department_id);
CREATE INDEX idx_courses_degree_type ON public.courses(degree_type);
CREATE INDEX idx_library_books_category ON public.library_books(category);
CREATE INDEX idx_library_books_department ON public.library_books(department);
CREATE INDEX idx_library_books_available ON public.library_books(available);
CREATE INDEX idx_sports_events_status ON public.sports_events(status);
CREATE INDEX idx_news_feed_active ON public.news_feed(is_active);
CREATE INDEX idx_university_info_key ON public.university_info(key);
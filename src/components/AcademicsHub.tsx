import { useState } from "react";
import {
  BookOpenCheck,
  GraduationCap,
  Users,
  Globe,
  ExternalLink,
  Coins,
  Clock,
  ChevronRight,
  Award,
  Music,
  Heart,
  Flag,
  Palette,
  FlaskConical,
  Calculator,
  Atom,
  Briefcase,
  Languages,
  BookOpen,
  Leaf,
  Sun,
  Brain,
  Star,
  FileText,
  TrendingUp,
  Calendar,
  MapPin,
  CheckCircle,
  Building2,
  Newspaper,
  MessageSquare,
  IndianRupee,
  ClipboardList,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Schools and Departments with Courses and Fees
const schoolsAndDepartments = [
  {
    school: "School of Biosciences",
    departments: [
      { 
        name: "Biochemistry", 
        url: "https://www.periyaruniversity.ac.in/Dept/bch.php",
        courses: ["M.Sc. Biochemistry", "M.Phil. Biochemistry", "Ph.D. Biochemistry"],
        fees: { msc: "₹12,000/year", mphil: "₹15,000/year", phd: "₹18,000/year" },
        rating: 4.5,
        reviews: 128,
        placements: "85%"
      },
      { 
        name: "Biotechnology", 
        url: "https://www.periyaruniversity.ac.in/Dept/bio.php",
        courses: ["M.Sc. Biotechnology", "M.Phil. Biotechnology", "Ph.D. Biotechnology"],
        fees: { msc: "₹15,000/year", mphil: "₹18,000/year", phd: "₹20,000/year" },
        rating: 4.6,
        reviews: 156,
        placements: "88%"
      },
      { 
        name: "Microbiology", 
        url: "https://www.periyaruniversity.ac.in/Dept/mib.php",
        courses: ["M.Sc. Microbiology", "M.Phil. Microbiology", "Ph.D. Microbiology"],
        fees: { msc: "₹12,000/year", mphil: "₹15,000/year", phd: "₹18,000/year" },
        rating: 4.4,
        reviews: 98,
        placements: "82%"
      },
    ],
    icon: FlaskConical,
    color: "green"
  },
  {
    school: "School of Mathematics",
    departments: [
      { 
        name: "Computer Science", 
        url: "https://www.periyaruniversity.ac.in/Dept/csc.php",
        courses: ["M.Sc. Computer Science", "M.Sc. Data Science", "M.C.A.", "M.Phil. Computer Science", "Ph.D. Computer Science"],
        fees: { msc: "₹18,000/year", mscds: "₹25,000/year", mca: "₹25,000/year", mphil: "₹20,000/year", phd: "₹22,000/year" },
        rating: 4.7,
        reviews: 245,
        placements: "92%",
        highlights: ["AI & Machine Learning Lab", "Data Analytics Center", "Industry Partnerships with TCS, Infosys"]
      },
      { 
        name: "Library and Information Science", 
        url: "https://www.periyaruniversity.ac.in/Dept/lib.php",
        courses: ["M.L.I.Sc.", "M.Phil. Library Science", "Ph.D. Library Science"],
        fees: { mlisc: "₹10,000/year", mphil: "₹12,000/year", phd: "₹15,000/year" },
        rating: 4.3,
        reviews: 67,
        placements: "78%"
      },
      { 
        name: "Mathematics", 
        url: "https://www.periyaruniversity.ac.in/Dept/mat.php",
        courses: ["M.Sc. Mathematics", "M.Phil. Mathematics", "Ph.D. Mathematics"],
        fees: { msc: "₹10,000/year", mphil: "₹12,000/year", phd: "₹15,000/year" },
        rating: 4.5,
        reviews: 112,
        placements: "80%"
      },
      { 
        name: "Statistics", 
        url: "https://www.periyaruniversity.ac.in/Dept/sta.php",
        courses: ["M.Sc. Statistics", "M.Phil. Statistics", "Ph.D. Statistics"],
        fees: { msc: "₹10,000/year", mphil: "₹12,000/year", phd: "₹15,000/year" },
        rating: 4.4,
        reviews: 89,
        placements: "75%"
      },
    ],
    icon: Calculator,
    color: "blue"
  },
  {
    school: "School of Physical Sciences",
    departments: [
      { 
        name: "Physics", 
        url: "https://www.periyaruniversity.ac.in/Dept/phy.php",
        courses: ["M.Sc. Physics", "M.Phil. Physics", "Ph.D. Physics"],
        fees: { msc: "₹12,000/year", mphil: "₹15,000/year", phd: "₹18,000/year" },
        rating: 4.6,
        reviews: 134,
        placements: "78%"
      },
      { 
        name: "Chemistry", 
        url: "https://www.periyaruniversity.ac.in/Dept/che.php",
        courses: ["M.Sc. Chemistry", "M.Phil. Chemistry", "Ph.D. Chemistry"],
        fees: { msc: "₹12,000/year", mphil: "₹15,000/year", phd: "₹18,000/year" },
        rating: 4.5,
        reviews: 145,
        placements: "80%"
      },
      { 
        name: "Geology", 
        url: "https://www.periyaruniversity.ac.in/Dept/geo.php",
        courses: ["M.Sc. Geology", "M.Phil. Geology", "Ph.D. Geology"],
        fees: { msc: "₹12,000/year", mphil: "₹15,000/year", phd: "₹18,000/year" },
        rating: 4.3,
        reviews: 78,
        placements: "72%"
      },
    ],
    icon: Atom,
    color: "purple"
  },
  {
    school: "School of Business Studies",
    departments: [
      { 
        name: "Commerce", 
        url: "https://www.periyaruniversity.ac.in/Dept/com.php",
        courses: ["M.Com.", "M.Phil. Commerce", "Ph.D. Commerce"],
        fees: { mcom: "₹10,000/year", mphil: "₹12,000/year", phd: "₹15,000/year" },
        rating: 4.4,
        reviews: 167,
        placements: "82%"
      },
      { 
        name: "Economics", 
        url: "https://www.periyaruniversity.ac.in/Dept/eco.php",
        courses: ["M.A. Economics", "M.Phil. Economics", "Ph.D. Economics"],
        fees: { ma: "₹8,000/year", mphil: "₹10,000/year", phd: "₹12,000/year" },
        rating: 4.3,
        reviews: 98,
        placements: "70%"
      },
      { 
        name: "Management Studies (MBA)", 
        url: "https://www.periyaruniversity.ac.in/Dept/mba.php",
        courses: ["M.B.A.", "M.Phil. Management", "Ph.D. Management"],
        fees: { mba: "₹45,000/year", mphil: "₹25,000/year", phd: "₹30,000/year" },
        rating: 4.7,
        reviews: 289,
        placements: "90%"
      },
    ],
    icon: Briefcase,
    color: "orange"
  },
  {
    school: "School of Languages",
    departments: [
      { 
        name: "English", 
        url: "https://www.periyaruniversity.ac.in/Dept/eng.php",
        courses: ["M.A. English", "M.Phil. English", "Ph.D. English"],
        fees: { ma: "₹8,000/year", mphil: "₹10,000/year", phd: "₹12,000/year" },
        rating: 4.5,
        reviews: 178,
        placements: "75%"
      },
      { 
        name: "Tamil", 
        url: "https://www.periyaruniversity.ac.in/Dept/tam.php",
        courses: ["M.A. Tamil", "M.Phil. Tamil", "Ph.D. Tamil"],
        fees: { ma: "₹6,000/year", mphil: "₹8,000/year", phd: "₹10,000/year" },
        rating: 4.4,
        reviews: 123,
        placements: "70%"
      },
    ],
    icon: Languages,
    color: "pink"
  },
  {
    school: "School of Professional Studies",
    departments: [
      { 
        name: "Education", 
        url: "https://www.periyaruniversity.ac.in/Dept/edu.php",
        courses: ["M.Ed.", "M.Phil. Education", "Ph.D. Education"],
        fees: { med: "₹15,000/year", mphil: "₹18,000/year", phd: "₹20,000/year" },
        rating: 4.5,
        reviews: 156,
        placements: "85%"
      },
      { 
        name: "Food Science and Nutrition", 
        url: "https://www.periyaruniversity.ac.in/Dept/fsn.php",
        courses: ["M.Sc. Food Science", "M.Phil. Food Science", "Ph.D. Food Science"],
        fees: { msc: "₹12,000/year", mphil: "₹15,000/year", phd: "₹18,000/year" },
        rating: 4.4,
        reviews: 89,
        placements: "78%"
      },
      { 
        name: "Textiles and Apparel Design", 
        url: "https://www.periyaruniversity.ac.in/Dept/tex.php",
        courses: ["M.Sc. Textiles", "M.Phil. Textiles", "Ph.D. Textiles"],
        fees: { msc: "₹12,000/year", mphil: "₹15,000/year", phd: "₹18,000/year" },
        rating: 4.3,
        reviews: 67,
        placements: "75%"
      },
    ],
    icon: BookOpen,
    color: "cyan"
  },
  {
    school: "School of Social Sciences",
    departments: [
      { 
        name: "Sociology", 
        url: "https://www.periyaruniversity.ac.in/Dept/soc.php",
        courses: ["M.A. Sociology", "M.Phil. Sociology", "Ph.D. Sociology"],
        fees: { ma: "₹8,000/year", mphil: "₹10,000/year", phd: "₹12,000/year" },
        rating: 4.3,
        reviews: 78,
        placements: "68%"
      },
      { 
        name: "Psychology", 
        url: "https://www.periyaruniversity.ac.in/Dept/psy.php",
        courses: ["M.Sc. Psychology", "M.Phil. Psychology", "Ph.D. Psychology"],
        fees: { msc: "₹10,000/year", mphil: "₹12,000/year", phd: "₹15,000/year" },
        rating: 4.5,
        reviews: 134,
        placements: "80%"
      },
      { 
        name: "Journalism and Mass Communication", 
        url: "https://www.periyaruniversity.ac.in/Dept/jmc.php",
        courses: ["M.A. Journalism", "M.Phil. Journalism", "Ph.D. Journalism"],
        fees: { ma: "₹12,000/year", mphil: "₹15,000/year", phd: "₹18,000/year" },
        rating: 4.6,
        reviews: 167,
        placements: "85%"
      },
      { 
        name: "History", 
        url: "https://www.periyaruniversity.ac.in/Dept/his.php",
        courses: ["M.A. History", "M.Phil. History", "Ph.D. History"],
        fees: { ma: "₹6,000/year", mphil: "₹8,000/year", phd: "₹10,000/year" },
        rating: 4.2,
        reviews: 89,
        placements: "65%"
      },
    ],
    icon: Brain,
    color: "amber"
  },
  {
    school: "School of Life Sciences",
    departments: [
      { 
        name: "Botany", 
        url: "https://www.periyaruniversity.ac.in/Dept/bot.php",
        courses: ["M.Sc. Botany", "M.Phil. Botany", "Ph.D. Botany"],
        fees: { msc: "₹10,000/year", mphil: "₹12,000/year", phd: "₹15,000/year" },
        rating: 4.4,
        reviews: 98,
        placements: "72%"
      },
      { 
        name: "Zoology", 
        url: "https://www.periyaruniversity.ac.in/Dept/zoo.php",
        courses: ["M.Sc. Zoology", "M.Phil. Zoology", "Ph.D. Zoology"],
        fees: { msc: "₹10,000/year", mphil: "₹12,000/year", phd: "₹15,000/year" },
        rating: 4.3,
        reviews: 87,
        placements: "70%"
      },
      { 
        name: "Nutrition and Dietetics", 
        url: "https://www.periyaruniversity.ac.in/Dept/cnd.php",
        courses: ["M.Sc. Nutrition", "M.Phil. Nutrition", "Ph.D. Nutrition"],
        fees: { msc: "₹12,000/year", mphil: "₹15,000/year", phd: "₹18,000/year" },
        rating: 4.5,
        reviews: 112,
        placements: "80%"
      },
    ],
    icon: Leaf,
    color: "emerald"
  },
  {
    school: "School of Energy & Environmental Sciences",
    departments: [
      { 
        name: "Energy Science and Technology", 
        url: "https://www.periyaruniversity.ac.in/Dept/egs.php",
        courses: ["M.Sc. Energy Science", "M.Phil. Energy Science", "Ph.D. Energy Science"],
        fees: { msc: "₹15,000/year", mphil: "₹18,000/year", phd: "₹20,000/year" },
        rating: 4.6,
        reviews: 78,
        placements: "85%"
      },
      { 
        name: "Environmental Science", 
        url: "https://www.periyaruniversity.ac.in/Dept/evs.php",
        courses: ["M.Sc. Environmental Science", "M.Phil. Environmental Science", "Ph.D. Environmental Science"],
        fees: { msc: "₹12,000/year", mphil: "₹15,000/year", phd: "₹18,000/year" },
        rating: 4.5,
        reviews: 89,
        placements: "78%"
      },
    ],
    icon: Sun,
    color: "yellow"
  },
];

// CDOE Programs with detailed fees
const cdoePrograms = [
  { name: "B.A. Tamil", duration: "3 Years", fee: "₹3,500/year", totalFee: "₹10,500", eligibility: "10+2 Pass" },
  { name: "B.A. History", duration: "3 Years", fee: "₹3,500/year", totalFee: "₹10,500", eligibility: "10+2 Pass" },
  { name: "B.A. Economics", duration: "3 Years", fee: "₹3,500/year", totalFee: "₹10,500", eligibility: "10+2 Pass" },
  { name: "B.A. Public Administration", duration: "3 Years", fee: "₹3,500/year", totalFee: "₹10,500", eligibility: "10+2 Pass" },
  { name: "B.Com.", duration: "3 Years", fee: "₹4,000/year", totalFee: "₹12,000", eligibility: "10+2 with Commerce" },
  { name: "B.Sc. Computer Science", duration: "3 Years", fee: "₹6,000/year", totalFee: "₹18,000", eligibility: "10+2 with Maths" },
  { name: "M.A. Tamil", duration: "2 Years", fee: "₹4,000/year", totalFee: "₹8,000", eligibility: "Bachelor's Degree" },
  { name: "M.A. History", duration: "2 Years", fee: "₹4,000/year", totalFee: "₹8,000", eligibility: "Bachelor's Degree" },
  { name: "M.A. Public Administration", duration: "2 Years", fee: "₹4,500/year", totalFee: "₹9,000", eligibility: "Bachelor's Degree" },
  { name: "M.Com.", duration: "2 Years", fee: "₹5,000/year", totalFee: "₹10,000", eligibility: "B.Com. Degree" },
  { name: "M.B.A.", duration: "2 Years", fee: "₹15,000/year", totalFee: "₹30,000", eligibility: "Bachelor's Degree" },
  { name: "M.Sc. Computer Science", duration: "2 Years", fee: "₹8,000/year", totalFee: "₹16,000", eligibility: "B.Sc. CS/IT" },
];

// Student Clubs
const studentClubs = [
  { name: "NSS (National Service Scheme)", icon: Flag, description: "Community service, social welfare activities, and rural development camps", members: "500+" },
  { name: "YRC (Youth Red Cross)", icon: Heart, description: "Health awareness programs, blood donation camps, and first aid training", members: "300+" },
  { name: "NCC (National Cadet Corps)", icon: Award, description: "Military training, discipline, and national integration activities", members: "200+" },
  { name: "Fine Arts Club", icon: Palette, description: "Cultural events, drama, art exhibitions, and creative workshops", members: "400+" },
  { name: "Music Club", icon: Music, description: "Classical and contemporary music performances and competitions", members: "150+" },
  { name: "Literary Club", icon: BookOpenCheck, description: "Debates, essay competitions, poetry, and creative writing", members: "250+" },
];

// News Feed
const newsFeed = [
  { title: "NAAC A++ Grade Achieved", date: "2024-12-20", category: "Achievement", description: "Periyar University achieves prestigious NAAC A++ accreditation" },
  { title: "Admission Open for 2025-26", date: "2024-12-15", category: "Admissions", description: "Applications now open for UG, PG, and Research programs" },
  { title: "International Conference on AI", date: "2024-12-10", category: "Events", description: "Department of Computer Science organizing 3-day international conference" },
  { title: "Campus Placement Drive 2025", date: "2024-12-05", category: "Placements", description: "Major IT companies visiting campus for recruitment" },
  { title: "Research Grants Announced", date: "2024-12-01", category: "Research", description: "UGC announces new research grants for faculty members" },
];

// Admission Process Steps
const admissionProcess = [
  { step: 1, title: "Check Eligibility", description: "Verify you meet the minimum qualifications for your chosen program" },
  { step: 2, title: "Online Registration", description: "Create account on the university portal and fill application form" },
  { step: 3, title: "Document Upload", description: "Upload required documents including marksheets, certificates, and photos" },
  { step: 4, title: "Fee Payment", description: "Pay the application fee online through net banking/UPI/cards" },
  { step: 5, title: "Entrance Test/Merit", description: "Appear for entrance test or await merit list based on program" },
  { step: 6, title: "Counselling", description: "Attend counselling session for seat allotment" },
  { step: 7, title: "Admission Confirmation", description: "Pay admission fees and complete enrollment formalities" },
];

// Eligibility Criteria
const eligibilityCriteria = [
  { program: "UG Programs", criteria: "10+2 or equivalent with minimum 50% marks (45% for reserved categories)" },
  { program: "PG Programs", criteria: "Bachelor's degree in relevant subject with minimum 50% marks" },
  { program: "M.Phil. Programs", criteria: "Master's degree with minimum 55% marks + Entrance Test" },
  { program: "Ph.D. Programs", criteria: "M.Phil. or Master's with 55% + PU-PET/NET/SLET qualification" },
  { program: "MBA", criteria: "Bachelor's degree with 50% + TANCET/CAT/MAT score" },
  { program: "M.Ed.", criteria: "B.Ed. with 50% + 2 years teaching experience preferred" },
];

// Placement Statistics
const placementStats = [
  { year: "2023-24", placed: 1250, companies: 85, highest: "₹18 LPA", average: "₹4.5 LPA" },
  { year: "2022-23", placed: 1180, companies: 78, highest: "₹15 LPA", average: "₹4.2 LPA" },
  { year: "2021-22", placed: 1050, companies: 72, highest: "₹12 LPA", average: "₹3.8 LPA" },
];

// Top Recruiters
const topRecruiters = [
  "TCS", "Infosys", "Wipro", "Cognizant", "HCL", "Tech Mahindra", 
  "Accenture", "IBM", "Capgemini", "L&T Infotech", "Mindtree", "Mphasis",
  "HDFC Bank", "ICICI Bank", "Axis Bank", "SBI", "LIC", "Deloitte"
];

const getColorClasses = (color: string) => {
  const colors: Record<string, { bg: string; text: string; border: string }> = {
    green: { bg: "bg-green-500/20", text: "text-green-400", border: "border-green-500/30" },
    blue: { bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500/30" },
    purple: { bg: "bg-purple-500/20", text: "text-purple-400", border: "border-purple-500/30" },
    orange: { bg: "bg-orange-500/20", text: "text-orange-400", border: "border-orange-500/30" },
    pink: { bg: "bg-pink-500/20", text: "text-pink-400", border: "border-pink-500/30" },
    cyan: { bg: "bg-cyan-500/20", text: "text-cyan-400", border: "border-cyan-500/30" },
    amber: { bg: "bg-amber-500/20", text: "text-amber-400", border: "border-amber-500/30" },
    emerald: { bg: "bg-emerald-500/20", text: "text-emerald-400", border: "border-emerald-500/30" },
    yellow: { bg: "bg-yellow-500/20", text: "text-yellow-400", border: "border-yellow-500/30" },
  };
  return colors[color] || colors.orange;
};

export const AcademicsHub = () => {
  const [activeTab, setActiveTab] = useState<"departments" | "fees" | "admissions" | "placements" | "news">("departments");
  const [expandedSchool, setExpandedSchool] = useState<string | null>(null);

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2">Academics & Programs</h1>
        <p className="text-slate-400">Explore 9 Schools with 24 Departments - Courses, Fees, Admissions & Placements</p>
      </div>

      {/* University Highlights */}
      <div className="glass-dark rounded-2xl p-5 mb-6">
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-orange-400" />
            <span className="text-slate-300">NAAC A++ Grade (2021)</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-400" />
            <span className="text-slate-300">NIRF Rank 94 (MoE 2024)</span>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-green-400" />
            <span className="text-slate-300">Established 17th September 1997</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <span className="text-slate-300">90%+ Placement Rate</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab("departments")}
          className={cn(
            "flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all whitespace-nowrap",
            activeTab === "departments"
              ? "bg-gradient-to-r from-orange-500 to-orange-600 text-slate-950"
              : "glass-dark text-slate-300 hover:text-slate-100"
          )}
        >
          <GraduationCap className="w-5 h-5" />
          Departments & Courses
        </button>
        <button
          onClick={() => setActiveTab("fees")}
          className={cn(
            "flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all whitespace-nowrap",
            activeTab === "fees"
              ? "bg-gradient-to-r from-green-500 to-green-600 text-slate-950"
              : "glass-dark text-slate-300 hover:text-slate-100"
          )}
        >
          <IndianRupee className="w-5 h-5" />
          Fees Structure
        </button>
        <button
          onClick={() => setActiveTab("admissions")}
          className={cn(
            "flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all whitespace-nowrap",
            activeTab === "admissions"
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
              : "glass-dark text-slate-300 hover:text-slate-100"
          )}
        >
          <ClipboardList className="w-5 h-5" />
          Admissions
        </button>
        <button
          onClick={() => setActiveTab("placements")}
          className={cn(
            "flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all whitespace-nowrap",
            activeTab === "placements"
              ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white"
              : "glass-dark text-slate-300 hover:text-slate-100"
          )}
        >
          <Target className="w-5 h-5" />
          Placements
        </button>
        <button
          onClick={() => setActiveTab("news")}
          className={cn(
            "flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all whitespace-nowrap",
            activeTab === "news"
              ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-slate-950"
              : "glass-dark text-slate-300 hover:text-slate-100"
          )}
        >
          <Newspaper className="w-5 h-5" />
          News & Updates
        </button>
      </div>

      {/* Departments & Courses Tab */}
      {activeTab === "departments" && (
        <div className="space-y-4">
          <div className="glass-dark rounded-2xl p-5 mb-6">
            <h3 className="font-semibold text-slate-100 mb-2 flex items-center gap-2">
              <Award className="w-5 h-5 text-orange-400" />
              Schools, Departments & Courses
            </h3>
            <p className="text-sm text-slate-400">
              Click on any school to view departments, courses offered, fees, and reviews.
            </p>
          </div>

          <div className="grid gap-4">
            {schoolsAndDepartments.map((school, index) => {
              const colors = getColorClasses(school.color);
              const IconComponent = school.icon;
              const isExpanded = expandedSchool === school.school;
              
              return (
                <div
                  key={school.school}
                  className={cn("glass-dark rounded-xl overflow-hidden hover:border-opacity-50 transition-all animate-in", colors.border)}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <button
                    onClick={() => setExpandedSchool(isExpanded ? null : school.school)}
                    className="w-full p-5 flex items-start gap-4 text-left"
                  >
                    <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0", colors.bg)}>
                      <IconComponent className={cn("w-6 h-6", colors.text)} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-100 mb-1">{school.school}</h3>
                      <p className="text-sm text-slate-400">{school.departments.length} Departments</p>
                    </div>
                    <ChevronRight className={cn("w-5 h-5 text-slate-400 transition-transform", isExpanded && "rotate-90")} />
                  </button>
                  
                  {isExpanded && (
                    <div className="px-5 pb-5 space-y-4">
                      {school.departments.map((dept) => (
                        <div key={dept.name} className={cn("rounded-lg p-4", colors.bg)}>
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <a
                                href={dept.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn("font-medium hover:underline flex items-center gap-1", colors.text)}
                              >
                                {dept.name}
                                <ExternalLink className="w-3 h-3" />
                              </a>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                  <span className="text-sm text-slate-300">{dept.rating}</span>
                                </div>
                                <span className="text-slate-500">•</span>
                                <span className="text-sm text-slate-400">{dept.reviews} reviews</span>
                                <span className="text-slate-500">•</span>
                                <span className="text-sm text-green-400">{dept.placements} placed</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <p className="text-xs text-slate-400 font-medium">Courses Offered:</p>
                            <div className="flex flex-wrap gap-2">
                              {dept.courses.map((course) => (
                                <span
                                  key={course}
                                  className="text-xs px-2 py-1 rounded-full bg-slate-800/50 text-slate-300"
                                >
                                  {course}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Links */}
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <a
              href="https://www.periyaruniversity.ac.in/Programmes_offered.php"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-dark rounded-xl p-4 hover:border-orange-500/30 transition-all group"
            >
              <h4 className="font-semibold text-slate-100 group-hover:text-orange-400 transition-colors flex items-center gap-2">
                Programmes Offered <ExternalLink className="w-4 h-4" />
              </h4>
              <p className="text-sm text-slate-400 mt-1">View all UG, PG & Research programs</p>
            </a>
            <a
              href="https://www.periyaruniversity.ac.in/Syllabi.php"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-dark rounded-xl p-4 hover:border-blue-500/30 transition-all group"
            >
              <h4 className="font-semibold text-slate-100 group-hover:text-blue-400 transition-colors flex items-center gap-2">
                Syllabus <ExternalLink className="w-4 h-4" />
              </h4>
              <p className="text-sm text-slate-400 mt-1">Download course syllabi</p>
            </a>
            <a
              href="https://www.periyaruniversity.ac.in/Affiliated_Colleges.php"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-dark rounded-xl p-4 hover:border-purple-500/30 transition-all group"
            >
              <h4 className="font-semibold text-slate-100 group-hover:text-purple-400 transition-colors flex items-center gap-2">
                Affiliated Colleges <ExternalLink className="w-4 h-4" />
              </h4>
              <p className="text-sm text-slate-400 mt-1">View list of affiliated institutions</p>
            </a>
          </div>
        </div>
      )}

      {/* Fees Structure Tab */}
      {activeTab === "fees" && (
        <div className="space-y-6">
          {/* Regular Programs Fees */}
          <div className="glass-dark rounded-2xl p-5">
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-green-400" />
              Regular Programs Fee Structure (On-Campus)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-slate-300">Program</th>
                    <th className="text-left py-3 px-4 text-slate-300">Tuition Fee</th>
                    <th className="text-left py-3 px-4 text-slate-300">Other Fees</th>
                    <th className="text-left py-3 px-4 text-slate-300">Total/Year</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 text-slate-100">M.Sc. Programs</td>
                    <td className="py-3 px-4 text-slate-300">₹8,000 - ₹15,000</td>
                    <td className="py-3 px-4 text-slate-300">₹2,000 - ₹3,000</td>
                    <td className="py-3 px-4 text-green-400">₹10,000 - ₹18,000</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 text-slate-100">M.A. Programs</td>
                    <td className="py-3 px-4 text-slate-300">₹5,000 - ₹10,000</td>
                    <td className="py-3 px-4 text-slate-300">₹1,500 - ₹2,000</td>
                    <td className="py-3 px-4 text-green-400">₹6,000 - ₹12,000</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 text-slate-100">M.B.A.</td>
                    <td className="py-3 px-4 text-slate-300">₹40,000</td>
                    <td className="py-3 px-4 text-slate-300">₹5,000</td>
                    <td className="py-3 px-4 text-green-400">₹45,000</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 text-slate-100">M.C.A.</td>
                    <td className="py-3 px-4 text-slate-300">₹20,000</td>
                    <td className="py-3 px-4 text-slate-300">₹5,000</td>
                    <td className="py-3 px-4 text-green-400">₹25,000</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 text-slate-100">M.Phil. Programs</td>
                    <td className="py-3 px-4 text-slate-300">₹10,000 - ₹15,000</td>
                    <td className="py-3 px-4 text-slate-300">₹2,000 - ₹3,000</td>
                    <td className="py-3 px-4 text-green-400">₹12,000 - ₹18,000</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 text-slate-100">Ph.D. Programs</td>
                    <td className="py-3 px-4 text-slate-300">₹12,000 - ₹18,000</td>
                    <td className="py-3 px-4 text-slate-300">₹3,000 - ₹4,000</td>
                    <td className="py-3 px-4 text-green-400">₹15,000 - ₹22,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* CDOE Programs Fees */}
          <div className="glass-dark rounded-2xl p-5">
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-400" />
              Distance Education (CDOE) Fee Structure
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {cdoePrograms.map((program, index) => (
                <div
                  key={program.name}
                  className="bg-slate-800/30 rounded-lg p-4 animate-in"
                  style={{ animationDelay: `${index * 0.03}s` }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-slate-100">{program.name}</h4>
                    <span className="text-green-400 font-semibold">{program.fee}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {program.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Coins className="w-3 h-3" />
                      Total: {program.totalFee}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">Eligibility: {program.eligibility}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Fees */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass-dark rounded-xl p-4">
              <h4 className="font-semibold text-slate-100 mb-3">Hostel Fees (Per Year)</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between text-slate-300">
                  <span>Room Rent</span>
                  <span className="text-green-400">₹6,000 - ₹12,000</span>
                </li>
                <li className="flex justify-between text-slate-300">
                  <span>Mess Charges</span>
                  <span className="text-green-400">₹36,000 - ₹42,000</span>
                </li>
                <li className="flex justify-between text-slate-300">
                  <span>Electricity</span>
                  <span className="text-green-400">₹1,500 - ₹2,500</span>
                </li>
              </ul>
            </div>
            <div className="glass-dark rounded-xl p-4">
              <h4 className="font-semibold text-slate-100 mb-3">Other Fees</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between text-slate-300">
                  <span>Library Fee</span>
                  <span className="text-green-400">₹500 - ₹1,000</span>
                </li>
                <li className="flex justify-between text-slate-300">
                  <span>Lab Fee</span>
                  <span className="text-green-400">₹1,000 - ₹3,000</span>
                </li>
                <li className="flex justify-between text-slate-300">
                  <span>Sports Fee</span>
                  <span className="text-green-400">₹200 - ₹500</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Admissions Tab */}
      {activeTab === "admissions" && (
        <div className="space-y-6">
          {/* Admission Process */}
          <div className="glass-dark rounded-2xl p-5">
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-blue-400" />
              Admission Process
            </h3>
            <div className="grid gap-4">
              {admissionProcess.map((step, index) => (
                <div
                  key={step.step}
                  className="flex items-start gap-4 animate-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-400 font-bold">{step.step}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-100">{step.title}</h4>
                    <p className="text-sm text-slate-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Eligibility Criteria */}
          <div className="glass-dark rounded-2xl p-5">
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              Eligibility Criteria
            </h3>
            <div className="space-y-3">
              {eligibilityCriteria.map((item, index) => (
                <div
                  key={item.program}
                  className="bg-slate-800/30 rounded-lg p-4 animate-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <h4 className="font-medium text-slate-100 mb-1">{item.program}</h4>
                  <p className="text-sm text-slate-400">{item.criteria}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Important Links */}
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="https://www.periyaruniversity.ac.in/Admission.php"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-dark rounded-xl p-5 hover:border-blue-500/30 transition-all group"
            >
              <h4 className="font-semibold text-slate-100 group-hover:text-blue-400 transition-colors flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Apply Online <ExternalLink className="w-4 h-4" />
              </h4>
              <p className="text-sm text-slate-400 mt-2">Submit your application for 2025-26 academic year</p>
            </a>
            <a
              href="https://www.periyaruniversity.ac.in/Download.php"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-dark rounded-xl p-5 hover:border-green-500/30 transition-all group"
            >
              <h4 className="font-semibold text-slate-100 group-hover:text-green-400 transition-colors flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Download Prospectus <ExternalLink className="w-4 h-4" />
              </h4>
              <p className="text-sm text-slate-400 mt-2">Get detailed information about programs and admission</p>
            </a>
          </div>

          {/* Important Dates */}
          <div className="glass-dark rounded-2xl p-5">
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-400" />
              Important Dates (2025-26)
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-800/30 rounded-lg p-4">
                <p className="text-sm text-slate-400">Application Start Date</p>
                <p className="text-slate-100 font-medium">March 2025</p>
              </div>
              <div className="bg-slate-800/30 rounded-lg p-4">
                <p className="text-sm text-slate-400">Last Date to Apply</p>
                <p className="text-slate-100 font-medium">June 2025</p>
              </div>
              <div className="bg-slate-800/30 rounded-lg p-4">
                <p className="text-sm text-slate-400">Entrance Test Date</p>
                <p className="text-slate-100 font-medium">July 2025</p>
              </div>
              <div className="bg-slate-800/30 rounded-lg p-4">
                <p className="text-sm text-slate-400">Classes Commence</p>
                <p className="text-slate-100 font-medium">August 2025</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Placements Tab */}
      {activeTab === "placements" && (
        <div className="space-y-6">
          {/* Placement Statistics */}
          <div className="glass-dark rounded-2xl p-5">
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              Placement Statistics
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-slate-300">Year</th>
                    <th className="text-left py-3 px-4 text-slate-300">Students Placed</th>
                    <th className="text-left py-3 px-4 text-slate-300">Companies</th>
                    <th className="text-left py-3 px-4 text-slate-300">Highest Package</th>
                    <th className="text-left py-3 px-4 text-slate-300">Average Package</th>
                  </tr>
                </thead>
                <tbody>
                  {placementStats.map((stat, index) => (
                    <tr key={stat.year} className="border-b border-slate-800 animate-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <td className="py-3 px-4 text-slate-100 font-medium">{stat.year}</td>
                      <td className="py-3 px-4 text-green-400">{stat.placed}+</td>
                      <td className="py-3 px-4 text-blue-400">{stat.companies}+</td>
                      <td className="py-3 px-4 text-purple-400">{stat.highest}</td>
                      <td className="py-3 px-4 text-orange-400">{stat.average}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Department-wise Placement */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="glass-dark rounded-xl p-4 text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-green-400">92%</span>
              </div>
              <h4 className="font-medium text-slate-100">Computer Science</h4>
              <p className="text-sm text-slate-400">Highest placement rate</p>
            </div>
            <div className="glass-dark rounded-xl p-4 text-center">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-blue-400">90%</span>
              </div>
              <h4 className="font-medium text-slate-100">MBA</h4>
              <p className="text-sm text-slate-400">Management placements</p>
            </div>
            <div className="glass-dark rounded-xl p-4 text-center">
              <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-purple-400">88%</span>
              </div>
              <h4 className="font-medium text-slate-100">Biotechnology</h4>
              <p className="text-sm text-slate-400">Life sciences sector</p>
            </div>
          </div>

          {/* Top Recruiters */}
          <div className="glass-dark rounded-2xl p-5">
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-400" />
              Top Recruiters
            </h3>
            <div className="flex flex-wrap gap-2">
              {topRecruiters.map((company, index) => (
                <span
                  key={company}
                  className="px-4 py-2 rounded-full bg-slate-800/50 text-slate-300 text-sm animate-in"
                  style={{ animationDelay: `${index * 0.03}s` }}
                >
                  {company}
                </span>
              ))}
            </div>
          </div>

          {/* Placement Cell Contact */}
          <div className="glass-dark rounded-2xl p-5">
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-400" />
              Placement Cell
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-800/30 rounded-lg p-4">
                <h4 className="font-medium text-slate-100 mb-2">Training & Placement Officer</h4>
                <p className="text-sm text-slate-400">Dr. K. Senthilkumar</p>
                <p className="text-sm text-slate-400">Email: tpo@periyaruniversity.ac.in</p>
                <p className="text-sm text-slate-400">Phone: 0427-2345766</p>
              </div>
              <div className="bg-slate-800/30 rounded-lg p-4">
                <h4 className="font-medium text-slate-100 mb-2">Placement Activities</h4>
                <ul className="text-sm text-slate-400 space-y-1">
                  <li>• Resume building workshops</li>
                  <li>• Mock interviews & GD sessions</li>
                  <li>• Industry expert lectures</li>
                  <li>• Internship programs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* News & Updates Tab */}
      {activeTab === "news" && (
        <div className="space-y-6">
          {/* Latest News */}
          <div className="glass-dark rounded-2xl p-5">
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-cyan-400" />
              Latest News & Updates
            </h3>
            <div className="space-y-4">
              {newsFeed.map((news, index) => (
                <div
                  key={index}
                  className="bg-slate-800/30 rounded-lg p-4 hover:bg-slate-800/50 transition-all animate-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className={cn(
                      "text-xs px-2 py-1 rounded-full",
                      news.category === "Achievement" && "bg-green-500/20 text-green-400",
                      news.category === "Admissions" && "bg-blue-500/20 text-blue-400",
                      news.category === "Events" && "bg-purple-500/20 text-purple-400",
                      news.category === "Placements" && "bg-orange-500/20 text-orange-400",
                      news.category === "Research" && "bg-cyan-500/20 text-cyan-400"
                    )}>
                      {news.category}
                    </span>
                    <span className="text-xs text-slate-500">{news.date}</span>
                  </div>
                  <h4 className="font-medium text-slate-100 mb-1">{news.title}</h4>
                  <p className="text-sm text-slate-400">{news.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Student Clubs */}
          <div className="glass-dark rounded-2xl p-5">
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-400" />
              Student Clubs & Activities
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {studentClubs.map((club, index) => {
                const IconComponent = club.icon;
                return (
                  <div
                    key={club.name}
                    className="bg-slate-800/30 rounded-lg p-4 animate-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-100">{club.name}</h4>
                        <p className="text-xs text-slate-400 mt-1">{club.description}</p>
                        <span className="text-xs text-purple-400 mt-2 inline-block">{club.members} members</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid md:grid-cols-3 gap-4">
            <a
              href="https://www.periyaruniversity.ac.in/News_Events.php"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-dark rounded-xl p-4 hover:border-cyan-500/30 transition-all group"
            >
              <h4 className="font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                All News <ExternalLink className="w-4 h-4" />
              </h4>
              <p className="text-sm text-slate-400 mt-1">View all announcements</p>
            </a>
            <a
              href="https://www.periyaruniversity.ac.in/Events.php"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-dark rounded-xl p-4 hover:border-purple-500/30 transition-all group"
            >
              <h4 className="font-semibold text-slate-100 group-hover:text-purple-400 transition-colors flex items-center gap-2">
                Events Calendar <ExternalLink className="w-4 h-4" />
              </h4>
              <p className="text-sm text-slate-400 mt-1">Upcoming events & seminars</p>
            </a>
            <a
              href="https://www.periyaruniversity.ac.in/Downloads.php"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-dark rounded-xl p-4 hover:border-orange-500/30 transition-all group"
            >
              <h4 className="font-semibold text-slate-100 group-hover:text-orange-400 transition-colors flex items-center gap-2">
                Downloads <ExternalLink className="w-4 h-4" />
              </h4>
              <p className="text-sm text-slate-400 mt-1">Forms, circulars & more</p>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicsHub;

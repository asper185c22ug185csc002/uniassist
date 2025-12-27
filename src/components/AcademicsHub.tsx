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

// Individual Departments with Courses and Fees (Updated from fee structure 2025-26)
const departments = [
  { 
    name: "Computer Science", 
    url: "https://www.periyaruniversity.ac.in/Dept/csc.php",
    courses: ["M.Sc. Computer Science", "M.Sc. Data Science", "Ph.D. Computer Science"],
    fees: { 
      "M.Sc. Computer Science": { firstYear: "₹30,180", secondYear: "₹27,820", total: "₹58,000" },
      "M.Sc. Data Science": { firstYear: "₹30,180", secondYear: "₹27,820", total: "₹58,000" },
      "Ph.D. Computer Science": { perYear: "₹22,000" }
    },
    rating: 4.7,
    reviews: 245,
    placements: "92%",
    highlights: ["AI & Machine Learning Lab", "Data Analytics Center", "Industry Partnerships with TCS, Infosys"],
    icon: Calculator,
    color: "blue"
  },
  { 
    name: "Master of Computer Applications (MCA)", 
    url: "https://www.periyaruniversity.ac.in/Dept/csc.php",
    courses: ["M.C.A. (Two Years)"],
    fees: { 
      "M.C.A. (Two Years)": { firstYear: "₹30,190", secondYear: "₹27,830", thirdSem: "₹17,830", fourthSem: "₹10,000", total: "₹85,850" }
    },
    rating: 4.6,
    reviews: 189,
    placements: "90%",
    highlights: ["Industry-Ready Curriculum", "Placement Training", "Modern Computer Labs"],
    icon: Calculator,
    color: "blue"
  },
  { 
    name: "Management Studies (MBA)", 
    url: "https://www.periyaruniversity.ac.in/Dept/mba.php",
    courses: ["M.B.A.", "M.B.A. Export and Import Management", "Ph.D. Management"],
    fees: { 
      "M.B.A.": { firstYear: "₹30,180", secondYear: "₹27,820", total: "₹58,000" },
      "M.B.A. Export and Import Management": { firstYear: "₹30,180", secondYear: "₹27,820", total: "₹58,000" },
      "Ph.D. Management": { perYear: "₹30,000" }
    },
    rating: 4.7,
    reviews: 289,
    placements: "90%",
    highlights: ["AICTE Approved", "Industry Internships", "Case Study Based Learning"],
    icon: Briefcase,
    color: "orange"
  },
  { 
    name: "Library and Information Science", 
    url: "https://www.periyaruniversity.ac.in/Dept/lib.php",
    courses: ["M.L.I.S.", "Ph.D. Library Science"],
    fees: { 
      "M.L.I.S.": { firstYear: "₹9,000", secondYear: "₹6,640", total: "₹15,640" }
    },
    rating: 4.3,
    reviews: 67,
    placements: "78%",
    icon: BookOpen,
    color: "cyan"
  },
  { 
    name: "Mathematics", 
    url: "https://www.periyaruniversity.ac.in/Dept/mat.php",
    courses: ["M.Sc. Mathematics", "Ph.D. Mathematics"],
    fees: { 
      "M.Sc. Mathematics": { firstYear: "₹9,000", secondYear: "₹6,640", total: "₹15,640" }
    },
    rating: 4.5,
    reviews: 112,
    placements: "80%",
    icon: Calculator,
    color: "blue"
  },
  { 
    name: "Statistics", 
    url: "https://www.periyaruniversity.ac.in/Dept/sta.php",
    courses: ["M.Sc. Statistics", "Ph.D. Statistics"],
    fees: { 
      "M.Sc. Statistics": { firstYear: "₹9,000", secondYear: "₹6,640", total: "₹15,640" }
    },
    rating: 4.4,
    reviews: 89,
    placements: "75%",
    icon: Calculator,
    color: "blue"
  },
  { 
    name: "Biochemistry", 
    url: "https://www.periyaruniversity.ac.in/Dept/bch.php",
    courses: ["M.Sc. Biochemistry", "Ph.D. Biochemistry"],
    fees: { 
      "M.Sc. Biochemistry": { firstYear: "₹15,000", secondYear: "₹12,000", total: "₹27,000" }
    },
    rating: 4.5,
    reviews: 128,
    placements: "85%",
    icon: FlaskConical,
    color: "green"
  },
  { 
    name: "Biotechnology", 
    url: "https://www.periyaruniversity.ac.in/Dept/bio.php",
    courses: ["M.Sc. Biotechnology", "Ph.D. Biotechnology"],
    fees: { 
      "M.Sc. Biotechnology": { firstYear: "₹18,000", secondYear: "₹15,000", total: "₹33,000" }
    },
    rating: 4.6,
    reviews: 156,
    placements: "88%",
    icon: FlaskConical,
    color: "green"
  },
  { 
    name: "Microbiology", 
    url: "https://www.periyaruniversity.ac.in/Dept/mib.php",
    courses: ["M.Sc. Microbiology", "Ph.D. Microbiology"],
    fees: { 
      "M.Sc. Microbiology": { firstYear: "₹19,450", secondYear: "₹17,090", total: "₹36,540" }
    },
    rating: 4.4,
    reviews: 98,
    placements: "82%",
    icon: FlaskConical,
    color: "green"
  },
  { 
    name: "Physics", 
    url: "https://www.periyaruniversity.ac.in/Dept/phy.php",
    courses: ["M.Sc. Physics", "Ph.D. Physics"],
    fees: { 
      "M.Sc. Physics": { firstYear: "₹10,360", secondYear: "₹8,000", total: "₹18,360" }
    },
    rating: 4.6,
    reviews: 134,
    placements: "78%",
    icon: Atom,
    color: "purple"
  },
  { 
    name: "Chemistry", 
    url: "https://www.periyaruniversity.ac.in/Dept/che.php",
    courses: ["M.Sc. Chemistry", "Ph.D. Chemistry"],
    fees: { 
      "M.Sc. Chemistry": { firstYear: "₹12,000", secondYear: "₹9,500", total: "₹21,500" }
    },
    rating: 4.5,
    reviews: 145,
    placements: "80%",
    icon: Atom,
    color: "purple"
  },
  { 
    name: "Geology", 
    url: "https://www.periyaruniversity.ac.in/Dept/geo.php",
    courses: ["M.Sc. Geology", "Ph.D. Geology"],
    fees: { 
      "M.Sc. Geology": { firstYear: "₹12,710", secondYear: "₹10,350", total: "₹23,060" }
    },
    rating: 4.3,
    reviews: 78,
    placements: "72%",
    icon: Atom,
    color: "purple"
  },
  { 
    name: "Environmental Science", 
    url: "https://www.periyaruniversity.ac.in/Dept/evs.php",
    courses: ["M.Sc. Environmental Science", "M.Sc. Environmental Science (5 Year Integrated)", "Ph.D. Environmental Science"],
    fees: { 
      "M.Sc. Environmental Science": { firstYear: "₹11,730", secondYear: "₹9,370", total: "₹21,100" },
      "M.Sc. Environmental Science (5 Year Integrated)": { firstYear: "₹15,310", secondYear: "₹12,950", total: "₹28,260" }
    },
    rating: 4.5,
    reviews: 89,
    placements: "78%",
    icon: Sun,
    color: "yellow"
  },
  { 
    name: "Food Science Technology and Nutrition", 
    url: "https://www.periyaruniversity.ac.in/Dept/fsn.php",
    courses: ["M.Sc. Food Science Technology and Nutrition", "Ph.D. Food Science"],
    fees: { 
      "M.Sc. Food Science Technology and Nutrition": { firstYear: "₹13,710", secondYear: "₹11,350", total: "₹25,060" }
    },
    rating: 4.4,
    reviews: 89,
    placements: "78%",
    icon: BookOpen,
    color: "cyan"
  },
  { 
    name: "Commerce", 
    url: "https://www.periyaruniversity.ac.in/Dept/com.php",
    courses: ["M.Com.", "Ph.D. Commerce"],
    fees: { 
      "M.Com.": { firstYear: "₹10,000", secondYear: "₹8,000", total: "₹18,000" }
    },
    rating: 4.4,
    reviews: 167,
    placements: "82%",
    icon: Briefcase,
    color: "orange"
  },
  { 
    name: "Economics", 
    url: "https://www.periyaruniversity.ac.in/Dept/eco.php",
    courses: ["M.A. Economics", "Ph.D. Economics"],
    fees: { 
      "M.A. Economics": { firstYear: "₹8,000", secondYear: "₹6,500", total: "₹14,500" }
    },
    rating: 4.3,
    reviews: 98,
    placements: "70%",
    icon: Briefcase,
    color: "orange"
  },
  { 
    name: "English", 
    url: "https://www.periyaruniversity.ac.in/Dept/eng.php",
    courses: ["M.A. English", "Ph.D. English"],
    fees: { 
      "M.A. English": { firstYear: "₹8,000", secondYear: "₹6,500", total: "₹14,500" }
    },
    rating: 4.5,
    reviews: 178,
    placements: "75%",
    icon: Languages,
    color: "pink"
  },
  { 
    name: "Tamil", 
    url: "https://www.periyaruniversity.ac.in/Dept/tam.php",
    courses: ["M.A. Tamil", "Ph.D. Tamil"],
    fees: { 
      "M.A. Tamil": { firstYear: "₹6,000", secondYear: "₹5,000", total: "₹11,000" }
    },
    rating: 4.4,
    reviews: 123,
    placements: "70%",
    icon: Languages,
    color: "pink"
  },
  { 
    name: "Education", 
    url: "https://www.periyaruniversity.ac.in/Dept/edu.php",
    courses: ["M.Ed.", "Ph.D. Education"],
    fees: { 
      "M.Ed.": { firstYear: "₹15,000", secondYear: "₹12,000", total: "₹27,000" }
    },
    rating: 4.5,
    reviews: 156,
    placements: "85%",
    icon: BookOpen,
    color: "cyan"
  },
  { 
    name: "Textiles and Apparel Design", 
    url: "https://www.periyaruniversity.ac.in/Dept/tex.php",
    courses: ["M.Sc. Textiles", "Ph.D. Textiles"],
    fees: { 
      "M.Sc. Textiles": { firstYear: "₹12,000", secondYear: "₹9,500", total: "₹21,500" }
    },
    rating: 4.3,
    reviews: 67,
    placements: "75%",
    icon: BookOpen,
    color: "cyan"
  },
  { 
    name: "Sociology", 
    url: "https://www.periyaruniversity.ac.in/Dept/soc.php",
    courses: ["M.A. Sociology", "Ph.D. Sociology"],
    fees: { 
      "M.A. Sociology": { firstYear: "₹8,000", secondYear: "₹6,500", total: "₹14,500" }
    },
    rating: 4.3,
    reviews: 78,
    placements: "68%",
    icon: Brain,
    color: "amber"
  },
  { 
    name: "Psychology", 
    url: "https://www.periyaruniversity.ac.in/Dept/psy.php",
    courses: ["M.Sc. Psychology", "Ph.D. Psychology"],
    fees: { 
      "M.Sc. Psychology": { firstYear: "₹10,000", secondYear: "₹8,000", total: "₹18,000" }
    },
    rating: 4.5,
    reviews: 134,
    placements: "80%",
    icon: Brain,
    color: "amber"
  },
  { 
    name: "Journalism and Mass Communication", 
    url: "https://www.periyaruniversity.ac.in/Dept/jmc.php",
    courses: ["M.A. Journalism", "Ph.D. Journalism"],
    fees: { 
      "M.A. Journalism": { firstYear: "₹12,000", secondYear: "₹9,500", total: "₹21,500" }
    },
    rating: 4.6,
    reviews: 167,
    placements: "85%",
    icon: Brain,
    color: "amber"
  },
  { 
    name: "History", 
    url: "https://www.periyaruniversity.ac.in/Dept/his.php",
    courses: ["M.A. History", "Ph.D. History"],
    fees: { 
      "M.A. History": { firstYear: "₹6,000", secondYear: "₹5,000", total: "₹11,000" }
    },
    rating: 4.2,
    reviews: 89,
    placements: "65%",
    icon: Brain,
    color: "amber"
  },
  { 
    name: "Botany", 
    url: "https://www.periyaruniversity.ac.in/Dept/bot.php",
    courses: ["M.Sc. Botany", "Ph.D. Botany"],
    fees: { 
      "M.Sc. Botany": { firstYear: "₹10,000", secondYear: "₹8,000", total: "₹18,000" }
    },
    rating: 4.4,
    reviews: 98,
    placements: "72%",
    icon: Leaf,
    color: "emerald"
  },
  { 
    name: "Zoology", 
    url: "https://www.periyaruniversity.ac.in/Dept/zoo.php",
    courses: ["M.Sc. Zoology", "Ph.D. Zoology"],
    fees: { 
      "M.Sc. Zoology": { firstYear: "₹10,000", secondYear: "₹8,000", total: "₹18,000" }
    },
    rating: 4.3,
    reviews: 87,
    placements: "70%",
    icon: Leaf,
    color: "emerald"
  },
  { 
    name: "Nutrition and Dietetics", 
    url: "https://www.periyaruniversity.ac.in/Dept/cnd.php",
    courses: ["M.Sc. Nutrition", "Ph.D. Nutrition"],
    fees: { 
      "M.Sc. Nutrition": { firstYear: "₹12,000", secondYear: "₹9,500", total: "₹21,500" }
    },
    rating: 4.5,
    reviews: 112,
    placements: "80%",
    icon: Leaf,
    color: "emerald"
  },
  { 
    name: "Energy Science and Technology", 
    url: "https://www.periyaruniversity.ac.in/Dept/egs.php",
    courses: ["M.Sc. Energy Science", "Ph.D. Energy Science"],
    fees: { 
      "M.Sc. Energy Science": { firstYear: "₹15,000", secondYear: "₹12,000", total: "₹27,000" }
    },
    rating: 4.6,
    reviews: 78,
    placements: "85%",
    icon: Sun,
    color: "yellow"
  },
];

// CDOE Programs - Updated from PRIDE website (PG only for university, UG in LSCs)
const cdoePrograms = [
  { name: "M.A. Tamil", duration: "2 Years", fee: "₹4,000/year", totalFee: "₹8,000", eligibility: "Bachelor's Degree" },
  { name: "M.A. English", duration: "2 Years", fee: "₹4,500/year", totalFee: "₹9,000", eligibility: "Bachelor's Degree" },
  { name: "M.A. Economics", duration: "2 Years", fee: "₹4,000/year", totalFee: "₹8,000", eligibility: "Bachelor's Degree" },
  { name: "M.A. History", duration: "2 Years", fee: "₹4,000/year", totalFee: "₹8,000", eligibility: "Bachelor's Degree" },
  { name: "M.A. Sociology", duration: "2 Years", fee: "₹4,000/year", totalFee: "₹8,000", eligibility: "Bachelor's Degree" },
  { name: "M.Com.", duration: "2 Years", fee: "₹5,000/year", totalFee: "₹10,000", eligibility: "B.Com. Degree" },
  { name: "M.B.A.", duration: "2 Years", fee: "₹15,000/year", totalFee: "₹30,000", eligibility: "Bachelor's Degree (AICTE Approved)" },
  { name: "M.C.A.", duration: "2 Years", fee: "₹12,000/year", totalFee: "₹24,000", eligibility: "Bachelor's with Maths (AICTE Approved)" },
  { name: "M.Sc. Mathematics", duration: "2 Years", fee: "₹5,000/year", totalFee: "₹10,000", eligibility: "B.Sc. Mathematics" },
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
  { title: "Admission Open for 2025-26", date: "2024-12-15", category: "Admissions", description: "Applications now open for PG and Research programs" },
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

// Eligibility Criteria (Updated - removed UG and M.Phil)
const eligibilityCriteria = [
  { program: "PG Programs (M.Sc./M.A./M.Com.)", criteria: "Bachelor's degree in relevant subject with minimum 50% marks" },
  { program: "M.B.A.", criteria: "Bachelor's degree with 50% + TANCET/CAT/MAT score" },
  { program: "M.C.A.", criteria: "Bachelor's degree with Mathematics + TANCET score" },
  { program: "M.Ed.", criteria: "B.Ed. with 50% + 2 years teaching experience preferred" },
  { program: "Ph.D. Programs", criteria: "Master's degree with 55% + PU-PET/NET/SLET qualification" },
  { program: "Distance Education (CDOE)", criteria: "Bachelor's degree for PG programs as per UGC-DEB norms" },
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
  const [expandedDept, setExpandedDept] = useState<string | null>(null);

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2">Academics & Programs</h1>
        <p className="text-slate-400">Explore 28 Departments - PG Courses, Fees, Admissions & Placements</p>
        <p className="text-xs text-slate-500 mt-1">Note: UG programs are offered through Affiliated Colleges only</p>
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
              University Departments
            </h3>
            <p className="text-sm text-slate-400">
              Click on any department to view courses offered, fees, and reviews. All departments offer PG and Ph.D. programs.
            </p>
          </div>

          <div className="grid gap-3">
            {departments.map((dept, index) => {
              const colors = getColorClasses(dept.color);
              const IconComponent = dept.icon;
              const isExpanded = expandedDept === dept.name;
              
              return (
                <div
                  key={dept.name}
                  className={cn("glass-dark rounded-xl overflow-hidden hover:border-opacity-50 transition-all animate-in", colors.border)}
                  style={{ animationDelay: `${index * 0.02}s` }}
                >
                  <button
                    onClick={() => setExpandedDept(isExpanded ? null : dept.name)}
                    className="w-full p-4 flex items-center gap-4 text-left"
                  >
                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0", colors.bg)}>
                      <IconComponent className={cn("w-5 h-5", colors.text)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-100 text-sm md:text-base">{dept.name}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-xs text-slate-300">{dept.rating}</span>
                        </div>
                        <span className="text-slate-600">•</span>
                        <span className="text-xs text-slate-400">{dept.reviews} reviews</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-xs text-green-400">{dept.placements} placed</span>
                      </div>
                    </div>
                    <ChevronRight className={cn("w-5 h-5 text-slate-400 transition-transform flex-shrink-0", isExpanded && "rotate-90")} />
                  </button>
                  
                  {isExpanded && (
                    <div className="px-4 pb-4 space-y-3">
                      <div className={cn("rounded-lg p-4", colors.bg)}>
                        <a
                          href={dept.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn("font-medium hover:underline flex items-center gap-1 text-sm", colors.text)}
                        >
                          Visit Department Page
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        
                        <div className="mt-3 space-y-2">
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

                        <div className="mt-3 space-y-2">
                          <p className="text-xs text-slate-400 font-medium">Fee Structure (2025-26):</p>
                          <div className="grid gap-2">
                            {Object.entries(dept.fees).map(([courseName, feeDetails]) => {
                              const details = feeDetails as Record<string, string>;
                              return (
                                <div key={courseName} className="bg-slate-800/30 rounded p-2">
                                  <p className="text-xs text-slate-200 font-medium">{courseName}</p>
                                  <div className="flex flex-wrap gap-2 mt-1 text-xs">
                                    {details.firstYear && (
                                      <>
                                        <span className="text-slate-400">1st Year: <span className="text-green-400">{details.firstYear}</span></span>
                                        <span className="text-slate-400">2nd Year: <span className="text-green-400">{details.secondYear}</span></span>
                                        {details.thirdSem && (
                                          <>
                                            <span className="text-slate-400">3rd Sem: <span className="text-green-400">{details.thirdSem}</span></span>
                                            <span className="text-slate-400">4th Sem: <span className="text-green-400">{details.fourthSem}</span></span>
                                          </>
                                        )}
                                        <span className="text-slate-400">Total: <span className="text-orange-400 font-medium">{details.total}</span></span>
                                      </>
                                    )}
                                    {details.perYear && (
                                      <span className="text-slate-400">Per Year: <span className="text-green-400">{details.perYear}</span></span>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {dept.highlights && (
                          <div className="mt-3">
                            <p className="text-xs text-slate-400 font-medium mb-1">Highlights:</p>
                            <div className="flex flex-wrap gap-1">
                              {dept.highlights.map((h) => (
                                <span key={h} className="text-xs px-2 py-0.5 rounded bg-orange-500/20 text-orange-400">
                                  {h}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
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
              <p className="text-sm text-slate-400 mt-1">View all PG & Research programs</p>
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
              <p className="text-sm text-slate-400 mt-1">UG programs available here</p>
            </a>
          </div>
        </div>
      )}

      {/* Fees Structure Tab */}
      {activeTab === "fees" && (
        <div className="space-y-6">
          {/* Regular Programs Fees - Updated from fee structure images */}
          <div className="glass-dark rounded-2xl p-5">
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-green-400" />
              Regular Programs Fee Structure 2025-26 (On-Campus)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-slate-300">Program</th>
                    <th className="text-left py-3 px-4 text-slate-300">1st Year</th>
                    <th className="text-left py-3 px-4 text-slate-300">2nd Year</th>
                    <th className="text-left py-3 px-4 text-slate-300">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 text-slate-100">M.Sc. Computer Science</td>
                    <td className="py-3 px-4 text-slate-300">₹30,180</td>
                    <td className="py-3 px-4 text-slate-300">₹27,820</td>
                    <td className="py-3 px-4 text-green-400">₹58,000</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 text-slate-100">M.C.A. (Two Years)</td>
                    <td className="py-3 px-4 text-slate-300">₹30,190</td>
                    <td className="py-3 px-4 text-slate-300">₹27,830</td>
                    <td className="py-3 px-4 text-green-400">₹58,020</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 text-slate-100">M.B.A.</td>
                    <td className="py-3 px-4 text-slate-300">₹30,180</td>
                    <td className="py-3 px-4 text-slate-300">₹27,820</td>
                    <td className="py-3 px-4 text-green-400">₹58,000</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 text-slate-100">M.Sc. Microbiology</td>
                    <td className="py-3 px-4 text-slate-300">₹19,450</td>
                    <td className="py-3 px-4 text-slate-300">₹17,090</td>
                    <td className="py-3 px-4 text-green-400">₹36,540</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 text-slate-100">M.Sc. Food Science & Nutrition</td>
                    <td className="py-3 px-4 text-slate-300">₹13,710</td>
                    <td className="py-3 px-4 text-slate-300">₹11,350</td>
                    <td className="py-3 px-4 text-green-400">₹25,060</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 text-slate-100">M.Sc. Geology</td>
                    <td className="py-3 px-4 text-slate-300">₹12,710</td>
                    <td className="py-3 px-4 text-slate-300">₹10,350</td>
                    <td className="py-3 px-4 text-green-400">₹23,060</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 text-slate-100">M.Sc. Environmental Science</td>
                    <td className="py-3 px-4 text-slate-300">₹11,730</td>
                    <td className="py-3 px-4 text-slate-300">₹9,370</td>
                    <td className="py-3 px-4 text-green-400">₹21,100</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 text-slate-100">M.Sc. Physics</td>
                    <td className="py-3 px-4 text-slate-300">₹10,360</td>
                    <td className="py-3 px-4 text-slate-300">₹8,000</td>
                    <td className="py-3 px-4 text-green-400">₹18,360</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 text-slate-100">M.Sc. Mathematics</td>
                    <td className="py-3 px-4 text-slate-300">₹9,000</td>
                    <td className="py-3 px-4 text-slate-300">₹6,640</td>
                    <td className="py-3 px-4 text-green-400">₹15,640</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 text-slate-100">M.L.I.S.</td>
                    <td className="py-3 px-4 text-slate-300">₹9,000</td>
                    <td className="py-3 px-4 text-slate-300">₹6,640</td>
                    <td className="py-3 px-4 text-green-400">₹15,640</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 text-slate-100">Ph.D. Programs</td>
                    <td className="py-3 px-4 text-slate-300" colSpan={2}>₹15,000 - ₹30,000/year</td>
                    <td className="py-3 px-4 text-green-400">As per program</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mt-3">* Fees waived for differently abled students</p>
          </div>

          {/* CDOE Programs Fees */}
          <div className="glass-dark rounded-2xl p-5">
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-400" />
              Distance Education (CDOE) Fee Structure
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              CDOE offers Open Distance Learning (ODL) and Online Learning Programs. UGC-DEB & AICTE Approved.
            </p>
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
            <div className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <p className="text-xs text-blue-400">
                <strong>Note:</strong> PCP Classes are conducted every Saturday and Sunday. 
                <a href="https://pride.periyaruniversity.ac.in" target="_blank" rel="noopener noreferrer" className="underline ml-1">
                  Visit PRIDE Portal →
                </a>
              </p>
            </div>
          </div>

          {/* Additional Fees */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass-dark rounded-xl p-4">
              <h4 className="font-semibold text-slate-100 mb-3">Hostel Fees (Per Year)</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between text-slate-300">
                  <span>Room Rent</span>
                  <span className="text-green-400">₹700/month</span>
                </li>
                <li className="flex justify-between text-slate-300">
                  <span>Mess Charges</span>
                  <span className="text-green-400">Included in rent</span>
                </li>
                <li className="flex justify-between text-slate-300">
                  <span>Room Capacity</span>
                  <span className="text-slate-400">5 students/room</span>
                </li>
              </ul>
            </div>
            <div className="glass-dark rounded-xl p-4">
              <h4 className="font-semibold text-slate-100 mb-3">Other Fees (Included in above)</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between text-slate-300">
                  <span>Library Fee</span>
                  <span className="text-green-400">₹800</span>
                </li>
                <li className="flex justify-between text-slate-300">
                  <span>Laboratory Fee</span>
                  <span className="text-green-400">As per program</span>
                </li>
                <li className="flex justify-between text-slate-300">
                  <span>Sports Fee</span>
                  <span className="text-green-400">₹100</span>
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
              href="https://pride.periyaruniversity.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-dark rounded-xl p-5 hover:border-green-500/30 transition-all group"
            >
              <h4 className="font-semibold text-slate-100 group-hover:text-green-400 transition-colors flex items-center gap-2">
                <Globe className="w-5 h-5" />
                CDOE Admissions <ExternalLink className="w-4 h-4" />
              </h4>
              <p className="text-sm text-slate-400 mt-2">Distance & Online Education portal</p>
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
                  {placementStats.map((stat) => (
                    <tr key={stat.year} className="border-b border-slate-800">
                      <td className="py-3 px-4 text-slate-100">{stat.year}</td>
                      <td className="py-3 px-4 text-green-400">{stat.placed}+</td>
                      <td className="py-3 px-4 text-slate-300">{stat.companies}+</td>
                      <td className="py-3 px-4 text-purple-400">{stat.highest}</td>
                      <td className="py-3 px-4 text-blue-400">{stat.average}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Department-wise Placements */}
          <div className="glass-dark rounded-2xl p-5">
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-orange-400" />
              Department-wise Placement Highlights
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { dept: "Computer Science & MCA", rate: "92%", avg: "₹5.2 LPA" },
                { dept: "MBA", rate: "90%", avg: "₹5.0 LPA" },
                { dept: "Biotechnology", rate: "88%", avg: "₹4.5 LPA" },
                { dept: "Education (M.Ed.)", rate: "85%", avg: "₹3.5 LPA" },
                { dept: "Biochemistry", rate: "85%", avg: "₹4.0 LPA" },
                { dept: "Journalism", rate: "85%", avg: "₹3.8 LPA" },
              ].map((item, index) => (
                <div 
                  key={item.dept}
                  className="bg-slate-800/30 rounded-lg p-4 animate-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <h4 className="font-medium text-slate-100 text-sm">{item.dept}</h4>
                  <div className="flex justify-between mt-2">
                    <span className="text-green-400">{item.rate} placed</span>
                    <span className="text-slate-400 text-sm">{item.avg}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Recruiters */}
          <div className="glass-dark rounded-2xl p-5">
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-400" />
              Top Recruiters
            </h3>
            <div className="flex flex-wrap gap-2">
              {topRecruiters.map((company) => (
                <span
                  key={company}
                  className="px-3 py-1.5 rounded-full bg-slate-800/50 text-slate-300 text-sm"
                >
                  {company}
                </span>
              ))}
            </div>
          </div>

          {/* Placement Cell Contact */}
          <div className="glass-dark rounded-2xl p-5">
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-green-400" />
              Placement Cell
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-400 mb-1">Placement Officer</p>
                <p className="text-slate-100">Dr. R. Krishnan</p>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-1">Contact</p>
                <p className="text-slate-100">04294-226784</p>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-1">Email</p>
                <p className="text-slate-100">placement@periyaruniversity.ac.in</p>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-1">Location</p>
                <p className="text-slate-100">Admin Block, 2nd Floor</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* News & Updates Tab */}
      {activeTab === "news" && (
        <div className="space-y-6">
          {/* News Feed */}
          <div className="glass-dark rounded-2xl p-5">
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-cyan-400" />
              Latest News & Updates
            </h3>
            <div className="space-y-4">
              {newsFeed.map((news, index) => (
                <div
                  key={news.title}
                  className="bg-slate-800/30 rounded-lg p-4 animate-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-full",
                      news.category === "Achievement" && "bg-yellow-500/20 text-yellow-400",
                      news.category === "Admissions" && "bg-blue-500/20 text-blue-400",
                      news.category === "Events" && "bg-purple-500/20 text-purple-400",
                      news.category === "Placements" && "bg-green-500/20 text-green-400",
                      news.category === "Research" && "bg-cyan-500/20 text-cyan-400"
                    )}>
                      {news.category}
                    </span>
                    <span className="text-xs text-slate-500">
                      {new Date(news.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
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
              <Users className="w-5 h-5 text-orange-400" />
              Student Clubs & Activities
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {studentClubs.map((club, index) => {
                const ClubIcon = club.icon;
                return (
                  <div
                    key={club.name}
                    className="bg-slate-800/30 rounded-lg p-4 animate-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                        <ClubIcon className="w-5 h-5 text-orange-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-100">{club.name}</h4>
                        <p className="text-xs text-slate-500">{club.members} members</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-400">{club.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicsHub;

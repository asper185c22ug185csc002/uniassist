import { useState } from "react";
import {
  BookOpenCheck,
  GraduationCap,
  Users,
  Globe,
  ExternalLink,
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
  TrendingUp,
  IndianRupee,
  ClipboardList,
  Target,
  Newspaper,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useDepartmentsWithCourses,
  useCdoePrograms,
  useStudentClubs,
  usePlacementStats,
  useTopRecruiters,
  useNewsFeed,
  useUniversityInfo,
} from "@/hooks/useUniversityData";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Calculator,
  Briefcase,
  BookOpen,
  FlaskConical,
  Atom,
  Languages,
  Brain,
  Leaf,
  Sun,
  Flag,
  Heart,
  Award,
  Palette,
  Music,
  BookOpenCheck,
};

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

// Admission Process Steps (static)
const admissionProcess = [
  { step: 1, title: "Check Eligibility", description: "Verify you meet the minimum qualifications for your chosen program" },
  { step: 2, title: "Online Registration", description: "Create account on the university portal and fill application form" },
  { step: 3, title: "Document Upload", description: "Upload required documents including marksheets, certificates, and photos" },
  { step: 4, title: "Fee Payment", description: "Pay the application fee online through net banking/UPI/cards" },
  { step: 5, title: "Entrance Test/Merit", description: "Appear for entrance test or await merit list based on program" },
  { step: 6, title: "Counselling", description: "Attend counselling session for seat allotment" },
  { step: 7, title: "Admission Confirmation", description: "Pay admission fees and complete enrollment formalities" },
];

// Eligibility Criteria (static)
const eligibilityCriteria = [
  { program: "PG Programs (M.Sc./M.A./M.Com.)", criteria: "Bachelor's degree in relevant subject with minimum 50% marks" },
  { program: "M.B.A.", criteria: "Bachelor's degree with 50% + TANCET/CAT/MAT score" },
  { program: "M.C.A.", criteria: "Bachelor's degree with Mathematics + TANCET score" },
  { program: "M.Ed.", criteria: "B.Ed. with 50% + 2 years teaching experience preferred" },
  { program: "Ph.D. Programs", criteria: "Master's degree with 55% + PU-PET/NET/SLET qualification" },
  { program: "Distance Education (CDOE)", criteria: "Bachelor's degree for PG programs as per UGC-DEB norms" },
];

export const AcademicsHub = () => {
  const [activeTab, setActiveTab] = useState<"departments" | "fees" | "admissions" | "placements" | "news">("departments");
  const [expandedDept, setExpandedDept] = useState<string | null>(null);

  // Fetch data from database
  const { data: departments, isLoading: loadingDepts } = useDepartmentsWithCourses();
  const { data: cdoePrograms, isLoading: loadingCdoe } = useCdoePrograms();
  const { data: studentClubs, isLoading: loadingClubs } = useStudentClubs();
  const { data: placementStats, isLoading: loadingPlacements } = usePlacementStats();
  const { data: topRecruiters, isLoading: loadingRecruiters } = useTopRecruiters();
  const { data: newsFeed, isLoading: loadingNews } = useNewsFeed();
  const { data: universityInfo } = useUniversityInfo();

  const isLoading = loadingDepts || loadingCdoe || loadingClubs || loadingPlacements || loadingRecruiters || loadingNews;

  if (isLoading) {
    return (
      <div className="p-4 md:p-8 max-w-6xl mx-auto flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-orange-400 animate-spin" />
          <p className="text-slate-400">Loading academic information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2">Academics & Programs</h1>
        <p className="text-slate-400">Explore {departments?.length || 28} Departments - PG Courses, Fees, Admissions & Placements</p>
        <p className="text-xs text-slate-500 mt-1">Note: UG programs are offered through Affiliated Colleges only</p>
      </div>

      {/* University Highlights */}
      <div className="glass-dark rounded-2xl p-5 mb-6">
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-orange-400" />
            <span className="text-slate-300">{universityInfo?.accreditation || "NAAC A++ Grade (2021)"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-400" />
            <span className="text-slate-300">NIRF Rank {universityInfo?.nirf_ranking || "94"}</span>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-green-400" />
            <span className="text-slate-300">Established {universityInfo?.established || "17th September 1997"}</span>
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
            {departments?.map((dept, index) => {
              const colors = getColorClasses(dept.color || "orange");
              const IconComponent = iconMap[dept.icon_name || "BookOpen"] || BookOpen;
              const isExpanded = expandedDept === dept.name;
              
              return (
                <div
                  key={dept.id}
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
                        {dept.url && (
                          <a
                            href={dept.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn("font-medium hover:underline flex items-center gap-1 text-sm", colors.text)}
                          >
                            Visit Department Page
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        
                        {dept.school && (
                          <p className="text-xs text-slate-400 mt-2">School: {dept.school}</p>
                        )}
                        
                        {dept.email && (
                          <p className="text-xs text-slate-400 mt-1">Email: {dept.email}</p>
                        )}
                        
                        {dept.courses && dept.courses.length > 0 && (
                          <div className="mt-3 space-y-2">
                            <p className="text-xs text-slate-400 font-medium">Courses Offered:</p>
                            <div className="flex flex-wrap gap-2">
                              {dept.courses.map((course: any) => (
                                <span
                                  key={course.id}
                                  className="text-xs px-2 py-1 rounded-full bg-slate-800/50 text-slate-300"
                                >
                                  {course.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {dept.courses && dept.courses.length > 0 && (
                          <div className="mt-3 space-y-2">
                            <p className="text-xs text-slate-400 font-medium">Fee Structure (2025-26):</p>
                            <div className="grid gap-2">
                              {dept.courses.map((course: any) => (
                                <div key={course.id} className="bg-slate-800/30 rounded p-2">
                                  <p className="text-xs text-slate-200 font-medium">{course.name}</p>
                                  <div className="flex flex-wrap gap-2 mt-1 text-xs">
                                    {course.first_year_fee && (
                                      <>
                                        <span className="text-slate-400">1st Year: <span className="text-green-400">{course.first_year_fee}</span></span>
                                        <span className="text-slate-400">2nd Year: <span className="text-green-400">{course.second_year_fee}</span></span>
                                        {course.third_sem_fee && (
                                          <>
                                            <span className="text-slate-400">3rd Sem: <span className="text-green-400">{course.third_sem_fee}</span></span>
                                            <span className="text-slate-400">4th Sem: <span className="text-green-400">{course.fourth_sem_fee}</span></span>
                                          </>
                                        )}
                                        <span className="text-slate-400">Total: <span className="text-orange-400 font-medium">{course.total_fee}</span></span>
                                      </>
                                    )}
                                    {course.per_year_fee && (
                                      <span className="text-slate-400">Per Year: <span className="text-green-400">{course.per_year_fee}</span></span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {dept.highlights && dept.highlights.length > 0 && (
                          <div className="mt-3">
                            <p className="text-xs text-slate-400 font-medium mb-2">Highlights:</p>
                            <div className="flex flex-wrap gap-2">
                              {dept.highlights.map((highlight: string, idx: number) => (
                                <span key={idx} className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                                  {highlight}
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
        </div>
      )}

      {/* Fees Structure Tab */}
      {activeTab === "fees" && (
        <div className="space-y-6">
          {/* Regular Programs */}
          <div className="glass-dark rounded-2xl p-5">
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-orange-400" />
              Regular Programs Fee Structure (2025-26)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-2 text-slate-400 font-medium">Course</th>
                    <th className="text-left py-3 px-2 text-slate-400 font-medium">1st Year</th>
                    <th className="text-left py-3 px-2 text-slate-400 font-medium">2nd Year</th>
                    <th className="text-left py-3 px-2 text-slate-400 font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {departments?.flatMap(dept => 
                    dept.courses?.filter((c: any) => c.first_year_fee).map((course: any) => (
                      <tr key={course.id} className="border-b border-slate-800">
                        <td className="py-3 px-2 text-slate-200">{course.name}</td>
                        <td className="py-3 px-2 text-green-400">{course.first_year_fee}</td>
                        <td className="py-3 px-2 text-green-400">{course.second_year_fee}</td>
                        <td className="py-3 px-2 text-orange-400 font-medium">{course.total_fee}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Distance Education */}
          <div className="glass-dark rounded-2xl p-5">
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-400" />
              Distance Education (CDOE/PRIDE) Fees
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {cdoePrograms?.map((program) => (
                <div key={program.id} className="bg-slate-800/50 rounded-xl p-4">
                  <h4 className="font-medium text-slate-200 mb-2">{program.name}</h4>
                  <div className="space-y-1 text-xs">
                    <p className="text-slate-400">Duration: <span className="text-slate-300">{program.duration}</span></p>
                    <p className="text-slate-400">Fee/Year: <span className="text-green-400">{program.fee_per_year}</span></p>
                    <p className="text-slate-400">Total: <span className="text-orange-400 font-medium">{program.total_fee}</span></p>
                    <p className="text-slate-400">Eligibility: <span className="text-slate-300">{program.eligibility}</span></p>
                  </div>
                </div>
              ))}
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
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {admissionProcess.map((item) => (
                <div key={item.step} className="text-center bg-slate-800/50 rounded-xl p-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-3 font-bold">
                    {item.step}
                  </div>
                  <h4 className="font-medium text-slate-200 mb-2">{item.title}</h4>
                  <p className="text-xs text-slate-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Eligibility */}
          <div className="glass-dark rounded-2xl p-5">
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-green-400" />
              Eligibility Criteria
            </h3>
            <div className="space-y-3">
              {eligibilityCriteria.map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-slate-800/50 rounded-xl p-4">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center flex-shrink-0 text-sm font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-200">{item.program}</h4>
                    <p className="text-sm text-slate-400 mt-1">{item.criteria}</p>
                  </div>
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {studentClubs?.map((club) => {
                const ClubIcon = iconMap[club.icon_name || "Flag"] || Flag;
                return (
                  <div key={club.id} className="bg-slate-800/50 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <ClubIcon className="w-4 h-4 text-purple-400" />
                      </div>
                      <h4 className="font-medium text-slate-200">{club.name}</h4>
                    </div>
                    <p className="text-xs text-slate-400">{club.description}</p>
                    <p className="text-xs text-purple-400 mt-2">{club.members} members</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Placements Tab */}
      {activeTab === "placements" && (
        <div className="space-y-6">
          {/* Placement Stats */}
          <div className="glass-dark rounded-2xl p-5">
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              Placement Statistics
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-2 text-slate-400 font-medium">Year</th>
                    <th className="text-left py-3 px-2 text-slate-400 font-medium">Students Placed</th>
                    <th className="text-left py-3 px-2 text-slate-400 font-medium">Companies</th>
                    <th className="text-left py-3 px-2 text-slate-400 font-medium">Highest Package</th>
                    <th className="text-left py-3 px-2 text-slate-400 font-medium">Average Package</th>
                  </tr>
                </thead>
                <tbody>
                  {placementStats?.map((stat) => (
                    <tr key={stat.id} className="border-b border-slate-800">
                      <td className="py-3 px-2 text-slate-200">{stat.academic_year}</td>
                      <td className="py-3 px-2 text-green-400">{stat.students_placed}</td>
                      <td className="py-3 px-2 text-blue-400">{stat.companies}</td>
                      <td className="py-3 px-2 text-orange-400 font-medium">{stat.highest_package}</td>
                      <td className="py-3 px-2 text-purple-400">{stat.average_package}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Recruiters */}
          <div className="glass-dark rounded-2xl p-5">
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-400" />
              Top Recruiters
            </h3>
            <div className="flex flex-wrap gap-2">
              {topRecruiters?.map((recruiter) => (
                <span
                  key={recruiter.id}
                  className="px-3 py-2 rounded-lg bg-slate-800/50 text-slate-300 text-sm"
                >
                  {recruiter.company_name}
                  {recruiter.sector && <span className="text-slate-500 ml-1">({recruiter.sector})</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* News Tab */}
      {activeTab === "news" && (
        <div className="space-y-4">
          <div className="glass-dark rounded-2xl p-5 mb-6">
            <h3 className="font-semibold text-slate-100 mb-2 flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-cyan-400" />
              Latest News & Announcements
            </h3>
            <p className="text-sm text-slate-400">Stay updated with the latest happenings at Periyar University</p>
          </div>

          <div className="grid gap-4">
            {newsFeed?.map((news, index) => (
              <div
                key={news.id}
                className="glass-dark rounded-xl p-5 animate-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400">
                      {news.category}
                    </span>
                    <h4 className="font-semibold text-slate-100 mt-2">{news.title}</h4>
                    <p className="text-sm text-slate-400 mt-1">{news.description}</p>
                  </div>
                  <span className="text-xs text-slate-500 whitespace-nowrap">
                    {news.news_date ? new Date(news.news_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : ""}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicsHub;

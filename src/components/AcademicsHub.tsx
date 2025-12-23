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
} from "lucide-react";
import { cn } from "@/lib/utils";

// Schools and Departments Data from official website
const schoolsAndDepartments = [
  {
    school: "School of Biosciences",
    departments: [
      { name: "Biochemistry", url: "https://www.periyaruniversity.ac.in/Dept/bch.php" },
      { name: "Biotechnology", url: "https://www.periyaruniversity.ac.in/Dept/bio.php" },
      { name: "Microbiology", url: "https://www.periyaruniversity.ac.in/Dept/mib.php" },
    ],
    icon: FlaskConical,
    color: "green"
  },
  {
    school: "School of Mathematics",
    departments: [
      { name: "Computer Science", url: "https://www.periyaruniversity.ac.in/Dept/csc.php" },
      { name: "Library and Information Science", url: "https://www.periyaruniversity.ac.in/Dept/lib.php" },
      { name: "Mathematics", url: "https://www.periyaruniversity.ac.in/Dept/mat.php" },
      { name: "Statistics", url: "https://www.periyaruniversity.ac.in/Dept/sta.php" },
    ],
    icon: Calculator,
    color: "blue"
  },
  {
    school: "School of Physical Sciences",
    departments: [
      { name: "Physics", url: "https://www.periyaruniversity.ac.in/Dept/phy.php" },
      { name: "Chemistry", url: "https://www.periyaruniversity.ac.in/Dept/che.php" },
      { name: "Geology", url: "https://www.periyaruniversity.ac.in/Dept/geo.php" },
    ],
    icon: Atom,
    color: "purple"
  },
  {
    school: "School of Business Studies",
    departments: [
      { name: "Commerce", url: "https://www.periyaruniversity.ac.in/Dept/com.php" },
      { name: "Economics", url: "https://www.periyaruniversity.ac.in/Dept/eco.php" },
      { name: "Management Studies", url: "https://www.periyaruniversity.ac.in/Dept/mba.php" },
    ],
    icon: Briefcase,
    color: "orange"
  },
  {
    school: "School of Languages",
    departments: [
      { name: "English", url: "https://www.periyaruniversity.ac.in/Dept/eng.php" },
      { name: "Tamil", url: "https://www.periyaruniversity.ac.in/Dept/tam.php" },
    ],
    icon: Languages,
    color: "pink"
  },
  {
    school: "School of Professional Studies",
    departments: [
      { name: "Education", url: "https://www.periyaruniversity.ac.in/Dept/edu.php" },
      { name: "Food Science and Nutrition", url: "https://www.periyaruniversity.ac.in/Dept/fsn.php" },
      { name: "Textiles and Apparel Design", url: "https://www.periyaruniversity.ac.in/Dept/tex.php" },
    ],
    icon: BookOpen,
    color: "cyan"
  },
  {
    school: "School of Social Sciences",
    departments: [
      { name: "Sociology", url: "https://www.periyaruniversity.ac.in/Dept/soc.php" },
      { name: "Psychology", url: "https://www.periyaruniversity.ac.in/Dept/psy.php" },
      { name: "Journalism and Mass Communication", url: "https://www.periyaruniversity.ac.in/Dept/jmc.php" },
      { name: "History", url: "https://www.periyaruniversity.ac.in/Dept/his.php" },
    ],
    icon: Brain,
    color: "amber"
  },
  {
    school: "School of Life Sciences",
    departments: [
      { name: "Botany", url: "https://www.periyaruniversity.ac.in/Dept/bot.php" },
      { name: "Zoology", url: "https://www.periyaruniversity.ac.in/Dept/zoo.php" },
      { name: "Nutrition and Dietetics", url: "https://www.periyaruniversity.ac.in/Dept/cnd.php" },
    ],
    icon: Leaf,
    color: "emerald"
  },
  {
    school: "School of Energy & Environmental Sciences",
    departments: [
      { name: "Energy Science and Technology", url: "https://www.periyaruniversity.ac.in/Dept/egs.php" },
      { name: "Environmental Science", url: "https://www.periyaruniversity.ac.in/Dept/evs.php" },
    ],
    icon: Sun,
    color: "yellow"
  },
];

const cdoePrograms = [
  { name: "B.A. Tamil", duration: "3 Years", fee: "₹3,500/year" },
  { name: "B.A. History", duration: "3 Years", fee: "₹3,500/year" },
  { name: "B.A. Economics", duration: "3 Years", fee: "₹3,500/year" },
  { name: "B.A. Public Administration", duration: "3 Years", fee: "₹3,500/year" },
  { name: "B.Com.", duration: "3 Years", fee: "₹4,000/year" },
  { name: "B.Sc. Computer Science", duration: "3 Years", fee: "₹6,000/year" },
  { name: "M.A. Tamil", duration: "2 Years", fee: "₹4,000/year" },
  { name: "M.A. History", duration: "2 Years", fee: "₹4,000/year" },
  { name: "M.A. Public Administration", duration: "2 Years", fee: "₹4,500/year" },
  { name: "M.Com.", duration: "2 Years", fee: "₹5,000/year" },
  { name: "M.B.A.", duration: "2 Years", fee: "₹15,000/year" },
  { name: "M.Sc. Computer Science", duration: "2 Years", fee: "₹8,000/year" },
];

const studentClubs = [
  { name: "NSS (National Service Scheme)", icon: Flag, description: "Community service, social welfare activities, and rural development camps", members: "500+" },
  { name: "YRC (Youth Red Cross)", icon: Heart, description: "Health awareness programs, blood donation camps, and first aid training", members: "300+" },
  { name: "NCC (National Cadet Corps)", icon: Award, description: "Military training, discipline, and national integration activities", members: "200+" },
  { name: "Fine Arts Club", icon: Palette, description: "Cultural events, drama, art exhibitions, and creative workshops", members: "400+" },
  { name: "Music Club", icon: Music, description: "Classical and contemporary music performances and competitions", members: "150+" },
  { name: "Literary Club", icon: BookOpenCheck, description: "Debates, essay competitions, poetry, and creative writing", members: "250+" },
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
  const [activeTab, setActiveTab] = useState<"departments" | "cdoe" | "clubs">("departments");

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2">Academics & Programs</h1>
        <p className="text-slate-400">Explore 9 Schools with 24 Departments of Study and Research</p>
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
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveTab("departments")}
          className={cn(
            "flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all",
            activeTab === "departments"
              ? "bg-gradient-to-r from-orange-500 to-orange-600 text-slate-950"
              : "glass-dark text-slate-300 hover:text-slate-100"
          )}
        >
          <GraduationCap className="w-5 h-5" />
          Schools & Departments
        </button>
        <button
          onClick={() => setActiveTab("cdoe")}
          className={cn(
            "flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all",
            activeTab === "cdoe"
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
              : "glass-dark text-slate-300 hover:text-slate-100"
          )}
        >
          <Globe className="w-5 h-5" />
          CDOE Distance Education
        </button>
        <button
          onClick={() => setActiveTab("clubs")}
          className={cn(
            "flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all",
            activeTab === "clubs"
              ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white"
              : "glass-dark text-slate-300 hover:text-slate-100"
          )}
        >
          <Users className="w-5 h-5" />
          Student Clubs
        </button>
      </div>

      {/* Content */}
      {activeTab === "departments" && (
        <div className="space-y-4">
          <div className="glass-dark rounded-2xl p-5 mb-6">
            <h3 className="font-semibold text-slate-100 mb-2 flex items-center gap-2">
              <Award className="w-5 h-5 text-orange-400" />
              Departments of Study and Research
            </h3>
            <p className="text-sm text-slate-400">
              Full-time programs offered at Periyar University main campus. The University covers four districts: Salem, Namakkal, Dharmapuri, and Krishnagiri.
            </p>
            <a
              href="https://www.periyaruniversity.ac.in/Dept.php"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-orange-400 hover:text-orange-300 transition-colors mt-3"
            >
              View All Departments <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="grid gap-4">
            {schoolsAndDepartments.map((school, index) => {
              const colors = getColorClasses(school.color);
              const IconComponent = school.icon;
              return (
                <div
                  key={school.school}
                  className={cn("glass-dark rounded-xl p-5 hover:border-opacity-50 transition-all animate-in", colors.border)}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0", colors.bg)}>
                      <IconComponent className={cn("w-6 h-6", colors.text)} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-100 mb-3">{school.school}</h3>
                      <div className="flex flex-wrap gap-2">
                        {school.departments.map((dept) => (
                          <a
                            key={dept.name}
                            href={dept.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              "inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full transition-all hover:scale-105",
                              colors.bg, colors.text
                            )}
                          >
                            {dept.name}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
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

      {activeTab === "cdoe" && (
        <div className="space-y-4">
          <div className="glass-dark rounded-2xl p-5 mb-6">
            <h3 className="font-semibold text-slate-100 mb-2 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-400" />
              Centre for Distance and Online Education (CDOE)
            </h3>
            <p className="text-sm text-slate-400 mb-3">
              Flexible learning programs for working professionals and students who cannot attend regular classes. 
              Periyar University imparts higher education through three modes: Departments of Study and Research, 
              affiliated Colleges, and Centre for Distance and Online Education (CDOE).
            </p>
            <a
              href="http://pride.periyaruniversity.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              Visit CDOE Portal <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {cdoePrograms.map((program, index) => (
              <div
                key={program.name}
                className="glass-dark rounded-xl p-4 hover:border-blue-500/30 transition-all animate-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <BookOpenCheck className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-100">{program.name}</h3>
                    <div className="flex items-center gap-3 mt-2 text-sm">
                      <span className="flex items-center gap-1 text-slate-400">
                        <Clock className="w-4 h-4" />
                        {program.duration}
                      </span>
                      <span className="flex items-center gap-1 text-green-400">
                        <Coins className="w-4 h-4" />
                        {program.fee}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CDOE Quick Links */}
          <div className="glass-dark rounded-2xl p-5 mt-6">
            <h4 className="font-semibold text-slate-100 mb-4">CDOE Portals</h4>
            <div className="flex flex-wrap gap-3">
              <a
                href="http://pridecoe.periyaruniversity.ac.in/odl/ODL_RESULT_AUGUST_2025"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-all"
              >
                ODL Results <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="http://pridecoe.periyaruniversity.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all"
              >
                CDOE Portal <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="http://pridecoe.periyaruniversity.ac.in/ODL/ODL_AUG2025_REVALUATION_ONLINE_APP/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 transition-all"
              >
                Revaluation Application <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      {activeTab === "clubs" && (
        <div className="space-y-4">
          <div className="glass-dark rounded-2xl p-5 mb-6">
            <h3 className="font-semibold text-slate-100 mb-2 flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-400" />
              Student Organizations & Clubs
            </h3>
            <p className="text-sm text-slate-400">
              Join our vibrant student community! Participate in extracurricular activities,
              develop leadership skills, and make lasting connections. "Holistic development of the students" 
              is the primary objective of the University.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {studentClubs.map((club, index) => (
              <div
                key={club.name}
                className="glass-dark rounded-xl p-5 hover:border-purple-500/30 transition-all animate-in group cursor-pointer"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/30 transition-colors">
                    <club.icon className="w-7 h-7 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-100 group-hover:text-purple-400 transition-colors flex items-center gap-2">
                      {club.name}
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-sm text-slate-400 mt-1">{club.description}</p>
                    <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 mt-2">
                      {club.members} members
                    </span>
                  </div>
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

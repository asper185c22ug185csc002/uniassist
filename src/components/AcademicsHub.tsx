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
} from "lucide-react";
import { cn } from "@/lib/utils";

// Academic Programs Data
const regularPrograms = [
  { name: "B.Sc. Computer Science", duration: "3 Years", intake: 60, department: "Computer Science" },
  { name: "B.Com.", duration: "3 Years", intake: 120, department: "Commerce" },
  { name: "B.A. English", duration: "3 Years", intake: 60, department: "English" },
  { name: "M.Sc. Mathematics", duration: "2 Years", intake: 40, department: "Mathematics" },
  { name: "M.B.A.", duration: "2 Years", intake: 60, department: "Management Studies" },
  { name: "Ph.D. Programs", duration: "3-5 Years", intake: "Varies", department: "All Departments" },
];

const cdoePrograms = [
  { name: "B.A. Tamil", duration: "3 Years", fee: "₹3,500/year" },
  { name: "B.A. History", duration: "3 Years", fee: "₹3,500/year" },
  { name: "B.Com.", duration: "3 Years", fee: "₹4,000/year" },
  { name: "M.A. Public Administration", duration: "2 Years", fee: "₹4,500/year" },
  { name: "M.B.A.", duration: "2 Years", fee: "₹15,000/year" },
  { name: "M.Sc. Computer Science", duration: "2 Years", fee: "₹8,000/year" },
];

const studentClubs = [
  { name: "NSS (National Service Scheme)", icon: Flag, description: "Community service and social welfare activities", members: "500+" },
  { name: "YRC (Youth Red Cross)", icon: Heart, description: "Health awareness and blood donation camps", members: "300+" },
  { name: "NCC (National Cadet Corps)", icon: Award, description: "Military training and discipline", members: "200+" },
  { name: "Fine Arts Club", icon: Palette, description: "Cultural events, drama, and art exhibitions", members: "400+" },
  { name: "Music Club", icon: Music, description: "Classical and contemporary music performances", members: "150+" },
  { name: "Literary Club", icon: BookOpenCheck, description: "Debates, essay competitions, and poetry", members: "250+" },
];

export const AcademicsHub = () => {
  const [activeTab, setActiveTab] = useState<"regular" | "cdoe" | "clubs">("regular");

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2">Academics & Programs</h1>
        <p className="text-slate-400">Explore our academic offerings and student activities</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveTab("regular")}
          className={cn(
            "flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all",
            activeTab === "regular"
              ? "bg-gradient-to-r from-orange-500 to-orange-600 text-slate-950"
              : "glass-dark text-slate-300 hover:text-slate-100"
          )}
        >
          <GraduationCap className="w-5 h-5" />
          Regular Programs
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
      {activeTab === "regular" && (
        <div className="space-y-4">
          <div className="glass-dark rounded-2xl p-5 mb-6">
            <h3 className="font-semibold text-slate-100 mb-2 flex items-center gap-2">
              <Award className="w-5 h-5 text-orange-400" />
              Regular Campus Programs
            </h3>
            <p className="text-sm text-slate-400">
              Full-time programs offered at Periyar University main campus and constituent colleges.
              Admissions are based on qualifying examinations and merit.
            </p>
          </div>

          <div className="grid gap-4">
            {regularPrograms.map((program, index) => (
              <div
                key={program.name}
                className="glass-dark rounded-xl p-4 flex items-center gap-4 hover:border-orange-500/30 transition-all animate-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-6 h-6 text-orange-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-100">{program.name}</h3>
                  <p className="text-sm text-slate-400">{program.department}</p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="text-center">
                    <Clock className="w-4 h-4 text-slate-500 mx-auto mb-1" />
                    <span className="text-slate-300">{program.duration}</span>
                  </div>
                  <div className="text-center">
                    <Users className="w-4 h-4 text-slate-500 mx-auto mb-1" />
                    <span className="text-slate-300">{program.intake}</span>
                  </div>
                </div>
              </div>
            ))}
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
            </p>
            <a
              href="https://periyaruniversity.ac.in/cdoe"
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
              develop leadership skills, and make lasting connections.
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
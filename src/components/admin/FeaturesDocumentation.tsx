import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  GraduationCap, 
  BookOpen, 
  Trophy, 
  Users, 
  Briefcase,
  Phone,
  Shield,
  Database,
  Layout,
  Bot,
  Settings,
  FileText,
  Calendar,
  Building,
  Star,
  Search,
  Globe,
  Lock,
  Zap,
  Palette,
  Code,
  Server
} from "lucide-react";

interface Feature {
  name: string;
  description: string;
  category: string;
  status: 'active' | 'planned' | 'beta';
}

interface FeatureCategory {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  features: Feature[];
}

const featureCategories: FeatureCategory[] = [
  {
    title: "AI Chat Assistant",
    icon: Bot,
    color: "orange",
    features: [
      { name: "Natural Language Q&A", description: "Ask questions in plain English about university", category: "Core", status: "active" },
      { name: "Context-Aware Responses", description: "AI remembers conversation history", category: "Core", status: "active" },
      { name: "Multi-Topic Support", description: "Academics, fees, admissions, placements, sports, library", category: "Core", status: "active" },
      { name: "Chat History", description: "Save and resume previous conversations", category: "UX", status: "active" },
      { name: "Admin Commands", description: "Admins can update data via chat commands", category: "Admin", status: "active" },
    ]
  },
  {
    title: "Academics & Programs",
    icon: GraduationCap,
    color: "blue",
    features: [
      { name: "Department Directory", description: "28+ departments with full details", category: "Content", status: "active" },
      { name: "Course Catalog", description: "PG, Ph.D., and CDOE programs", category: "Content", status: "active" },
      { name: "Fee Structure", description: "Year-wise fee breakdown for all courses", category: "Content", status: "active" },
      { name: "Admission Process", description: "Step-by-step admission guide", category: "Content", status: "active" },
      { name: "Eligibility Criteria", description: "Program-specific requirements", category: "Content", status: "active" },
    ]
  },
  {
    title: "Library Services",
    icon: BookOpen,
    color: "purple",
    features: [
      { name: "Book Catalog", description: "Search physical books by title/author", category: "Search", status: "active" },
      { name: "E-Resources Portal", description: "Access to NDLI, JSTOR, Shodhganga, etc.", category: "Digital", status: "active" },
      { name: "Department Collections", description: "Subject-wise library holdings", category: "Content", status: "active" },
      { name: "Membership Info", description: "Borrowing limits and rules", category: "Content", status: "active" },
      { name: "Library Timings", description: "Opening hours and contact info", category: "Content", status: "active" },
    ]
  },
  {
    title: "Sports & Facilities",
    icon: Trophy,
    color: "green",
    features: [
      { name: "Sports Events Calendar", description: "Upcoming matches and tournaments", category: "Events", status: "active" },
      { name: "Achievements Wall", description: "University sports accomplishments", category: "Content", status: "active" },
      { name: "Facilities Directory", description: "Stadiums, courts, and equipment", category: "Content", status: "active" },
      { name: "Hostel Information", description: "Rooms, amenities, mess, and rules", category: "Content", status: "active" },
      { name: "Google Maps Integration", description: "Location links for facilities", category: "Integration", status: "active" },
    ]
  },
  {
    title: "Placements & Internships",
    icon: Briefcase,
    color: "cyan",
    features: [
      { name: "Placement Statistics", description: "Year-wise placement data", category: "Analytics", status: "active" },
      { name: "Top Recruiters", description: "Companies that hire from university", category: "Content", status: "active" },
      { name: "Internship Areas", description: "Department-wise internship domains", category: "Content", status: "active" },
      { name: "Industrial Visits", description: "Scheduled company visits", category: "Events", status: "active" },
    ]
  },
  {
    title: "Alumni Network",
    icon: Users,
    color: "pink",
    features: [
      { name: "Alumni Directory", description: "Browse approved alumni profiles", category: "Directory", status: "active" },
      { name: "Self-Registration", description: "Alumni can register themselves", category: "UX", status: "active" },
      { name: "Admin Approval", description: "Verify and approve registrations", category: "Admin", status: "active" },
      { name: "Search & Filter", description: "Find alumni by department, year, company", category: "Search", status: "active" },
    ]
  },
  {
    title: "Admin Panel",
    icon: Shield,
    color: "red",
    features: [
      { name: "Dashboard Overview", description: "Pending items and statistics", category: "Analytics", status: "active" },
      { name: "Data Management", description: "CRUD operations on all 19+ tables", category: "Admin", status: "active" },
      { name: "Inline Editing", description: "Edit content directly on pages", category: "UX", status: "active" },
      { name: "Visual Edit Indicators", description: "Icons show editable content", category: "UX", status: "active" },
      { name: "Role-Based Access", description: "Admin-only features protected", category: "Security", status: "active" },
    ]
  },
  {
    title: "Contact & Communication",
    icon: Phone,
    color: "amber",
    features: [
      { name: "Contact Directory", description: "Department-wise contact info", category: "Content", status: "active" },
      { name: "Inquiry Form", description: "Submit questions to university", category: "Forms", status: "active" },
      { name: "Social Links", description: "University social media profiles", category: "Content", status: "active" },
    ]
  },
];

const techStack = {
  frontend: [
    { name: "React 18", description: "UI library with hooks" },
    { name: "TypeScript", description: "Type-safe JavaScript" },
    { name: "Vite", description: "Fast build tool" },
    { name: "React Router", description: "Client-side routing" },
  ],
  ui: [
    { name: "Tailwind CSS", description: "Utility-first styling" },
    { name: "shadcn/ui", description: "Accessible components" },
    { name: "Radix UI", description: "Headless primitives" },
    { name: "Lucide Icons", description: "Icon library" },
  ],
  state: [
    { name: "TanStack Query", description: "Data fetching & caching" },
    { name: "React Hook Form", description: "Form management" },
    { name: "Zod", description: "Schema validation" },
  ],
  backend: [
    { name: "Supabase", description: "Backend as a service" },
    { name: "PostgreSQL", description: "Relational database" },
    { name: "Edge Functions", description: "Serverless Deno runtime" },
    { name: "REST API", description: "Auto-generated from schema" },
  ],
  security: [
    { name: "Row Level Security", description: "Database access control" },
    { name: "JWT Authentication", description: "Secure token-based auth" },
    { name: "Role-Based Access", description: "Admin/User permissions" },
  ],
  ai: [
    { name: "Lovable AI Gateway", description: "AI model integration" },
    { name: "Google Gemini", description: "LLM for chat responses" },
    { name: "Context Injection", description: "Database-aware AI" },
  ],
};

const colorClasses: Record<string, string> = {
  orange: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  blue: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  purple: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  green: "bg-green-500/20 text-green-400 border-green-500/30",
  cyan: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  pink: "bg-pink-500/20 text-pink-400 border-pink-500/30",
  red: "bg-red-500/20 text-red-400 border-red-500/30",
  amber: "bg-amber-500/20 text-amber-400 border-amber-500/30",
};

export const FeaturesDocumentation = () => {
  return (
    <div className="space-y-8">
      {/* Features Section */}
      <div>
        <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-3">
          <Zap className="w-6 h-6 text-orange-400" />
          UniAssist Features
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {featureCategories.map((category) => {
            const Icon = category.icon;
            const colorClass = colorClasses[category.color];
            return (
              <Card key={category.title} className="glass-dark border-slate-700/50">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClass.split(' ')[0]}`}>
                      <Icon className={`w-5 h-5 ${colorClass.split(' ')[1]}`} />
                    </div>
                    <CardTitle className="text-lg text-slate-100">{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {category.features.map((feature) => (
                      <div key={feature.name} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-2 flex-shrink-0" />
                        <div>
                          <span className="text-slate-200 font-medium">{feature.name}</span>
                          <span className="text-slate-500 mx-1">–</span>
                          <span className="text-slate-400">{feature.description}</span>
                          {feature.status === 'beta' && (
                            <Badge variant="outline" className="ml-2 text-xs text-yellow-400 border-yellow-500/30">Beta</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Tech Stack Section */}
      <div>
        <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-3">
          <Code className="w-6 h-6 text-blue-400" />
          Technology Stack
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="glass-dark border-slate-700/50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Layout className="w-5 h-5 text-blue-400" />
                <CardTitle className="text-base text-slate-100">Frontend</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {techStack.frontend.map((tech) => (
                <div key={tech.name} className="flex justify-between text-sm">
                  <span className="text-slate-200">{tech.name}</span>
                  <span className="text-slate-500">{tech.description}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="glass-dark border-slate-700/50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-purple-400" />
                <CardTitle className="text-base text-slate-100">UI Framework</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {techStack.ui.map((tech) => (
                <div key={tech.name} className="flex justify-between text-sm">
                  <span className="text-slate-200">{tech.name}</span>
                  <span className="text-slate-500">{tech.description}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="glass-dark border-slate-700/50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-green-400" />
                <CardTitle className="text-base text-slate-100">State Management</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {techStack.state.map((tech) => (
                <div key={tech.name} className="flex justify-between text-sm">
                  <span className="text-slate-200">{tech.name}</span>
                  <span className="text-slate-500">{tech.description}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="glass-dark border-slate-700/50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Server className="w-5 h-5 text-orange-400" />
                <CardTitle className="text-base text-slate-100">Backend & Database</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {techStack.backend.map((tech) => (
                <div key={tech.name} className="flex justify-between text-sm">
                  <span className="text-slate-200">{tech.name}</span>
                  <span className="text-slate-500">{tech.description}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="glass-dark border-slate-700/50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-red-400" />
                <CardTitle className="text-base text-slate-100">Security</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {techStack.security.map((tech) => (
                <div key={tech.name} className="flex justify-between text-sm">
                  <span className="text-slate-200">{tech.name}</span>
                  <span className="text-slate-500">{tech.description}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="glass-dark border-slate-700/50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-cyan-400" />
                <CardTitle className="text-base text-slate-100">AI Integration</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {techStack.ai.map((tech) => (
                <div key={tech.name} className="flex justify-between text-sm">
                  <span className="text-slate-200">{tech.name}</span>
                  <span className="text-slate-500">{tech.description}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Database Tables */}
      <div>
        <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-3">
          <Database className="w-6 h-6 text-green-400" />
          Database Schema (19 Tables)
        </h2>
        <Card className="glass-dark border-slate-700/50">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                "achievements", "alumni", "cdoe_programs", "courses",
                "departments", "digital_resources", "facilities", "hostel_info",
                "industrial_visits", "inquiries", "internship_areas", "library_books",
                "library_collections", "news_feed", "placement_stats", "sports_events",
                "student_clubs", "top_recruiters", "user_roles"
              ].map((table) => (
                <div key={table} className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-slate-300 font-mono">{table}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* File Structure */}
      <div>
        <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-3">
          <FileText className="w-6 h-6 text-amber-400" />
          Key Files & Components
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="glass-dark border-slate-700/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-slate-100">Pages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 font-mono text-sm">
              <p className="text-slate-400">src/pages/Index.tsx <span className="text-slate-600">- Chat interface</span></p>
              <p className="text-slate-400">src/pages/Academics.tsx <span className="text-slate-600">- Programs & fees</span></p>
              <p className="text-slate-400">src/pages/Library.tsx <span className="text-slate-600">- Library catalog</span></p>
              <p className="text-slate-400">src/pages/Sports.tsx <span className="text-slate-600">- Facilities</span></p>
              <p className="text-slate-400">src/pages/Alumni.tsx <span className="text-slate-600">- Alumni network</span></p>
              <p className="text-slate-400">src/pages/Admin.tsx <span className="text-slate-600">- Admin panel</span></p>
            </CardContent>
          </Card>

          <Card className="glass-dark border-slate-700/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-slate-100">Core Components</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 font-mono text-sm">
              <p className="text-slate-400">ChatInterface.tsx <span className="text-slate-600">- AI chat UI</span></p>
              <p className="text-slate-400">AdminEditWrapper.tsx <span className="text-slate-600">- Inline editing</span></p>
              <p className="text-slate-400">AdminDashboard.tsx <span className="text-slate-600">- Admin overview</span></p>
              <p className="text-slate-400">AcademicsHub.tsx <span className="text-slate-600">- Academics view</span></p>
              <p className="text-slate-400">LibraryCatalog.tsx <span className="text-slate-600">- Library view</span></p>
              <p className="text-slate-400">SportsAndFacilities.tsx <span className="text-slate-600">- Sports view</span></p>
            </CardContent>
          </Card>

          <Card className="glass-dark border-slate-700/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-slate-100">Hooks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 font-mono text-sm">
              <p className="text-slate-400">useAuth.ts <span className="text-slate-600">- Authentication</span></p>
              <p className="text-slate-400">useUniversityData.ts <span className="text-slate-600">- Data fetching</span></p>
              <p className="text-slate-400">useChatHistory.ts <span className="text-slate-600">- Chat persistence</span></p>
            </CardContent>
          </Card>

          <Card className="glass-dark border-slate-700/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-slate-100">Edge Functions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 font-mono text-sm">
              <p className="text-slate-400">supabase/functions/chat/ <span className="text-slate-600">- AI chat endpoint</span></p>
              <p className="text-slate-400">supabase/functions/admin-command/ <span className="text-slate-600">- Admin commands</span></p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

import { useState, useMemo, useEffect } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Search,
  Building,
  Send,
  User,
  MessageSquare,
  Clock,
  Trash2,
  ExternalLink,
  FlaskConical,
  Calculator,
  Atom,
  Briefcase,
  Languages,
  BookOpen,
  Leaf,
  Sun,
  Brain,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useDepartments } from "@/hooks/useUniversityData";

const getCategoryFromSchool = (school: string | null): string => {
  if (!school) return "Admin";
  if (school.includes("Biosciences")) return "Biosciences";
  if (school.includes("Mathematics")) return "Mathematics";
  if (school.includes("Physical")) return "Physical Sciences";
  if (school.includes("Business")) return "Business";
  if (school.includes("Languages")) return "Languages";
  if (school.includes("Professional")) return "Professional";
  if (school.includes("Social")) return "Social Sciences";
  if (school.includes("Life")) return "Life Sciences";
  if (school.includes("Energy") || school.includes("Environmental")) return "Environment";
  return "Admin";
};

const categories = ["All", "Admin", "Biosciences", "Mathematics", "Physical Sciences", "Business", "Languages", "Professional", "Social Sciences", "Life Sciences", "Environment"];

const getCategoryIcon = (category: string) => {
  const icons: Record<string, React.ElementType> = {
    "Admin": Building,
    "Biosciences": FlaskConical,
    "Mathematics": Calculator,
    "Physical Sciences": Atom,
    "Business": Briefcase,
    "Languages": Languages,
    "Professional": BookOpen,
    "Social Sciences": Brain,
    "Life Sciences": Leaf,
    "Environment": Sun,
  };
  return icons[category] || Building;
};

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    "Admin": "orange",
    "Biosciences": "green",
    "Mathematics": "blue",
    "Physical Sciences": "purple",
    "Business": "amber",
    "Languages": "pink",
    "Professional": "cyan",
    "Social Sciences": "indigo",
    "Life Sciences": "emerald",
    "Environment": "yellow",
  };
  return colors[category] || "orange";
};

interface InquirySubmission {
  id: string;
  name: string;
  email: string;
  department: string;
  message: string;
  timestamp: string;
}

const STORAGE_KEY = "uniassist_inquiries";

export const ContactDirectory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [inquiries, setInquiries] = useState<InquirySubmission[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch departments from database
  const { data: dbDepartments, isLoading } = useDepartments();

  // Load inquiries from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setInquiries(JSON.parse(stored));
      } catch {
        console.error("Failed to parse stored inquiries");
      }
    }
  }, []);

  // Save inquiries to localStorage
  const saveInquiries = (newInquiries: InquirySubmission[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newInquiries));
    setInquiries(newInquiries);
  };

  // Transform database departments to contact format
  const departments = useMemo(() => {
    if (!dbDepartments) return [];
    return dbDepartments.map(dept => ({
      name: dept.name,
      phone: dept.phone || "0427-2345766",
      email: dept.email || `${dept.name.toLowerCase().replace(/\s+/g, '')}@periyaruniversity.ac.in`,
      location: dept.location || "Main Campus",
      category: getCategoryFromSchool(dept.school),
      url: dept.url || "https://www.periyaruniversity.ac.in",
    }));
  }, [dbDepartments]);

  const filteredDepartments = useMemo(() => {
    return departments.filter((dept) => {
      const matchesSearch = dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dept.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || dept.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, departments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.department || !formData.message) {
      toast.error("Please fill all fields");
      return;
    }

    setIsSubmitting(true);

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newInquiry: InquirySubmission = {
      id: Date.now().toString(),
      ...formData,
      timestamp: new Date().toISOString(),
    };

    saveInquiries([newInquiry, ...inquiries]);

    toast.success("Inquiry submitted successfully!");
    setFormData({ name: "", email: "", department: "", message: "" });
    setShowInquiryForm(false);
    setIsSubmitting(false);
  };

  const deleteInquiry = (id: string) => {
    const updated = inquiries.filter((inq) => inq.id !== id);
    saveInquiries(updated);
    toast.success("Inquiry deleted");
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-8 max-w-6xl mx-auto flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-orange-400 animate-spin" />
          <p className="text-slate-400">Loading contact directory...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2">Contact Directory</h1>
        <p className="text-slate-400">Find department contacts across 9 Schools and {departments.length} Departments</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="Search departments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/50 transition-all"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/50 appearance-none cursor-pointer min-w-[160px]"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat} className="bg-slate-900">
              {cat === "All" ? "All Categories" : cat}
            </option>
          ))}
        </select>
        <button
          onClick={() => setShowInquiryForm(!showInquiryForm)}
          className={cn(
            "flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all whitespace-nowrap",
            showInquiryForm
              ? "bg-slate-700 text-slate-300"
              : "bg-gradient-to-r from-orange-500 to-orange-600 text-slate-950"
          )}
        >
          <MessageSquare className="w-5 h-5" />
          {showInquiryForm ? "View Contacts" : "Submit Inquiry"}
        </button>
      </div>

      {/* Inquiry Form */}
      {showInquiryForm ? (
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="glass-dark rounded-2xl p-6">
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <Send className="w-5 h-5 text-orange-400" />
              Submit an Inquiry
            </h3>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Your Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/50"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/50"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="text-sm text-slate-400 mb-1 block">Department</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/50 appearance-none cursor-pointer"
                >
                  <option value="" className="bg-slate-900">Select a department</option>
                  {departments.map((dept) => (
                    <option key={dept.name} value={dept.name} className="bg-slate-900">
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="text-sm text-slate-400 mb-1 block">Your Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your inquiry in detail..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/50 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-slate-950 font-medium hover:from-orange-400 hover:to-orange-500 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Inquiry
                </>
              )}
            </button>
          </form>

          {/* Previous Inquiries */}
          {inquiries.length > 0 && (
            <div className="glass-dark rounded-2xl p-6">
              <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                Your Submitted Inquiries
              </h3>
              <div className="space-y-3">
                {inquiries.map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className="bg-slate-800/50 rounded-xl p-4 flex items-start justify-between gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">
                          {inquiry.department}
                        </span>
                        <span className="text-xs text-slate-500">
                          {new Date(inquiry.timestamp).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-slate-300 line-clamp-2">{inquiry.message}</p>
                    </div>
                    <button
                      onClick={() => deleteInquiry(inquiry.id)}
                      className="p-2 rounded-lg hover:bg-red-500/20 text-slate-500 hover:text-red-400 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Contact Cards */
        <div className="space-y-4">
          <div className="glass-dark rounded-xl p-4">
            <p className="text-sm text-slate-400">
              Showing {filteredDepartments.length} of {departments.length} departments
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {filteredDepartments.map((dept, index) => {
              const CategoryIcon = getCategoryIcon(dept.category);
              const color = getCategoryColor(dept.category);
              
              return (
                <div
                  key={dept.name}
                  className="glass-dark rounded-xl p-5 hover:border-orange-500/30 transition-all animate-in"
                  style={{ animationDelay: `${index * 0.03}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                      `bg-${color}-500/20`
                    )}>
                      <CategoryIcon className={cn("w-6 h-6", `text-${color}-400`)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-slate-100">{dept.name}</h4>
                        <a
                          href={dept.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-orange-400 transition-all"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      
                      <div className="mt-3 space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-slate-400">
                          <Phone className="w-4 h-4 flex-shrink-0" />
                          <span>{dept.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <Mail className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{dept.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <MapPin className="w-4 h-4 flex-shrink-0" />
                          <span>{dept.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactDirectory;

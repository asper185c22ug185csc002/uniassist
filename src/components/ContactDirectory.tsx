import { useState, useMemo, useEffect } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Search,
  Building,
  Send,
  CheckCircle,
  User,
  MessageSquare,
  Clock,
  Trash2,
  ExternalLink,
  Globe,
  GraduationCap,
  FlaskConical,
  Calculator,
  Atom,
  Briefcase,
  Languages,
  BookOpen,
  Leaf,
  Sun,
  Brain,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Department Contacts - Official departments from website
const departments = [
  // Administrative Offices
  { name: "Admin Office", phone: "0427-2345766", email: "admin@periyaruniversity.ac.in", location: "Administrative Block", category: "Admin", url: "https://www.periyaruniversity.ac.in" },
  { name: "Controller of Examinations", phone: "0427-2345766", email: "coe@periyaruniversity.ac.in", location: "COE Building", category: "Admin", url: "http://pucoe.periyaruniversity.ac.in" },
  { name: "CDOE", phone: "0427-2345766", email: "cdoe@periyaruniversity.ac.in", location: "CDOE Building", category: "Admin", url: "http://pride.periyaruniversity.ac.in/" },
  { name: "Computer Centre", phone: "0427-2345766", email: "cc@periyaruniversity.ac.in", location: "Computer Centre", category: "Admin", url: "https://www.periyaruniversity.ac.in/centre/CompCentre/" },
  { name: "University Library", phone: "0427-2345766", email: "library@periyaruniversity.ac.in", location: "Central Library", category: "Admin", url: "https://www.periyaruniversity.ac.in/Library_Home/home.html" },
  
  // School of Biosciences
  { name: "Dept. of Biochemistry", phone: "0427-2345766", email: "biochemistry@periyaruniversity.ac.in", location: "Biosciences Block", category: "Biosciences", url: "https://www.periyaruniversity.ac.in/Dept/bch.php" },
  { name: "Dept. of Biotechnology", phone: "0427-2345766", email: "biotech@periyaruniversity.ac.in", location: "Biosciences Block", category: "Biosciences", url: "https://www.periyaruniversity.ac.in/Dept/bio.php" },
  { name: "Dept. of Microbiology", phone: "0427-2345766", email: "microbiology@periyaruniversity.ac.in", location: "Biosciences Block", category: "Biosciences", url: "https://www.periyaruniversity.ac.in/Dept/mib.php" },
  
  // School of Mathematics
  { name: "Dept. of Computer Science", phone: "0427-2345766", email: "cs@periyaruniversity.ac.in", location: "Mathematics Block", category: "Mathematics", url: "https://www.periyaruniversity.ac.in/Dept/csc.php" },
  { name: "Dept. of Library Science", phone: "0427-2345766", email: "lis@periyaruniversity.ac.in", location: "Mathematics Block", category: "Mathematics", url: "https://www.periyaruniversity.ac.in/Dept/lib.php" },
  { name: "Dept. of Mathematics", phone: "0427-2345766", email: "maths@periyaruniversity.ac.in", location: "Mathematics Block", category: "Mathematics", url: "https://www.periyaruniversity.ac.in/Dept/mat.php" },
  { name: "Dept. of Statistics", phone: "0427-2345766", email: "statistics@periyaruniversity.ac.in", location: "Mathematics Block", category: "Mathematics", url: "https://www.periyaruniversity.ac.in/Dept/sta.php" },
  
  // School of Physical Sciences
  { name: "Dept. of Physics", phone: "0427-2345766", email: "physics@periyaruniversity.ac.in", location: "Physical Sciences Block", category: "Physical Sciences", url: "https://www.periyaruniversity.ac.in/Dept/phy.php" },
  { name: "Dept. of Chemistry", phone: "0427-2345766", email: "chemistry@periyaruniversity.ac.in", location: "Physical Sciences Block", category: "Physical Sciences", url: "https://www.periyaruniversity.ac.in/Dept/che.php" },
  { name: "Dept. of Geology", phone: "0427-2345766", email: "geology@periyaruniversity.ac.in", location: "Physical Sciences Block", category: "Physical Sciences", url: "https://www.periyaruniversity.ac.in/Dept/geo.php" },
  
  // School of Business Studies
  { name: "Dept. of Commerce", phone: "0427-2345766", email: "commerce@periyaruniversity.ac.in", location: "Business Studies Block", category: "Business", url: "https://www.periyaruniversity.ac.in/Dept/com.php" },
  { name: "Dept. of Economics", phone: "0427-2345766", email: "economics@periyaruniversity.ac.in", location: "Business Studies Block", category: "Business", url: "https://www.periyaruniversity.ac.in/Dept/eco.php" },
  { name: "Dept. of Management Studies", phone: "0427-2345766", email: "mba@periyaruniversity.ac.in", location: "Management Block", category: "Business", url: "https://www.periyaruniversity.ac.in/Dept/mba.php" },
  
  // School of Languages
  { name: "Dept. of English", phone: "0427-2345766", email: "english@periyaruniversity.ac.in", location: "Languages Block", category: "Languages", url: "https://www.periyaruniversity.ac.in/Dept/eng.php" },
  { name: "Dept. of Tamil", phone: "0427-2345766", email: "tamil@periyaruniversity.ac.in", location: "Languages Block", category: "Languages", url: "https://www.periyaruniversity.ac.in/Dept/tam.php" },
  
  // School of Professional Studies
  { name: "Dept. of Education", phone: "0427-2345766", email: "education@periyaruniversity.ac.in", location: "Professional Studies Block", category: "Professional", url: "https://www.periyaruniversity.ac.in/Dept/edu.php" },
  { name: "Dept. of Food Science & Nutrition", phone: "0427-2345766", email: "fsn@periyaruniversity.ac.in", location: "Professional Studies Block", category: "Professional", url: "https://www.periyaruniversity.ac.in/Dept/fsn.php" },
  { name: "Dept. of Textiles & Apparel Design", phone: "0427-2345766", email: "textiles@periyaruniversity.ac.in", location: "Professional Studies Block", category: "Professional", url: "https://www.periyaruniversity.ac.in/Dept/tex.php" },
  
  // School of Social Sciences
  { name: "Dept. of Sociology", phone: "0427-2345766", email: "sociology@periyaruniversity.ac.in", location: "Social Sciences Block", category: "Social Sciences", url: "https://www.periyaruniversity.ac.in/Dept/soc.php" },
  { name: "Dept. of Psychology", phone: "0427-2345766", email: "psychology@periyaruniversity.ac.in", location: "Social Sciences Block", category: "Social Sciences", url: "https://www.periyaruniversity.ac.in/Dept/psy.php" },
  { name: "Dept. of Journalism & Mass Communication", phone: "0427-2345766", email: "jmc@periyaruniversity.ac.in", location: "Social Sciences Block", category: "Social Sciences", url: "https://www.periyaruniversity.ac.in/Dept/jmc.php" },
  { name: "Dept. of History", phone: "0427-2345766", email: "history@periyaruniversity.ac.in", location: "Social Sciences Block", category: "Social Sciences", url: "https://www.periyaruniversity.ac.in/Dept/his.php" },
  
  // School of Life Sciences
  { name: "Dept. of Botany", phone: "0427-2345766", email: "botany@periyaruniversity.ac.in", location: "Life Sciences Block", category: "Life Sciences", url: "https://www.periyaruniversity.ac.in/Dept/bot.php" },
  { name: "Dept. of Zoology", phone: "0427-2345766", email: "zoology@periyaruniversity.ac.in", location: "Life Sciences Block", category: "Life Sciences", url: "https://www.periyaruniversity.ac.in/Dept/zoo.php" },
  { name: "Dept. of Nutrition & Dietetics", phone: "0427-2345766", email: "nutrition@periyaruniversity.ac.in", location: "Life Sciences Block", category: "Life Sciences", url: "https://www.periyaruniversity.ac.in/Dept/cnd.php" },
  
  // School of Energy & Environmental Sciences
  { name: "Dept. of Energy Science & Technology", phone: "0427-2345766", email: "energy@periyaruniversity.ac.in", location: "Energy Block", category: "Environment", url: "https://www.periyaruniversity.ac.in/Dept/egs.php" },
  { name: "Dept. of Environmental Science", phone: "0427-2345766", email: "evs@periyaruniversity.ac.in", location: "Environment Block", category: "Environment", url: "https://www.periyaruniversity.ac.in/Dept/evs.php" },
];

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

  const filteredDepartments = useMemo(() => {
    return departments.filter((dept) => {
      const matchesSearch = dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dept.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || dept.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

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

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2">Contact Directory</h1>
        <p className="text-slate-400">Find department contacts across 9 Schools and 24 Departments</p>
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
                    className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-medium text-slate-200">{inquiry.department}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">
                          {new Date(inquiry.timestamp).toLocaleDateString()}
                        </span>
                        <button
                          onClick={() => deleteInquiry(inquiry.id)}
                          className="p-1 rounded hover:bg-slate-700 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-slate-500 hover:text-red-400" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-slate-400 line-clamp-2">{inquiry.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Department List */
        <div className="space-y-4">
          {filteredDepartments.length === 0 ? (
            <div className="text-center py-12 glass-dark rounded-2xl">
              <Building className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">No departments found matching your search</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredDepartments.map((dept, index) => {
                const IconComponent = getCategoryIcon(dept.category);
                return (
                  <div
                    key={dept.name}
                    className="glass-dark rounded-xl p-5 hover:border-orange-500/30 transition-all animate-in"
                    style={{ animationDelay: `${index * 0.03}s` }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-orange-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-slate-100">{dept.name}</h3>
                          <a
                            href={dept.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-400 mt-1">
                          <MapPin className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{dept.location}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                            {dept.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row gap-3 text-sm">
                        <a
                          href={`tel:${dept.phone}`}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 text-slate-300 hover:text-orange-400 hover:bg-slate-700/50 transition-all"
                        >
                          <Phone className="w-4 h-4" />
                          {dept.phone}
                        </a>
                        <a
                          href={`mailto:${dept.email}`}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 text-slate-300 hover:text-blue-400 hover:bg-slate-700/50 transition-all"
                        >
                          <Mail className="w-4 h-4" />
                          Email
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Quick Links */}
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <a
          href="https://www.periyaruniversity.ac.in/Helpdesk.php"
          target="_blank"
          rel="noopener noreferrer"
          className="glass-dark rounded-xl p-4 hover:border-blue-500/30 transition-all group"
        >
          <h4 className="font-semibold text-slate-100 group-hover:text-blue-400 transition-colors flex items-center gap-2">
            Help Desk <ExternalLink className="w-4 h-4" />
          </h4>
          <p className="text-sm text-slate-400 mt-1">Official university help desk</p>
        </a>
        <a
          href="https://faculty.periyaruniversity.ac.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="glass-dark rounded-xl p-4 hover:border-green-500/30 transition-all group"
        >
          <h4 className="font-semibold text-slate-100 group-hover:text-green-400 transition-colors flex items-center gap-2">
            Faculty Portal <ExternalLink className="w-4 h-4" />
          </h4>
          <p className="text-sm text-slate-400 mt-1">Access faculty information</p>
        </a>
        <a
          href="https://www.periyaruniversity.ac.in/StudentCorner.php"
          target="_blank"
          rel="noopener noreferrer"
          className="glass-dark rounded-xl p-4 hover:border-purple-500/30 transition-all group"
        >
          <h4 className="font-semibold text-slate-100 group-hover:text-purple-400 transition-colors flex items-center gap-2">
            Student Corner <ExternalLink className="w-4 h-4" />
          </h4>
          <p className="text-sm text-slate-400 mt-1">Resources for students</p>
        </a>
      </div>

      {/* General Contact Info */}
      <div className="mt-6 glass-dark rounded-2xl p-6">
        <h3 className="font-semibold text-slate-100 mb-4">University Address</h3>
        <div className="flex flex-col md:flex-row gap-6 text-sm">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-orange-400 mt-0.5" />
            <div>
              <p className="text-slate-200 font-medium">Periyar University</p>
              <p className="text-slate-400">Periyar Palkalai Nagar</p>
              <p className="text-slate-400">Salem - 636 011, Tamil Nadu, India</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-orange-400 mt-0.5" />
            <div>
              <p className="text-slate-200 font-medium">0427-2345766</p>
              <p className="text-slate-400">Admin Office</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Globe className="w-5 h-5 text-orange-400 mt-0.5" />
            <div>
              <a 
                href="https://www.periyaruniversity.ac.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
              >
                www.periyaruniversity.ac.in
              </a>
              <p className="text-slate-400">Official Website</p>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-700/50">
          <p className="text-xs text-slate-500">
            GSTIN: 33AAAJP0951B1ZP | CSR Reg.No: CSR00061509 | UGC Status: 12(B) and 2(f) recognized
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactDirectory;

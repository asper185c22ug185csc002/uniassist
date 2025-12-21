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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Department Contacts
const departments = [
  { name: "Admissions Office", phone: "+91 4294 226 001", email: "admissions@periyaruniversity.ac.in", location: "Admin Block, Ground Floor" },
  { name: "Examination Cell", phone: "+91 4294 226 002", email: "exam@periyaruniversity.ac.in", location: "Admin Block, 1st Floor" },
  { name: "Library", phone: "+91 4294 226 003", email: "library@periyaruniversity.ac.in", location: "Central Library Building" },
  { name: "Hostel Office", phone: "+91 4294 226 004", email: "hostel@periyaruniversity.ac.in", location: "Hostel Block A" },
  { name: "Sports Department", phone: "+91 4294 226 005", email: "sports@periyaruniversity.ac.in", location: "Sports Complex" },
  { name: "CDOE", phone: "+91 4294 226 006", email: "cdoe@periyaruniversity.ac.in", location: "CDOE Building" },
  { name: "Student Welfare", phone: "+91 4294 226 007", email: "studentwelfare@periyaruniversity.ac.in", location: "Admin Block, 2nd Floor" },
  { name: "IT Department", phone: "+91 4294 226 008", email: "it@periyaruniversity.ac.in", location: "IT Block" },
  { name: "Finance Office", phone: "+91 4294 226 009", email: "finance@periyaruniversity.ac.in", location: "Admin Block, Ground Floor" },
  { name: "Research Cell", phone: "+91 4294 226 010", email: "research@periyaruniversity.ac.in", location: "Research Block" },
];

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
    return departments.filter((dept) =>
      dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

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
        <p className="text-slate-400">Find department contacts and submit inquiries</p>
      </div>

      {/* Search and Actions */}
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
        <button
          onClick={() => setShowInquiryForm(!showInquiryForm)}
          className={cn(
            "flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all",
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
        <div className="grid gap-4">
          {filteredDepartments.length === 0 ? (
            <div className="text-center py-12 glass-dark rounded-2xl">
              <Building className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">No departments found matching your search</p>
            </div>
          ) : (
            filteredDepartments.map((dept, index) => (
              <div
                key={dept.name}
                className="glass-dark rounded-xl p-5 hover:border-orange-500/30 transition-all animate-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <Building className="w-6 h-6 text-orange-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-100 mb-1">{dept.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{dept.location}</span>
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
            ))
          )}
        </div>
      )}

      {/* General Contact Info */}
      <div className="mt-8 glass-dark rounded-2xl p-6">
        <h3 className="font-semibold text-slate-100 mb-4">University Address</h3>
        <div className="flex flex-col md:flex-row gap-6 text-sm">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-orange-400 mt-0.5" />
            <div>
              <p className="text-slate-200">Periyar University</p>
              <p className="text-slate-400">Periyar Palkalai Nagar</p>
              <p className="text-slate-400">Salem - 636 011, Tamil Nadu, India</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-orange-400 mt-0.5" />
            <div>
              <p className="text-slate-200">+91 427 234 5766</p>
              <p className="text-slate-400">General Enquiry</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-orange-400 mt-0.5" />
            <div>
              <p className="text-slate-200">info@periyaruniversity.ac.in</p>
              <p className="text-slate-400">Official Email</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDirectory;
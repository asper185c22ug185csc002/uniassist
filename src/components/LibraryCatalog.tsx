import { useState, useMemo } from "react";
import { 
  Search, 
  Book, 
  Globe, 
  ExternalLink, 
  FileText, 
  BookOpen,
  Database,
  Clock,
  Users,
  Phone,
  Mail,
  Download,
  Video,
  GraduationCap,
  CreditCard,
  MapPin,
  Library,
  Newspaper,
  CheckCircle,
  FlaskConical,
  Atom,
  Brain,
  Calculator,
  Briefcase,
  Languages,
  Leaf,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useLibraryBooks,
  useLibraryCollections,
  useDigitalResources,
} from "@/hooks/useUniversityData";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Book,
  BookOpen,
  Database,
  Globe,
  Video,
  Search,
  FileText,
  GraduationCap,
  FlaskConical,
  CheckCircle,
  Download,
  Calculator,
  Brain,
  Atom,
  Briefcase,
  Languages,
  Leaf,
  Users,
  Newspaper,
  Library,
  Sun: Leaf,
};

// Membership Types (static)
const membershipTypes = [
  { 
    type: "Student Member", 
    eligibility: "All registered students of Periyar University",
    borrowLimit: "PG: 5 books | Research: 8 books",
    duration: "PG: 21 days | Research: 30 days",
    renewals: "2 times",
    fee: "Free (included in tuition)",
    features: ["Access to reading hall", "E-resource access", "Reference section", "Photocopying services"]
  },
  { 
    type: "Research Scholar", 
    eligibility: "Ph.D. scholars",
    borrowLimit: "8 books",
    duration: "30 days",
    renewals: "3 times",
    fee: "Free",
    features: ["Extended library hours", "Carrel facility", "Inter-library loan", "Thesis consultation", "24/7 e-resource access"]
  },
  { 
    type: "Faculty Member", 
    eligibility: "Teaching and non-teaching staff",
    borrowLimit: "15 books",
    duration: "60 days",
    renewals: "Unlimited",
    fee: "Free",
    features: ["Priority borrowing", "Book recommendation", "Journal subscription request", "Special reference services"]
  },
  { 
    type: "External Member", 
    eligibility: "Affiliated college faculty, alumni",
    borrowLimit: "3 books",
    duration: "14 days",
    renewals: "1 time",
    fee: "₹500/year",
    features: ["Reading hall access", "Reference consultation", "Photocopying services"]
  },
];

// Library Services (static)
const libraryServices = [
  { name: "Book Lending", icon: Book, description: "Borrow books for study and research" },
  { name: "Reference Service", icon: BookOpen, description: "Expert assistance for research queries" },
  { name: "Digital Library", icon: Database, description: "50+ computers with internet access" },
  { name: "Reprographic", icon: FileText, description: "Photocopy and scanning services" },
  { name: "Inter-Library Loan", icon: Library, description: "Books from other universities via DELNET" },
  { name: "Current Awareness", icon: Newspaper, description: "New arrivals and journal alerts" },
  { name: "OPAC Search", icon: Search, description: "Online catalog for book search" },
  { name: "E-Resource Training", icon: GraduationCap, description: "Orientation programs for digital resources" },
];

export const LibraryCatalog = () => {
  const [activeTab, setActiveTab] = useState<"physical" | "digital" | "collections" | "membership">("digital");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch data from database
  const { data: libraryBooks, isLoading: loadingBooks } = useLibraryBooks();
  const { data: libraryCollections, isLoading: loadingCollections } = useLibraryCollections();
  const { data: digitalResources, isLoading: loadingResources } = useDigitalResources();

  const isLoading = loadingBooks || loadingCollections || loadingResources;

  // Get unique categories from books
  const categories = useMemo(() => {
    const cats = new Set<string>(["All"]);
    libraryBooks?.forEach(book => cats.add(book.category));
    return Array.from(cats);
  }, [libraryBooks]);

  const filteredBooks = useMemo(() => {
    return (libraryBooks || []).filter((book) => {
      const matchesSearch = 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, libraryBooks]);

  const filteredResources = useMemo(() => {
    return (digitalResources || []).filter((resource) =>
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (resource.description || "").toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, digitalResources]);

  // Calculate totals from collections
  const totalStats = useMemo(() => {
    const collections = libraryCollections || [];
    return {
      books: collections.reduce((acc, c) => acc + (c.total_books || 0), 0),
      ebooks: collections.reduce((acc, c) => acc + (c.e_books || 0), 0),
      journals: collections.reduce((acc, c) => acc + (c.journals || 0), 0),
      theses: collections.reduce((acc, c) => acc + (c.theses || 0), 0),
    };
  }, [libraryCollections]);

  if (isLoading) {
    return (
      <div className="p-4 md:p-8 max-w-6xl mx-auto flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-orange-400 animate-spin" />
          <p className="text-slate-400">Loading library catalog...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2">University Library</h1>
        <p className="text-slate-400">Periyar University Central Library - Established 1997</p>
      </div>

      {/* Library Stats */}
      <div className="glass-dark rounded-2xl p-5 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-orange-400">{totalStats.books.toLocaleString()}</p>
            <p className="text-sm text-slate-400">Books</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-400">{totalStats.ebooks.toLocaleString()}</p>
            <p className="text-sm text-slate-400">E-Books</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-400">6,000+</p>
            <p className="text-sm text-slate-400">E-Journals</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-400">{totalStats.journals}</p>
            <p className="text-sm text-slate-400">Print Journals</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-pink-400">{totalStats.theses.toLocaleString()}</p>
            <p className="text-sm text-slate-400">Theses</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-cyan-400">24/7</p>
            <p className="text-sm text-slate-400">E-Access</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveTab("digital")}
          className={cn(
            "flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all",
            activeTab === "digital"
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
              : "glass-dark text-slate-300 hover:text-slate-100"
          )}
        >
          <Globe className="w-5 h-5" />
          E-Resources
        </button>
        <button
          onClick={() => setActiveTab("physical")}
          className={cn(
            "flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all",
            activeTab === "physical"
              ? "bg-gradient-to-r from-orange-500 to-orange-600 text-slate-950"
              : "glass-dark text-slate-300 hover:text-slate-100"
          )}
        >
          <Book className="w-5 h-5" />
          Book Catalog
        </button>
        <button
          onClick={() => setActiveTab("collections")}
          className={cn(
            "flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all",
            activeTab === "collections"
              ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white"
              : "glass-dark text-slate-300 hover:text-slate-100"
          )}
        >
          <Library className="w-5 h-5" />
          Department Collections
        </button>
        <button
          onClick={() => setActiveTab("membership")}
          className={cn(
            "flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all",
            activeTab === "membership"
              ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
              : "glass-dark text-slate-300 hover:text-slate-100"
          )}
        >
          <CreditCard className="w-5 h-5" />
          Membership
        </button>
      </div>

      {/* Search Bar - only for physical and digital tabs */}
      {(activeTab === "physical" || activeTab === "digital") && (
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder={activeTab === "physical" ? "Search books by title or author..." : "Search e-resources..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/50 transition-all"
            />
          </div>
          {activeTab === "physical" && (
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/50 appearance-none cursor-pointer min-w-[180px]"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-slate-900">
                  {cat === "All" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      {/* Digital Resources Tab */}
      {activeTab === "digital" && (
        <div className="space-y-6">
          {/* Quick Access */}
          <div className="glass-dark rounded-2xl p-5">
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-400" />
              Digital Resources & E-Libraries
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredResources.map((resource, index) => {
                const IconComponent = iconMap[resource.icon_name || "Globe"] || Globe;
                return (
                  <a
                    key={resource.id}
                    href={resource.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-dark rounded-xl p-4 hover:border-blue-500/30 transition-all group animate-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-slate-200 group-hover:text-blue-400 transition-colors flex items-center gap-1">
                          {resource.title}
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h4>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">{resource.description}</p>
                        <span className="text-xs text-blue-400 mt-2 inline-block">{resource.resource_type}</span>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Library Services */}
          <div className="glass-dark rounded-2xl p-5">
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-orange-400" />
              Library Services
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
              {libraryServices.map((service, index) => (
                <div key={service.name} className="bg-slate-800/50 rounded-xl p-4 animate-in" style={{ animationDelay: `${index * 0.03}s` }}>
                  <div className="flex items-center gap-2 mb-2">
                    <service.icon className="w-4 h-4 text-orange-400" />
                    <h4 className="font-medium text-slate-200 text-sm">{service.name}</h4>
                  </div>
                  <p className="text-xs text-slate-400">{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Library Timings */}
          <div className="glass-dark rounded-2xl p-5">
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-400" />
              Library Timings
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                <p className="text-lg font-bold text-green-400">8:00 AM - 8:00 PM</p>
                <p className="text-sm text-slate-400">Monday - Friday</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                <p className="text-lg font-bold text-blue-400">9:00 AM - 5:00 PM</p>
                <p className="text-sm text-slate-400">Saturday</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                <p className="text-lg font-bold text-purple-400">24/7 Access</p>
                <p className="text-sm text-slate-400">E-Resources (Knimbus)</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="glass-dark rounded-2xl p-5">
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-cyan-400" />
              Library Contact
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-slate-400" />
                <span className="text-slate-300">0427-2345766</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="text-slate-300">library@periyaruniversity.ac.in</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span className="text-slate-300">Central Library, Main Campus</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Physical Books Tab */}
      {activeTab === "physical" && (
        <div className="space-y-4">
          <div className="glass-dark rounded-2xl p-4">
            <p className="text-sm text-slate-400">
              Showing {filteredBooks.length} of {libraryBooks?.length || 0} books
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
            </p>
          </div>

          <div className="grid gap-3">
            {filteredBooks.map((book, index) => (
              <div
                key={book.id}
                className="glass-dark rounded-xl p-4 flex items-center gap-4 animate-in"
                style={{ animationDelay: `${index * 0.02}s` }}
              >
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                  book.available ? "bg-green-500/20" : "bg-red-500/20"
                )}>
                  <Book className={cn("w-5 h-5", book.available ? "text-green-400" : "text-red-400")} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-slate-200 truncate">{book.title}</h4>
                  <p className="text-sm text-slate-400">{book.author}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs">
                    <span className="text-slate-500">{book.category}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-slate-500">{book.location}</span>
                    {book.isbn && (
                      <>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-500">ISBN: {book.isbn}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium",
                  book.available ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                )}>
                  {book.available ? "Available" : "Borrowed"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Collections Tab */}
      {activeTab === "collections" && (
        <div className="space-y-4">
          <div className="glass-dark rounded-2xl p-5 mb-4">
            <h3 className="font-semibold text-slate-100 mb-2 flex items-center gap-2">
              <Library className="w-5 h-5 text-purple-400" />
              Department-wise Library Collections
            </h3>
            <p className="text-sm text-slate-400">Browse our extensive collection organized by academic departments</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {libraryCollections?.map((collection, index) => {
              const IconComponent = iconMap[collection.icon_name || "BookOpen"] || BookOpen;
              return (
                <div
                  key={collection.id}
                  className="glass-dark rounded-xl p-5 animate-in"
                  style={{ animationDelay: `${index * 0.03}s` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-200">{collection.department}</h4>
                      <p className="text-xs text-slate-400">{collection.location}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div>
                      <p className="text-lg font-bold text-orange-400">{collection.total_books?.toLocaleString()}</p>
                      <p className="text-xs text-slate-500">Books</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-blue-400">{collection.journals}</p>
                      <p className="text-xs text-slate-500">Journals</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-green-400">{collection.e_books?.toLocaleString()}</p>
                      <p className="text-xs text-slate-500">E-Books</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-pink-400">{collection.theses}</p>
                      <p className="text-xs text-slate-500">Theses</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Membership Tab */}
      {activeTab === "membership" && (
        <div className="space-y-6">
          <div className="glass-dark rounded-2xl p-5">
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-green-400" />
              Membership Types & Benefits
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {membershipTypes.map((membership, index) => (
                <div
                  key={membership.type}
                  className="bg-slate-800/50 rounded-xl p-5 animate-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <h4 className="font-semibold text-slate-100 mb-3">{membership.type}</h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-slate-400">
                      <span className="text-slate-500">Eligibility:</span> {membership.eligibility}
                    </p>
                    <p className="text-slate-400">
                      <span className="text-slate-500">Borrow Limit:</span> {membership.borrowLimit}
                    </p>
                    <p className="text-slate-400">
                      <span className="text-slate-500">Duration:</span> {membership.duration}
                    </p>
                    <p className="text-slate-400">
                      <span className="text-slate-500">Renewals:</span> {membership.renewals}
                    </p>
                    <p className="text-green-400 font-medium">
                      <span className="text-slate-500">Fee:</span> {membership.fee}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-700">
                    <p className="text-xs text-slate-500 mb-2">Benefits:</p>
                    <div className="flex flex-wrap gap-1">
                      {membership.features.map((feature) => (
                        <span key={feature} className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fines & Rules */}
          <div className="glass-dark rounded-2xl p-5">
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-red-400" />
              Library Rules & Fine Structure
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-slate-200 mb-3">Fine Structure</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>• Overdue fine: ₹1 per day per book</li>
                  <li>• Lost book: Replacement cost + 25% processing fee</li>
                  <li>• Damaged book: As assessed by librarian</li>
                  <li>• Maximum fine cap: ₹100 per book</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-slate-200 mb-3">General Rules</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>• Valid ID card required for entry</li>
                  <li>• Maintain silence in reading areas</li>
                  <li>• No food or beverages allowed</li>
                  <li>• Personal belongings at counter</li>
                  <li>• Books must be returned in good condition</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LibraryCatalog;

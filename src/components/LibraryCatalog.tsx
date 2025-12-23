import { useState, useMemo } from "react";
import { 
  Search, 
  Book, 
  Globe, 
  ExternalLink, 
  FileText, 
  BookOpen,
  Database,
  Filter,
  Clock,
  Users,
  Phone,
  Mail,
  Headphones,
  Download,
  Video,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Physical Books Data - Representing library collection
const physicalBooks = [
  { id: 1, title: "Advanced Engineering Mathematics", author: "Erwin Kreyszig", category: "Mathematics", available: true, location: "Section A-12" },
  { id: 2, title: "Principles of Economics", author: "N. Gregory Mankiw", category: "Economics", available: true, location: "Section B-05" },
  { id: 3, title: "Organic Chemistry", author: "Morrison & Boyd", category: "Chemistry", available: false, location: "Section C-08" },
  { id: 4, title: "Data Structures and Algorithms", author: "Cormen et al.", category: "Computer Science", available: true, location: "Section D-15" },
  { id: 5, title: "Indian Constitution", author: "M. Laxmikanth", category: "Political Science", available: true, location: "Section E-03" },
  { id: 6, title: "Molecular Biology of the Cell", author: "Alberts et al.", category: "Biology", available: false, location: "Section C-11" },
  { id: 7, title: "Fundamentals of Physics", author: "Halliday & Resnick", category: "Physics", available: true, location: "Section A-07" },
  { id: 8, title: "Management Principles", author: "Peter Drucker", category: "Management", available: true, location: "Section B-09" },
  { id: 9, title: "Tamil Literature", author: "Various Authors", category: "Tamil", available: true, location: "Section F-02" },
  { id: 10, title: "Environmental Science", author: "Anubha Kaushik", category: "Environmental Science", available: true, location: "Section G-01" },
];

// Digital Resources Data - From official library website
const digitalResources = [
  { id: 1, title: "E-BOOKS", description: "Access digital books across various disciplines", url: "https://www.periyaruniversity.ac.in/Library_Home/ebooks.html", type: "E-Books", icon: Book },
  { id: 2, title: "E-Theses and Dissertations", description: "ShodhGanga repository of Indian theses and dissertations", url: "https://shodhganga.inflibnet.ac.in/handle/10603/2100", type: "Repository", icon: GraduationCap },
  { id: 3, title: "Digital Repository", description: "University's institutional digital repository", url: "https://www.periyaruniversity.ac.in/Library_Home/digirep.html", type: "Repository", icon: Database },
  { id: 4, title: "UGC-INFONET Digital Library", description: "UGC-INFONET consortium for e-resources", url: "https://www.periyaruniversity.ac.in/Library_Home/ugc.html", type: "Portal", icon: Globe },
  { id: 5, title: "DELNET", description: "Developing Library Network for resource sharing and discovery", url: "https://discovery.delnet.in/", type: "Network", icon: Database },
  { id: 6, title: "NPTEL", description: "National Programme on Technology Enhanced Learning", url: "https://nptel.ac.in/", type: "E-Learning", icon: Video },
  { id: 7, title: "WebOPAC", description: "Online Public Access Catalog - Search library holdings", url: "http://14.139.186.90:8081/", type: "Catalog", icon: Search },
  { id: 8, title: "Remote Access", description: "Knimbus platform for remote e-resource access", url: "https://periyaruniversity.new.knimbus.com/user#/home", type: "Portal", icon: Globe },
  { id: 9, title: "Quillbot", description: "AI-powered writing and grammar tool", url: "https://quillbot.com/", type: "Tool", icon: FileText },
  { id: 10, title: "Common Wealth of Learning", description: "Open educational resources from COL", url: "https://www.col.org/", type: "E-Learning", icon: BookOpen },
  { id: 11, title: "N-LIST", description: "National Library and Information Services Infrastructure for Scholarly Content", url: "https://nlist.inflibnet.ac.in/", type: "Database", icon: Database },
  { id: 12, title: "Library Brochure", description: "Download library information brochure (PDF)", url: "https://www.periyaruniversity.ac.in/Documents/2021/Library.pdf", type: "Document", icon: Download },
];

const categories = ["All", "Mathematics", "Computer Science", "Physics", "Chemistry", "Biology", "Economics", "Management", "Political Science", "Tamil", "Environmental Science"];

export const LibraryCatalog = () => {
  const [activeTab, setActiveTab] = useState<"physical" | "digital">("digital");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBooks = useMemo(() => {
    return physicalBooks.filter((book) => {
      const matchesSearch = 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const filteredResources = useMemo(() => {
    return digitalResources.filter((resource) =>
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2">University Library</h1>
        <p className="text-slate-400">Periyar University Library - Established 1997</p>
      </div>

      {/* Library Stats */}
      <div className="glass-dark rounded-2xl p-5 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-orange-400">98,482</p>
            <p className="text-sm text-slate-400">Volumes</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-400">124</p>
            <p className="text-sm text-slate-400">Journals</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-400">13</p>
            <p className="text-sm text-slate-400">Newspapers</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-400">Open</p>
            <p className="text-sm text-slate-400">Access System</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
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
          Digital E-Resources
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
          Physical Books
        </button>
      </div>

      {/* Search Bar */}
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
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-12 pr-8 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/50 appearance-none cursor-pointer min-w-[180px]"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-slate-900">
                  {cat}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Content */}
      {activeTab === "physical" ? (
        <div className="grid gap-4">
          {filteredBooks.length === 0 ? (
            <div className="text-center py-12 glass-dark rounded-2xl">
              <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">No books found matching your search</p>
            </div>
          ) : (
            filteredBooks.map((book, index) => (
              <div
                key={book.id}
                className="glass-dark rounded-xl p-4 flex items-center gap-4 hover:border-orange-500/30 transition-all animate-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <Book className="w-6 h-6 text-orange-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-100 truncate">{book.title}</h3>
                  <p className="text-sm text-slate-400">{book.author}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                      {book.category}
                    </span>
                    <span className="text-xs text-slate-500">{book.location}</span>
                  </div>
                </div>
                <div className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium",
                  book.available
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                )}>
                  {book.available ? "Available" : "Borrowed"}
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filteredResources.length === 0 ? (
            <div className="text-center py-12 glass-dark rounded-2xl md:col-span-2">
              <Database className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">No resources found matching your search</p>
            </div>
          ) : (
            filteredResources.map((resource, index) => {
              const IconComponent = resource.icon;
              return (
                <a
                  key={resource.id}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-dark rounded-xl p-5 hover:border-blue-500/30 transition-all group animate-in block"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-100 group-hover:text-blue-400 transition-colors">
                          {resource.title}
                        </h3>
                        <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                      </div>
                      <p className="text-sm text-slate-400 mt-1">{resource.description}</p>
                      <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 mt-2">
                        {resource.type}
                      </span>
                    </div>
                  </div>
                </a>
              );
            })
          )}
        </div>
      )}

      {/* Library Vision & Mission */}
      <div className="mt-8 grid md:grid-cols-2 gap-4">
        <div className="glass-dark rounded-2xl p-6">
          <h3 className="font-semibold text-slate-100 mb-3 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-orange-400" />
            Vision
          </h3>
          <p className="text-sm text-slate-400">
            To develop the University Library a vibrant Resource Centre for supporting academics and 
            research communities ensuring a knowledgeable and prosperous society.
          </p>
        </div>
        <div className="glass-dark rounded-2xl p-6">
          <h3 className="font-semibold text-slate-100 mb-3 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            Mission
          </h3>
          <ul className="text-sm text-slate-400 space-y-1">
            <li>• Support educational and research programmes</li>
            <li>• Provide value added services to users</li>
            <li>• Develop Institutional Repositories</li>
            <li>• Introduce new technologies in the Library</li>
          </ul>
        </div>
      </div>

      {/* Library Sections */}
      <div className="mt-6 glass-dark rounded-2xl p-6">
        <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-purple-400" />
          Library Sections
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            "Reference Section",
            "Text Book Section",
            "Competitive Exam Books",
            "Theses & Dissertations",
            "Back Volumes Section",
            "Reprographic Section",
            "Question Banks",
            "Digital Library"
          ].map((section) => (
            <span
              key={section}
              className="text-sm px-3 py-1.5 rounded-full bg-slate-800/50 text-slate-300"
            >
              {section}
            </span>
          ))}
        </div>
      </div>

      {/* Library Info */}
      <div className="mt-6 glass-dark rounded-2xl p-6">
        <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-orange-400" />
          Library Information
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-slate-400 mb-1">Services For</p>
            <p className="text-slate-200">• P.G. Students</p>
            <p className="text-slate-200">• M.Phil. Scholars</p>
            <p className="text-slate-200">• Ph.D. Scholars</p>
            <p className="text-slate-200">• Faculty Members</p>
            <p className="text-slate-200">• Affiliated College Students</p>
          </div>
          <div>
            <p className="text-slate-400 mb-1">Borrowing Limit</p>
            <p className="text-slate-200">UG Students: 3 books (14 days)</p>
            <p className="text-slate-200">PG Students: 5 books (21 days)</p>
            <p className="text-slate-200">Research Scholars: 8 books (30 days)</p>
          </div>
          <div>
            <p className="text-slate-400 mb-1">Quick Links</p>
            <a
              href="https://www.periyaruniversity.ac.in/Library_Home/home.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              Library Home <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://www.periyaruniversity.ac.in/Library_Home/services.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              Services <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://www.periyaruniversity.ac.in/Library_Home/contact.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              Contact <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryCatalog;

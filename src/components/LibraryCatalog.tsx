import { useState, useMemo } from "react";
import { 
  Search, 
  Book, 
  Globe, 
  ExternalLink, 
  FileText, 
  Download,
  BookOpen,
  Database,
  Filter
} from "lucide-react";
import { cn } from "@/lib/utils";

// Physical Books Data
const physicalBooks = [
  { id: 1, title: "Advanced Engineering Mathematics", author: "Erwin Kreyszig", category: "Mathematics", available: true, location: "Section A-12" },
  { id: 2, title: "Principles of Economics", author: "N. Gregory Mankiw", category: "Economics", available: true, location: "Section B-05" },
  { id: 3, title: "Organic Chemistry", author: "Morrison & Boyd", category: "Chemistry", available: false, location: "Section C-08" },
  { id: 4, title: "Data Structures and Algorithms", author: "Cormen et al.", category: "Computer Science", available: true, location: "Section D-15" },
  { id: 5, title: "Indian Constitution", author: "M. Laxmikanth", category: "Political Science", available: true, location: "Section E-03" },
  { id: 6, title: "Molecular Biology of the Cell", author: "Alberts et al.", category: "Biology", available: false, location: "Section C-11" },
  { id: 7, title: "Fundamentals of Physics", author: "Halliday & Resnick", category: "Physics", available: true, location: "Section A-07" },
  { id: 8, title: "Management Principles", author: "Peter Drucker", category: "Management", available: true, location: "Section B-09" },
];

// Digital Resources Data
const digitalResources = [
  { id: 1, title: "N-LIST", description: "National Library and Information Services Infrastructure for Scholarly Content", url: "https://nlist.inflibnet.ac.in/", type: "Database" },
  { id: 2, title: "DELNET", description: "Developing Library Network - Inter-library loan and document delivery", url: "https://delnet.in/", type: "Network" },
  { id: 3, title: "INFLIBNET", description: "Information and Library Network Centre", url: "https://www.inflibnet.ac.in/", type: "Portal" },
  { id: 4, title: "NDL India", description: "National Digital Library of India - Million+ resources", url: "https://ndl.iitkgp.ac.in/", type: "Library" },
  { id: 5, title: "JSTOR", description: "Digital library of academic journals, books, and primary sources", url: "https://www.jstor.org/", type: "Database" },
  { id: 6, title: "IEEE Xplore", description: "Scientific and technical content published by IEEE", url: "https://ieeexplore.ieee.org/", type: "Database" },
  { id: 7, title: "ShodhGanga", description: "Reservoir of Indian theses and dissertations", url: "https://shodhganga.inflibnet.ac.in/", type: "Repository" },
  { id: 8, title: "e-PG Pathshala", description: "MHRD e-learning initiative for postgraduate courses", url: "https://epgp.inflibnet.ac.in/", type: "E-Learning" },
];

const categories = ["All", "Mathematics", "Computer Science", "Physics", "Chemistry", "Biology", "Economics", "Management", "Political Science"];

export const LibraryCatalog = () => {
  const [activeTab, setActiveTab] = useState<"physical" | "digital">("physical");
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
        <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2">Library Catalog</h1>
        <p className="text-slate-400">Access physical books and digital e-resources</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
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
            filteredResources.map((resource, index) => (
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
                    {resource.type === "Database" ? (
                      <Database className="w-6 h-6 text-blue-400" />
                    ) : resource.type === "E-Learning" ? (
                      <BookOpen className="w-6 h-6 text-blue-400" />
                    ) : resource.type === "Repository" ? (
                      <FileText className="w-6 h-6 text-blue-400" />
                    ) : (
                      <Globe className="w-6 h-6 text-blue-400" />
                    )}
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
            ))
          )}
        </div>
      )}

      {/* Library Info */}
      <div className="mt-8 glass-dark rounded-2xl p-6">
        <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-orange-400" />
          Library Information
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-slate-400 mb-1">Timings</p>
            <p className="text-slate-200">Mon-Sat: 8:00 AM - 8:00 PM</p>
            <p className="text-slate-200">Sun: 10:00 AM - 5:00 PM</p>
          </div>
          <div>
            <p className="text-slate-400 mb-1">Borrowing Limit</p>
            <p className="text-slate-200">UG Students: 3 books (14 days)</p>
            <p className="text-slate-200">PG Students: 5 books (21 days)</p>
          </div>
          <div>
            <p className="text-slate-400 mb-1">Contact</p>
            <p className="text-slate-200">library@periyaruniversity.ac.in</p>
            <p className="text-slate-200">+91 4294 226 000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryCatalog;
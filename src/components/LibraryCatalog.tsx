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
  CreditCard,
  Calendar,
  MapPin,
  Award,
  Library,
  Newspaper,
  ScrollText,
  Bookmark,
  CheckCircle,
  Info,
  FlaskConical,
  Atom,
  Brain,
  Calculator,
  Briefcase,
  Languages,
  Leaf,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Department-wise Physical Books Data (Extensive collection)
const physicalBooks = [
  // Computer Science & Data Science - 50+ books
  { id: 1, title: "Introduction to Algorithms", author: "Cormen, Leiserson, Rivest", category: "Computer Science", available: true, location: "CS-01", isbn: "978-0262033848" },
  { id: 2, title: "Data Structures and Algorithms in Java", author: "Robert Lafore", category: "Computer Science", available: true, location: "CS-02", isbn: "978-0672324536" },
  { id: 3, title: "Computer Networks", author: "Andrew S. Tanenbaum", category: "Computer Science", available: true, location: "CS-03", isbn: "978-0132126953" },
  { id: 4, title: "Operating System Concepts", author: "Silberschatz, Galvin", category: "Computer Science", available: false, location: "CS-04", isbn: "978-1119800361" },
  { id: 5, title: "Database System Concepts", author: "Silberschatz, Korth", category: "Computer Science", available: true, location: "CS-05", isbn: "978-0078022159" },
  { id: 6, title: "Compiler Design", author: "Alfred V. Aho", category: "Computer Science", available: true, location: "CS-06", isbn: "978-0321486813" },
  { id: 7, title: "Software Engineering", author: "Roger S. Pressman", category: "Computer Science", available: true, location: "CS-07", isbn: "978-0078022128" },
  { id: 8, title: "Artificial Intelligence: A Modern Approach", author: "Stuart Russell, Peter Norvig", category: "Computer Science", available: true, location: "CS-08", isbn: "978-0136042594" },
  { id: 9, title: "Computer Organization and Architecture", author: "William Stallings", category: "Computer Science", available: false, location: "CS-09", isbn: "978-0134101613" },
  { id: 10, title: "Theory of Computation", author: "Michael Sipser", category: "Computer Science", available: true, location: "CS-10", isbn: "978-1133187790" },
  
  // Data Science & Machine Learning
  { id: 11, title: "Machine Learning", author: "Tom M. Mitchell", category: "Data Science", available: true, location: "DS-01", isbn: "978-0070428072" },
  { id: 12, title: "Deep Learning", author: "Ian Goodfellow", category: "Data Science", available: false, location: "DS-02", isbn: "978-0262035613" },
  { id: 13, title: "Python for Data Analysis", author: "Wes McKinney", category: "Data Science", available: true, location: "DS-03", isbn: "978-1491957660" },
  { id: 14, title: "Pattern Recognition and Machine Learning", author: "Christopher Bishop", category: "Data Science", available: true, location: "DS-04", isbn: "978-0387310732" },
  { id: 15, title: "Hands-On Machine Learning with Scikit-Learn", author: "Aurélien Géron", category: "Data Science", available: true, location: "DS-05", isbn: "978-1492032649" },
  { id: 16, title: "Data Mining: Concepts and Techniques", author: "Jiawei Han", category: "Data Science", available: true, location: "DS-06", isbn: "978-0123814791" },
  { id: 17, title: "Big Data Analytics", author: "Frank J. Ohlhorst", category: "Data Science", available: true, location: "DS-07", isbn: "978-1118147603" },
  { id: 18, title: "R for Data Science", author: "Hadley Wickham", category: "Data Science", available: true, location: "DS-08", isbn: "978-1491910399" },
  
  // Mathematics & Statistics
  { id: 19, title: "Advanced Engineering Mathematics", author: "Erwin Kreyszig", category: "Mathematics", available: true, location: "MA-01", isbn: "978-0470458365" },
  { id: 20, title: "Linear Algebra and Its Applications", author: "Gilbert Strang", category: "Mathematics", available: true, location: "MA-02", isbn: "978-0030105678" },
  { id: 21, title: "Probability and Statistics", author: "Morris H. DeGroot", category: "Mathematics", available: true, location: "MA-03", isbn: "978-0321500465" },
  { id: 22, title: "Discrete Mathematics", author: "Kenneth H. Rosen", category: "Mathematics", available: true, location: "MA-04", isbn: "978-0073383095" },
  { id: 23, title: "Real Analysis", author: "H.L. Royden", category: "Mathematics", available: false, location: "MA-05", isbn: "978-0131437470" },
  { id: 24, title: "Complex Analysis", author: "Lars Ahlfors", category: "Mathematics", available: true, location: "MA-06", isbn: "978-0070006577" },
  { id: 25, title: "Numerical Methods", author: "S.S. Sastry", category: "Mathematics", available: true, location: "MA-07", isbn: "978-8120327672" },
  { id: 26, title: "Operations Research", author: "Hamdy A. Taha", category: "Mathematics", available: true, location: "MA-08", isbn: "978-0132555937" },
  
  // Physics
  { id: 27, title: "Fundamentals of Physics", author: "Halliday & Resnick", category: "Physics", available: true, location: "PH-01", isbn: "978-1118230718" },
  { id: 28, title: "Classical Mechanics", author: "Herbert Goldstein", category: "Physics", available: true, location: "PH-02", isbn: "978-0201657029" },
  { id: 29, title: "Quantum Mechanics", author: "David J. Griffiths", category: "Physics", available: false, location: "PH-03", isbn: "978-1107189638" },
  { id: 30, title: "Electrodynamics", author: "David J. Griffiths", category: "Physics", available: true, location: "PH-04", isbn: "978-1108420419" },
  { id: 31, title: "Statistical Mechanics", author: "R.K. Pathria", category: "Physics", available: true, location: "PH-05", isbn: "978-0123821881" },
  { id: 32, title: "Solid State Physics", author: "Charles Kittel", category: "Physics", available: true, location: "PH-06", isbn: "978-0471415268" },
  { id: 33, title: "Nuclear Physics", author: "D.C. Tayal", category: "Physics", available: true, location: "PH-07", isbn: "978-8120324008" },
  { id: 34, title: "Optics", author: "Eugene Hecht", category: "Physics", available: true, location: "PH-08", isbn: "978-0133977226" },
  
  // Chemistry
  { id: 35, title: "Organic Chemistry", author: "Morrison & Boyd", category: "Chemistry", available: false, location: "CH-01", isbn: "978-0136436690" },
  { id: 36, title: "Inorganic Chemistry", author: "J.D. Lee", category: "Chemistry", available: true, location: "CH-02", isbn: "978-8175963566" },
  { id: 37, title: "Physical Chemistry", author: "Peter Atkins", category: "Chemistry", available: true, location: "CH-03", isbn: "978-0199697403" },
  { id: 38, title: "Analytical Chemistry", author: "Gary D. Christian", category: "Chemistry", available: true, location: "CH-04", isbn: "978-0470887578" },
  { id: 39, title: "Spectroscopy", author: "Pavia, Lampman", category: "Chemistry", available: true, location: "CH-05", isbn: "978-1285460239" },
  { id: 40, title: "Polymer Chemistry", author: "Paul C. Hiemenz", category: "Chemistry", available: true, location: "CH-06", isbn: "978-1574447798" },
  
  // Biology & Biotechnology
  { id: 41, title: "Molecular Biology of the Cell", author: "Alberts et al.", category: "Biology", available: false, location: "BI-01", isbn: "978-0815344322" },
  { id: 42, title: "Lehninger Principles of Biochemistry", author: "Nelson & Cox", category: "Biochemistry", available: true, location: "BC-01", isbn: "978-1464126116" },
  { id: 43, title: "Microbiology", author: "Prescott, Harley", category: "Microbiology", available: true, location: "MB-01", isbn: "978-0073375267" },
  { id: 44, title: "Biotechnology", author: "B.D. Singh", category: "Biotechnology", available: true, location: "BT-01", isbn: "978-8120346734" },
  { id: 45, title: "Genetics", author: "Benjamin Pierce", category: "Biotechnology", available: true, location: "BT-02", isbn: "978-1319050962" },
  { id: 46, title: "Immunology", author: "Kuby", category: "Biotechnology", available: true, location: "BT-03", isbn: "978-1464189784" },
  { id: 47, title: "Plant Physiology", author: "Taiz & Zeiger", category: "Botany", available: true, location: "BO-01", isbn: "978-1605352558" },
  { id: 48, title: "Zoology", author: "Miller & Harley", category: "Zoology", available: true, location: "ZO-01", isbn: "978-0073524177" },
  
  // Commerce & Management
  { id: 49, title: "Principles of Economics", author: "N. Gregory Mankiw", category: "Economics", available: true, location: "EC-01", isbn: "978-1305585126" },
  { id: 50, title: "Financial Management", author: "I.M. Pandey", category: "Commerce", available: true, location: "CO-01", isbn: "978-9325982383" },
  { id: 51, title: "Cost Accounting", author: "S.N. Maheshwari", category: "Commerce", available: true, location: "CO-02", isbn: "978-9325976658" },
  { id: 52, title: "Management Accounting", author: "R.S.N. Pillai", category: "Commerce", available: true, location: "CO-03", isbn: "978-8121903585" },
  { id: 53, title: "Business Statistics", author: "S.P. Gupta", category: "Commerce", available: true, location: "CO-04", isbn: "978-8121903592" },
  { id: 54, title: "Marketing Management", author: "Philip Kotler", category: "Management", available: true, location: "MG-01", isbn: "978-0134149530" },
  { id: 55, title: "Human Resource Management", author: "Gary Dessler", category: "Management", available: true, location: "MG-02", isbn: "978-0134235455" },
  { id: 56, title: "Operations Management", author: "William J. Stevenson", category: "Management", available: true, location: "MG-03", isbn: "978-1259667473" },
  { id: 57, title: "Strategic Management", author: "Fred R. David", category: "Management", available: false, location: "MG-04", isbn: "978-0134167848" },
  { id: 58, title: "Organizational Behavior", author: "Stephen P. Robbins", category: "Management", available: true, location: "MG-05", isbn: "978-0134729329" },
  
  // Social Sciences
  { id: 59, title: "Indian Constitution", author: "M. Laxmikanth", category: "Political Science", available: true, location: "PS-01", isbn: "978-9352807086" },
  { id: 60, title: "Introduction to Psychology", author: "Morgan & King", category: "Psychology", available: true, location: "PY-01", isbn: "978-0070434233" },
  { id: 61, title: "Sociology", author: "Anthony Giddens", category: "Sociology", available: true, location: "SO-01", isbn: "978-0745696683" },
  { id: 62, title: "History of Modern India", author: "Bipan Chandra", category: "History", available: true, location: "HI-01", isbn: "978-9352600335" },
  { id: 63, title: "Mass Communication", author: "Keval J. Kumar", category: "Journalism", available: true, location: "JM-01", isbn: "978-8175967038" },
  
  // Environmental & Energy Sciences
  { id: 64, title: "Environmental Science", author: "Anubha Kaushik", category: "Environmental Science", available: true, location: "EV-01", isbn: "978-8122421774" },
  { id: 65, title: "Environmental Chemistry", author: "A.K. De", category: "Environmental Science", available: true, location: "EV-02", isbn: "978-8122418781" },
  { id: 66, title: "Renewable Energy Resources", author: "John Twidell", category: "Energy Science", available: true, location: "EN-01", isbn: "978-0415584388" },
  { id: 67, title: "Solar Energy", author: "S.P. Sukhatme", category: "Energy Science", available: true, location: "EN-02", isbn: "978-0070260641" },
  
  // Geology
  { id: 68, title: "Principles of Physical Geology", author: "Arthur Holmes", category: "Geology", available: true, location: "GE-01", isbn: "978-0748743810" },
  { id: 69, title: "Mineralogy", author: "Cornelis Klein", category: "Geology", available: true, location: "GE-02", isbn: "978-0471460039" },
  { id: 70, title: "Structural Geology", author: "Marland P. Billings", category: "Geology", available: true, location: "GE-03", isbn: "978-0130834171" },
  
  // Languages & Literature
  { id: 71, title: "English Grammar", author: "Wren & Martin", category: "English", available: true, location: "EN-01", isbn: "978-9352530144" },
  { id: 72, title: "Literary Criticism", author: "M.H. Abrams", category: "English", available: true, location: "EN-02", isbn: "978-1285465067" },
  { id: 73, title: "Tamil Literature", author: "Various Authors", category: "Tamil", available: true, location: "TA-01", isbn: "N/A" },
  { id: 74, title: "Sangam Literature", author: "K.A. Nilakanta Sastri", category: "Tamil", available: true, location: "TA-02", isbn: "N/A" },
  
  // Food Science & Nutrition
  { id: 75, title: "Food Science", author: "B. Srilakshmi", category: "Food Science", available: true, location: "FS-01", isbn: "978-8122433432" },
  { id: 76, title: "Nutrition and Dietetics", author: "Srilakshmi B.", category: "Nutrition", available: true, location: "NU-01", isbn: "978-8122425604" },
  { id: 77, title: "Food Microbiology", author: "William C. Frazier", category: "Food Science", available: true, location: "FS-02", isbn: "978-0071254427" },
  
  // Library Science
  { id: 78, title: "Library Classification", author: "S.R. Ranganathan", category: "Library Science", available: true, location: "LS-01", isbn: "N/A" },
  { id: 79, title: "Cataloguing Theory", author: "S.R. Ranganathan", category: "Library Science", available: true, location: "LS-02", isbn: "N/A" },
  { id: 80, title: "Digital Library Management", author: "Terry Kuny", category: "Library Science", available: true, location: "LS-03", isbn: "978-0838984857" },
];

// Enhanced Digital Resources
const digitalResources = [
  { id: 1, title: "E-BOOKS Collection", description: "Access 50,000+ digital books across various disciplines", url: "https://www.periyaruniversity.ac.in/Library_Home/ebooks.html", type: "E-Books", icon: Book },
  { id: 2, title: "E-Theses and Dissertations", description: "ShodhGanga repository with 10,000+ Indian theses", url: "https://shodhganga.inflibnet.ac.in/handle/10603/2100", type: "Repository", icon: GraduationCap },
  { id: 3, title: "Digital Repository", description: "University's institutional repository with research papers", url: "https://www.periyaruniversity.ac.in/Library_Home/digirep.html", type: "Repository", icon: Database },
  { id: 4, title: "UGC-INFONET Digital Library", description: "UGC-INFONET consortium for 6,000+ e-journals", url: "https://www.periyaruniversity.ac.in/Library_Home/ugc.html", type: "Portal", icon: Globe },
  { id: 5, title: "DELNET", description: "Developing Library Network for inter-library resource sharing", url: "https://discovery.delnet.in/", type: "Network", icon: Database },
  { id: 6, title: "NPTEL", description: "7,000+ video lectures from IITs and IISc", url: "https://nptel.ac.in/", type: "E-Learning", icon: Video },
  { id: 7, title: "WebOPAC", description: "Online catalog - Search 98,000+ library holdings", url: "http://14.139.186.90:8081/", type: "Catalog", icon: Search },
  { id: 8, title: "Remote Access (Knimbus)", description: "24/7 remote access to all e-resources from anywhere", url: "https://periyaruniversity.new.knimbus.com/user#/home", type: "Portal", icon: Globe },
  { id: 9, title: "IEEE Xplore", description: "Access to IEEE journals, conferences, and standards", url: "https://ieeexplore.ieee.org/", type: "Database", icon: FileText },
  { id: 10, title: "Science Direct", description: "Elsevier's leading platform for peer-reviewed literature", url: "https://www.sciencedirect.com/", type: "Database", icon: FlaskConical },
  { id: 11, title: "JSTOR", description: "Digital library of academic journals and books", url: "https://www.jstor.org/", type: "Database", icon: BookOpen },
  { id: 12, title: "N-LIST", description: "National Library and Information Services - 6,000+ e-journals", url: "https://nlist.inflibnet.ac.in/", type: "Database", icon: Database },
  { id: 13, title: "Quillbot", description: "AI-powered writing, paraphrasing, and grammar tool", url: "https://quillbot.com/", type: "Tool", icon: FileText },
  { id: 14, title: "Grammarly", description: "Writing assistant for grammar and plagiarism check", url: "https://www.grammarly.com/", type: "Tool", icon: CheckCircle },
  { id: 15, title: "Library Brochure", description: "Download complete library information (PDF)", url: "https://www.periyaruniversity.ac.in/Documents/2021/Library.pdf", type: "Document", icon: Download },
];

// Department-wise Book Collections
const departmentCollections = [
  { department: "Computer Science", icon: Calculator, books: 12500, journals: 45, eBooks: 8000, theses: 450, location: "Block D, Floor 2" },
  { department: "Data Science & AI", icon: Brain, books: 3500, journals: 25, eBooks: 5000, theses: 120, location: "Block D, Floor 2" },
  { department: "Mathematics & Statistics", icon: Calculator, books: 8500, journals: 32, eBooks: 4500, theses: 380, location: "Block A, Floor 1" },
  { department: "Physics", icon: Atom, books: 7500, journals: 28, eBooks: 3500, theses: 320, location: "Block A, Floor 1" },
  { department: "Chemistry", icon: FlaskConical, books: 6800, journals: 30, eBooks: 3200, theses: 290, location: "Block C, Floor 1" },
  { department: "Biology & Biotechnology", icon: Leaf, books: 8200, journals: 35, eBooks: 4000, theses: 340, location: "Block C, Floor 2" },
  { department: "Biochemistry", icon: FlaskConical, books: 4500, journals: 22, eBooks: 2500, theses: 180, location: "Block C, Floor 1" },
  { department: "Microbiology", icon: FlaskConical, books: 3800, journals: 18, eBooks: 2200, theses: 150, location: "Block C, Floor 2" },
  { department: "Environmental Science", icon: Leaf, books: 3200, journals: 15, eBooks: 1800, theses: 120, location: "Block G, Floor 1" },
  { department: "Geology", icon: Globe, books: 2800, journals: 12, eBooks: 1500, theses: 90, location: "Block A, Floor 2" },
  { department: "Commerce & Management", icon: Briefcase, books: 10000, journals: 22, eBooks: 4000, theses: 420, location: "Block B, Floor 1" },
  { department: "Economics", icon: Briefcase, books: 5500, journals: 18, eBooks: 2500, theses: 210, location: "Block B, Floor 1" },
  { department: "English", icon: Languages, books: 8500, journals: 15, eBooks: 2000, theses: 280, location: "Block F, Floor 1" },
  { department: "Tamil", icon: Languages, books: 12000, journals: 12, eBooks: 1500, theses: 350, location: "Block F, Floor 2" },
  { department: "History", icon: BookOpen, books: 6500, journals: 10, eBooks: 1200, theses: 180, location: "Block E, Floor 1" },
  { department: "Psychology", icon: Brain, books: 4200, journals: 15, eBooks: 1800, theses: 140, location: "Block E, Floor 2" },
  { department: "Sociology", icon: Users, books: 3800, journals: 12, eBooks: 1500, theses: 120, location: "Block E, Floor 1" },
  { department: "Journalism", icon: Newspaper, books: 2500, journals: 20, eBooks: 1200, theses: 80, location: "Block E, Floor 2" },
  { department: "Education", icon: GraduationCap, books: 5500, journals: 18, eBooks: 2200, theses: 220, location: "Block F, Floor 1" },
  { department: "Food Science & Nutrition", icon: Leaf, books: 2800, journals: 14, eBooks: 1400, theses: 90, location: "Block C, Floor 2" },
  { department: "Library Science", icon: Library, books: 3500, journals: 25, eBooks: 2000, theses: 110, location: "Central Library" },
  { department: "General & Reference", icon: BookOpen, books: 4000, journals: 8, eBooks: 1500, theses: 0, location: "Ground Floor" },
];

// Membership Types
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

// Library Services
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

const categories = [
  "All", 
  "Computer Science", 
  "Data Science", 
  "Mathematics", 
  "Physics", 
  "Chemistry", 
  "Biology", 
  "Biochemistry", 
  "Biotechnology",
  "Microbiology",
  "Botany",
  "Zoology",
  "Economics", 
  "Commerce", 
  "Management", 
  "Political Science", 
  "Psychology", 
  "Sociology",
  "History",
  "Journalism",
  "Tamil", 
  "English",
  "Environmental Science",
  "Energy Science",
  "Geology",
  "Food Science",
  "Nutrition",
  "Library Science"
];

export const LibraryCatalog = () => {
  const [activeTab, setActiveTab] = useState<"physical" | "digital" | "collections" | "membership">("digital");
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
        <p className="text-slate-400">Periyar University Central Library - Established 1997</p>
      </div>

      {/* Library Stats */}
      <div className="glass-dark rounded-2xl p-5 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-orange-400">98,482</p>
            <p className="text-sm text-slate-400">Books</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-400">50,000+</p>
            <p className="text-sm text-slate-400">E-Books</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-400">6,000+</p>
            <p className="text-sm text-slate-400">E-Journals</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-400">124</p>
            <p className="text-sm text-slate-400">Print Journals</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-pink-400">10,000+</p>
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
      )}

      {/* Content */}
      {activeTab === "physical" && (
        <div className="space-y-4">
          <div className="glass-dark rounded-xl p-4 mb-4">
            <p className="text-sm text-slate-400">
              Showing {filteredBooks.length} books {selectedCategory !== "All" && `in ${selectedCategory}`}
            </p>
          </div>
          <div className="grid gap-3">
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
                  style={{ animationDelay: `${index * 0.02}s` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <Book className="w-5 h-5 text-orange-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-slate-100 text-sm truncate">{book.title}</h3>
                    <p className="text-xs text-slate-400">{book.author}</p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                        {book.category}
                      </span>
                      <span className="text-xs text-slate-500">{book.location}</span>
                    </div>
                  </div>
                  <div className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium flex-shrink-0",
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
        </div>
      )}

      {activeTab === "digital" && (
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

      {activeTab === "collections" && (
        <div className="space-y-6">
          {/* Department-wise Collections */}
          <div className="glass-dark rounded-2xl p-6">
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <Library className="w-5 h-5 text-purple-400" />
              Department-wise Book Collections
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {departmentCollections.map((collection, index) => {
                const DeptIcon = collection.icon;
                return (
                  <div 
                    key={collection.department}
                    className="bg-slate-800/50 rounded-xl p-4 animate-in hover:bg-slate-800/70 transition-all"
                    style={{ animationDelay: `${index * 0.03}s` }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <DeptIcon className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-200 text-sm">{collection.department}</h4>
                        <p className="text-xs text-slate-500">{collection.location}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Books</span>
                        <span className="text-orange-400 font-medium">{collection.books.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Journals</span>
                        <span className="text-blue-400 font-medium">{collection.journals}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">E-Books</span>
                        <span className="text-green-400 font-medium">{collection.eBooks.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Theses</span>
                        <span className="text-pink-400 font-medium">{collection.theses}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Library Services */}
          <div className="glass-dark rounded-2xl p-6">
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-orange-400" />
              Library Services
            </h3>
            <div className="grid md:grid-cols-4 gap-4">
              {libraryServices.map((service, index) => {
                const ServiceIcon = service.icon;
                return (
                  <div 
                    key={service.name}
                    className="bg-slate-800/50 rounded-xl p-4 text-center animate-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-3">
                      <ServiceIcon className="w-6 h-6 text-orange-400" />
                    </div>
                    <h4 className="font-medium text-slate-200 text-sm mb-1">{service.name}</h4>
                    <p className="text-xs text-slate-400">{service.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Library Sections */}
          <div className="glass-dark rounded-2xl p-6">
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-400" />
              Library Sections
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { name: "Reference Section", desc: "Encyclopedias, dictionaries, handbooks, and quick reference materials" },
                { name: "Text Book Section", desc: "Course books for all PG and research programs" },
                { name: "Competitive Exam Books", desc: "UPSC, TNPSC, NET, SLET, GATE preparation materials" },
                { name: "Theses & Dissertations", desc: "Complete collection of university research works" },
                { name: "Back Volumes Section", desc: "Archives of journals and periodicals" },
                { name: "Digital Library", desc: "50+ computers with high-speed internet and e-resources" },
                { name: "Question Banks", desc: "Previous year question papers for all programs" },
                { name: "Periodicals Section", desc: "Daily newspapers, magazines, and current journals" },
              ].map((section, index) => (
                <div 
                  key={section.name}
                  className="bg-slate-800/50 rounded-xl p-4 animate-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <h4 className="font-medium text-slate-200 mb-1">{section.name}</h4>
                  <p className="text-sm text-slate-400">{section.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "membership" && (
        <div className="space-y-6">
          {/* Membership Types */}
          <div className="grid md:grid-cols-2 gap-4">
            {membershipTypes.map((member, index) => (
              <div 
                key={member.type}
                className="glass-dark rounded-2xl p-6 animate-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-100">{member.type}</h3>
                    <p className="text-sm text-slate-400">{member.eligibility}</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Book className="w-4 h-4 text-orange-400" />
                    <span className="text-slate-400">Borrow Limit:</span>
                    <span className="text-slate-200">{member.borrowLimit}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className="text-slate-400">Duration:</span>
                    <span className="text-slate-200">{member.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <ScrollText className="w-4 h-4 text-purple-400" />
                    <span className="text-slate-400">Renewals:</span>
                    <span className="text-slate-200">{member.renewals}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CreditCard className="w-4 h-4 text-green-400" />
                    <span className="text-slate-400">Fee:</span>
                    <span className="text-green-400 font-medium">{member.fee}</span>
                  </div>
                </div>

                <div className="border-t border-slate-700/50 pt-4">
                  <p className="text-xs text-slate-500 mb-2">Features:</p>
                  <div className="flex flex-wrap gap-2">
                    {member.features.map((feature) => (
                      <span 
                        key={feature}
                        className="text-xs px-2 py-1 rounded-full bg-slate-800 text-slate-300"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* How to Get Membership */}
          <div className="glass-dark rounded-2xl p-6">
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-400" />
              How to Get Library Membership
            </h3>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { step: 1, title: "Register", desc: "Submit admission receipt at library counter" },
                { step: 2, title: "Photo & ID", desc: "Provide passport photo and ID proof" },
                { step: 3, title: "Get Card", desc: "Receive library membership card" },
                { step: 4, title: "Start Using", desc: "Access all library services" },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-2 font-bold">
                    {item.step}
                  </div>
                  <h4 className="font-medium text-slate-200 mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Library Rules */}
          <div className="glass-dark rounded-2xl p-6">
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-orange-400" />
              Library Rules & Regulations
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Maintain silence in reading areas
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Return books on or before due date
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Carry library card for borrowing
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Handle books and materials with care
                </li>
              </ul>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  No food or drinks inside library
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Mobile phones must be on silent
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Fine: ₹1 per day for overdue books
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Lost books must be replaced or paid for
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Library Vision & Mission - Show on all tabs */}
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

      {/* Contact & Timings */}
      <div className="mt-6 glass-dark rounded-2xl p-6">
        <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-green-400" />
          Library Timings & Contact
        </h3>
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <p className="text-slate-400 mb-2 font-medium">Working Hours</p>
            <p className="text-slate-200">Monday - Friday: 8:00 AM - 8:00 PM</p>
            <p className="text-slate-200">Saturday: 9:00 AM - 5:00 PM</p>
            <p className="text-slate-200">Sunday: 10:00 AM - 4:00 PM</p>
            <p className="text-orange-400 mt-2">E-Resources: 24/7 Access</p>
          </div>
          <div>
            <p className="text-slate-400 mb-2 font-medium">Contact Information</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="text-slate-200">04294-226789</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-green-400" />
                <span className="text-slate-200">library@periyaruniversity.ac.in</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-400" />
                <span className="text-slate-200">Central Library Building, Campus</span>
              </div>
            </div>
          </div>
          <div>
            <p className="text-slate-400 mb-2 font-medium">Quick Links</p>
            <div className="space-y-2">
              <a
                href="https://www.periyaruniversity.ac.in/Library_Home/home.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                Library Home <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="http://14.139.186.90:8081/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                Search OPAC <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://periyaruniversity.new.knimbus.com/user#/home"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                Remote Access <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryCatalog;

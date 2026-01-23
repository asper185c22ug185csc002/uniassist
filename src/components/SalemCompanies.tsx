import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  MapPin, 
  Briefcase, 
  Globe, 
  Users
} from 'lucide-react';

// Companies near Salem for internships
const salemCompanies = [
  {
    name: "Tata Consultancy Services (TCS)",
    location: "Salem IT Park",
    industry: "IT Services",
    internshipTypes: ["Software Development", "Data Analytics", "Cloud Computing"],
    employeeCount: "500+",
    website: "https://www.tcs.com"
  },
  {
    name: "Infosys BPM",
    location: "Coimbatore (60 km from Salem)",
    industry: "Business Process Management",
    internshipTypes: ["Operations", "Finance & Accounting", "Customer Service"],
    employeeCount: "1000+",
    website: "https://www.infosys.com"
  },
  {
    name: "Steel Authority of India (SAIL)",
    location: "Salem Steel Plant",
    industry: "Steel Manufacturing",
    internshipTypes: ["Mechanical Engineering", "Metallurgy", "Quality Control"],
    employeeCount: "5000+",
    website: "https://www.sail.co.in"
  },
  {
    name: "Wipro Technologies",
    location: "Coimbatore (60 km from Salem)",
    industry: "IT Services",
    internshipTypes: ["Software Testing", "Web Development", "AI/ML"],
    employeeCount: "800+",
    website: "https://www.wipro.com"
  },
  {
    name: "Salem Cooperative Spinning Mills",
    location: "Salem",
    industry: "Textile Manufacturing",
    internshipTypes: ["Textile Engineering", "Quality Assurance", "Production"],
    employeeCount: "300+",
    website: "#"
  },
  {
    name: "Apollo Hospitals",
    location: "Salem",
    industry: "Healthcare",
    internshipTypes: ["Nursing", "Medical Lab", "Hospital Administration"],
    employeeCount: "400+",
    website: "https://www.apollohospitals.com"
  },
  {
    name: "BHEL - Trichy Unit",
    location: "Trichy (100 km from Salem)",
    industry: "Heavy Engineering",
    internshipTypes: ["Electrical Engineering", "Mechanical Design", "Project Management"],
    employeeCount: "3000+",
    website: "https://www.bhel.com"
  },
  {
    name: "Bannari Amman Sugars Ltd",
    location: "Erode (50 km from Salem)",
    industry: "Sugar & Distillery",
    internshipTypes: ["Chemical Engineering", "Agriculture", "Business Operations"],
    employeeCount: "600+",
    website: "https://www.basugars.com"
  },
  {
    name: "CavinKare Pvt Ltd",
    location: "Chennai (Internship Center)",
    industry: "FMCG",
    internshipTypes: ["Marketing", "Supply Chain", "R&D"],
    employeeCount: "1500+",
    website: "https://www.cavinkare.com"
  },
  {
    name: "KG Information Systems",
    location: "Coimbatore (60 km from Salem)",
    industry: "IT Services",
    internshipTypes: ["Mobile Development", "ERP Solutions", "Cyber Security"],
    employeeCount: "400+",
    website: "https://www.kgisl.com"
  },
  {
    name: "Salem Steel Traders",
    location: "Salem Industrial Area",
    industry: "Steel Trading",
    internshipTypes: ["Sales & Marketing", "Logistics", "Accounting"],
    employeeCount: "100+",
    website: "#"
  },
  {
    name: "Karur Vysya Bank",
    location: "Salem Branch HQ",
    industry: "Banking & Finance",
    internshipTypes: ["Banking Operations", "Finance", "Customer Relations"],
    employeeCount: "200+",
    website: "https://www.kvb.co.in"
  }
];

const industryColors: Record<string, string> = {
  "IT Services": "bg-blue-500/10 text-blue-500 border-blue-500/30",
  "Business Process Management": "bg-purple-500/10 text-purple-500 border-purple-500/30",
  "Steel Manufacturing": "bg-slate-500/10 text-slate-400 border-slate-500/30",
  "Textile Manufacturing": "bg-amber-500/10 text-amber-500 border-amber-500/30",
  "Healthcare": "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
  "Heavy Engineering": "bg-orange-500/10 text-orange-500 border-orange-500/30",
  "Sugar & Distillery": "bg-green-500/10 text-green-500 border-green-500/30",
  "FMCG": "bg-pink-500/10 text-pink-500 border-pink-500/30",
  "Steel Trading": "bg-gray-500/10 text-gray-400 border-gray-500/30",
  "Banking & Finance": "bg-indigo-500/10 text-indigo-500 border-indigo-500/30",
};

export const SalemCompanies = () => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
        <Building2 className="w-6 h-6 text-primary" />
        Internship Companies Near Salem
      </h2>
      <p className="text-muted-foreground mb-6">
        Explore internship opportunities at leading companies in and around Salem region. 
        These organizations offer hands-on experience across various industries.
      </p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {salemCompanies.map((company, index) => (
          <Card 
            key={index} 
            className="hover:border-primary/50 transition-colors h-full"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-lg leading-tight">{company.name}</CardTitle>
                <Badge 
                  variant="outline" 
                  className={industryColors[company.industry] || ""}
                >
                  {company.industry}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                {company.location}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4 flex-shrink-0" />
                <span>{company.employeeCount} Employees</span>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Internship Types:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {company.internshipTypes.map((type, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {company.website !== "#" && (
                <a 
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <Globe className="w-4 h-4" />
                  Visit Website
                </a>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SalemCompanies;

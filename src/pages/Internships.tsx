import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { AdminEditWrapper } from '@/components/AdminEditWrapper';
import { useAuth } from '@/hooks/useAuth';
import { 
  GraduationCap, 
  Search, 
  Phone, 
  Mail, 
  Building, 
  Clock, 
  CheckCircle,
  Loader2,
  ExternalLink,
  MapPin,
  Calendar,
  Bus,
  Mountain,
  Camera
} from 'lucide-react';

// Tour images for IV destinations
const tourImages: Record<string, string> = {
  'Munnar, Kerala': 'https://images.unsplash.com/photo-1596422846543-75c6fc197825?w=400&h=250&fit=crop',
  'Thekkady, Kerala': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=250&fit=crop',
  'Alleppey, Kerala': 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=250&fit=crop',
  'Coimbatore, Tamil Nadu': 'https://images.unsplash.com/photo-1574086060598-edbb79e6e01e?w=400&h=250&fit=crop',
  'Chennai, Tamil Nadu': 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=250&fit=crop',
  'Bangalore, Karnataka': 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=400&h=250&fit=crop',
  'Ooty, Tamil Nadu': 'https://images.unsplash.com/photo-1607004468138-e7e23ea26947?w=400&h=250&fit=crop',
};

const defaultTourImage = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=250&fit=crop';

// Types for views
type InternshipAreaData = {
  id: string;
  department: string;
  head_of_department?: string | null;
  areas_of_expertise?: string[] | null;
  created_at: string;
  // Only for authenticated users
  email?: string | null;
  whatsapp_number?: string | null;
};

type IndustrialVisitData = {
  id: string;
  title: string;
  department?: string | null;
  destination?: string | null;
  duration?: string | null;
  visit_date?: string | null;
  description?: string | null;
  objectives?: string[] | null;
  coordinator_name?: string | null;
  status?: string | null;
  created_at: string;
  // Only for authenticated users
  coordinator_contact?: string | null;
};

const Internships = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isAdmin, user } = useAuth();
  const queryClient = useQueryClient();

  // Use full table for authenticated users, public view for anonymous
  const { data: internshipAreas, isLoading } = useQuery<InternshipAreaData[]>({
    queryKey: ['internship_areas', !!user],
    queryFn: async () => {
      if (user) {
        // Authenticated users can see full data including contact info
        const { data, error } = await supabase
          .from('internship_areas')
          .select('*')
          .order('department');
        if (error) throw error;
        return data as InternshipAreaData[];
      } else {
        // Anonymous users see public view without sensitive contact info
        const { data, error } = await supabase
          .from('internship_areas_public' as any)
          .select('*')
          .order('department');
        if (error) throw error;
        return data as unknown as InternshipAreaData[];
      }
    },
  });

  // Use full table for authenticated users, public view for anonymous
  const { data: industrialVisits, isLoading: ivLoading } = useQuery<IndustrialVisitData[]>({
    queryKey: ['industrial_visits', !!user],
    queryFn: async () => {
      if (user) {
        const { data, error } = await supabase
          .from('industrial_visits')
          .select('*')
          .order('visit_date');
        if (error) throw error;
        return data as IndustrialVisitData[];
      } else {
        const { data, error } = await supabase
          .from('industrial_visits_public' as any)
          .select('*')
          .order('visit_date');
        if (error) throw error;
        return data as unknown as IndustrialVisitData[];
      }
    },
  });

  const filteredAreas = internshipAreas?.filter((area: InternshipAreaData) => 
    area.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    area.head_of_department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    area.areas_of_expertise?.some((exp: string) => exp.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const refetchData = () => {
    queryClient.invalidateQueries({ queryKey: ['internship_areas'] });
    queryClient.invalidateQueries({ queryKey: ['industrial_visits'] });
  };

  const getTourImage = (destination: string) => {
    return tourImages[destination] || defaultTourImage;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Internship <span className="text-primary">Opportunities</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Periyar University offers specialized internship programs across various departments 
            for students, research scholars, faculty members, and industry professionals.
          </p>
        </div>

        {/* 15-Day Internship Info Card */}
        <Card className="mb-8 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              15-Day Mandatory Internship Program
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Program Overview</h4>
                <p className="text-muted-foreground">
                  All students are required to complete a 15-day internship in their specific field of study. 
                  This hands-on experience helps students gain practical knowledge and industry exposure.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> 15 Days Duration
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Building className="w-3 h-3" /> Field-Specific
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Mandatory
                  </Badge>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Eligibility</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    Students enrolled in any degree program
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    Research scholars from affiliated colleges
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    Faculty members seeking skill enhancement
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    Industry professionals for specialized training
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <div className="relative mb-8 max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search departments or expertise areas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12"
          />
        </div>

        {/* Internship Areas */}
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-primary" />
          Department-wise Internship Areas
        </h2>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredAreas?.map((area) => (
              <AdminEditWrapper
                key={area.id}
                tableName="internship_areas"
                itemId={area.id}
                currentData={area}
                onUpdate={refetchData}
                fields={[
                  { key: 'department', label: 'Department' },
                  { key: 'head_of_department', label: 'Head of Department' },
                  { key: 'email', label: 'Email' },
                  { key: 'whatsapp_number', label: 'WhatsApp Number' },
                ]}
              >
                <Card className="hover:border-primary/50 transition-colors h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{area.department}</CardTitle>
                    <p className="text-sm text-muted-foreground">{area.head_of_department}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Contact Info */}
                    <div className="space-y-2">
                      {area.email && (
                        <a 
                          href={`mailto:${area.email}`}
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          {area.email}
                        </a>
                      )}
                      {area.whatsapp_number && (
                        <a 
                          href={`https://wa.me/91${area.whatsapp_number}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-green-500 transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                          {area.whatsapp_number}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    {/* Expertise Areas */}
                    <div>
                      <p className="text-sm font-medium mb-2">Areas of Expertise:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {area.areas_of_expertise?.map((exp: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {exp}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AdminEditWrapper>
            ))}
          </div>
        )}

        {filteredAreas?.length === 0 && !isLoading && (
          <div className="text-center py-12 text-muted-foreground">
            No internship areas found matching your search.
          </div>
        )}

        {/* Industrial Visits Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <Bus className="w-6 h-6 text-primary" />
            Industrial Visits & Educational Tours
          </h2>
          <p className="text-muted-foreground mb-6">
            Explore exciting destinations and gain practical knowledge through our organized industrial visits and educational tours.
          </p>
          
          {ivLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industrialVisits?.map((iv: any) => (
                <AdminEditWrapper
                  key={iv.id}
                  tableName="industrial_visits"
                  itemId={iv.id}
                  currentData={iv}
                  onUpdate={refetchData}
                  fields={[
                    { key: 'title', label: 'Title' },
                    { key: 'department', label: 'Department' },
                    { key: 'destination', label: 'Destination' },
                    { key: 'duration', label: 'Duration' },
                    { key: 'visit_date', label: 'Visit Date' },
                    { key: 'status', label: 'Status' },
                    { key: 'description', label: 'Description', type: 'textarea' },
                  ]}
                >
                  <Card className="hover:border-primary/50 transition-colors overflow-hidden h-full">
                    {/* Tour Image */}
                    <div className="relative h-40 overflow-hidden">
                      <img 
                        src={getTourImage(iv.destination)} 
                        alt={iv.destination}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3 flex items-center gap-2">
                        <Mountain className="w-4 h-4 text-white" />
                        <span className="text-white text-sm font-medium">{iv.destination}</span>
                      </div>
                      <Badge 
                        variant={iv.status === 'upcoming' ? 'default' : 'secondary'} 
                        className="absolute top-3 right-3"
                      >
                        {iv.status}
                      </Badge>
                    </div>
                    
                    <CardContent className="pt-4">
                      <h3 className="font-semibold text-lg mb-2">{iv.title}</h3>
                      
                      {iv.description && (
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {iv.description}
                        </p>
                      )}
                      
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p className="flex items-center gap-2">
                          <Building className="w-4 h-4 flex-shrink-0" /> 
                          {iv.department}
                        </p>
                        <p className="flex items-center gap-2">
                          <Clock className="w-4 h-4 flex-shrink-0" /> 
                          {iv.duration}
                        </p>
                        {iv.visit_date && (
                          <p className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 flex-shrink-0" /> 
                            {new Date(iv.visit_date).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </p>
                        )}
                      </div>

                      {iv.objectives && iv.objectives.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-border">
                          <p className="text-xs font-medium text-muted-foreground mb-2">Objectives:</p>
                          <div className="flex flex-wrap gap-1">
                            {iv.objectives.slice(0, 3).map((obj: string, idx: number) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {obj}
                              </Badge>
                            ))}
                            {iv.objectives.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{iv.objectives.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </AdminEditWrapper>
              ))}
            </div>
          )}
        </div>

        {/* Apply Section */}
        <Card className="mt-12">
          <CardContent className="py-8 text-center">
            <div className="flex justify-center mb-4">
              <Camera className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Interested in an Internship or Educational Tour?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Contact the respective department head directly via email or WhatsApp to inquire about 
              internship opportunities and upcoming industrial visits. Please mention your field of study and preferred dates.
            </p>
            <a
              href="https://www.periyaruniversity.ac.in/intern.php"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              View Official Internship Page
              <ExternalLink className="w-4 h-4" />
            </a>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Internships;
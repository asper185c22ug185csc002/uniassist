import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  GraduationCap, 
  Search, 
  Phone, 
  Mail, 
  Building, 
  Clock, 
  CheckCircle,
  Loader2,
  ExternalLink
} from 'lucide-react';

const Internships = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: internshipAreas, isLoading } = useQuery({
    queryKey: ['internship_areas'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('internship_areas')
        .select('*')
        .order('department');
      if (error) throw error;
      return data;
    },
  });

  const filteredAreas = internshipAreas?.filter(area => 
    area.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    area.head_of_department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    area.areas_of_expertise?.some((exp: string) => exp.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAreas?.map((area) => (
              <Card key={area.id} className="hover:border-primary/50 transition-colors">
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
            ))}
          </div>
        )}

        {filteredAreas?.length === 0 && !isLoading && (
          <div className="text-center py-12 text-muted-foreground">
            No internship areas found matching your search.
          </div>
        )}

        {/* Apply Section */}
        <Card className="mt-12">
          <CardContent className="py-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Interested in an Internship?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Contact the respective department head directly via email or WhatsApp to inquire about 
              internship opportunities. Please mention your field of study and preferred dates.
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

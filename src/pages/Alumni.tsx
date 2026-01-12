import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  GraduationCap, 
  Search, 
  Phone, 
  Mail, 
  Building, 
  Briefcase,
  MapPin,
  Calendar,
  Award,
  Loader2,
  UserPlus,
  LogIn,
  Star,
  Users
} from 'lucide-react';
import { alumniRegistrationSchema, alumniLoginSchema, formatValidationErrors } from '@/lib/validation';

const Alumni = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginData, setLoginData] = useState({ registerNumber: '', dob: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    register_number: '',
    date_of_birth: '',
    email: '',
    phone: '',
    graduation_year: '',
    department: '',
    degree: '',
    current_job: '',
    company: '',
    achievements: '',
    address: '',
    areas_of_expertise: '',
  });

  // Fetch approved alumni for chief guest listing
  const { data: alumni, isLoading } = useQuery({
    queryKey: ['approved_alumni'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('alumni')
        .select('*')
        .eq('is_approved', true)
        .order('graduation_year', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const filteredAlumni = alumni?.filter(alum => 
    alum.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alum.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alum.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alum.current_job?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate input with Zod
      const validation = alumniLoginSchema.safeParse(loginData);
      if (!validation.success) {
        const errors = formatValidationErrors(validation.error);
        toast({
          title: 'Validation Error',
          description: errors[0],
          variant: 'destructive',
        });
        setIsSubmitting(false);
        return;
      }

      // Format DOB to match database format (YYYY-MM-DD)
      const { data, error } = await supabase
        .from('alumni')
        .select('*')
        .eq('register_number', validation.data.registerNumber)
        .eq('date_of_birth', validation.data.dob)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        toast({
          title: 'Login Successful',
          description: `Welcome back, ${data.name}!`,
        });
        setShowLoginDialog(false);
        // Could store in localStorage/session for profile editing
      } else {
        // Generic error message to prevent enumeration
        toast({
          title: 'Login Failed',
          description: 'Invalid credentials. Please check your details.',
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate input with Zod
      const validation = alumniRegistrationSchema.safeParse(registerData);
      if (!validation.success) {
        const errors = formatValidationErrors(validation.error);
        toast({
          title: 'Validation Error',
          description: errors[0],
          variant: 'destructive',
        });
        setIsSubmitting(false);
        return;
      }

      const validData = validation.data;

      // Check for duplicate register number
      const { data: existing } = await supabase
        .from('alumni')
        .select('id')
        .eq('register_number', validData.register_number)
        .maybeSingle();

      if (existing) {
        toast({
          title: 'Registration Failed',
          description: 'This register number is already registered.',
          variant: 'destructive',
        });
        setIsSubmitting(false);
        return;
      }

      const { error } = await supabase.from('alumni').insert([{
        name: validData.name,
        register_number: validData.register_number,
        date_of_birth: validData.date_of_birth,
        email: validData.email || null,
        phone: validData.phone || null,
        graduation_year: validData.graduation_year || null,
        department: validData.department || null,
        degree: validData.degree || null,
        current_job: validData.current_job || null,
        company: validData.company || null,
        achievements: validData.achievements || null,
        address: validData.address || null,
        areas_of_expertise: validData.areas_of_expertise 
          ? validData.areas_of_expertise.split(',').map(s => s.trim()).filter(Boolean) 
          : [],
        is_self_registered: true,
        is_approved: false,
      }]);

      if (error) throw error;

      toast({
        title: 'Registration Submitted',
        description: 'Your registration is pending admin approval. You will be notified once approved.',
      });
      setShowRegisterDialog(false);
      setRegisterData({
        name: '',
        register_number: '',
        date_of_birth: '',
        email: '',
        phone: '',
        graduation_year: '',
        department: '',
        degree: '',
        current_job: '',
        company: '',
        achievements: '',
        address: '',
        areas_of_expertise: '',
      });
    } catch (error: any) {
      toast({
        title: 'Registration Failed',
        description: 'An error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Alumni <span className="text-primary">Network</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Connect with our distinguished alumni who have made significant contributions 
            across various fields. They are available as chief guests for university functions.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button onClick={() => setShowLoginDialog(true)} variant="outline" size="lg">
            <LogIn className="w-5 h-5 mr-2" />
            Alumni Login
          </Button>
          <Button onClick={() => setShowRegisterDialog(true)} size="lg">
            <UserPlus className="w-5 h-5 mr-2" />
            Register as Alumni
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{alumni?.length || 0}</p>
              <p className="text-sm text-muted-foreground">Registered Alumni</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Briefcase className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{alumni?.filter(a => a.current_job).length || 0}</p>
              <p className="text-sm text-muted-foreground">Industry Leaders</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Star className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{alumni?.filter(a => a.availability_status === 'available').length || 0}</p>
              <p className="text-sm text-muted-foreground">Available as Guests</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Award className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{alumni?.filter(a => a.achievements).length || 0}</p>
              <p className="text-sm text-muted-foreground">With Achievements</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative mb-8 max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search by name, department, or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12"
          />
        </div>

        {/* Alumni Grid */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlumni?.map((alum) => (
              <Card key={alum.id} className="hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{alum.name}</CardTitle>
                      <CardDescription>{alum.degree} - {alum.department}</CardDescription>
                    </div>
                    {alum.availability_status === 'available' && (
                      <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                        Available
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {alum.current_job && alum.company && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Briefcase className="w-4 h-4" />
                        {alum.current_job} at {alum.company}
                      </div>
                    )}
                    {alum.graduation_year && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        Class of {alum.graduation_year}
                      </div>
                    )}
                    {alum.email && (
                      <a 
                        href={`mailto:${alum.email}`}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        {alum.email}
                      </a>
                    )}
                  </div>

                  {alum.areas_of_expertise && alum.areas_of_expertise.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Expertise:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {alum.areas_of_expertise.slice(0, 4).map((exp: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {exp}
                          </Badge>
                        ))}
                        {alum.areas_of_expertise.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{alum.areas_of_expertise.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {alum.achievements && (
                    <div className="pt-2 border-t border-border">
                      <p className="text-sm text-muted-foreground line-clamp-2">{alum.achievements}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredAlumni?.length === 0 && !isLoading && (
          <div className="text-center py-12 text-muted-foreground">
            No alumni found matching your search.
          </div>
        )}

        {/* Login Dialog */}
        <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Alumni Login</DialogTitle>
              <DialogDescription>
                Enter your register number and date of birth to access your profile.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label>Register Number</Label>
                <Input
                  value={loginData.registerNumber}
                  onChange={(e) => setLoginData({ ...loginData, registerNumber: e.target.value })}
                  placeholder="e.g., 19PCS001"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <Input
                  type="date"
                  value={loginData.dob}
                  onChange={(e) => setLoginData({ ...loginData, dob: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <LogIn className="w-4 h-4 mr-2" />}
                Login
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Register Dialog */}
        <Dialog open={showRegisterDialog} onOpenChange={setShowRegisterDialog}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Alumni Registration</DialogTitle>
              <DialogDescription>
                Register as an alumni to be featured in our chief guest directory.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name *</Label>
                  <Input
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Register Number *</Label>
                  <Input
                    value={registerData.register_number}
                    onChange={(e) => setRegisterData({ ...registerData, register_number: e.target.value })}
                    placeholder="e.g., 19PCS001"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Date of Birth *</Label>
                  <Input
                    type="date"
                    value={registerData.date_of_birth}
                    onChange={(e) => setRegisterData({ ...registerData, date_of_birth: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    type="tel"
                    value={registerData.phone}
                    onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Graduation Year</Label>
                  <Input
                    value={registerData.graduation_year}
                    onChange={(e) => setRegisterData({ ...registerData, graduation_year: e.target.value })}
                    placeholder="e.g., 2022"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Input
                    value={registerData.department}
                    onChange={(e) => setRegisterData({ ...registerData, department: e.target.value })}
                    placeholder="e.g., Computer Science"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Degree</Label>
                  <Input
                    value={registerData.degree}
                    onChange={(e) => setRegisterData({ ...registerData, degree: e.target.value })}
                    placeholder="e.g., M.Sc"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Current Job Title</Label>
                  <Input
                    value={registerData.current_job}
                    onChange={(e) => setRegisterData({ ...registerData, current_job: e.target.value })}
                    placeholder="e.g., Senior Software Engineer"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input
                    value={registerData.company}
                    onChange={(e) => setRegisterData({ ...registerData, company: e.target.value })}
                    placeholder="e.g., Google"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Input
                  value={registerData.address}
                  onChange={(e) => setRegisterData({ ...registerData, address: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Areas of Expertise (comma-separated)</Label>
                <Input
                  value={registerData.areas_of_expertise}
                  onChange={(e) => setRegisterData({ ...registerData, areas_of_expertise: e.target.value })}
                  placeholder="e.g., Machine Learning, Data Science, Python"
                />
              </div>
              <div className="space-y-2">
                <Label>Achievements & Recognitions</Label>
                <Textarea
                  value={registerData.achievements}
                  onChange={(e) => setRegisterData({ ...registerData, achievements: e.target.value })}
                  rows={3}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <UserPlus className="w-4 h-4 mr-2" />}
                Submit Registration
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Your registration will be reviewed by the admin before being published.
              </p>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Alumni;

import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
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
import { AdminEditWrapper } from '@/components/AdminEditWrapper';
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
  Users,
  Check,
  X,
  Trash2,
  Pencil,
  Shield,
  Clock
} from 'lucide-react';
import { alumniRegistrationSchema, alumniLoginSchema, formatValidationErrors } from '@/lib/validation';

const Alumni = () => {
  const { toast } = useToast();
  const { isAdmin, user } = useAuth();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState<AlumniData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('approved');
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
  const [editData, setEditData] = useState({
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
    availability_status: '',
  });

  // Check if user is authenticated
  const isAuthenticated = !!user;

  // Alumni type for both views
  type AlumniData = {
    id: string;
    name: string;
    register_number: string;
    degree?: string | null;
    department?: string | null;
    graduation_year?: string | null;
    company?: string | null;
    current_job?: string | null;
    achievements?: string | null;
    areas_of_expertise?: string[] | null;
    availability_status?: string | null;
    profile_photo_url?: string | null;
    social_links?: any;
    is_approved?: boolean | null;
    is_self_registered?: boolean | null;
    created_at: string;
    updated_at: string;
    // These are only available to authenticated users
    email?: string | null;
    phone?: string | null;
    date_of_birth?: string;
    address?: string | null;
  };

  // Fetch approved alumni - only admins see full data, everyone else uses public view
  const { data: alumni, isLoading, refetch: refetchAlumni } = useQuery<AlumniData[]>({
    queryKey: ['approved_alumni', isAdmin],
    queryFn: async () => {
      if (isAdmin) {
        // Admins can see full data including PII
        const { data, error } = await supabase
          .from('alumni')
          .select('*')
          .eq('is_approved', true)
          .order('graduation_year', { ascending: false });
        if (error) throw error;
        return data as AlumniData[];
      } else {
        // All non-admin users (including authenticated) see public view without sensitive info
        const { data, error } = await supabase
          .from('alumni_public' as any)
          .select('*')
          .order('graduation_year', { ascending: false });
        if (error) throw error;
        return data as unknown as AlumniData[];
      }
    },
  });

  // Fetch pending alumni (admin only)
  const { data: pendingAlumni, isLoading: pendingLoading, refetch: refetchPending } = useQuery<AlumniData[]>({
    queryKey: ['pending_alumni'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('alumni')
        .select('*')
        .eq('is_approved', false)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as AlumniData[];
    },
    enabled: isAdmin,
  });

  // Fetch all alumni (admin only)
  const { data: allAlumni, isLoading: allLoading, refetch: refetchAll } = useQuery<AlumniData[]>({
    queryKey: ['all_alumni'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('alumni')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as AlumniData[];
    },
    enabled: isAdmin,
  });

  const refreshData = () => {
    refetchAlumni();
    if (isAdmin) {
      refetchPending();
      refetchAll();
    }
  };

  const filteredAlumni = alumni?.filter((alum: AlumniData) => 
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

  // Admin functions
  const handleApprove = async (id: string) => {
    try {
      const { error } = await supabase
        .from('alumni')
        .update({ is_approved: true })
        .eq('id', id);

      if (error) throw error;

      toast({ title: 'Alumni approved successfully!' });
      refreshData();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleReject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('alumni')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({ title: 'Alumni rejected and removed.' });
      refreshData();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this alumni record?')) return;

    try {
      const { error } = await supabase
        .from('alumni')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({ title: 'Alumni deleted successfully!' });
      refreshData();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const openEditDialog = (alum: AlumniData) => {
    setSelectedAlumni(alum);
    setEditData({
      name: alum.name || '',
      register_number: alum.register_number || '',
      date_of_birth: alum.date_of_birth || '',
      email: alum.email || '',
      phone: alum.phone || '',
      graduation_year: alum.graduation_year || '',
      department: alum.department || '',
      degree: alum.degree || '',
      current_job: alum.current_job || '',
      company: alum.company || '',
      achievements: alum.achievements || '',
      address: alum.address || '',
      areas_of_expertise: alum.areas_of_expertise?.join(', ') || '',
      availability_status: alum.availability_status || '',
    });
    setShowEditDialog(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAlumni) return;
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('alumni')
        .update({
          name: editData.name,
          register_number: editData.register_number,
          date_of_birth: editData.date_of_birth,
          email: editData.email || null,
          phone: editData.phone || null,
          graduation_year: editData.graduation_year || null,
          department: editData.department || null,
          degree: editData.degree || null,
          current_job: editData.current_job || null,
          company: editData.company || null,
          achievements: editData.achievements || null,
          address: editData.address || null,
          areas_of_expertise: editData.areas_of_expertise 
            ? editData.areas_of_expertise.split(',').map(s => s.trim()).filter(Boolean)
            : [],
          availability_status: editData.availability_status || null,
        })
        .eq('id', selectedAlumni.id);

      if (error) throw error;

      toast({ title: 'Alumni updated successfully!' });
      setShowEditDialog(false);
      setSelectedAlumni(null);
      refreshData();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render alumni card with admin actions
  const renderAlumniCard = (alum: AlumniData, showAdminActions: boolean = false, isPending: boolean = false) => (
    <Card key={alum.id} className="hover:border-primary/50 transition-colors relative group">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{alum.name}</CardTitle>
            <CardDescription>{alum.degree} - {alum.department}</CardDescription>
          </div>
          <div className="flex gap-2">
            {alum.availability_status === 'available' && (
              <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                Available
              </Badge>
            )}
            {isPending && (
              <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">
                <Clock className="w-3 h-3 mr-1" />
                Pending
              </Badge>
            )}
          </div>
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
          {alum.phone && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4" />
              {alum.phone}
            </div>
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

        {/* Admin Actions */}
        {showAdminActions && isAdmin && (
          <div className="pt-3 border-t border-border flex gap-2">
            {isPending ? (
              <>
                <Button
                  size="sm"
                  onClick={() => handleApprove(alum.id)}
                  className="flex-1"
                >
                  <Check className="w-4 h-4 mr-1" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleReject(alum.id)}
                  className="flex-1"
                >
                  <X className="w-4 h-4 mr-1" />
                  Reject
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openEditDialog(alum)}
                  className="flex-1"
                >
                  <Pencil className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(alum.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );

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
          <Button 
            onClick={() => setShowLoginDialog(true)} 
            size="lg"
            className="bg-amber-600 hover:bg-amber-700 text-white border-amber-500 shadow-lg shadow-amber-600/20"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Alumni Login
          </Button>
          <Button 
            onClick={() => setShowRegisterDialog(true)} 
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white border-blue-500 shadow-lg shadow-blue-600/20"
          >
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

        {/* Admin Section - Highly Visible */}
        {isAdmin && (
          <div className="mb-8 p-4 bg-orange-500/10 border-2 border-orange-500/50 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-orange-500" />
              <h2 className="text-xl font-bold text-orange-500">Admin Dashboard - Alumni Management</h2>
            </div>
            <p className="text-sm text-orange-400/80 mb-4">
              You have admin privileges. Manage alumni registrations, approve pending requests, and edit records.
            </p>
          </div>
        )}

        {/* Admin Tabs */}
        {isAdmin ? (
          <>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-orange-500/10 border border-orange-500/30">
                <TabsTrigger value="approved" className="flex gap-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                  <Check className="w-4 h-4" />
                  Approved ({alumni?.length || 0})
                </TabsTrigger>
                <TabsTrigger value="pending" className="flex gap-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                  <Clock className="w-4 h-4" />
                  Pending ({pendingAlumni?.length || 0})
                </TabsTrigger>
                <TabsTrigger value="all" className="flex gap-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                  <Users className="w-4 h-4" />
                  All ({allAlumni?.length || 0})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="approved" className="mt-6">
                <div className="relative mb-6 max-w-md mx-auto">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, department, or company..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12"
                  />
                </div>
                {isLoading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAlumni?.map((alum) => renderAlumniCard(alum, true, false))}
                  </div>
                )}
                {filteredAlumni?.length === 0 && !isLoading && (
                  <div className="text-center py-12 text-muted-foreground">
                    No alumni found matching your search.
                  </div>
                )}
              </TabsContent>

              <TabsContent value="pending" className="mt-6">
                {pendingLoading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : pendingAlumni && pendingAlumni.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pendingAlumni.map((alum) => renderAlumniCard(alum, true, true))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Check className="w-12 h-12 mx-auto mb-4 text-green-500" />
                    No pending alumni registrations.
                  </div>
                )}
              </TabsContent>

              <TabsContent value="all" className="mt-6">
                {allLoading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allAlumni?.map((alum) => renderAlumniCard(alum, true, !alum.is_approved))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <>
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
                {filteredAlumni?.map((alum) => renderAlumniCard(alum, false, false))}
              </div>
            )}

            {filteredAlumni?.length === 0 && !isLoading && (
              <div className="text-center py-12 text-muted-foreground">
                No alumni found matching your search.
              </div>
            )}
          </>
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

        {/* Admin Edit Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Edit Alumni Record
              </DialogTitle>
              <DialogDescription>
                Update the alumni information below.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name *</Label>
                  <Input
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Register Number *</Label>
                  <Input
                    value={editData.register_number}
                    onChange={(e) => setEditData({ ...editData, register_number: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Date of Birth *</Label>
                  <Input
                    type="date"
                    value={editData.date_of_birth}
                    onChange={(e) => setEditData({ ...editData, date_of_birth: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Graduation Year</Label>
                  <Input
                    value={editData.graduation_year}
                    onChange={(e) => setEditData({ ...editData, graduation_year: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Input
                    value={editData.department}
                    onChange={(e) => setEditData({ ...editData, department: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Degree</Label>
                  <Input
                    value={editData.degree}
                    onChange={(e) => setEditData({ ...editData, degree: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Current Job Title</Label>
                  <Input
                    value={editData.current_job}
                    onChange={(e) => setEditData({ ...editData, current_job: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input
                    value={editData.company}
                    onChange={(e) => setEditData({ ...editData, company: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Availability Status</Label>
                  <Input
                    value={editData.availability_status}
                    onChange={(e) => setEditData({ ...editData, availability_status: e.target.value })}
                    placeholder="e.g., available, busy, unavailable"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Input
                  value={editData.address}
                  onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Areas of Expertise (comma-separated)</Label>
                <Input
                  value={editData.areas_of_expertise}
                  onChange={(e) => setEditData({ ...editData, areas_of_expertise: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Achievements & Recognitions</Label>
                <Textarea
                  value={editData.achievements}
                  onChange={(e) => setEditData({ ...editData, achievements: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => setShowEditDialog(false)} className="flex-1">
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button type="submit" className="flex-1" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Check className="w-4 h-4 mr-2" />}
                  Save Changes
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Alumni;

import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, FileText, MessageSquare, Calendar, Building2, 
  GraduationCap, BookOpen, Trophy, Briefcase, Check, X, 
  Clock, AlertCircle, TrendingUp
} from 'lucide-react';

interface PendingCounts {
  alumni: number;
  inquiries: number;
  news: number;
  industrialVisits: number;
}

interface DashboardStats {
  totalDepartments: number;
  totalCourses: number;
  totalBooks: number;
  totalAlumni: number;
  totalEvents: number;
  totalFacilities: number;
}

interface PendingItem {
  id: string;
  title: string;
  type: 'alumni' | 'inquiry' | 'industrial_visit';
  date: string;
  details?: string;
}

interface AdminDashboardProps {
  onNavigateToTable: (table: string) => void;
}

export const AdminDashboard = ({ onNavigateToTable }: AdminDashboardProps) => {
  const { toast } = useToast();
  const [pendingCounts, setPendingCounts] = useState<PendingCounts>({
    alumni: 0,
    inquiries: 0,
    news: 0,
    industrialVisits: 0,
  });
  const [stats, setStats] = useState<DashboardStats>({
    totalDepartments: 0,
    totalCourses: 0,
    totalBooks: 0,
    totalAlumni: 0,
    totalEvents: 0,
    totalFacilities: 0,
  });
  const [pendingItems, setPendingItems] = useState<PendingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // Fetch pending counts
      const [
        { count: pendingAlumni },
        { count: pendingInquiries },
        { count: pendingIV },
        { count: totalDepts },
        { count: totalCourses },
        { count: totalBooks },
        { count: totalAlumni },
        { count: totalEvents },
        { count: totalFacilities },
      ] = await Promise.all([
        supabase.from('alumni').select('*', { count: 'exact', head: true }).eq('is_approved', false),
        supabase.from('inquiries').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('industrial_visits').select('*', { count: 'exact', head: true }).eq('status', 'upcoming'),
        supabase.from('departments').select('*', { count: 'exact', head: true }),
        supabase.from('courses').select('*', { count: 'exact', head: true }),
        supabase.from('library_books').select('*', { count: 'exact', head: true }),
        supabase.from('alumni').select('*', { count: 'exact', head: true }).eq('is_approved', true),
        supabase.from('sports_events').select('*', { count: 'exact', head: true }),
        supabase.from('facilities').select('*', { count: 'exact', head: true }),
      ]);

      setPendingCounts({
        alumni: pendingAlumni || 0,
        inquiries: pendingInquiries || 0,
        news: 0,
        industrialVisits: pendingIV || 0,
      });

      setStats({
        totalDepartments: totalDepts || 0,
        totalCourses: totalCourses || 0,
        totalBooks: totalBooks || 0,
        totalAlumni: totalAlumni || 0,
        totalEvents: totalEvents || 0,
        totalFacilities: totalFacilities || 0,
      });

      // Fetch pending items for quick actions
      const [
        { data: pendingAlumniData },
        { data: pendingInquiriesData },
        { data: upcomingIVData },
      ] = await Promise.all([
        supabase.from('alumni').select('id, name, created_at, department').eq('is_approved', false).limit(5),
        supabase.from('inquiries').select('id, name, subject, created_at').eq('status', 'pending').limit(5),
        supabase.from('industrial_visits').select('id, title, visit_date, department, created_at').eq('status', 'upcoming').limit(5),
      ]);

      const items: PendingItem[] = [
        ...(pendingAlumniData || []).map(a => ({
          id: a.id,
          title: a.name,
          type: 'alumni' as const,
          date: a.created_at,
          details: a.department,
        })),
        ...(pendingInquiriesData || []).map(i => ({
          id: i.id,
          title: i.name,
          type: 'inquiry' as const,
          date: i.created_at,
          details: i.subject,
        })),
        ...(upcomingIVData || []).map(iv => ({
          id: iv.id,
          title: iv.title,
          type: 'industrial_visit' as const,
          date: iv.visit_date || iv.created_at,
          details: iv.department,
        })),
      ];

      setPendingItems(items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickApprove = async (item: PendingItem) => {
    try {
      if (item.type === 'alumni') {
        await supabase.from('alumni').update({ is_approved: true }).eq('id', item.id);
      } else if (item.type === 'inquiry') {
        await supabase.from('inquiries').update({ status: 'resolved' }).eq('id', item.id);
      }
      toast({ title: 'Approved successfully!' });
      fetchDashboardData();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const handleQuickReject = async (item: PendingItem) => {
    try {
      if (item.type === 'alumni') {
        await supabase.from('alumni').delete().eq('id', item.id);
      } else if (item.type === 'inquiry') {
        await supabase.from('inquiries').update({ status: 'rejected' }).eq('id', item.id);
      }
      toast({ title: 'Rejected/Removed successfully!' });
      fetchDashboardData();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const getTypeIcon = (type: PendingItem['type']) => {
    switch (type) {
      case 'alumni': return <Users className="w-4 h-4" />;
      case 'inquiry': return <MessageSquare className="w-4 h-4" />;
      case 'industrial_visit': return <Calendar className="w-4 h-4" />;
    }
  };

  const getTypeBadge = (type: PendingItem['type']) => {
    switch (type) {
      case 'alumni': return <Badge variant="secondary">Alumni</Badge>;
      case 'inquiry': return <Badge variant="outline">Inquiry</Badge>;
      case 'industrial_visit': return <Badge>IV</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-32 bg-muted rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Pending Actions Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-orange-500" />
          Pending Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card 
            className="cursor-pointer hover:border-primary transition-colors"
            onClick={() => onNavigateToTable('alumni')}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900/30">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingCounts.alumni}</p>
                <p className="text-sm text-muted-foreground">Pending Alumni</p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:border-primary transition-colors"
            onClick={() => onNavigateToTable('inquiries')}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingCounts.inquiries}</p>
                <p className="text-sm text-muted-foreground">Pending Inquiries</p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:border-primary transition-colors"
            onClick={() => onNavigateToTable('industrial_visits')}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingCounts.industrialVisits}</p>
                <p className="text-sm text-muted-foreground">Upcoming IV</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-dashed">
            <CardContent className="p-4 flex items-center justify-center h-full">
              <div className="text-center">
                <TrendingUp className="w-6 h-6 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Total Pending</p>
                <p className="text-2xl font-bold">
                  {pendingCounts.alumni + pendingCounts.inquiries + pendingCounts.industrialVisits}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions for Pending Items */}
      {pendingItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Pending Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingItems.slice(0, 5).map((item) => (
                <div
                  key={`${item.type}-${item.id}`}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {getTypeIcon(item.type)}
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.details}</p>
                    </div>
                    {getTypeBadge(item.type)}
                  </div>
                  {item.type !== 'industrial_visit' && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-600 hover:bg-green-50"
                        onClick={() => handleQuickApprove(item)}
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => handleQuickReject(item)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Statistics Overview */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          University Statistics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card 
            className="cursor-pointer hover:border-primary transition-colors"
            onClick={() => onNavigateToTable('departments')}
          >
            <CardContent className="p-4 text-center">
              <Building2 className="w-8 h-8 mx-auto text-primary mb-2" />
              <p className="text-2xl font-bold">{stats.totalDepartments}</p>
              <p className="text-xs text-muted-foreground">Departments</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:border-primary transition-colors"
            onClick={() => onNavigateToTable('courses')}
          >
            <CardContent className="p-4 text-center">
              <GraduationCap className="w-8 h-8 mx-auto text-primary mb-2" />
              <p className="text-2xl font-bold">{stats.totalCourses}</p>
              <p className="text-xs text-muted-foreground">Courses</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:border-primary transition-colors"
            onClick={() => onNavigateToTable('library_books')}
          >
            <CardContent className="p-4 text-center">
              <BookOpen className="w-8 h-8 mx-auto text-primary mb-2" />
              <p className="text-2xl font-bold">{stats.totalBooks}</p>
              <p className="text-xs text-muted-foreground">Library Books</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:border-primary transition-colors"
            onClick={() => onNavigateToTable('alumni')}
          >
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 mx-auto text-primary mb-2" />
              <p className="text-2xl font-bold">{stats.totalAlumni}</p>
              <p className="text-xs text-muted-foreground">Alumni</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:border-primary transition-colors"
            onClick={() => onNavigateToTable('sports_events')}
          >
            <CardContent className="p-4 text-center">
              <Trophy className="w-8 h-8 mx-auto text-primary mb-2" />
              <p className="text-2xl font-bold">{stats.totalEvents}</p>
              <p className="text-xs text-muted-foreground">Sports Events</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:border-primary transition-colors"
            onClick={() => onNavigateToTable('facilities')}
          >
            <CardContent className="p-4 text-center">
              <Briefcase className="w-8 h-8 mx-auto text-primary mb-2" />
              <p className="text-2xl font-bold">{stats.totalFacilities}</p>
              <p className="text-xs text-muted-foreground">Facilities</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

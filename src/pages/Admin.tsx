import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, LogOut, ArrowLeft, Loader2, Search, Filter, LayoutDashboard, Settings, Code2, FileText, RefreshCw, AlertTriangle, ShieldAlert } from 'lucide-react';
import periyarLogo from '@/assets/periyar-logo.jpg';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { TechStackInfo } from '@/components/admin/TechStackInfo';
import { FeaturesDocumentation } from '@/components/admin/FeaturesDocumentation';

type TableName = 'departments' | 'courses' | 'news_feed' | 'library_books' | 'university_info' | 'achievements' | 'student_clubs' | 'hostel_info' | 'facilities' | 'placement_stats' | 'top_recruiters' | 'sports_events' | 'alumni' | 'internship_areas' | 'inquiries' | 'industrial_visits' | 'digital_resources' | 'library_collections' | 'cdoe_programs';

type AdminView = 'dashboard' | 'data' | 'tech' | 'features';

const Admin = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading, adminCheckError, retryAdminCheck, signOut } = useAuth();
  const { toast } = useToast();
  const [adminView, setAdminView] = useState<AdminView>('dashboard');
  const [activeTable, setActiveTable] = useState<TableName>('news_feed');
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showAccessDenied, setShowAccessDenied] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    } else if (!loading && user && !isAdmin && !adminCheckError) {
      setShowAccessDenied(true);
    }
  }, [user, isAdmin, loading, adminCheckError, navigate]);

  useEffect(() => {
    if (isAdmin && adminView === 'data') {
      fetchData();
      setSearchQuery('');
      setCategoryFilter('all');
    }
  }, [activeTable, isAdmin, adminView]);

  const fetchData = async () => {
    setIsLoading(true);
    const { data: result, error } = await supabase
      .from(activeTable)
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      toast({
        title: 'Error fetching data',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setData(result || []);
    }
    setIsLoading(false);
  };

  const getTableColumns = (table: TableName): string[] => {
    const columns: Record<TableName, string[]> = {
      departments: ['name', 'school', 'email', 'phone', 'location', 'placements', 'rating'],
      courses: ['name', 'degree_type', 'duration', 'eligibility', 'total_fee', 'per_year_fee'],
      news_feed: ['title', 'description', 'category', 'news_date', 'is_active'],
      library_books: ['title', 'author', 'category', 'isbn', 'location', 'department', 'available'],
      university_info: ['key', 'value', 'category'],
      achievements: ['title', 'description', 'category', 'year', 'icon_name'],
      student_clubs: ['name', 'description', 'members', 'icon_name'],
      hostel_info: ['location', 'room_capacity', 'total_capacity', 'monthly_rent', 'mess_charges', 'rating'],
      facilities: ['name', 'category', 'description', 'capacity', 'icon_name'],
      placement_stats: ['academic_year', 'students_placed', 'companies', 'highest_package', 'average_package'],
      top_recruiters: ['company_name', 'sector'],
      sports_events: ['title', 'category', 'event_date', 'venue', 'status', 'description'],
      alumni: ['name', 'register_number', 'email', 'phone', 'graduation_year', 'department', 'current_job', 'company', 'is_approved'],
      internship_areas: ['department', 'head_of_department', 'email', 'whatsapp_number'],
      inquiries: ['name', 'email', 'subject', 'message', 'status'],
      industrial_visits: ['title', 'department', 'destination', 'duration', 'visit_date', 'status', 'coordinator_name'],
      digital_resources: ['title', 'description', 'resource_type', 'url', 'icon_name'],
      library_collections: ['department', 'total_books', 'e_books', 'journals', 'theses', 'location'],
      cdoe_programs: ['name', 'degree_type', 'duration', 'eligibility', 'fee_per_year', 'total_fee'],
    };
    return columns[table] || [];
  };

  const getCategoryColumn = (table: TableName): string | null => {
    const categoryColumns: Partial<Record<TableName, string>> = {
      news_feed: 'category',
      library_books: 'category',
      achievements: 'category',
      facilities: 'category',
      sports_events: 'category',
      courses: 'degree_type',
      top_recruiters: 'sector',
      alumni: 'department',
      internship_areas: 'department',
      inquiries: 'status',
      digital_resources: 'resource_type',
      industrial_visits: 'status',
    };
    return categoryColumns[table] || null;
  };

  const uniqueCategories = useMemo(() => {
    const catCol = getCategoryColumn(activeTable);
    if (!catCol) return [];
    const categories = [...new Set(data.map(item => item[catCol]).filter(Boolean))];
    return categories.sort();
  }, [data, activeTable]);

  const filteredData = useMemo(() => {
    let result = data;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        Object.values(item).some(val => 
          String(val).toLowerCase().includes(query)
        )
      );
    }
    
    const catCol = getCategoryColumn(activeTable);
    if (categoryFilter !== 'all' && catCol) {
      result = result.filter(item => item[catCol] === categoryFilter);
    }
    
    return result;
  }, [data, searchQuery, categoryFilter, activeTable]);

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData(item);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingItem(null);
    const columns = getTableColumns(activeTable);
    const emptyForm: Record<string, string> = {};
    columns.forEach(col => emptyForm[col] = '');
    setFormData(emptyForm);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editingItem) {
        const { error } = await supabase
          .from(activeTable)
          .update(formData as any)
          .eq('id', editingItem.id);

        if (error) throw error;
        toast({ title: 'Updated successfully' });
      } else {
        const { error } = await supabase
          .from(activeTable)
          .insert([formData as any]);

        if (error) throw error;
        toast({ title: 'Added successfully' });
      }
      setIsDialogOpen(false);
      fetchData();
    } catch (error: any) {
      toast({
        title: 'Error saving data',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const { error } = await supabase
        .from(activeTable)
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: 'Deleted successfully' });
      fetchData();
    } catch (error: any) {
      toast({
        title: 'Error deleting data',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleNavigateToTable = (table: string) => {
    setActiveTable(table as TableName);
    setAdminView('data');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  // Show error with retry option
  if (adminCheckError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            <CardTitle>Connection Error</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-muted-foreground">{adminCheckError}</p>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => navigate('/')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
              <Button className="flex-1" onClick={retryAdminCheck}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show access denied with helpful message
  if (showAccessDenied || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center mb-4">
              <ShieldAlert className="w-8 h-8 text-orange-500" />
            </div>
            <CardTitle>Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-muted-foreground">
              You need admin privileges to access this page. If you believe this is an error, please try the following:
            </p>
            <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
              <li>Make sure you're logged in with an admin account</li>
              <li>Try signing out and signing back in</li>
              <li>Contact the system administrator</li>
            </ul>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => navigate('/')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Home
              </Button>
              <Button className="flex-1" onClick={retryAdminCheck}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry Check
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const columns = getTableColumns(activeTable);
  const categoryColumn = getCategoryColumn(activeTable);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-primary/30">
                <img src={periyarLogo} alt="Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-bold text-xl">Admin Panel</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">{user?.email}</span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Main Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={adminView === 'dashboard' ? 'default' : 'outline'}
            onClick={() => setAdminView('dashboard')}
            className="gap-2"
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Button>
          <Button
            variant={adminView === 'data' ? 'default' : 'outline'}
            onClick={() => setAdminView('data')}
            className="gap-2"
          >
            <Settings className="w-4 h-4" />
            Manage Data
          </Button>
          <Button
            variant={adminView === 'tech' ? 'default' : 'outline'}
            onClick={() => setAdminView('tech')}
            className="gap-2"
          >
            <Code2 className="w-4 h-4" />
            Tech Stack
          </Button>
          <Button
            variant={adminView === 'features' ? 'default' : 'outline'}
            onClick={() => setAdminView('features')}
            className="gap-2"
          >
            <FileText className="w-4 h-4" />
            Features & Docs
          </Button>
        </div>

        {/* Dashboard View */}
        {adminView === 'dashboard' && (
          <AdminDashboard onNavigateToTable={handleNavigateToTable} />
        )}

        {/* Tech Stack View */}
        {adminView === 'tech' && (
          <TechStackInfo />
        )}

        {/* Features Documentation View */}
        {adminView === 'features' && (
          <FeaturesDocumentation />
        )}

        {/* Data Management View */}
        {adminView === 'data' && (
          <Card>
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <CardTitle>Manage University Data</CardTitle>
              <Button onClick={handleAdd}>
                <Plus className="w-4 h-4 mr-2" />
                Add New
              </Button>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTable} onValueChange={(v) => setActiveTable(v as TableName)}>
                <TabsList className="mb-4 flex-wrap h-auto gap-2 justify-start">
                  <TabsTrigger value="news_feed">News</TabsTrigger>
                  <TabsTrigger value="departments">Departments</TabsTrigger>
                  <TabsTrigger value="courses">Courses</TabsTrigger>
                  <TabsTrigger value="library_books">Library</TabsTrigger>
                  <TabsTrigger value="library_collections">Collections</TabsTrigger>
                  <TabsTrigger value="digital_resources">E-Resources</TabsTrigger>
                  <TabsTrigger value="university_info">Info</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                  <TabsTrigger value="student_clubs">Clubs</TabsTrigger>
                  <TabsTrigger value="hostel_info">Hostel</TabsTrigger>
                  <TabsTrigger value="facilities">Facilities</TabsTrigger>
                  <TabsTrigger value="placement_stats">Placements</TabsTrigger>
                  <TabsTrigger value="top_recruiters">Recruiters</TabsTrigger>
                  <TabsTrigger value="sports_events">Sports</TabsTrigger>
                  <TabsTrigger value="alumni">Alumni</TabsTrigger>
                  <TabsTrigger value="internship_areas">Internships</TabsTrigger>
                  <TabsTrigger value="industrial_visits">IV</TabsTrigger>
                  <TabsTrigger value="cdoe_programs">CDOE</TabsTrigger>
                  <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
                </TabsList>

                {/* Search and Filter Bar */}
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  {categoryColumn && uniqueCategories.length > 0 && (
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-full sm:w-48">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Filter by category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {uniqueCategories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>

                <TabsContent value={activeTable}>
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            {columns.map(col => (
                              <TableHead key={col} className="capitalize whitespace-nowrap">
                                {col.replace(/_/g, ' ')}
                              </TableHead>
                            ))}
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredData.map((item) => (
                            <TableRow key={item.id}>
                              {columns.map(col => (
                                <TableCell key={col} className="max-w-[200px] truncate">
                                  {typeof item[col] === 'boolean' 
                                    ? (item[col] ? '✓' : '✗')
                                    : (item[col] || '-')
                                  }
                                </TableCell>
                              ))}
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleEdit(item)}
                                  >
                                    <Pencil className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDelete(item.id)}
                                  >
                                    <Trash2 className="w-4 h-4 text-destructive" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                          {filteredData.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={columns.length + 1} className="text-center py-8 text-muted-foreground">
                                {searchQuery || categoryFilter !== 'all' ? 'No matching results' : 'No data found'}
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                      <div className="mt-2 text-sm text-muted-foreground">
                        Showing {filteredData.length} of {data.length} items
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}

        {/* Edit/Add Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Edit Item' : 'Add New Item'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              {columns.map(col => (
                <div key={col} className="space-y-2">
                  <label className="text-sm font-medium capitalize">
                    {col.replace(/_/g, ' ')}
                  </label>
                  {col === 'description' || col === 'value' || col === 'message' ? (
                    <Textarea
                      value={formData[col] || ''}
                      onChange={(e) => setFormData({ ...formData, [col]: e.target.value })}
                      rows={3}
                    />
                  ) : col === 'is_active' || col === 'is_approved' || col === 'available' ? (
                    <Select
                      value={String(formData[col] ?? 'true')}
                      onValueChange={(v) => setFormData({ ...formData, [col]: v === 'true' })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : col === 'status' ? (
                    <Select
                      value={formData[col] || ''}
                      onValueChange={(v) => setFormData({ ...formData, [col]: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="ongoing">Ongoing</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      value={formData[col] || ''}
                      onChange={(e) => setFormData({ ...formData, [col]: e.target.value })}
                    />
                  )}
                </div>
              ))}
              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleSave} className="flex-1">
                  {editingItem ? 'Update' : 'Add'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Admin;

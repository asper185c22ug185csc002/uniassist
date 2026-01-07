import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, LogOut, ArrowLeft, Loader2 } from 'lucide-react';
import periyarLogo from '@/assets/periyar-logo.jpg';

type TableName = 'departments' | 'courses' | 'news_feed' | 'library_books' | 'university_info' | 'achievements' | 'student_clubs' | 'hostel_info';

const Admin = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading, signOut } = useAuth();
  const { toast } = useToast();
  const [activeTable, setActiveTable] = useState<TableName>('news_feed');
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    } else if (!loading && user && !isAdmin) {
      toast({
        title: 'Access Denied',
        description: 'You need admin privileges to access this page.',
        variant: 'destructive',
      });
      navigate('/');
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [activeTable, isAdmin]);

  const fetchData = async () => {
    setIsLoading(true);
    const { data: result, error } = await supabase
      .from(activeTable)
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

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
      departments: ['name', 'school', 'email', 'phone', 'location'],
      courses: ['name', 'degree_type', 'duration', 'eligibility', 'total_fee'],
      news_feed: ['title', 'description', 'category', 'news_date'],
      library_books: ['title', 'author', 'category', 'isbn', 'location'],
      university_info: ['key', 'value', 'category'],
      achievements: ['title', 'description', 'category', 'year', 'icon_name'],
      student_clubs: ['name', 'description', 'members', 'icon_name'],
      hostel_info: ['location', 'room_capacity', 'total_capacity', 'monthly_rent', 'mess_charges'],
    };
    return columns[table] || [];
  };

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) return null;

  const columns = getTableColumns(activeTable);

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
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Manage University Data</CardTitle>
            <Button onClick={handleAdd}>
              <Plus className="w-4 h-4 mr-2" />
              Add New
            </Button>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTable} onValueChange={(v) => setActiveTable(v as TableName)}>
              <TabsList className="mb-4 flex-wrap h-auto gap-2">
                <TabsTrigger value="news_feed">News & Events</TabsTrigger>
                <TabsTrigger value="departments">Departments</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="library_books">Library Books</TabsTrigger>
                <TabsTrigger value="university_info">University Info</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="student_clubs">Student Clubs</TabsTrigger>
                <TabsTrigger value="hostel_info">Hostel Info</TabsTrigger>
              </TabsList>

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
                            <TableHead key={col} className="capitalize">
                              {col.replace(/_/g, ' ')}
                            </TableHead>
                          ))}
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data.map((item) => (
                          <TableRow key={item.id}>
                            {columns.map(col => (
                              <TableCell key={col} className="max-w-[200px] truncate">
                                {item[col] || '-'}
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
                        {data.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={columns.length + 1} className="text-center py-8 text-muted-foreground">
                              No data found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Edit/Add Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-md">
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
                  {col === 'description' || col === 'value' ? (
                    <Textarea
                      value={formData[col] || ''}
                      onChange={(e) => setFormData({ ...formData, [col]: e.target.value })}
                      rows={3}
                    />
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

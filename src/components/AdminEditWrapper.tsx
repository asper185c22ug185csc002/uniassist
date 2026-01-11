import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Pencil, Save, X } from 'lucide-react';

interface EditableFieldConfig {
  key: string;
  label: string;
  type?: 'text' | 'textarea' | 'number';
}

interface AdminEditWrapperProps {
  tableName: string;
  itemId: string;
  fields: EditableFieldConfig[];
  currentData: Record<string, any>;
  onUpdate?: () => void;
  children: React.ReactNode;
}

export const AdminEditWrapper = ({
  tableName,
  itemId,
  fields,
  currentData,
  onUpdate,
  children,
}: AdminEditWrapperProps) => {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>(currentData);
  const [isSaving, setIsSaving] = useState(false);

  if (!isAdmin) {
    return <>{children}</>;
  }

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from(tableName as any)
        .update(formData)
        .eq('id', itemId);

      if (error) throw error;

      toast({ title: 'Updated successfully!' });
      setIsEditing(false);
      onUpdate?.();
    } catch (error: any) {
      toast({
        title: 'Error updating',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="relative group">
      {children}
      
      {/* Edit Button - shows on hover for admin */}
      <Button
        variant="secondary"
        size="icon"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 h-8 w-8"
        onClick={() => {
          setFormData(currentData);
          setIsEditing(true);
        }}
      >
        <Pencil className="w-4 h-4" />
      </Button>

      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit {tableName.replace(/_/g, ' ')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {fields.map((field) => (
              <div key={field.key} className="space-y-2">
                <label className="text-sm font-medium">{field.label}</label>
                {field.type === 'textarea' ? (
                  <Textarea
                    value={formData[field.key] || ''}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    rows={3}
                  />
                ) : (
                  <Input
                    type={field.type || 'text'}
                    value={formData[field.key] || ''}
                    onChange={(e) => setFormData({ ...formData, [field.key]: field.type === 'number' ? Number(e.target.value) : e.target.value })}
                  />
                )}
              </div>
            ))}
            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Quick inline edit for simple fields
interface InlineEditProps {
  tableName: string;
  itemId: string;
  fieldName: string;
  value: string | number;
  onUpdate?: () => void;
  className?: string;
}

export const InlineEdit = ({
  tableName,
  itemId,
  fieldName,
  value,
  onUpdate,
  className,
}: InlineEditProps) => {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isSaving, setIsSaving] = useState(false);

  if (!isAdmin) {
    return <span className={className}>{value}</span>;
  }

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from(tableName as any)
        .update({ [fieldName]: editValue })
        .eq('id', itemId);

      if (error) throw error;

      toast({ title: 'Updated!' });
      setIsEditing(false);
      onUpdate?.();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-1">
        <Input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="h-7 text-sm"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
            if (e.key === 'Escape') setIsEditing(false);
          }}
        />
        <Button size="icon" variant="ghost" className="h-7 w-7" onClick={handleSave} disabled={isSaving}>
          <Save className="w-3 h-3" />
        </Button>
        <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setIsEditing(false)}>
          <X className="w-3 h-3" />
        </Button>
      </div>
    );
  }

  return (
    <span 
      className={`${className} cursor-pointer hover:bg-primary/10 px-1 rounded`}
      onClick={() => setIsEditing(true)}
      title="Click to edit"
    >
      {value}
    </span>
  );
};
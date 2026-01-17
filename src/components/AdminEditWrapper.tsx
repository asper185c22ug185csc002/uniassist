import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Pencil, Save, X, Edit3 } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    <div className="relative group admin-editable">
      {children}
      
      {/* Always visible edit indicator for admin */}
      <div className="absolute top-2 right-2 z-10 flex items-center gap-1">
        {/* Subtle always-visible indicator */}
        <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 opacity-60 group-hover:opacity-100 transition-all">
          <Edit3 className="w-3 h-3 text-orange-400" />
          <span className="text-[10px] font-medium text-orange-400 hidden group-hover:inline">Editable</span>
        </div>
        
        {/* Edit Button - more prominent on hover */}
        <Button
          variant="secondary"
          size="icon"
          className={cn(
            "h-7 w-7 bg-orange-500/20 hover:bg-orange-500/40 border border-orange-500/30",
            "opacity-40 group-hover:opacity-100 transition-all"
          )}
          onClick={() => {
            setFormData(currentData);
            setIsEditing(true);
          }}
        >
          <Pencil className="w-3.5 h-3.5 text-orange-400" />
        </Button>
      </div>

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
      className={cn(
        className,
        "cursor-pointer hover:bg-orange-500/10 px-1 rounded relative group inline-flex items-center gap-1",
        "border border-transparent hover:border-orange-500/20 transition-all"
      )}
      onClick={() => setIsEditing(true)}
      title="Click to edit"
    >
      {value}
      <Edit3 className="w-3 h-3 text-orange-400 opacity-40 group-hover:opacity-100 transition-opacity" />
    </span>
  );
};
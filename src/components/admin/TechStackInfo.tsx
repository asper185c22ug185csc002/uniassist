import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Code2, Database, Palette, Server, Shield, Zap, 
  FileCode, Layers, Globe, Lock
} from 'lucide-react';

interface TechCategory {
  title: string;
  icon: React.ReactNode;
  color: string;
  technologies: {
    name: string;
    description: string;
    files?: string[];
  }[];
}

export const TechStackInfo = () => {
  const techCategories: TechCategory[] = [
    {
      title: 'Frontend Framework',
      icon: <Code2 className="w-5 h-5" />,
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30',
      technologies: [
        {
          name: 'React 18',
          description: 'Component-based UI library for building interactive interfaces',
          files: ['src/App.tsx', 'src/main.tsx', 'src/pages/*.tsx', 'src/components/*.tsx'],
        },
        {
          name: 'TypeScript',
          description: 'Type-safe JavaScript for better developer experience',
          files: ['*.tsx', '*.ts', 'tsconfig.json'],
        },
        {
          name: 'Vite',
          description: 'Next-generation frontend build tool for fast development',
          files: ['vite.config.ts', 'index.html'],
        },
        {
          name: 'React Router',
          description: 'Client-side routing for navigation between pages',
          files: ['src/App.tsx'],
        },
      ],
    },
    {
      title: 'UI Components & Styling',
      icon: <Palette className="w-5 h-5" />,
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30',
      technologies: [
        {
          name: 'Tailwind CSS',
          description: 'Utility-first CSS framework for rapid UI development',
          files: ['tailwind.config.ts', 'src/index.css'],
        },
        {
          name: 'shadcn/ui',
          description: 'Beautifully designed components built with Radix UI',
          files: ['src/components/ui/*.tsx', 'components.json'],
        },
        {
          name: 'Radix UI',
          description: 'Unstyled, accessible UI primitives',
          files: ['src/components/ui/*.tsx'],
        },
        {
          name: 'Lucide React',
          description: 'Beautiful & consistent icon library',
          files: ['All component files using icons'],
        },
        {
          name: 'Framer Motion (via Tailwind)',
          description: 'Animation library for smooth transitions',
          files: ['tailwind.config.ts (animations)'],
        },
      ],
    },
    {
      title: 'State Management & Data Fetching',
      icon: <Layers className="w-5 h-5" />,
      color: 'bg-green-100 text-green-600 dark:bg-green-900/30',
      technologies: [
        {
          name: 'TanStack Query (React Query)',
          description: 'Powerful data synchronization and caching',
          files: ['src/App.tsx', 'src/hooks/*.ts', 'Component files with useQuery'],
        },
        {
          name: 'React Hooks',
          description: 'Custom hooks for reusable logic',
          files: ['src/hooks/useAuth.ts', 'src/hooks/useChatHistory.ts', 'src/hooks/useUniversityData.ts'],
        },
        {
          name: 'React Hook Form',
          description: 'Performant forms with validation',
          files: ['src/components/ui/form.tsx', 'Form components'],
        },
        {
          name: 'Zod',
          description: 'TypeScript-first schema validation',
          files: ['src/lib/validation.ts'],
        },
      ],
    },
    {
      title: 'Backend & Database',
      icon: <Database className="w-5 h-5" />,
      color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30',
      technologies: [
        {
          name: 'Supabase (Lovable Cloud)',
          description: 'Backend-as-a-Service with PostgreSQL database',
          files: ['src/integrations/supabase/client.ts', 'src/integrations/supabase/types.ts'],
        },
        {
          name: 'PostgreSQL',
          description: 'Relational database for data storage',
          files: ['supabase/migrations/*.sql'],
        },
        {
          name: 'Supabase Auth',
          description: 'Authentication and user management',
          files: ['src/hooks/useAuth.ts', 'src/pages/Auth.tsx'],
        },
        {
          name: 'Row Level Security (RLS)',
          description: 'Database-level security policies',
          files: ['supabase/migrations/*.sql'],
        },
      ],
    },
    {
      title: 'Edge Functions & APIs',
      icon: <Server className="w-5 h-5" />,
      color: 'bg-red-100 text-red-600 dark:bg-red-900/30',
      technologies: [
        {
          name: 'Supabase Edge Functions',
          description: 'Serverless functions for backend logic',
          files: ['supabase/functions/chat/index.ts', 'supabase/functions/admin-command/index.ts'],
        },
        {
          name: 'Deno Runtime',
          description: 'Secure runtime for Edge Functions',
          files: ['supabase/functions/**/*.ts'],
        },
        {
          name: 'REST API',
          description: 'Auto-generated REST endpoints from database',
          files: ['src/integrations/supabase/client.ts'],
        },
      ],
    },
    {
      title: 'Security & Authentication',
      icon: <Shield className="w-5 h-5" />,
      color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30',
      technologies: [
        {
          name: 'JWT Authentication',
          description: 'Secure token-based authentication',
          files: ['src/hooks/useAuth.ts'],
        },
        {
          name: 'Role-Based Access Control',
          description: 'Admin, user, student, alumni roles',
          files: ['src/hooks/useAuth.ts', 'user_roles table'],
        },
        {
          name: 'Leaked Password Protection',
          description: 'Prevents signup with compromised passwords',
          files: ['Supabase Auth config'],
        },
        {
          name: 'RLS Policies',
          description: 'Fine-grained database access control',
          files: ['supabase/migrations/*.sql'],
        },
      ],
    },
    {
      title: 'Development Tools',
      icon: <Zap className="w-5 h-5" />,
      color: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30',
      technologies: [
        {
          name: 'ESLint',
          description: 'Code linting and quality enforcement',
          files: ['eslint.config.js'],
        },
        {
          name: 'PostCSS',
          description: 'CSS processing and transformations',
          files: ['postcss.config.js'],
        },
        {
          name: 'Bun',
          description: 'Fast JavaScript runtime and package manager',
          files: ['bun.lockb'],
        },
      ],
    },
    {
      title: 'Key Feature Files',
      icon: <FileCode className="w-5 h-5" />,
      color: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30',
      technologies: [
        {
          name: 'AI Chat Interface',
          description: 'Interactive AI assistant for university queries',
          files: ['src/components/ChatInterface.tsx', 'supabase/functions/chat/index.ts'],
        },
        {
          name: 'Admin Panel',
          description: 'Comprehensive admin management dashboard',
          files: ['src/pages/Admin.tsx', 'src/components/admin/*.tsx'],
        },
        {
          name: 'Alumni Management',
          description: 'Alumni registration and directory',
          files: ['src/pages/Alumni.tsx'],
        },
        {
          name: 'Academic Hub',
          description: 'Courses, departments, and academic info',
          files: ['src/components/AcademicsHub.tsx', 'src/pages/Academics.tsx'],
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Globe className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Technology Stack Overview</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {techCategories.map((category) => (
          <Card key={category.title} className="overflow-hidden">
            <CardHeader className={`${category.color} py-3`}>
              <CardTitle className="flex items-center gap-2 text-lg">
                {category.icon}
                {category.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                {category.technologies.map((tech) => (
                  <div key={tech.name} className="border-b border-border/50 pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold">{tech.name}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{tech.description}</p>
                    {tech.files && (
                      <div className="flex flex-wrap gap-1">
                        {tech.files.slice(0, 3).map((file) => (
                          <Badge key={file} variant="outline" className="text-xs font-mono">
                            {file}
                          </Badge>
                        ))}
                        {tech.files.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{tech.files.length - 3} more
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Database Tables Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Database Tables
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {[
              'departments', 'courses', 'news_feed', 'library_books', 'university_info',
              'achievements', 'student_clubs', 'hostel_info', 'facilities', 'placement_stats',
              'top_recruiters', 'sports_events', 'alumni', 'internship_areas', 'inquiries',
              'industrial_visits', 'user_roles', 'digital_resources', 'library_collections', 'cdoe_programs'
            ].map((table) => (
              <Badge key={table} variant="outline" className="justify-center py-1.5">
                {table.replace(/_/g, ' ')}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Security Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold mb-2">Authentication</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Email/Password login</li>
                <li>• Auto-confirm email signups</li>
                <li>• Leaked password protection</li>
                <li>• Session management</li>
              </ul>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold mb-2">Authorization</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Role-based access (admin/user)</li>
                <li>• RLS policies on all tables</li>
                <li>• Secure admin verification</li>
                <li>• Protected routes</li>
              </ul>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold mb-2">Data Protection</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Public views for sensitive data</li>
                <li>• Input validation with Zod</li>
                <li>• HTTPS encryption</li>
                <li>• Environment secrets</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

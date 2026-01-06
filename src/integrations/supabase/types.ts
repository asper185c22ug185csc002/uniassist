export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          icon_name: string | null
          id: string
          title: string
          year: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          icon_name?: string | null
          id?: string
          title: string
          year?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          icon_name?: string | null
          id?: string
          title?: string
          year?: string | null
        }
        Relationships: []
      }
      cdoe_programs: {
        Row: {
          created_at: string
          degree_type: string | null
          duration: string | null
          eligibility: string | null
          fee_per_year: string | null
          id: string
          name: string
          total_fee: string | null
        }
        Insert: {
          created_at?: string
          degree_type?: string | null
          duration?: string | null
          eligibility?: string | null
          fee_per_year?: string | null
          id?: string
          name: string
          total_fee?: string | null
        }
        Update: {
          created_at?: string
          degree_type?: string | null
          duration?: string | null
          eligibility?: string | null
          fee_per_year?: string | null
          id?: string
          name?: string
          total_fee?: string | null
        }
        Relationships: []
      }
      courses: {
        Row: {
          created_at: string
          degree_type: string
          department_id: string | null
          duration: string | null
          eligibility: string | null
          first_year_fee: string | null
          fourth_sem_fee: string | null
          id: string
          is_active: boolean | null
          name: string
          per_year_fee: string | null
          second_year_fee: string | null
          third_sem_fee: string | null
          total_fee: string | null
        }
        Insert: {
          created_at?: string
          degree_type: string
          department_id?: string | null
          duration?: string | null
          eligibility?: string | null
          first_year_fee?: string | null
          fourth_sem_fee?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          per_year_fee?: string | null
          second_year_fee?: string | null
          third_sem_fee?: string | null
          total_fee?: string | null
        }
        Update: {
          created_at?: string
          degree_type?: string
          department_id?: string | null
          duration?: string | null
          eligibility?: string | null
          first_year_fee?: string | null
          fourth_sem_fee?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          per_year_fee?: string | null
          second_year_fee?: string | null
          third_sem_fee?: string | null
          total_fee?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "courses_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      departments: {
        Row: {
          color: string | null
          created_at: string
          email: string | null
          highlights: string[] | null
          icon_name: string | null
          id: string
          location: string | null
          name: string
          phone: string | null
          placements: string | null
          rating: number | null
          reviews: number | null
          school: string | null
          url: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string
          email?: string | null
          highlights?: string[] | null
          icon_name?: string | null
          id?: string
          location?: string | null
          name: string
          phone?: string | null
          placements?: string | null
          rating?: number | null
          reviews?: number | null
          school?: string | null
          url?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string
          email?: string | null
          highlights?: string[] | null
          icon_name?: string | null
          id?: string
          location?: string | null
          name?: string
          phone?: string | null
          placements?: string | null
          rating?: number | null
          reviews?: number | null
          school?: string | null
          url?: string | null
        }
        Relationships: []
      }
      digital_resources: {
        Row: {
          created_at: string
          description: string | null
          icon_name: string | null
          id: string
          resource_type: string
          title: string
          url: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon_name?: string | null
          id?: string
          resource_type: string
          title: string
          url?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          icon_name?: string | null
          id?: string
          resource_type?: string
          title?: string
          url?: string | null
        }
        Relationships: []
      }
      facilities: {
        Row: {
          capacity: string | null
          category: string
          created_at: string
          description: string | null
          features: string[] | null
          icon_name: string | null
          id: string
          name: string
        }
        Insert: {
          capacity?: string | null
          category: string
          created_at?: string
          description?: string | null
          features?: string[] | null
          icon_name?: string | null
          id?: string
          name: string
        }
        Update: {
          capacity?: string | null
          category?: string
          created_at?: string
          description?: string | null
          features?: string[] | null
          icon_name?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      hostel_info: {
        Row: {
          amenities: Json | null
          created_at: string
          food_menu: Json | null
          google_maps_url: string | null
          id: string
          location: string | null
          mess_charges: string | null
          monthly_rent: string | null
          rating: number | null
          room_capacity: string | null
          rules: string[] | null
          total_capacity: string | null
          total_reviews: number | null
        }
        Insert: {
          amenities?: Json | null
          created_at?: string
          food_menu?: Json | null
          google_maps_url?: string | null
          id?: string
          location?: string | null
          mess_charges?: string | null
          monthly_rent?: string | null
          rating?: number | null
          room_capacity?: string | null
          rules?: string[] | null
          total_capacity?: string | null
          total_reviews?: number | null
        }
        Update: {
          amenities?: Json | null
          created_at?: string
          food_menu?: Json | null
          google_maps_url?: string | null
          id?: string
          location?: string | null
          mess_charges?: string | null
          monthly_rent?: string | null
          rating?: number | null
          room_capacity?: string | null
          rules?: string[] | null
          total_capacity?: string | null
          total_reviews?: number | null
        }
        Relationships: []
      }
      library_books: {
        Row: {
          author: string
          available: boolean | null
          category: string
          created_at: string
          department: string | null
          id: string
          isbn: string | null
          location: string | null
          title: string
        }
        Insert: {
          author: string
          available?: boolean | null
          category: string
          created_at?: string
          department?: string | null
          id?: string
          isbn?: string | null
          location?: string | null
          title: string
        }
        Update: {
          author?: string
          available?: boolean | null
          category?: string
          created_at?: string
          department?: string | null
          id?: string
          isbn?: string | null
          location?: string | null
          title?: string
        }
        Relationships: []
      }
      library_collections: {
        Row: {
          created_at: string
          department: string
          e_books: number | null
          icon_name: string | null
          id: string
          journals: number | null
          location: string | null
          theses: number | null
          total_books: number | null
        }
        Insert: {
          created_at?: string
          department: string
          e_books?: number | null
          icon_name?: string | null
          id?: string
          journals?: number | null
          location?: string | null
          theses?: number | null
          total_books?: number | null
        }
        Update: {
          created_at?: string
          department?: string
          e_books?: number | null
          icon_name?: string | null
          id?: string
          journals?: number | null
          location?: string | null
          theses?: number | null
          total_books?: number | null
        }
        Relationships: []
      }
      news_feed: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          news_date: string | null
          title: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          news_date?: string | null
          title: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          news_date?: string | null
          title?: string
        }
        Relationships: []
      }
      placement_stats: {
        Row: {
          academic_year: string
          average_package: string | null
          companies: number | null
          created_at: string
          highest_package: string | null
          id: string
          students_placed: number | null
        }
        Insert: {
          academic_year: string
          average_package?: string | null
          companies?: number | null
          created_at?: string
          highest_package?: string | null
          id?: string
          students_placed?: number | null
        }
        Update: {
          academic_year?: string
          average_package?: string | null
          companies?: number | null
          created_at?: string
          highest_package?: string | null
          id?: string
          students_placed?: number | null
        }
        Relationships: []
      }
      sports_events: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          event_date: string | null
          id: string
          status: string | null
          title: string
          venue: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          event_date?: string | null
          id?: string
          status?: string | null
          title: string
          venue?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          event_date?: string | null
          id?: string
          status?: string | null
          title?: string
          venue?: string | null
        }
        Relationships: []
      }
      student_clubs: {
        Row: {
          created_at: string
          description: string | null
          icon_name: string | null
          id: string
          members: string | null
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon_name?: string | null
          id?: string
          members?: string | null
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon_name?: string | null
          id?: string
          members?: string | null
          name?: string
        }
        Relationships: []
      }
      top_recruiters: {
        Row: {
          company_name: string
          created_at: string
          id: string
          sector: string | null
        }
        Insert: {
          company_name: string
          created_at?: string
          id?: string
          sector?: string | null
        }
        Update: {
          company_name?: string
          created_at?: string
          id?: string
          sector?: string | null
        }
        Relationships: []
      }
      university_info: {
        Row: {
          category: string | null
          created_at: string
          id: string
          key: string
          value: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          id?: string
          key: string
          value?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          id?: string
          key?: string
          value?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const

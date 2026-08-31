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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      applications: {
        Row: {
          created_at: string
          cv_url: string | null
          email: string
          full_name: string
          id: string
          motivation: string | null
          opportunity_id: string | null
          phone: string
          profile: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          cv_url?: string | null
          email: string
          full_name: string
          id?: string
          motivation?: string | null
          opportunity_id?: string | null
          phone: string
          profile?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          cv_url?: string | null
          email?: string
          full_name?: string
          id?: string
          motivation?: string | null
          opportunity_id?: string | null
          phone?: string
          profile?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
        ]
      }
      articles: {
        Row: {
          body: Json
          category: string
          cover_url: string | null
          created_at: string
          date_label: string
          excerpt: string
          featured: boolean
          focal: string | null
          id: string
          location: string
          slug: string
          sort_order: number
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          body?: Json
          category?: string
          cover_url?: string | null
          created_at?: string
          date_label?: string
          excerpt?: string
          featured?: boolean
          focal?: string | null
          id?: string
          location?: string
          slug: string
          sort_order?: number
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          body?: Json
          category?: string
          cover_url?: string | null
          created_at?: string
          date_label?: string
          excerpt?: string
          featured?: boolean
          focal?: string | null
          id?: string
          location?: string
          slug?: string
          sort_order?: number
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      certificates: {
        Row: {
          course_id: string
          id: string
          issued_at: string
          user_id: string
          verification_code: string
        }
        Insert: {
          course_id: string
          id?: string
          issued_at?: string
          user_id: string
          verification_code?: string
        }
        Update: {
          course_id?: string
          id?: string
          issued_at?: string
          user_id?: string
          verification_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "certificates_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          cover_url: string | null
          created_at: string
          description: string | null
          duration_minutes: number | null
          id: string
          is_free: boolean
          legal_notice: string | null
          level: string
          published: boolean
          slug: string
          sort_order: number
          source_provider: string | null
          source_type: string
          source_url: string
          title: string
          track: string
        }
        Insert: {
          cover_url?: string | null
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_free?: boolean
          legal_notice?: string | null
          level?: string
          published?: boolean
          slug: string
          sort_order?: number
          source_provider?: string | null
          source_type?: string
          source_url?: string
          title: string
          track?: string
        }
        Update: {
          cover_url?: string | null
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_free?: boolean
          legal_notice?: string | null
          level?: string
          published?: boolean
          slug?: string
          sort_order?: number
          source_provider?: string | null
          source_type?: string
          source_url?: string
          title?: string
          track?: string
        }
        Relationships: []
      }
      dumps_alerts: {
        Row: {
          accuracy: number | null
          captured_at: string | null
          created_at: string
          id: string
          latitude: number | null
          longitude: number | null
          photo_url: string | null
          repere: string | null
          status: string
          user_id: string | null
        }
        Insert: {
          accuracy?: number | null
          captured_at?: string | null
          created_at?: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          photo_url?: string | null
          repere?: string | null
          status?: string
          user_id?: string | null
        }
        Update: {
          accuracy?: number | null
          captured_at?: string | null
          created_at?: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          photo_url?: string | null
          repere?: string | null
          status?: string
          user_id?: string | null
        }
        Relationships: []
      }
      enrollments: {
        Row: {
          completed_at: string | null
          course_id: string
          id: string
          progress_pct: number
          started_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          course_id: string
          id?: string
          progress_pct?: number
          started_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          course_id?: string
          id?: string
          progress_pct?: number
          started_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      module_progress: {
        Row: {
          completed_at: string | null
          id: string
          module_id: string
          status: string
          updated_at: string
          user_id: string
          watched_seconds: number
        }
        Insert: {
          completed_at?: string | null
          id?: string
          module_id: string
          status?: string
          updated_at?: string
          user_id: string
          watched_seconds?: number
        }
        Update: {
          completed_at?: string | null
          id?: string
          module_id?: string
          status?: string
          updated_at?: string
          user_id?: string
          watched_seconds?: number
        }
        Relationships: [
          {
            foreignKeyName: "module_progress_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      modules: {
        Row: {
          course_id: string
          created_at: string
          duration_minutes: number | null
          id: string
          position: number
          source_type: string
          source_url: string
          title: string
          video_id: string | null
        }
        Insert: {
          course_id: string
          created_at?: string
          duration_minutes?: number | null
          id?: string
          position?: number
          source_type?: string
          source_url?: string
          title: string
          video_id?: string | null
        }
        Update: {
          course_id?: string
          created_at?: string
          duration_minutes?: number | null
          id?: string
          position?: number
          source_type?: string
          source_url?: string
          title?: string
          video_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "modules_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      opportunities: {
        Row: {
          application_mode: string
          badge: string | null
          category: string
          cover_image: string | null
          created_at: string
          description: string
          id: string
          modules: Json
          pricing: Json
          registration_deadline: string | null
          sessions: Json
          short_description: string
          slug: string
          sort_order: number
          status: string
          title: string
          updated_at: string
          whatsapp_message: string | null
        }
        Insert: {
          application_mode?: string
          badge?: string | null
          category?: string
          cover_image?: string | null
          created_at?: string
          description?: string
          id?: string
          modules?: Json
          pricing?: Json
          registration_deadline?: string | null
          sessions?: Json
          short_description?: string
          slug: string
          sort_order?: number
          status?: string
          title: string
          updated_at?: string
          whatsapp_message?: string | null
        }
        Update: {
          application_mode?: string
          badge?: string | null
          category?: string
          cover_image?: string | null
          created_at?: string
          description?: string
          id?: string
          modules?: Json
          pricing?: Json
          registration_deadline?: string | null
          sessions?: Json
          short_description?: string
          slug?: string
          sort_order?: number
          status?: string
          title?: string
          updated_at?: string
          whatsapp_message?: string | null
        }
        Relationships: []
      }
      pickup_requests: {
        Row: {
          created_at: string
          id: string
          repere: string
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          repere: string
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          repere?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      plastic_sales: {
        Row: {
          created_at: string
          id: string
          kilos: number
          photo_url: string | null
          repere: string
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          kilos?: number
          photo_url?: string | null
          repere: string
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          kilos?: number
          photo_url?: string | null
          repere?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          commune: string | null
          created_at: string
          id: string
          nom: string | null
          prenom: string | null
          pseudo: string | null
          quartier: string | null
          tel: string | null
        }
        Insert: {
          commune?: string | null
          created_at?: string
          id: string
          nom?: string | null
          prenom?: string | null
          pseudo?: string | null
          quartier?: string | null
          tel?: string | null
        }
        Update: {
          commune?: string | null
          created_at?: string
          id?: string
          nom?: string | null
          prenom?: string | null
          pseudo?: string | null
          quartier?: string | null
          tel?: string | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          bio: string | null
          created_at: string
          display_order: number
          full_name: string
          id: string
          photo_url: string | null
          role: string
          team_group: string
          updated_at: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          display_order?: number
          full_name: string
          id?: string
          photo_url?: string | null
          role?: string
          team_group?: string
          updated_at?: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          display_order?: number
          full_name?: string
          id?: string
          photo_url?: string | null
          role?: string
          team_group?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
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
      app_role: "admin" | "moderator" | "user"
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
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const

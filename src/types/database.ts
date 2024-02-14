export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          cabin_id: number;
          cabin_price: number;
          created_at: string;
          end_date: string;
          extra_price: number | null;
          guest_id: number;
          has_breakfast: boolean | null;
          id: number;
          is_already_paid: boolean | null;
          no_guests: number;
          no_nights: number;
          observations: string | null;
          start_date: string;
          status: Database["public"]["Enums"]["book_statuses"] | null;
          total_due: number;
        };
        Insert: {
          cabin_id: number;
          cabin_price: number;
          created_at?: string;
          end_date: string;
          extra_price?: number | null;
          guest_id: number;
          has_breakfast?: boolean | null;
          id?: number;
          is_already_paid?: boolean | null;
          no_guests: number;
          no_nights: number;
          observations?: string | null;
          start_date: string;
          status?: Database["public"]["Enums"]["book_statuses"] | null;
          total_due: number;
        };
        Update: {
          cabin_id?: number;
          cabin_price?: number;
          created_at?: string;
          end_date?: string;
          extra_price?: number | null;
          guest_id?: number;
          has_breakfast?: boolean | null;
          id?: number;
          is_already_paid?: boolean | null;
          no_guests?: number;
          no_nights?: number;
          observations?: string | null;
          start_date?: string;
          status?: Database["public"]["Enums"]["book_statuses"] | null;
          total_due?: number;
        };
        Relationships: [
          {
            foreignKeyName: "bookings_cabin_id_fkey";
            columns: ["cabin_id"];
            isOneToOne: false;
            referencedRelation: "cabins";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bookings_guest_id_fkey";
            columns: ["guest_id"];
            isOneToOne: false;
            referencedRelation: "guests";
            referencedColumns: ["id"];
          },
        ];
      };
      cabins: {
        Row: {
          created_at: string;
          description: string;
          discount: number | null;
          id: number;
          image: string;
          max_capacity: number;
          name: string;
          regular_price: number;
        };
        Insert: {
          created_at?: string;
          description: string;
          discount?: number | null;
          id?: number;
          image: string;
          max_capacity: number;
          name: string;
          regular_price: number;
        };
        Update: {
          created_at?: string;
          description?: string;
          discount?: number | null;
          id?: number;
          image?: string;
          max_capacity?: number;
          name?: string;
          regular_price?: number;
        };
        Relationships: [];
      };
      guests: {
        Row: {
          country_flag: string | null;
          created_at: string;
          email: string;
          full_name: string;
          id: number;
          national_id: string;
          nationality: string;
        };
        Insert: {
          country_flag?: string | null;
          created_at?: string;
          email: string;
          full_name: string;
          id?: number;
          national_id: string;
          nationality: string;
        };
        Update: {
          country_flag?: string | null;
          created_at?: string;
          email?: string;
          full_name?: string;
          id?: number;
          national_id?: string;
          nationality?: string;
        };
        Relationships: [];
      };
      settings: {
        Row: {
          breakfast_price: number | null;
          created_at: string;
          id: number;
          max_booking_length: number | null;
          max_guests_per_booking: number | null;
          min_booking_length: number | null;
        };
        Insert: {
          breakfast_price?: number | null;
          created_at?: string;
          id?: number;
          max_booking_length?: number | null;
          max_guests_per_booking?: number | null;
          min_booking_length?: number | null;
        };
        Update: {
          breakfast_price?: number | null;
          created_at?: string;
          id?: number;
          max_booking_length?: number | null;
          max_guests_per_booking?: number | null;
          min_booking_length?: number | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      book_statuses: "unconfirmed" | "checked out" | "checked in";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never;

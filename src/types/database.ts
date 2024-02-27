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
          is_paid: boolean | null;
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
          is_paid?: boolean | null;
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
          is_paid?: boolean | null;
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
    Enums: {
      book_statuses: "unconfirmed" | "checked out" | "checked in";
    };
  };
};

export type TableRowNames = keyof Database["public"]["Tables"];

export type TableRow<TableName extends TableRowNames> =
  Database["public"]["Tables"][TableName]["Row"];

export type TableRowInsert<TableName extends TableRowNames> =
  Database["public"]["Tables"][TableName]["Insert"];

export type TableRowUpdate<TableName extends TableRowNames> =
  Database["public"]["Tables"][TableName]["Update"];

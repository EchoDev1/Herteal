export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          full_name: string;
          phone: string | null;
          location: string | null;
          role: 'customer' | 'admin';
          status: 'active' | 'inactive';
          total_orders: number;
          total_spent: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['user_profiles']['Row'], 'id' | 'created_at' | 'updated_at' | 'total_orders' | 'total_spent'>;
        Update: Partial<Database['public']['Tables']['user_profiles']['Insert']>;
      };
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          long_description: string | null;
          price: number;
          sale_price: number | null;
          on_sale: boolean;
          stock: number;
          collection_id: string | null;
          category: 'dresses' | 'suits' | 'blouses';
          fabric: string | null;
          care_instructions: string | null;
          featured: boolean;
          status: 'active' | 'inactive' | 'draft';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['products']['Insert']>;
      };
      collections: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image_url: string | null;
          featured: boolean;
          display_order: number;
          product_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['collections']['Row'], 'id' | 'created_at' | 'updated_at' | 'product_count'>;
        Update: Partial<Database['public']['Tables']['collections']['Insert']>;
      };
      orders: {
        Row: {
          id: string;
          order_number: string;
          user_id: string | null;
          customer_name: string;
          customer_email: string;
          customer_phone: string | null;
          status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
          subtotal: number;
          tax: number;
          shipping_fee: number;
          total: number;
          payment_method: string | null;
          payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['orders']['Row'], 'id' | 'created_at' | 'updated_at' | 'order_number'>;
        Update: Partial<Database['public']['Tables']['orders']['Insert']>;
      };
      site_pages: {
        Row: {
          id: string;
          title: string;
          slug: string;
          content: string;
          meta_description: string | null;
          last_updated: string | null;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['site_pages']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['site_pages']['Insert']>;
      };
      testimonials: {
        Row: {
          id: string;
          customer_name: string;
          location: string | null;
          rating: number;
          testimonial_text: string;
          image_url: string | null;
          featured: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['testimonials']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['testimonials']['Insert']>;
      };
      homepage_sections: {
        Row: {
          id: string;
          section_type: 'hero' | 'promo_banner';
          title: string | null;
          subtitle: string | null;
          content: string | null;
          image_url: string | null;
          cta_text: string | null;
          cta_link: string | null;
          enabled: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['homepage_sections']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['homepage_sections']['Insert']>;
      };
      site_settings: {
        Row: {
          id: string;
          key: string;
          value: string;
          category: 'general' | 'payment' | 'email' | 'shipping';
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['site_settings']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['site_settings']['Insert']>;
      };
    };
  };
}

-- ================================================
-- HERTEALS E-COMMERCE DATABASE SCHEMA
-- Supabase PostgreSQL Database
-- ================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ================================================
-- USERS & AUTHENTICATION
-- ================================================

-- Extend Supabase auth.users with profile information
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone TEXT,
    location TEXT,
    role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    total_orders INTEGER DEFAULT 0,
    total_spent DECIMAL(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================
-- PRODUCTS & COLLECTIONS
-- ================================================

-- Collections (Categories)
CREATE TABLE IF NOT EXISTS public.collections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    featured BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    product_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    long_description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    sale_price DECIMAL(10, 2),
    on_sale BOOLEAN DEFAULT false,
    stock INTEGER NOT NULL DEFAULT 0,
    collection_id UUID REFERENCES public.collections(id) ON DELETE SET NULL,
    category TEXT NOT NULL CHECK (category IN ('dresses', 'suits', 'blouses')),
    fabric TEXT,
    care_instructions TEXT,
    featured BOOLEAN DEFAULT false,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'draft')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product Images
CREATE TABLE IF NOT EXISTS public.product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    display_order INTEGER DEFAULT 0,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product Sizes
CREATE TABLE IF NOT EXISTS public.product_sizes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    label TEXT NOT NULL,
    in_stock BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product Colors
CREATE TABLE IF NOT EXISTS public.product_colors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    hex_code TEXT NOT NULL,
    in_stock BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================
-- ORDERS & CHECKOUT
-- ================================================

-- Orders
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number TEXT UNIQUE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
    subtotal DECIMAL(10, 2) NOT NULL,
    tax DECIMAL(10, 2) NOT NULL,
    shipping_fee DECIMAL(10, 2) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    payment_method TEXT,
    payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order Items
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    product_price DECIMAL(10, 2) NOT NULL,
    selected_size TEXT,
    selected_color TEXT,
    quantity INTEGER NOT NULL DEFAULT 1,
    subtotal DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Shipping Addresses
CREATE TABLE IF NOT EXISTS public.shipping_addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    address_line1 TEXT NOT NULL,
    address_line2 TEXT,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip_code TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'Nigeria',
    phone TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================
-- PAYMENTS & TRANSACTIONS
-- ================================================

-- Payment Transactions
CREATE TABLE IF NOT EXISTS public.payment_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_id TEXT UNIQUE NOT NULL,
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    reference TEXT UNIQUE NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method TEXT NOT NULL CHECK (payment_method IN ('paystack', 'flutterwave', 'opay', 'bank_transfer', 'card', 'cash')),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    gateway_response JSONB,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================
-- CONTENT MANAGEMENT
-- ================================================

-- Site Pages (Privacy, Terms, etc.)
CREATE TABLE IF NOT EXISTS public.site_pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    meta_description TEXT,
    last_updated TEXT,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Homepage Sections
CREATE TABLE IF NOT EXISTS public.homepage_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section_type TEXT UNIQUE NOT NULL CHECK (section_type IN ('hero', 'promo_banner')),
    title TEXT,
    subtitle TEXT,
    content TEXT,
    image_url TEXT,
    cta_text TEXT,
    cta_link TEXT,
    enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name TEXT NOT NULL,
    location TEXT,
    rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    testimonial_text TEXT NOT NULL,
    image_url TEXT,
    featured BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================
-- SITE SETTINGS
-- ================================================

-- Settings
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('general', 'payment', 'email', 'shipping')),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================
-- INDEXES FOR PERFORMANCE
-- ================================================

-- Products
CREATE INDEX idx_products_slug ON public.products(slug);
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_collection_id ON public.products(collection_id);
CREATE INDEX idx_products_status ON public.products(status);
CREATE INDEX idx_products_featured ON public.products(featured);

-- Collections
CREATE INDEX idx_collections_slug ON public.collections(slug);
CREATE INDEX idx_collections_featured ON public.collections(featured);

-- Orders
CREATE INDEX idx_orders_order_number ON public.orders(order_number);
CREATE INDEX idx_orders_user_id ON public.orders(user_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_created_at ON public.orders(created_at DESC);

-- Order Items
CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX idx_order_items_product_id ON public.order_items(product_id);

-- Payment Transactions
CREATE INDEX idx_payment_transactions_transaction_id ON public.payment_transactions(transaction_id);
CREATE INDEX idx_payment_transactions_order_id ON public.payment_transactions(order_id);
CREATE INDEX idx_payment_transactions_status ON public.payment_transactions(status);
CREATE INDEX idx_payment_transactions_payment_method ON public.payment_transactions(payment_method);
CREATE INDEX idx_payment_transactions_created_at ON public.payment_transactions(created_at DESC);

-- User Profiles
CREATE INDEX idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX idx_user_profiles_status ON public.user_profiles(status);

-- ================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ================================================

-- Enable RLS on all tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_sizes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_colors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipping_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;

-- Public read access for products and collections
CREATE POLICY "Public can view active products" ON public.products
    FOR SELECT USING (status = 'active');

CREATE POLICY "Public can view collections" ON public.collections
    FOR SELECT USING (true);

CREATE POLICY "Public can view product images" ON public.product_images
    FOR SELECT USING (true);

CREATE POLICY "Public can view product sizes" ON public.product_sizes
    FOR SELECT USING (true);

CREATE POLICY "Public can view product colors" ON public.product_colors
    FOR SELECT USING (true);

CREATE POLICY "Public can view site pages" ON public.site_pages
    FOR SELECT USING (published = true);

CREATE POLICY "Public can view homepage sections" ON public.homepage_sections
    FOR SELECT USING (enabled = true);

CREATE POLICY "Public can view testimonials" ON public.testimonials
    FOR SELECT USING (true);

-- Admin policies (full access for admin role)
CREATE POLICY "Admins have full access to user_profiles" ON public.user_profiles
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins have full access to products" ON public.products
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins have full access to collections" ON public.collections
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins have full access to orders" ON public.orders
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins have full access to site_pages" ON public.site_pages
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins have full access to site_settings" ON public.site_settings
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins have full access to payment_transactions" ON public.payment_transactions
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- User policies (customers can view their own orders)
CREATE POLICY "Users can view their own orders" ON public.orders
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can view their own profile" ON public.user_profiles
    FOR SELECT USING (id = auth.uid());

CREATE POLICY "Users can update their own profile" ON public.user_profiles
    FOR UPDATE USING (id = auth.uid());

-- ================================================
-- FUNCTIONS & TRIGGERS
-- ================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all relevant tables
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_collections_updated_at BEFORE UPDATE ON public.collections
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_pages_updated_at BEFORE UPDATE ON public.site_pages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_homepage_sections_updated_at BEFORE UPDATE ON public.homepage_sections
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON public.testimonials
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payment_transactions_updated_at BEFORE UPDATE ON public.payment_transactions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
BEGIN
    RETURN 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(NEXTVAL('order_number_seq')::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;

-- Sequence for order numbers
CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1;

-- ================================================
-- SEED DATA (Initial Setup)
-- ================================================

-- Insert default collections
INSERT INTO public.collections (name, slug, description, image_url, featured, display_order)
VALUES
    ('Dresses', 'dresses', 'Elegant dresses for every occasion', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8', true, 1),
    ('Suits', 'suits', 'Tailored suits for the modern woman', 'https://images.unsplash.com/photo-1594938291221-94f18cbb5660', true, 2),
    ('Blouses', 'blouses', 'Sophisticated blouses and tops', 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6', true, 3)
ON CONFLICT (slug) DO NOTHING;

-- Insert default site pages
INSERT INTO public.site_pages (title, slug, content, last_updated, published)
VALUES
    ('Privacy Policy', 'privacy', 'Privacy policy content...', 'January 2026', true),
    ('Terms & Conditions', 'terms', 'Terms and conditions content...', 'January 2026', true),
    ('Complaints & Support', 'complaints', 'Customer support information...', 'January 2026', true)
ON CONFLICT (slug) DO NOTHING;

-- Insert default homepage sections
INSERT INTO public.homepage_sections (section_type, title, subtitle, image_url, cta_text, cta_link, enabled)
VALUES
    ('hero', 'LUXURY TAILORED FOR YOU', 'Discover elegance in every stitch', 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956', 'SHOP NOW', '/shop', true),
    ('promo_banner', '', 'FREE SHIPPING ON ORDERS OVER ₦50,000', '', '', '/shop', true)
ON CONFLICT (section_type) DO NOTHING;

-- Insert default site settings
INSERT INTO public.site_settings (key, value, category, description)
VALUES
    ('site_name', 'Herteals', 'general', 'Site name'),
    ('site_description', 'Luxury Tailored Fashion for Women', 'general', 'Site description'),
    ('contact_email', 'info@herteals.com', 'general', 'Contact email'),
    ('contact_phone', '+234 800 123 4567', 'general', 'Contact phone'),
    ('currency', '₦', 'general', 'Currency symbol'),
    ('tax_rate', '8', 'general', 'Tax rate percentage'),
    ('shipping_fee', '15', 'shipping', 'Standard shipping fee'),
    ('free_shipping_threshold', '500', 'shipping', 'Free shipping threshold'),
    ('paystack_enabled', 'false', 'payment', 'Paystack payment gateway'),
    ('flutterwave_enabled', 'false', 'payment', 'Flutterwave payment gateway'),
    ('opay_enabled', 'false', 'payment', 'Opay payment gateway'),
    ('bank_transfer_enabled', 'false', 'payment', 'Bank transfer option'),
    ('order_confirmation_email', 'true', 'email', 'Order confirmation email'),
    ('order_shipped_email', 'true', 'email', 'Order shipped notification'),
    ('order_delivered_email', 'true', 'email', 'Order delivered notification'),
    ('newsletter_enabled', 'true', 'email', 'Newsletter subscriptions')
ON CONFLICT (key) DO NOTHING;

-- ================================================
-- COMMENTS FOR DOCUMENTATION
-- ================================================

COMMENT ON TABLE public.user_profiles IS 'Extended user profile information';
COMMENT ON TABLE public.collections IS 'Product collections/categories';
COMMENT ON TABLE public.products IS 'Product catalog';
COMMENT ON TABLE public.orders IS 'Customer orders';
COMMENT ON TABLE public.site_pages IS 'CMS pages (Privacy, Terms, etc.)';
COMMENT ON TABLE public.homepage_sections IS 'Homepage editable sections';
COMMENT ON TABLE public.testimonials IS 'Customer testimonials';
COMMENT ON TABLE public.site_settings IS 'Site-wide configuration settings';

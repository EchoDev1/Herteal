/**
 * Database Query Functions
 * Centralized database operations using Supabase
 */

import { getSupabase } from '../supabase/client';

// ================================================
// PRODUCTS
// ================================================

export async function getProducts(filters?: {
  category?: string;
  collection?: string;
  featured?: boolean;
  status?: string;
}) {
  const supabase = getSupabase();
  if (!supabase) {
    // Return empty array if Supabase not configured
    return { data: [], error: null };
  }

  let query = supabase
    .from('products')
    .select(`
      *,
      collection:collections(*)
    `)
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  if (filters?.category) {
    query = query.eq('category', filters.category);
  }

  if (filters?.collection) {
    query = query.eq('collection_id', filters.collection);
  }

  if (filters?.featured !== undefined) {
    query = query.eq('featured', filters.featured);
  }

  return await query;
}

export async function getProductBySlug(slug: string) {
  const supabase = getSupabase();
  if (!supabase) {
    return { data: null, error: null };
  }

  return await supabase
    .from('products')
    .select(`
      *,
      collection:collections(*),
      images:product_images(*),
      sizes:product_sizes(*),
      colors:product_colors(*)
    `)
    .eq('slug', slug)
    .eq('status', 'active')
    .single();
}

export async function createProduct(product: any) {
  const supabase = getSupabase();
  if (!supabase) {
    return { data: null, error: { message: 'Database not configured' } };
  }

  return await supabase
    .from('products')
    .insert([product])
    .select()
    .single();
}

export async function updateProduct(id: string, updates: any) {
  const supabase = getSupabase();
  if (!supabase) {
    return { data: null, error: { message: 'Database not configured' } };
  }

  return await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
}

export async function deleteProduct(id: string) {
  const supabase = getSupabase();
  if (!supabase) {
    return { data: null, error: { message: 'Database not configured' } };
  }

  return await supabase
    .from('products')
    .delete()
    .eq('id', id);
}

// ================================================
// ORDERS
// ================================================

export async function getOrders(filters?: {
  status?: string;
  userId?: string;
}) {
  const supabase = getSupabase();
  if (!supabase) {
    return { data: [], error: null };
  }

  let query = supabase
    .from('orders')
    .select(`
      *,
      items:order_items(*),
      shipping:shipping_addresses(*)
    `)
    .order('created_at', { ascending: false });

  if (filters?.status && filters.status !== 'all') {
    query = query.eq('status', filters.status);
  }

  if (filters?.userId) {
    query = query.eq('user_id', filters.userId);
  }

  return await query;
}

export async function getOrderById(id: string) {
  const supabase = getSupabase();
  if (!supabase) {
    return { data: null, error: null };
  }

  return await supabase
    .from('orders')
    .select(`
      *,
      items:order_items(*),
      shipping:shipping_addresses(*),
      transactions:payment_transactions(*)
    `)
    .eq('id', id)
    .single();
}

export async function createOrder(order: any, items: any[], shipping: any) {
  const supabase = getSupabase();
  if (!supabase) {
    return { data: null, error: { message: 'Database not configured' } };
  }

  // Insert order
  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert([order])
    .select()
    .single();

  if (orderError || !orderData) {
    return { data: null, error: orderError };
  }

  // Insert order items
  const itemsWithOrderId = items.map(item => ({
    ...item,
    order_id: orderData.id,
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(itemsWithOrderId);

  if (itemsError) {
    return { data: null, error: itemsError };
  }

  // Insert shipping address
  const shippingWithOrderId = {
    ...shipping,
    order_id: orderData.id,
  };

  const { error: shippingError } = await supabase
    .from('shipping_addresses')
    .insert([shippingWithOrderId]);

  if (shippingError) {
    return { data: null, error: shippingError };
  }

  return { data: orderData, error: null };
}

export async function updateOrderStatus(id: string, status: string) {
  const supabase = getSupabase();
  if (!supabase) {
    return { data: null, error: { message: 'Database not configured' } };
  }

  return await supabase
    .from('orders')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
}

// ================================================
// USERS
// ================================================

export async function getUserProfiles(filters?: {
  role?: string;
  status?: string;
}) {
  const supabase = getSupabase();
  if (!supabase) {
    return { data: [], error: null };
  }

  let query = supabase
    .from('user_profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters?.role) {
    query = query.eq('role', filters.role);
  }

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }

  return await query;
}

export async function updateUserProfile(id: string, updates: any) {
  const supabase = getSupabase();
  if (!supabase) {
    return { data: null, error: { message: 'Database not configured' } };
  }

  return await supabase
    .from('user_profiles')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
}

// ================================================
// COLLECTIONS
// ================================================

export async function getCollections() {
  const supabase = getSupabase();
  if (!supabase) {
    return { data: [], error: null };
  }

  return await supabase
    .from('collections')
    .select('*')
    .order('display_order', { ascending: true });
}

export async function createCollection(collection: any) {
  const supabase = getSupabase();
  if (!supabase) {
    return { data: null, error: { message: 'Database not configured' } };
  }

  return await supabase
    .from('collections')
    .insert([collection])
    .select()
    .single();
}

export async function updateCollection(id: string, updates: any) {
  const supabase = getSupabase();
  if (!supabase) {
    return { data: null, error: { message: 'Database not configured' } };
  }

  return await supabase
    .from('collections')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
}

export async function deleteCollection(id: string) {
  const supabase = getSupabase();
  if (!supabase) {
    return { data: null, error: { message: 'Database not configured' } };
  }

  return await supabase
    .from('collections')
    .delete()
    .eq('id', id);
}

// ================================================
// PAYMENT TRANSACTIONS
// ================================================

export async function getPaymentTransactions(filters?: {
  status?: string;
  paymentMethod?: string;
}) {
  const supabase = getSupabase();
  if (!supabase) {
    return { data: [], error: null };
  }

  let query = supabase
    .from('payment_transactions')
    .select(`
      *,
      order:orders(*)
    `)
    .order('created_at', { ascending: false });

  if (filters?.status && filters.status !== 'all') {
    query = query.eq('status', filters.status);
  }

  if (filters?.paymentMethod) {
    query = query.eq('payment_method', filters.paymentMethod);
  }

  return await query;
}

export async function createPaymentTransaction(transaction: any) {
  const supabase = getSupabase();
  if (!supabase) {
    return { data: null, error: { message: 'Database not configured' } };
  }

  return await supabase
    .from('payment_transactions')
    .insert([transaction])
    .select()
    .single();
}

// ================================================
// SITE PAGES
// ================================================

export async function getSitePages() {
  const supabase = getSupabase();
  if (!supabase) {
    return { data: [], error: null };
  }

  return await supabase
    .from('site_pages')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: true });
}

export async function updateSitePage(id: string, updates: any) {
  const supabase = getSupabase();
  if (!supabase) {
    return { data: null, error: { message: 'Database not configured' } };
  }

  return await supabase
    .from('site_pages')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
}

// ================================================
// TESTIMONIALS
// ================================================

export async function getTestimonials() {
  const supabase = getSupabase();
  if (!supabase) {
    return { data: [], error: null };
  }

  return await supabase
    .from('testimonials')
    .select('*')
    .order('display_order', { ascending: true });
}

export async function createTestimonial(testimonial: any) {
  const supabase = getSupabase();
  if (!supabase) {
    return { data: null, error: { message: 'Database not configured' } };
  }

  return await supabase
    .from('testimonials')
    .insert([testimonial])
    .select()
    .single();
}

export async function updateTestimonial(id: string, updates: any) {
  const supabase = getSupabase();
  if (!supabase) {
    return { data: null, error: { message: 'Database not configured' } };
  }

  return await supabase
    .from('testimonials')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
}

export async function deleteTestimonial(id: string) {
  const supabase = getSupabase();
  if (!supabase) {
    return { data: null, error: { message: 'Database not configured' } };
  }

  return await supabase
    .from('testimonials')
    .delete()
    .eq('id', id);
}

// ================================================
// HOMEPAGE SECTIONS
// ================================================

export async function getHomepageSections() {
  const supabase = getSupabase();
  if (!supabase) {
    return { data: [], error: null };
  }

  return await supabase
    .from('homepage_sections')
    .select('*')
    .eq('enabled', true);
}

export async function updateHomepageSection(sectionType: string, updates: any) {
  const supabase = getSupabase();
  if (!supabase) {
    return { data: null, error: { message: 'Database not configured' } };
  }

  return await supabase
    .from('homepage_sections')
    .update(updates)
    .eq('section_type', sectionType)
    .select()
    .single();
}

// ================================================
// SITE SETTINGS
// ================================================

export async function getSiteSettings() {
  const supabase = getSupabase();
  if (!supabase) {
    return { data: [], error: null };
  }

  return await supabase
    .from('site_settings')
    .select('*');
}

export async function updateSiteSetting(key: string, value: string) {
  const supabase = getSupabase();
  if (!supabase) {
    return { data: null, error: { message: 'Database not configured' } };
  }

  return await supabase
    .from('site_settings')
    .update({ value })
    .eq('key', key)
    .select()
    .single();
}

// ================================================
// STATISTICS & ANALYTICS
// ================================================

export async function getDashboardStats() {
  const supabase = getSupabase();
  if (!supabase) {
    return {
      totalProducts: 0,
      totalOrders: 0,
      totalUsers: 0,
      totalRevenue: 0,
    };
  }

  // Get counts in parallel
  const [productsCount, ordersCount, usersCount, revenueData] = await Promise.all([
    supabase.from('products').select('id', { count: 'exact', head: true }),
    supabase.from('orders').select('id', { count: 'exact', head: true }),
    supabase.from('user_profiles').select('id', { count: 'exact', head: true }).eq('role', 'customer'),
    supabase.from('orders').select('total').eq('payment_status', 'paid'),
  ]);

  const totalRevenue = revenueData.data?.reduce((sum, order) => sum + parseFloat(order.total || '0'), 0) || 0;

  return {
    totalProducts: productsCount.count || 0,
    totalOrders: ordersCount.count || 0,
    totalUsers: usersCount.count || 0,
    totalRevenue: totalRevenue,
  };
}

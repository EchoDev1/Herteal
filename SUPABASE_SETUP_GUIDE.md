# Supabase Setup Guide for Herteals Admin Portal

This guide will walk you through setting up Supabase as the backend database for your Herteals e-commerce platform.

## 📋 Prerequisites

- A Supabase account (create one at [supabase.com](https://supabase.com))
- The Herteals project files
- Basic understanding of PostgreSQL

---

## 🚀 Step-by-Step Setup

### Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in or create an account
4. Click "New Project"
5. Fill in the details:
   - **Project Name:** Herteals
   - **Database Password:** Choose a strong password (save it securely!)
   - **Region:** Choose the closest region to Nigeria (Europe - West recommended)
   - **Pricing Plan:** Free tier is sufficient to start
6. Click "Create new project"
7. Wait 2-3 minutes for the project to be provisioned

### Step 2: Run the Database Schema

1. In your Supabase project dashboard, click **"SQL Editor"** in the left sidebar
2. Click **"New query"**
3. Open the file `supabase/schema.sql` from your Herteals project
4. Copy the entire SQL content
5. Paste it into the Supabase SQL Editor
6. Click **"Run"** (or press Ctrl/Cmd + Enter)
7. Wait for the query to complete successfully

**What this does:**
- Creates all necessary tables (products, orders, users, etc.)
- Sets up indexes for performance
- Configures Row Level Security (RLS) policies
- Adds seed data for collections and default settings

### Step 3: Get Your API Keys

1. In your Supabase project dashboard, click **"Project Settings"** (gear icon)
2. Click **"API"** in the settings menu
3. You'll see two important values:
   - **Project URL:** `https://your-project-id.supabase.co`
   - **anon public key:** (Long string starting with "eyJ...")
   - **service_role key:** (Long string - keep this SECRET!)

### Step 4: Configure Environment Variables

1. In your Herteals project folder, create a file named `.env.local`
2. Copy the content from `.env.local.example`
3. Replace the placeholder values:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Save the file

**Important:**
- Never commit `.env.local` to version control
- The file is already in `.gitignore`
- Keep your `service_role` key secret - it bypasses all security rules!

### Step 5: Create Your First Admin User

1. In Supabase dashboard, go to **"Authentication"** → **"Users"**
2. Click **"Add user"** → **"Create new user"**
3. Fill in:
   - **Email:** Your admin email (e.g., `admin@herteals.com`)
   - **Password:** Choose a strong password
   - **Auto Confirm User:** Toggle ON
4. Click **"Create user"**
5. Copy the **User UID** (you'll need this next)

6. Go to **"SQL Editor"** and run this query (replace `YOUR_USER_ID` with the UID you copied):

```sql
-- Create admin profile
INSERT INTO public.user_profiles (id, full_name, role, status)
VALUES (
  'YOUR_USER_ID',  -- Replace with actual user ID
  'Admin User',
  'admin',
  'active'
);
```

7. Click **"Run"**

**Your admin account is now ready!**

### Step 6: Verify the Setup

1. Go to **"Table Editor"** in Supabase
2. You should see all these tables:
   - ✅ user_profiles
   - ✅ collections
   - ✅ products
   - ✅ product_images
   - ✅ product_sizes
   - ✅ product_colors
   - ✅ orders
   - ✅ order_items
   - ✅ shipping_addresses
   - ✅ payment_transactions
   - ✅ site_pages
   - ✅ homepage_sections
   - ✅ testimonials
   - ✅ site_settings

3. Click on **collections** - you should see 3 default collections:
   - Dresses
   - Suits
   - Blouses

### Step 7: Test the Connection

1. Stop your development server (if running)
2. Restart it:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:3000/admin`
4. You should NOT see "Demo Mode" message
5. Log in with your admin credentials
6. If successful, you're connected to Supabase!

---

## 📊 Database Schema Overview

### Core Tables

**user_profiles**
- Extends Supabase auth.users
- Stores role (customer/admin) and profile info
- Tracks total orders and spending

**products**
- Main product catalog
- Links to collections
- Supports sale pricing and inventory
- Categories: dresses, suits, blouses

**collections**
- Product categories
- Featured and display order
- Auto-counts products

**orders**
- Customer orders with full details
- Status tracking (pending → delivered)
- Payment tracking

**site_pages**
- CMS for Privacy, Terms, etc.
- Editable from admin panel

**homepage_sections**
- Hero section
- Promo banner
- Editable content

**testimonials**
- Customer reviews
- Star ratings
- Featured testimonials

**site_settings**
- Site-wide configuration
- Payment settings
- Email settings
- Shipping rules

---

## 🔒 Security Features

### Row Level Security (RLS)

All tables have RLS enabled with policies:

**Public Access:**
- ✅ View active products
- ✅ View collections
- ✅ View site pages (published only)
- ✅ View testimonials

**Admin Access:**
- ✅ Full CRUD on all tables
- ✅ View and manage all orders
- ✅ Manage users and settings

**Customer Access:**
- ✅ View their own orders
- ✅ Update their own profile

### Authentication

- Email/password authentication via Supabase Auth
- Admin role verification on login
- Secure session management
- Password reset capability

---

## 🎯 Testing Your Database

### Test Admin Functions

1. **Add a Product**
   - Go to `/admin/products`
   - Click "Add Product"
   - Fill in details and save
   - Check in Supabase Table Editor → products

2. **Create a Collection**
   - Go to `/admin/collections`
   - Add a new collection
   - Verify in Table Editor → collections

3. **Update Settings**
   - Go to `/admin/settings`
   - Change site name or tax rate
   - Save and check Table Editor → site_settings

4. **Add a Testimonial**
   - Go to `/admin/homepage`
   - Add a testimonial
   - Verify in Table Editor → testimonials

### Verify Data Persistence

1. Make changes in admin panel
2. Restart the development server
3. Check that changes are still there
4. ✅ Data persists = Database working!

---

## 🔧 Common Issues & Solutions

### Issue: "Demo Mode" Still Showing

**Solution:**
- Check that `.env.local` exists and has correct values
- Restart your development server
- Clear browser cache
- Verify NEXT_PUBLIC_ prefix on public variables

### Issue: "Unauthorized: Admin access only"

**Solution:**
- Verify you created the user_profiles record
- Check that role = 'admin' in Table Editor
- Ensure User ID matches between auth.users and user_profiles

### Issue: "Failed to connect to database"

**Solution:**
- Check your internet connection
- Verify Supabase project is not paused (free tier pauses after inactivity)
- Check API keys are correct in `.env.local`
- Try regenerating the anon key in Supabase dashboard

### Issue: Tables not created

**Solution:**
- Re-run the schema.sql in SQL Editor
- Check for error messages in the SQL output
- Ensure you copied the entire schema file

---

## 📈 Next Steps

### Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Add environment variables in your hosting platform:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

2. Update `NEXT_PUBLIC_SITE_URL` to your production domain

3. Consider upgrading Supabase plan for:
   - More storage
   - Better performance
   - Dedicated resources
   - Daily backups

### Email Templates

Set up email templates in Supabase:

1. Go to **Authentication** → **Email Templates**
2. Customize:
   - Confirm signup
   - Reset password
   - Magic link

### Database Backups

Supabase Pro includes automatic backups. On Free tier:

1. Use **Database** → **Backups** for manual backups
2. Export using pg_dump
3. Keep local SQL dumps

### Performance Optimization

As your data grows:

1. Monitor query performance in **Logs**
2. Add indexes for frequently queried fields
3. Use database pooling
4. Consider read replicas (Pro plan)

---

## 🆘 Support Resources

- **Supabase Docs:** [supabase.com/docs](https://supabase.com/docs)
- **Supabase Discord:** [discord.supabase.com](https://discord.supabase.com)
- **GitHub Issues:** [github.com/supabase/supabase](https://github.com/supabase/supabase)

---

## ✅ Setup Checklist

- [ ] Created Supabase project
- [ ] Ran schema.sql successfully
- [ ] Copied API keys to `.env.local`
- [ ] Created admin user in Authentication
- [ ] Added admin profile in user_profiles table
- [ ] Verified all tables exist
- [ ] Restarted development server
- [ ] Logged in to admin panel successfully
- [ ] Tested adding data (product, collection, etc.)
- [ ] Verified data persists after server restart

**Once all checkboxes are complete, your Supabase backend is fully operational!** 🎉

---

## 📝 Quick Reference

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

### Create Admin User SQL

```sql
INSERT INTO public.user_profiles (id, full_name, role, status)
VALUES ('USER_ID_HERE', 'Admin Name', 'admin', 'active');
```

### Test Connection

```typescript
import { supabase } from '@/lib/supabase/client';

// Test query
const { data, error } = await supabase
  .from('collections')
  .select('*')
  .limit(5);

console.log(data); // Should show collections
```

---

**Your Herteals admin portal is now powered by Supabase!** 🚀

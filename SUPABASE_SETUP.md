# Supabase Setup Guide for Email Verification

This guide will help you set up Supabase to enable real authentication and email verification for your Herteals e-commerce platform.

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up for a free account (if you don't have one)
3. Click **"New Project"**
4. Fill in the project details:
   - **Name:** Herteals (or your preferred name)
   - **Database Password:** Create a strong password (save this!)
   - **Region:** Choose the closest region to your users
   - **Pricing Plan:** Start with the Free tier
5. Click **"Create new project"**
6. Wait for the project to be provisioned (takes 1-2 minutes)

## Step 2: Get Your API Credentials

1. Once your project is ready, go to **Project Settings** (gear icon in the sidebar)
2. Click on **API** in the left menu
3. You'll see:
   - **Project URL** (e.g., `https://xxxxxxxxxxxxx.supabase.co`)
   - **Project API keys:**
     - `anon public` key (this is your ANON_KEY)
     - `service_role` key (keep this secret!)

## Step 3: Configure Your .env.local File

1. Open the `.env.local` file in your project root
2. Replace the placeholder values with your actual Supabase credentials:

```env
# Replace these with your actual Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Keep the rest of the configuration as is
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Step 4: Set Up Email Authentication

### Configure Email Templates (Optional but Recommended)

1. In your Supabase project, go to **Authentication** → **Email Templates**
2. Customize the email templates:
   - **Confirm signup:** Email sent when users sign up
   - **Magic Link:** For passwordless login
   - **Change Email Address:** When users update their email
   - **Reset Password:** For password recovery

### Configure Email Settings

1. By default, Supabase uses their email service (limited to 3 emails/hour on free tier)
2. For production, you should configure your own SMTP:
   - Go to **Project Settings** → **Auth** → **SMTP Settings**
   - Enable custom SMTP
   - Add your SMTP credentials (Gmail, SendGrid, Mailgun, etc.)

### Example: Using Gmail SMTP

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-specific-password
```

**Note:** For Gmail, you need to:
1. Enable 2-factor authentication
2. Generate an "App Password" (don't use your regular password)
3. Go to: https://myaccount.google.com/apppasswords

## Step 5: Set Up Database Tables

Your app needs a `user_profiles` table. Run this SQL in Supabase:

1. Go to **SQL Editor** in your Supabase dashboard
2. Click **"New Query"**
3. Paste this SQL:

```sql
-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  total_orders INTEGER DEFAULT 0,
  total_spent NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid errors on re-run)
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;

-- Create policies
CREATE POLICY "Users can view their own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;

-- Create or replace function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

4. Click **"Run"**

## Step 6: Configure Authentication Settings

1. Go to **Authentication** → **Providers**
2. Make sure **Email** is enabled
3. Configure settings:
   - **Enable email confirmations:** ON (users must verify email)
   - **Disable double confirm email changes:** Your preference
   - **Secure email change:** Recommended to enable

### Email Confirmation URL

1. Go to **Authentication** → **URL Configuration**
2. Set the **Site URL** to:
   - Development: `http://localhost:3000`
   - Production: Your actual domain (e.g., `https://herteals.com`)
3. Add redirect URLs:
   - `http://localhost:3000/reset-password`
   - `https://yourdomain.com/reset-password` (for production)

## Step 7: Restart Your Development Server

After configuring everything:

1. Stop your dev server (Ctrl+C)
2. Restart it:
   ```bash
   npm run dev
   ```

## Step 8: Test the Signup Flow

1. Go to http://localhost:3000/signup
2. Fill in the form and submit
3. Check your email inbox for the verification email
4. Click the verification link
5. You should be redirected back to your app

## Troubleshooting

### Not Receiving Emails?

1. **Check Spam Folder:** Verification emails might go to spam
2. **Check Supabase Email Logs:**
   - Go to **Authentication** → **Logs**
   - Look for any errors
3. **Free Tier Limits:** Supabase free tier has rate limits (3 emails/hour)
4. **Configure Custom SMTP:** For better deliverability

### "Email not confirmed" Error?

If users get this error when signing in:
1. Go to **Authentication** → **Users**
2. Find the user
3. Manually confirm their email (click the three dots → Confirm Email)

### Database Errors?

If you get database connection errors:
- Verify your credentials in `.env.local`
- Make sure the `user_profiles` table exists
- Check that RLS policies are set up correctly

## Production Checklist

Before going live:

- [ ] Configure custom SMTP email provider
- [ ] Update Site URL to production domain
- [ ] Add production redirect URLs
- [ ] Test email delivery thoroughly
- [ ] Set up proper error logging
- [ ] Configure Row Level Security policies
- [ ] Set up database backups
- [ ] Review and customize email templates
- [ ] Test password reset flow
- [ ] Test email change flow

## Support

- Supabase Documentation: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
- Next.js + Supabase Guide: https://supabase.com/docs/guides/getting-started/quickstarts/nextjs

---

**Current Status:** Your app is running in **demo mode** (no Supabase configured). Follow this guide to enable real authentication with email verification.

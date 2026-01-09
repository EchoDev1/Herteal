# Deployment Guide - HERTEALS E-Commerce Platform

This guide walks you through deploying the HERTEALS e-commerce platform to Vercel.

## Prerequisites

Before deploying, ensure you have:

1. A GitHub account
2. A Vercel account (sign up at https://vercel.com)
3. A Supabase project set up with:
   - Database configured (see SUPABASE_SETUP.md)
   - Authentication enabled
   - Storage buckets created (if using image uploads)
4. All environment variables ready

## Step 1: Prepare Your Repository

### 1.1 Review Changes

Check all modified and new files:

```bash
git status
```

### 1.2 Add All Files to Git

```bash
git add .
```

### 1.3 Commit Your Changes

```bash
git commit -m "Prepare for production deployment

- Updated admin portal with modern features
- Added image upload functionality
- Configured Supabase integration
- Added Collections and Products management
- Implemented Orders system
- Updated Homepage management
"
```

### 1.4 Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository named `herteals-ecommerce` (or your preferred name)
3. **Do NOT** initialize with README, .gitignore, or license (we already have these)
4. Click "Create repository"

### 1.5 Push to GitHub

```bash
# Add remote (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/herteals-ecommerce.git

# Push to GitHub
git push -u origin master
```

## Step 2: Deploy to Vercel

### 2.1 Import Project to Vercel

1. Go to https://vercel.com/dashboard
2. Click "Add New Project"
3. Click "Import Git Repository"
4. Select your GitHub repository (`herteals-ecommerce`)
5. Click "Import"

### 2.2 Configure Project Settings

**Framework Preset**: Next.js (should be auto-detected)

**Root Directory**: `.` (leave as default)

**Build Command**: `npm run build` (default)

**Output Directory**: `.next` (default)

**Install Command**: `npm install` (default)

### 2.3 Configure Environment Variables

In the "Environment Variables" section, add the following:

#### Required Variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
NEXT_PUBLIC_SITE_URL=https://your-app.vercel.app
```

**Important**:
- Get your Supabase URL and keys from your Supabase project dashboard
- Initially set `NEXT_PUBLIC_SITE_URL` to your Vercel preview URL
- You'll update this after deployment

#### Optional Variables (add if using):

```
PAYSTACK_SECRET_KEY=your-paystack-secret-key
PAYSTACK_PUBLIC_KEY=your-paystack-public-key
FLUTTERWAVE_SECRET_KEY=your-flutterwave-secret-key
FLUTTERWAVE_PUBLIC_KEY=your-flutterwave-public-key
```

### 2.4 Deploy

1. Review all settings
2. Click "Deploy"
3. Wait for deployment to complete (usually 2-5 minutes)

## Step 3: Post-Deployment Configuration

### 3.1 Get Your Production URL

After deployment completes, Vercel will provide your production URL:
```
https://your-app.vercel.app
```

### 3.2 Update Environment Variables

1. Go to your Vercel project settings
2. Navigate to "Settings" → "Environment Variables"
3. Update `NEXT_PUBLIC_SITE_URL` to your production URL:
   ```
   NEXT_PUBLIC_SITE_URL=https://your-app.vercel.app
   ```
4. Click "Save"
5. Redeploy the app (Vercel → Deployments → Click three dots → Redeploy)

### 3.3 Configure Supabase for Production

1. Go to your Supabase project dashboard
2. Navigate to "Authentication" → "URL Configuration"
3. Add your production URL to:
   - **Site URL**: `https://your-app.vercel.app`
   - **Redirect URLs**: Add these URLs:
     ```
     https://your-app.vercel.app/auth/callback
     https://your-app.vercel.app/signin
     https://your-app.vercel.app/signup
     https://your-app.vercel.app/reset-password
     ```

4. Update Email Templates (if using email auth):
   - Go to "Authentication" → "Email Templates"
   - Update all email templates to use your production URL instead of localhost

### 3.4 Configure Storage (if using image uploads)

1. Go to Supabase → "Storage"
2. Update bucket policies for production
3. Ensure CORS is configured to allow your production domain

## Step 4: Custom Domain (Optional)

### 4.1 Add Custom Domain in Vercel

1. Go to your Vercel project
2. Navigate to "Settings" → "Domains"
3. Click "Add"
4. Enter your custom domain (e.g., `herteals.com`)
5. Follow Vercel's instructions to configure DNS

### 4.2 Update Environment Variables

After adding custom domain:

1. Update `NEXT_PUBLIC_SITE_URL` to your custom domain
2. Redeploy the application
3. Update Supabase redirect URLs to include custom domain

## Step 5: Testing

### 5.1 Test Core Functionality

Visit your production site and test:

- [ ] Homepage loads correctly
- [ ] User registration works
- [ ] User login works
- [ ] Password reset works
- [ ] Admin portal is accessible
- [ ] Product browsing works
- [ ] Shopping cart functions
- [ ] Checkout process works
- [ ] Admin features:
  - [ ] Add/edit/delete products
  - [ ] Manage collections
  - [ ] View orders
  - [ ] Update homepage sections
  - [ ] Image uploads work

### 5.2 Performance Check

1. Run Lighthouse audit in Chrome DevTools
2. Check page load times
3. Verify images are optimized
4. Test on mobile devices

## Step 6: Monitoring

### 6.1 Set Up Vercel Analytics

1. Go to your Vercel project
2. Navigate to "Analytics"
3. Enable Web Analytics
4. Monitor traffic and performance

### 6.2 Set Up Error Tracking

Consider integrating error tracking services:
- Sentry
- LogRocket
- Vercel's built-in monitoring

## Troubleshooting

### Build Fails

**Issue**: Build fails during deployment

**Solutions**:
1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Run `npm run build` locally to identify issues
4. Check for TypeScript errors

### Environment Variables Not Working

**Issue**: App can't connect to Supabase

**Solutions**:
1. Verify environment variables are set in Vercel
2. Check variable names match exactly (case-sensitive)
3. Ensure no trailing spaces in values
4. Redeploy after updating variables

### Authentication Issues

**Issue**: Users can't sign in on production

**Solutions**:
1. Verify Supabase redirect URLs include production domain
2. Check Site URL in Supabase settings
3. Ensure `NEXT_PUBLIC_SITE_URL` is correct
4. Check browser console for errors

### Images Not Loading

**Issue**: Uploaded images don't display

**Solutions**:
1. Check Supabase Storage bucket policies
2. Verify CORS settings in Supabase
3. Ensure bucket is public or has proper access rules
4. Check browser console for CORS errors

## Continuous Deployment

Vercel automatically deploys when you push to your main branch:

```bash
# Make changes
git add .
git commit -m "Your changes"
git push origin master
```

Vercel will automatically:
1. Detect the push
2. Build your app
3. Deploy to production
4. Run checks
5. Update your live site

## Rollback

If something goes wrong:

1. Go to Vercel Dashboard → Deployments
2. Find a previous working deployment
3. Click three dots → "Promote to Production"

## Best Practices

1. **Always test locally** before pushing to production
2. **Use environment-specific settings** (dev, staging, production)
3. **Monitor logs** regularly in Vercel dashboard
4. **Keep dependencies updated** but test thoroughly
5. **Back up your database** regularly in Supabase
6. **Use semantic versioning** for releases
7. **Document all changes** in commit messages

## Support

If you encounter issues:

1. Check Vercel documentation: https://vercel.com/docs
2. Check Next.js documentation: https://nextjs.org/docs
3. Check Supabase documentation: https://supabase.com/docs
4. Review deployment logs in Vercel dashboard
5. Check browser console for errors

## Next Steps

After successful deployment:

1. Set up custom domain
2. Configure SSL certificate (automatic with Vercel)
3. Set up analytics and monitoring
4. Configure email notifications
5. Set up payment gateways
6. Add more products and content
7. Test thoroughly
8. Launch!

---

**Congratulations!** Your HERTEALS e-commerce platform is now live on Vercel!

# HERTEALS E-Commerce Platform

A modern, full-featured e-commerce platform for luxury fashion built with Next.js, TypeScript, and Supabase.

## Features

- Modern, responsive UI with Tailwind CSS
- User authentication (Sign up, Sign in, Password reset)
- Comprehensive admin portal with:
  - Dashboard with real-time statistics
  - Product management with image uploads
  - Collections management
  - Orders management
  - Homepage content management (Hero sections, testimonials, etc.)
  - User management
  - Settings configuration
- Shopping cart and checkout flow
- Supabase backend integration
- Drag-and-drop image upload functionality

## Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account and project
- Git

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd herteal
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Fill in your Supabase credentials and other configuration

```bash
cp .env.local.example .env.local
```

Required environment variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Run database migrations (see SUPABASE_SETUP.md for details)

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
herteal/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin portal pages
│   ├── account/           # User account page
│   ├── checkout/          # Checkout flow
│   ├── shop/              # Shop pages
│   └── ...
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   ├── checkout/         # Checkout components
│   └── layout/           # Layout components
├── contexts/             # React contexts
├── lib/                  # Utility functions and configurations
│   ├── db/              # Database queries
│   └── supabase/        # Supabase client
├── public/              # Static assets
└── scripts/             # Utility scripts
```

## Admin Portal

Access the admin portal at `/admin` after signing in.

### Admin Features:
- **Dashboard**: Overview of store statistics
- **Collections**: Manage product categories and collections
- **Products**: Add, edit, and delete products with image uploads
- **Orders**: View and manage customer orders
- **Homepage**: Customize homepage sections including hero banners, testimonials, etc.
- **Pages**: Manage static pages
- **Settings**: Configure store settings
- **Users**: Manage customer accounts

## Deployment

### Deploy to Vercel

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin master
```

2. Go to [Vercel](https://vercel.com) and sign in
3. Click "New Project"
4. Import your GitHub repository
5. Configure environment variables in Vercel:
   - Add all variables from `.env.local`
   - Update `NEXT_PUBLIC_SITE_URL` to your production URL
6. Click "Deploy"

### Environment Variables for Production

Make sure to set these in your Vercel project settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL` (your production URL)

### Post-Deployment

1. Update Supabase Auth settings:
   - Add your production URL to allowed redirect URLs
   - Update email templates with production URLs

2. Test the following:
   - User authentication (sign up, sign in, password reset)
   - Admin portal access
   - Product management
   - Order creation
   - Image uploads

## Database Setup

See `SUPABASE_SETUP.md` for detailed instructions on setting up the Supabase database, including:
- Database schema
- Row Level Security (RLS) policies
- Storage buckets
- Email templates

## Development

### Running the Dev Server
```bash
npm run dev
```

### Building for Production
```bash
npm run build
npm start
```

### Type Checking
```bash
npm run type-check
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

All rights reserved.

## Support

For support, please contact the development team or open an issue in the repository.

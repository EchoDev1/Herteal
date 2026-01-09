/**
 * Supabase Configuration Check Script
 * Run this to verify your Supabase setup
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function checkSupabaseSetup() {
  console.log('🔍 Checking Supabase Configuration...\n');

  // Check environment variables
  console.log('1. Environment Variables:');
  console.log(`   ✓ SUPABASE_URL: ${supabaseUrl ? '✓ Set' : '✗ Missing'}`);
  console.log(`   ✓ SUPABASE_KEY: ${supabaseKey ? '✓ Set' : '✗ Missing'}\n`);

  if (!supabaseUrl || !supabaseKey) {
    console.log('❌ Environment variables not configured properly\n');
    return;
  }

  // Create Supabase client
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Check connection
  console.log('2. Testing Connection:');
  try {
    const { data, error } = await supabase.from('user_profiles').select('count', { count: 'exact', head: true });

    if (error) {
      if (error.message.includes('relation "public.user_profiles" does not exist')) {
        console.log('   ❌ user_profiles table does NOT exist');
        console.log('   ➜ You need to run the SQL script in Supabase SQL Editor\n');
      } else {
        console.log(`   ❌ Database error: ${error.message}\n`);
      }
    } else {
      console.log('   ✓ Connection successful');
      console.log('   ✓ user_profiles table exists\n');
    }
  } catch (err) {
    console.log(`   ❌ Connection failed: ${err.message}\n`);
  }

  // Check for users
  console.log('3. Checking Users:');
  try {
    const { data: { users }, error } = await supabase.auth.admin.listUsers();

    if (error) {
      console.log(`   ⚠️ Cannot list users (requires service role key): ${error.message}`);
      console.log('   ℹ️ This is normal - checking alternative way...\n');

      // Try to check if any profiles exist
      const { count, error: profileError } = await supabase
        .from('user_profiles')
        .select('*', { count: 'exact', head: true });

      if (!profileError) {
        console.log(`   ℹ️ User profiles in database: ${count || 0}\n`);
      }
    } else {
      console.log(`   ℹ️ Total users: ${users?.length || 0}`);

      if (users && users.length > 0) {
        console.log('   ℹ️ Users found:');
        users.forEach((user, index) => {
          console.log(`      ${index + 1}. ${user.email} - ${user.email_confirmed_at ? '✓ Verified' : '✗ Not Verified'}`);
        });
      } else {
        console.log('   ⚠️ No users found. Create an account at /signup first.');
      }
      console.log('');
    }
  } catch (err) {
    console.log(`   ⚠️ Could not check users: ${err.message}\n`);
  }

  console.log('✅ Diagnostic complete!\n');
  console.log('Next Steps:');
  console.log('1. If user_profiles table is missing → Run the SQL script');
  console.log('2. If no users exist → Sign up at http://localhost:3000/signup');
  console.log('3. If user is not verified → Check email for verification link');
  console.log('4. After verification → Try logging in\n');
}

// Load environment variables manually
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const [key, ...valueParts] = trimmedLine.split('=');
      if (key && valueParts.length > 0) {
        process.env[key.trim()] = valueParts.join('=').trim();
      }
    }
  });
}

// Run the check
checkSupabaseSetup().catch(console.error);

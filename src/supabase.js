import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://yeramtkchetpbgipijzr.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InllcmFtdGtjaGV0cGJnaXBpanpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5OTEyMDQsImV4cCI6MjA1NzU2NzIwNH0.GfJ2BWic4CKhUZA6TwCXhrFw0XdYP3bWySBOQeXxAdI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

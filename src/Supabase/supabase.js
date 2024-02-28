// supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://euiumqhfdmgxwypxkzcb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1aXVtcWhmZG1neHd5cHhremNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg1MzA5NTgsImV4cCI6MjAyNDEwNjk1OH0.jakHLrJi91duBdRZ27EaQ87zgUQhqwLE1RrmRPOyTRs';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

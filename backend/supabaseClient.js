import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log("Supabase URL:", process.env.SUPABASE_URL);

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase URL or Service Role Key in .env');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

const { createClient } = require('@supabase/supabase-js');

module.exports = { supabase: createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY) };

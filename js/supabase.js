// Import Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

// Supabase Configuration
const SUPABASE_URL = 'https://ocfpevuuijdmwvntccra.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jZnBldnV1aWpkbXd2bnRjY3JhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0MzY0MjIsImV4cCI6MjA4MzAxMjQyMn0.j91KQs6riEzRBmc_taJzIG6c-PetzJm4g820Gk47kMI';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

console.log('Supabase client initialized!');

import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vtlehkonekrjkfqbkcdc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0bGVoa29uZWtyamtmcWJrY2RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ1ODUwMTIsImV4cCI6MjAyMDE2MTAxMn0.LZOK9M2Pt6cRuz64e2AZUyFnNRFN7RaNgCJENqcL0SY";
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export default supabase;

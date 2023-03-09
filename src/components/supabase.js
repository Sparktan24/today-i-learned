import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://rjfqklkekjiorppfwyfa.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqZnFrbGtla2ppb3JwcGZ3eWZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzOTY0NTgsImV4cCI6MTk5Mzk3MjQ1OH0.ZcdP4Dnj3C34pvoPvy-kQ5AK5z20MFX3g89Yo9j3ZKI"
);
export default supabase;

/* async function getCountries() {
  const countries = await supabase.from("countries").select();
  console.log(countries);
}

getCountries();

export default getCountries; */

//  export default supabase;

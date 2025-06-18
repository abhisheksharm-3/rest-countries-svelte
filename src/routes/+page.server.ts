import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ fetch }) => {
  try {
    // Specify only the fields you need
    const fields = "name,population,region,capital,flags";
    const res = await fetch(`https://restcountries.com/v3.1/all?fields=${fields}`);
    
    if (!res.ok) {
      throw new Error(`API returned ${res.status}: ${res.statusText}`);
    }
    
    const countries = await res.json();
    
    // Verify that the response is actually an array
    if (!Array.isArray(countries)) {
      throw new Error('API did not return an array of countries');
    }
    
    return { countries };
  } catch (error) {
    console.error('Failed to load countries:', error);
    
    return {
      countries: [],
      error: error instanceof Error ? error.message : 'Failed to load countries'
    };
  }
};
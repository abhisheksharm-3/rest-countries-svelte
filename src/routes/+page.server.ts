import type { PageServerLoad } from "./$types";

export interface Country {
  name: {
    common: string;
  };
  population: number;
  region: string;
  capital: string[];
  flags: {
    svg: string;
    alt?: string;
  };
}

export const load: PageServerLoad = async ({ fetch }) => {
  try {
    const fields = 'name,population,region,capital,flags';
    const url = `https://restcountries.com/v3.1/all?fields=${fields}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const countries: Country[] = await response.json();
    
    if (!Array.isArray(countries)) {
      throw new Error('API response was not an array');
    }
    countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
    
    return { countries };

  } catch (err) {
    console.error('Failed to load countries:', err);
    const message = err instanceof Error ? err.message : 'An unknown error occurred while fetching data.';
    return {
      countries: [],
      error: message
    };
  }
};
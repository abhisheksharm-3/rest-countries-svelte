
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

interface Country {
  name: string;
  officialName: string;
  population: number;
  region: string;
  subregion: string;
  capital: string;
  tld: string;
  currencies: string;
  languages: string;
  flagUrl: string;
  borderCountries: string[];
}

export const load: PageServerLoad = async ({ params, fetch }) => {
  const { countryName } = params;

  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);

    if (!response.ok) {
      throw error(404, 'Country not found');
    }

    const countryData: any[] = await response.json();

    if (!countryData || countryData.length === 0) {
      throw error(404, 'Country data not found');
    }

    // The API returns an array, but we're using fullText=true, so we'll always get one result
    const country = countryData[0];

    const formattedCountry: Country = {
      name: country.name.common,
      officialName: country.name.official,
      population: country.population,
      region: country.region,
      subregion: country.subregion,
      capital: country.capital ? country.capital[0] : 'N/A',
      tld: country.tld ? country.tld[0] : 'N/A',
      currencies: Object.values(country.currencies || {}).map((c: any) => c.name).join(', '),
      languages: Object.values(country.languages || {}).join(', '),
      flagUrl: country.flags.svg,
      borderCountries: country.borders || []
    };

    return { country: formattedCountry };
  } catch (err) {
    console.error('Error fetching country data:', err);
    throw error(500, 'Error fetching country data');
  }
};

import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export interface BorderCountry {
  code: string;
  name: string;
}

export interface DetailedCountry {
  name: string;
  officialName: string;
  nativeNames: string[];
  population: number;
  region: string;
  subregion: string;
  capital: string;
  tld: string;
  currencies: string;
  currencySymbol?: string;
  languages: string;
  flagUrl: string;
  flagAlt?: string;
  flagDescription?: string;
  coatOfArms?: string;
  area: number;
  demonyms?: string;
  drivingSide?: string;
  timezones: string[];
  unMember?: boolean;
  startOfWeek?: string;
  maps: {
    googleMaps?: string;
    openStreetMaps?: string;
  };
  borderCountries: BorderCountry[];
}

export const load: PageServerLoad = async ({ params, fetch }) => {
  const { countryName } = params;

  try {
    const encodedCountryName = encodeURIComponent(countryName);
    const response = await fetch(`https://restcountries.com/v3.1/name/${encodedCountryName}?fullText=true`);

    if (!response.ok) {
      throw error(404, 'Country not found');
    }

    const countryData: any[] = await response.json();

    if (!countryData || countryData.length === 0) {
      throw error(404, 'Country data not found');
    }

    const country = countryData[0];
    const nativeNames: string[] = [];
    if (country.name?.nativeName) {
      Object.entries(country.name.nativeName).forEach(([langCode, nameObj]: [string, any]) => {
        if (nameObj.common && country.languages?.[langCode]) {
          nativeNames.push(`${nameObj.common} (${country.languages[langCode]})`);
        }
      });
    }
    
    let borderCountries: BorderCountry[] = [];
    
    if (country.borders && country.borders.length > 0) {
      const borderCodes = country.borders.join(',');
      const borderResponse = await fetch(`https://restcountries.com/v3.1/alpha?codes=${borderCodes}`);
      
      if (borderResponse.ok) {
        const borderData = await borderResponse.json();
        borderCountries = borderData.map((border: any) => ({
          code: border.cca3,
          name: border.name.common
        }));
      }
    }
    let currencySymbol: string | undefined;
    if (country.currencies) {
      const firstCurrency = Object.values(country.currencies)[0] as any;
      if (firstCurrency?.symbol) {
        currencySymbol = firstCurrency.symbol;
      }
    }
    let demonyms: string | undefined;
    if (country.demonyms?.eng) {
      demonyms = `${country.demonyms.eng.m} (male), ${country.demonyms.eng.f} (female)`;
    }

    const formattedCountry: DetailedCountry = {
      name: country.name.common || 'Unknown',
      officialName: country.name.official || country.name.common || 'Unknown',
      nativeNames: nativeNames,
      population: country.population || 0,
      region: country.region || 'Unknown',
      subregion: country.subregion || 'Unknown',
      capital: country.capital ? country.capital[0] : 'N/A',
      tld: country.tld ? country.tld[0] : 'N/A',
      currencies: country.currencies 
        ? Object.values(country.currencies).map((c: any) => c.name).join(', ') 
        : 'N/A',
      currencySymbol,
      languages: country.languages 
        ? Object.values(country.languages).join(', ') 
        : 'N/A',
      flagUrl: country.flags?.svg || country.flags?.png || '',
      flagAlt: country.flags?.alt,
      flagDescription: country.flags?.alt,
      coatOfArms: country.coatOfArms?.svg || country.coatOfArms?.png,
      area: country.area || 0,
      demonyms,
      drivingSide: country.car?.side,
      timezones: country.timezones || [],
      unMember: country.unMember,
      startOfWeek: country.startOfWeek,
      maps: {
        googleMaps: country.maps?.googleMaps,
        openStreetMaps: country.maps?.openStreetMaps
      },
      borderCountries
    };

    return { country: formattedCountry };
  } catch (err: any) {
    console.error('Error fetching country data:', err);
    throw error(err.status || 500, err.message || 'Error fetching country data');
  }
};
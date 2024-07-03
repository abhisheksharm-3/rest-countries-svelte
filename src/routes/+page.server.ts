import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ fetch }) => {
  const res = await fetch('https://restcountries.com/v3.1/all');
  const countries = await res.json();

  if (res.ok) {
    return {
      countries
    };
  }

  return {
    status: res.status,
    error: new Error('Could not load countries')
  };
};

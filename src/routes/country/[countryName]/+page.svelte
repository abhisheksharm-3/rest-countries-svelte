<script lang="ts">
  import BorderCountries from "$lib/components/country/BorderCountries.svelte";
  import CoatOfArms from "$lib/components/country/CoatOfArms.svelte";
  import CountryHero from "$lib/components/country/CountryHero.svelte";
  import EconomyAdmin from "$lib/components/country/EconomyAdmin.svelte";
  import EssentialInfo from "$lib/components/country/EssentialInfo.svelte";
  import FlagCard from "$lib/components/country/FlagCard.svelte";
  import LanguageCulture from "$lib/components/country/LanguageCulture.svelte";
  import MapLinks from "$lib/components/country/MapLinks.svelte";
  import Timezones from "$lib/components/country/Timezones.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  const { country } = data;
  function handleImageError(e: Event): void {
    const target = e.currentTarget as HTMLImageElement;
    target.src = 'https://via.placeholder.com/600x400?text=Image+Not+Available';
  }
</script>

<svelte:head>
  <title>{country.name} | Countries Explorer</title>
  <meta name="description" content="Explore detailed information about {country.name}.">
</svelte:head>

<CountryHero {country} {handleImageError} />

<div class="bg-background relative">
  <div class="max-w-7xl mx-auto px-6 py-12 lg:px-8 lg:py-16">
    <div class="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12">

      <aside class="xl:col-span-4 space-y-8">
        <FlagCard {country} {handleImageError} />
        <EssentialInfo {country} />
        {#if country.coatOfArms}
          <CoatOfArms src={country.coatOfArms} />
        {/if}
      </aside>

      <main class="xl:col-span-8 space-y-8">
        <LanguageCulture {country} />
        <EconomyAdmin {country} />
        {#if country.timezones?.length}
          <Timezones timezones={country.timezones} />
        {/if}
        {#if country.maps?.googleMaps || country.maps?.openStreetMaps}
          <MapLinks maps={country.maps} />
        {/if}
        {#if country.borderCountries?.length}
          <BorderCountries borders={country.borderCountries} />
        {/if}
      </main>

    </div>
  </div>
</div>
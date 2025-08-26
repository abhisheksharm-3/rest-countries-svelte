<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import type { DetailedCountry } from "../../../routes/country/[countryName]/+page.server";


  export let country: DetailedCountry;
  export let handleImageError: (e: Event) => void;

  let imageLoaded = false;

  function handleImageLoad(): void {
    imageLoaded = true;
  }
</script>

<div class="relative w-full h-[50vh] lg:h-[60vh] overflow-hidden">
  <div class="absolute inset-0">
    {#if !imageLoaded}
      <div class="w-full h-full bg-gradient-to-br from-muted via-muted/80 to-muted/60 animate-pulse-subtle"></div>
    {/if}
    <img
      src={country.flagUrl}
      alt={`Flag of ${country.name}`}
      class="w-full h-full object-cover object-center transition-all duration-700 {imageLoaded ? 'opacity-60 dark:opacity-40 scale-100' : 'opacity-0 scale-105'}"
      loading="eager"
      on:error={handleImageError}
      on:load={handleImageLoad}
    />
  </div>

  <div class="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background"></div>
  <div class="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40"></div>

  <div class="relative z-20 h-full flex flex-col">
    <div class="p-6 lg:p-8">
      <Button variant="outline" size="sm" class="glass hover:bg-background/90 transition-all duration-300 hover:scale-105 active:scale-95" href="/">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        <span>Back to Countries</span>
      </Button>
    </div>

    <div class="flex-1 flex items-end p-6 lg:p-8">
      <div class="max-w-7xl mx-auto w-full">
        <div class="space-y-4">
          <div class="space-y-2">
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight leading-tight">
              <span class="text-foreground">{country.name}</span>
            </h1>
            {#if country.officialName && country.officialName !== country.name}
              <p class="text-lg sm:text-xl text-foreground/70 font-light max-w-2xl">{country.officialName}</p>
            {/if}
          </div>
          <div class="flex flex-wrap gap-3 pt-4">
            <div class="glass px-4 py-2 rounded-full"><span class="text-sm font-medium">{country.region}</span></div>
            <div class="glass px-4 py-2 rounded-full"><span class="text-sm font-medium">{country.population.toLocaleString()} people</span></div>
            {#if country.capital}
              <div class="glass px-4 py-2 rounded-full"><span class="text-sm font-medium">Capital: {country.capital}</span></div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
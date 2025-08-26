<script lang="ts">
  import type { PageData } from './$types';
  import Card from '$lib/components/Card.svelte';
  import Search from '$lib/components/Search.svelte';
  import Filter from '$lib/components/Filter.svelte';
  export let data: PageData;

  let searchQuery = '';
  let selectedRegion = 'All Regions';

  $: filteredTerritories = data.countries.filter((country) => {
    const matchesSearch = country.name.common
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesRegion =
      selectedRegion === 'All Regions' || country.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  $: totalPopulation = data.countries.reduce((sum, country) => sum + country.population, 0);
  $: regions = [...new Set(data.countries.map((c) => c.region).filter(Boolean))].sort();

  function handleSearch(event: CustomEvent<{ query: string }>) {
    searchQuery = event.detail.query;
  }

  function handleFilter(event: CustomEvent<{ region: string }>) {
    selectedRegion = event.detail.region;
  }
  
  function clearFilters() {
    searchQuery = '';
    selectedRegion = 'All Regions';
  }

  // Helper function to format large numbers in a user-friendly way
  function formatPopulation(population: number): string {
    if (population >= 1_000_000_000) {
      return (population / 1_000_000_000).toFixed(1) + 'B';
    } else if (population >= 1_000_000) {
      return (population / 1_000_000).toFixed(1) + 'M';
    } else if (population >= 1_000) {
      return (population / 1_000).toFixed(0) + 'K';
    }
    return population.toString();
  }
</script>

<svelte:head>
  <title>Countries Explorer · Discover the World</title>
  <meta name="description" content="Explore detailed information about countries around the world with our beautiful, minimal interface." />
</svelte:head>

<div class="relative overflow-hidden">
  <div class="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-background/50"></div>
  
  <div class="relative py-16 sm:py-24">
    <div class="space-y-8 text-center">
      <div class="space-y-4">
        <h1 class="text-4xl font-serif tracking-tight sm:text-5xl lg:text-6xl">
          <span class="text-foreground">Discover the</span>
          <br />
          <span class="font-medium text-primary">World Atlas</span>
        </h1>
        <p class="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Explore comprehensive information about {data.countries.length} territories across {regions.length} regions. From demographics to geography, discover what makes each nation unique.
        </p>
      </div>

      <div class="flex flex-wrap justify-center gap-8 text-center sm:gap-12">
        <div class="group cursor-default">
          <div class="text-2xl font-semibold text-primary transition-transform group-hover:scale-105 sm:text-3xl">
            {data.countries.length}
          </div>
          <div class="text-sm font-medium text-muted-foreground">Territories</div>
        </div>
        
        <div class="group cursor-default">
          <div class="text-2xl font-semibold text-primary transition-transform group-hover:scale-105 sm:text-3xl">
            {regions.length}
          </div>
          <div class="text-sm font-medium text-muted-foreground">Regions</div>
        </div>
        
        <div class="group cursor-default">
          <div class="text-2xl font-semibold text-primary transition-transform group-hover:scale-105 sm:text-3xl">
            {formatPopulation(totalPopulation)}
          </div>
          <div class="text-sm font-medium text-muted-foreground">Total Population</div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="space-y-8">
  <div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
    <div class="max-w-md flex-1">
      <Search on:search={handleSearch} />
    </div>
    
    <div class="flex items-center gap-4">
      <Filter regions={regions} on:filter={handleFilter} />
    </div>
  </div>

  <div class="flex items-center justify-between text-sm text-muted-foreground">
    <div class="flex items-center gap-2">
      <div class="h-1.5 w-1.5 rounded-full bg-primary"></div>
      <span>
        {#if searchQuery || selectedRegion !== 'All Regions'}
          Showing {filteredTerritories.length} of {data.countries.length} countries
        {:else}
          Showing all {data.countries.length} countries
        {/if}
      </span>
    </div>
    
    {#if searchQuery || selectedRegion !== 'All Regions'}
      <button 
        class="rounded-full bg-accent/50 px-3 py-1.5 text-xs transition-colors hover:bg-accent"
        on:click={clearFilters}
      >
        Clear filters
      </button>
    {/if}
  </div>
</div>

<div class="space-y-8">
  {#if filteredTerritories.length === 0}
    <div class="py-20 text-center">
      <div class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <svg class="h-8 w-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </div>
      <h3 class="mb-2 text-lg font-medium">No countries found</h3>
      <p class="mx-auto mb-6 max-w-sm text-muted-foreground">
        We couldn't find any countries matching your search. Try adjusting your filters.
      </p>
      <button 
        class="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        on:click={clearFilters}
      >
        Clear all filters
      </button>
    </div>
  {:else}
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
      {#each filteredTerritories as country, index}
        <div class="animate-fade-up" style:animation-delay="{Math.min(index * 50, 500)}ms">
          <Card
            name={country.name.common}
            population={formatPopulation(country.population)}
            region={country.region}
            capital={country.capital?.[0] ?? 'N/A'}
            image={country.flags.svg}
          />
        </div>
      {/each}
    </div>
  {/if}
</div>
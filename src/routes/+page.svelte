<script lang="ts">
  import Card from "./../lib/components/Card.svelte";
  import Search from "./../lib/components/Search.svelte";
  import Filter from "./../lib/components/Filter.svelte";

  export let data: {
    countries: Array<{
      name: { common: string };
      population: number;
      region: string;
      capital: string[];
      flags: { svg: string };
    }>;
  };

  let filteredCountries = data.countries;
  let searchQuery = "";
  let selectedRegion = "All Regions";

  function handleSearch(event: CustomEvent<{ query: string }>) {
    searchQuery = event.detail.query;
  }

  function handleFilter(event: CustomEvent<{ region: string }>) {
    selectedRegion = event.detail.region;
  }

  $: {
    filteredCountries = data.countries.filter((country) => {
      const matchesSearch = country.name.common
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesRegion =
        selectedRegion === "All Regions" || country.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });
  }
</script>

<div class="container mx-auto px-4 py-8">
  <div class="flex flex-col lg:flex-row justify-between gap-6 mb-10">
    <Search on:search={handleSearch} />
    <Filter on:filter={handleFilter} />
  </div>
  
  {#if filteredCountries.length === 0}
    <div class="text-center py-16">
      <p class="text-muted-foreground">No countries found matching your criteria.</p>
    </div>
  {:else}
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {#each filteredCountries as country}
        <Card
          name={country.name.common}
          population={country.population.toLocaleString()}
          region={country.region}
          capital={country.capital ? country.capital[0] : "N/A"}
          image={country.flags.svg}
        />
      {/each}
    </div>
  {/if}
</div>
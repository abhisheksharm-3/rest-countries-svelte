<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  const { country } = data;
  
  function handleImageError(e: Event): void {
    const target = e.currentTarget as HTMLImageElement;
    target.src = 'https://via.placeholder.com/600x400?text=Flag+Not+Available';
  }
</script>

<svelte:head>
  <title>{country.name} | Countries Explorer</title>
  <meta name="description" content="Explore details about {country.name}">
</svelte:head>

<!-- Simple hero section -->
<div class="w-full h-[40vh] relative overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10"></div>
  <img 
    src={country.flagUrl} 
    alt={`Flag of ${country.name}`}
    class="w-full h-full object-cover object-center opacity-80 dark:opacity-60" 
    loading="eager"
    on:error={handleImageError}
  />
  
  <!-- Back button -->
  <div class="absolute top-6 left-6 z-20">
    <Button
      variant="outline"
      size="sm"
      class="bg-background/80 backdrop-blur-sm border-border/40 text-sm"
      href="/"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
        <path d="m15 18-6-6 6-6"/>
      </svg>
      <span>Back</span>
    </Button>
  </div>
  
  <!-- Country name -->
  <div class="absolute bottom-0 left-0 z-20 p-8 w-full">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl md:text-5xl font-light tracking-tight mb-1">
        {country.name}
      </h1>
      
      {#if country.officialName && country.officialName !== country.name}
        <p class="text-sm md:text-base text-foreground/70">
          {country.officialName}
        </p>
      {/if}
    </div>
  </div>
</div>

<!-- Main content section - simplified layout -->
<div class="bg-background py-8">
  <div class="max-w-6xl mx-auto px-4 md:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      <!-- Left column -->
      <div class="lg:col-span-4 space-y-6">
        <!-- Flag card -->
        <div class="border border-border rounded-md overflow-hidden bg-card">
          <div class="aspect-[4/3] flex items-center justify-center bg-black/5 dark:bg-white/5">
            <img
              src={country.flagUrl}
              alt={country.flagAlt || `Flag of ${country.name}`}
              class="max-w-full max-h-full object-contain"
              on:error={handleImageError}
            />
          </div>
          
          {#if country.flagDescription}
            <div class="p-4 text-xs italic border-t border-border">
              {country.flagDescription}
            </div>
          {/if}
        </div>
        
        <!-- Key information -->
        <div class="border border-border rounded-md overflow-hidden bg-card">
          <div class="border-b border-border p-4">
            <h2 class="text-lg font-medium">At a Glance</h2>
          </div>
          
          <div class="divide-y divide-border">
            <div class="p-4 grid grid-cols-[120px_1fr] text-sm items-center">
              <span class="text-muted-foreground">Capital</span>
              <span class="font-medium">{country.capital}</span>
            </div>
            
            <div class="p-4 grid grid-cols-[120px_1fr] text-sm items-center">
              <span class="text-muted-foreground">Region</span>
              <span class="font-medium">{country.region}</span>
            </div>
            
            {#if country.subregion}
              <div class="p-4 grid grid-cols-[120px_1fr] text-sm items-center">
                <span class="text-muted-foreground">Subregion</span>
                <span class="font-medium">{country.subregion}</span>
              </div>
            {/if}
            
            <div class="p-4 grid grid-cols-[120px_1fr] text-sm items-center">
              <span class="text-muted-foreground">Population</span>
              <span class="font-medium">{country.population.toLocaleString()}</span>
            </div>
            
            {#if country.area}
              <div class="p-4 grid grid-cols-[120px_1fr] text-sm items-center">
                <span class="text-muted-foreground">Area</span>
                <span class="font-medium">{country.area.toLocaleString()} km²</span>
              </div>
            {/if}
          </div>
        </div>
        
        <!-- Coat of Arms -->
        {#if country.coatOfArms}
          <div class="border border-border rounded-md overflow-hidden bg-card">
            <div class="border-b border-border p-4">
              <h2 class="text-lg font-medium">Coat of Arms</h2>
            </div>
            
            <div class="p-6 flex items-center justify-center bg-black/5 dark:bg-white/5">
              <img 
                src={country.coatOfArms} 
                alt="Coat of Arms" 
                class="h-32 object-contain"
              />
            </div>
          </div>
        {/if}
      </div>
      
      <!-- Right column -->
      <div class="lg:col-span-8 space-y-6">
        <!-- Languages and cultural info -->
        <div class="border border-border rounded-md overflow-hidden bg-card">
          <div class="border-b border-border p-4">
            <h2 class="text-lg font-medium">Language & Culture</h2>
          </div>
          
          <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              {#if country.nativeNames && country.nativeNames.length > 0}
                <div>
                  <span class="text-sm font-medium block mb-2">Native Names</span>
                  <p class="text-muted-foreground text-sm">{country.nativeNames.join(", ")}</p>
                </div>
              {/if}
              
              {#if country.languages}
                <div>
                  <span class="text-sm font-medium block mb-2">Languages</span>
                  <p class="text-muted-foreground text-sm">{country.languages}</p>
                </div>
              {/if}
            </div>
            
            <div class="space-y-4">
              {#if country.demonyms}
                <div>
                  <span class="text-sm font-medium block mb-2">Demonyms</span>
                  <p class="text-muted-foreground text-sm">{country.demonyms}</p>
                </div>
              {/if}
              
              {#if country.startOfWeek}
                <div>
                  <span class="text-sm font-medium block mb-2">Week Starts On</span>
                  <p class="text-muted-foreground text-sm capitalize">{country.startOfWeek}</p>
                </div>
              {/if}
            </div>
          </div>
        </div>
        
        <!-- Economic info -->
        <div class="border border-border rounded-md overflow-hidden bg-card">
          <div class="border-b border-border p-4">
            <h2 class="text-lg font-medium">Economy & Details</h2>
          </div>
          
          <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div>
                <span class="text-sm font-medium block mb-2">Currency</span>
                <p class="text-muted-foreground text-sm">
                  {#if country.currencySymbol}{country.currencySymbol} {/if}
                  {country.currencies}
                </p>
              </div>
              
              <div>
                <span class="text-sm font-medium block mb-2">Top Level Domain</span>
                <p class="text-muted-foreground text-sm">{country.tld}</p>
              </div>
            </div>
            
            <div class="space-y-4">
              {#if country.unMember !== undefined}
                <div>
                  <span class="text-sm font-medium block mb-2">UN Member</span>
                  <p class="text-muted-foreground text-sm">{country.unMember ? 'Yes' : 'No'}</p>
                </div>
              {/if}
              
              {#if country.drivingSide}
                <div>
                  <span class="text-sm font-medium block mb-2">Driving Side</span>
                  <p class="text-muted-foreground text-sm capitalize">{country.drivingSide}</p>
                </div>
              {/if}
            </div>
          </div>
        </div>
        
        <!-- Timezones -->
        {#if country.timezones && country.timezones.length > 0}
          <div class="border border-border rounded-md overflow-hidden bg-card">
            <div class="border-b border-border p-4">
              <h2 class="text-lg font-medium">Timezones</h2>
            </div>
            
            <div class="p-6">
              <div class="flex flex-wrap gap-2">
                {#each country.timezones as timezone}
                  <span class="inline-block px-3 py-1.5 bg-muted rounded text-sm">{timezone}</span>
                {/each}
              </div>
            </div>
          </div>
        {/if}
        
        <!-- Maps -->
        {#if country.maps && (country.maps.googleMaps || country.maps.openStreetMaps)}
          <div class="border border-border rounded-md overflow-hidden bg-card">
            <div class="border-b border-border p-4">
              <h2 class="text-lg font-medium">Maps</h2>
            </div>
            
            <div class="p-6">
              <div class="flex flex-wrap gap-3">
                {#if country.maps.googleMaps}
                  <a 
                    href={country.maps.googleMaps} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="inline-flex items-center px-4 py-2 text-sm border border-border rounded bg-background hover:bg-muted transition-colors"
                  >
                    <span>Google Maps</span>
                  </a>
                {/if}
                
                {#if country.maps.openStreetMaps}
                  <a 
                    href={country.maps.openStreetMaps} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="inline-flex items-center px-4 py-2 text-sm border border-border rounded bg-background hover:bg-muted transition-colors"
                  >
                    <span>OpenStreetMap</span>
                  </a>
                {/if}
              </div>
            </div>
          </div>
        {/if}
        
        <!-- Border countries -->
        {#if country.borderCountries.length > 0}
          <div class="border border-border rounded-md overflow-hidden bg-card">
            <div class="border-b border-border p-4">
              <h2 class="text-lg font-medium">Border Countries</h2>
            </div>
            
            <div class="p-6">
              <div class="flex flex-wrap gap-2">
                {#each country.borderCountries as borderCountry}
                  <a
                    href={`/country/${encodeURIComponent(borderCountry.name)}`}
                    class="inline-block px-4 py-2 text-sm border border-border rounded bg-background hover:bg-muted transition-colors"
                  >
                    {borderCountry.name}
                  </a>
                {/each}
              </div>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
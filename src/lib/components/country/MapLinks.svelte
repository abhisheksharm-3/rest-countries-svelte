<script lang="ts">
  import type { DetailedCountry } from "../../../routes/country/[countryName]/+page.server";
  import DetailSection from "./DetailSection.svelte";

  export let maps: DetailedCountry["maps"];
</script>

<DetailSection title="Explore on Maps">
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {#if maps.googleMaps}
      <a 
        href={maps.googleMaps} 
        target="_blank" 
        rel="noopener noreferrer"
        class="group flex items-center justify-center gap-3 p-4 border border-border/40 rounded-lg bg-card/50 hover:bg-card/80 hover:border-border/80 transition-all duration-200 hover:scale-[1.02]"
      >
        <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        <span class="font-medium">Google Maps</span>
      </a>
    {/if}
    
    {#if maps.openStreetMaps}
      <a 
        href={maps.openStreetMaps} 
        target="_blank" 
        rel="noopener noreferrer"
        class="group flex items-center justify-center gap-3 p-4 border border-border/40 rounded-lg bg-card/50 hover:bg-card/80 hover:border-border/80 transition-all duration-200 hover:scale-[1.02]"
      >
        <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        <span class="font-medium">OpenStreetMap</span>
      </a>
    {/if}
  </div>
</DetailSection>
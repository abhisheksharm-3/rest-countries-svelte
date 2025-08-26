<script lang="ts">
  import type { DetailedCountry } from "../../../routes/country/[countryName]/+page.server";
  import DetailSection from "./DetailSection.svelte";

  export let country: DetailedCountry;
</script>

<DetailSection title="Language & Culture">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div class="space-y-6">
      {#if country.nativeNames?.length}
        <div class="space-y-3">
          <h3 class="font-semibold text-foreground/90">Native Names</h3>
          <div class="flex flex-wrap gap-2">
            {#each country.nativeNames as name}
              <span class="px-3 py-1.5 bg-muted/50 rounded-full text-sm font-medium">{name}</span>
            {/each}
          </div>
        </div>
      {/if}
      
      {#if country.languages}
        <div class="space-y-3">
          <h3 class="font-semibold text-foreground/90">Languages</h3>
          <p class="text-muted-foreground leading-relaxed">{country.languages}</p>
        </div>
      {/if}
    </div>
    
    <div class="space-y-6">
      {#if country.demonyms}
        <div class="space-y-3">
          <h3 class="font-semibold text-foreground/90">Demonyms</h3>
          <p class="text-muted-foreground leading-relaxed">{country.demonyms}</p>
        </div>
      {/if}
      
      {#if country.startOfWeek}
        <div class="space-y-3">
          <h3 class="font-semibold text-foreground/90">Week Starts On</h3>
          <span class="inline-block px-3 py-1.5 bg-accent text-accent-foreground rounded-full text-sm font-medium capitalize">{country.startOfWeek}</span>
        </div>
      {/if}
    </div>
  </div>
</DetailSection>
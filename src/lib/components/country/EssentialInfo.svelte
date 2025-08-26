<script lang="ts">
  import type { DetailedCountry } from "../../../routes/country/[countryName]/+page.server";
  import DetailSection from './DetailSection.svelte';

  export let country: DetailedCountry;

  const infoItems = [
    { label: 'Capital', value: country.capital },
    { label: 'Region', value: country.region },
    { label: 'Subregion', value: country.subregion },
    { label: 'Population', value: country.population?.toLocaleString(), class: 'tabular-nums' },
    { label: 'Area', value: country.area ? `${country.area.toLocaleString()} km²` : undefined, class: 'tabular-nums' }
  ].filter(item => item.value);
</script>

<DetailSection title="Essential Information">
  <div class="space-y-4">
    {#each infoItems as item}
      <div class="flex items-center justify-between py-3 border-b border-border/30 last:border-b-0">
        <span class="text-muted-foreground font-medium">{item.label}</span>
        <span class="font-semibold text-right {item.class || ''}">{item.value}</span>
      </div>
    {/each}
  </div>
</DetailSection>
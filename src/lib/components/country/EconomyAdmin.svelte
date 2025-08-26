<script lang="ts">
  import type { DetailedCountry } from "../../../routes/country/[countryName]/+page.server";
  import DetailSection from "./DetailSection.svelte";

  export let country: DetailedCountry;
</script>

<DetailSection title="Economy & Administration">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div class="space-y-6">
      <div class="space-y-3">
        <h3 class="font-semibold text-foreground/90">Currency</h3>
        <div class="flex items-center gap-2">
          {#if country.currencySymbol}
            <span class="text-lg font-bold">{country.currencySymbol}</span>
          {/if}
          <span class="text-muted-foreground">{country.currencies}</span>
        </div>
      </div>
      
      <div class="space-y-3">
        <h3 class="font-semibold text-foreground/90">Internet Domain</h3>
        <span class="inline-block px-3 py-1.5 bg-accent text-accent-foreground rounded-full text-sm font-mono">{country.tld}</span>
      </div>
    </div>
    
    <div class="space-y-6">
      {#if country.unMember !== undefined}
        <div class="space-y-3">
          <h3 class="font-semibold text-foreground/90">UN Membership</h3>
          <span class="inline-block px-3 py-1.5 {country.unMember ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'} rounded-full text-sm font-medium">
            {country.unMember ? '✓ Member' : '✗ Not a member'}
          </span>
        </div>
      {/if}
      
      {#if country.drivingSide}
        <div class="space-y-3">
          <h3 class="font-semibold text-foreground/90">Driving Side</h3>
          <span class="inline-block px-3 py-1.5 bg-muted text-muted-foreground rounded-full text-sm font-medium capitalize">{country.drivingSide}</span>
        </div>
      {/if}
    </div>
  </div>
</DetailSection>
<script lang="ts">
  import type { DetailedCountry } from "../../../routes/country/[countryName]/+page.server";

  export let country: DetailedCountry;
  export let handleImageError: (e: Event) => void;
</script>

<div class="card-minimal group">
  <div class="aspect-[4/3] flex items-center justify-center bg-muted/20 rounded-lg overflow-hidden">
    <img
      src={country.flagUrl}
      alt={country.flagAlt || `Flag of ${country.name}`}
      class="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
      on:error={handleImageError}
    />
  </div>

  {#if country.flagDescription}
    <div class="mt-4 p-4 bg-muted/30 rounded-lg">
      <p class="text-sm text-muted-foreground italic leading-relaxed">
        {country.flagDescription}
      </p>
    </div>
  {/if}
</div>
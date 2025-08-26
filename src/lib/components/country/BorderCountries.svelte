<script lang="ts">
  import type { BorderCountry } from "../../../routes/country/[countryName]/+page.server";
  import DetailSection from "./DetailSection.svelte";

  export let borders: BorderCountry[];
</script>

<DetailSection title="Neighboring Countries">
  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
    {#each borders as borderCountry}
      <a
        href={`/country/${encodeURIComponent(borderCountry.name)}`}
        class="group p-4 border border-border/40 rounded-lg bg-card/50 hover:bg-card/80 hover:border-border/80 transition-all duration-200 hover:scale-[1.02] text-center"
      >
        <span class="text-sm font-medium group-hover:text-primary transition-colors">{borderCountry.name}</span>
      </a>
    {/each}
  </div>
</DetailSection>
<script lang="ts">
  import DetailSection from "./DetailSection.svelte";

  export let timezones: string[];
</script>

<DetailSection title="Timezones">
  <div class="flex flex-wrap gap-3">
    {#each timezones as timezone}
      <span class="px-4 py-2 bg-muted text-muted-foreground rounded-lg text-sm font-mono hover:bg-accent hover:text-accent-foreground transition-colors">{timezone}</span>
    {/each}
  </div>
</DetailSection>
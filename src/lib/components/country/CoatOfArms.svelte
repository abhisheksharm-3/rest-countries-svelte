<script lang="ts">
  import DetailSection from "./DetailSection.svelte";
  export let src: string;
</script>

<DetailSection title="Coat of Arms">
  <div class="flex items-center justify-center p-8 bg-muted/20 rounded-lg">
    <img 
      {src}
      alt="Coat of Arms" 
      class="h-32 object-contain transition-transform duration-300 hover:scale-110"
    />
  </div>
</DetailSection>
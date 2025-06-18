<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Input from './ui/input/input.svelte';
  
  const dispatch = createEventDispatcher<{ search: { query: string } }>();
  let searchQuery = '';
  
  function handleInput(event: Event) {
    searchQuery = (event.target as HTMLInputElement).value;
    dispatch('search', { query: searchQuery });
  }
</script>
  
<div class="relative w-full lg:max-w-md">
  <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </svg>
  </div>
  <Input
    type="text"
    placeholder="Search for a country..."
    bind:value={searchQuery}
    on:input={handleInput}
    class="h-12 pl-12 pr-4 w-full bg-card border-border text-sm"
  />
</div>
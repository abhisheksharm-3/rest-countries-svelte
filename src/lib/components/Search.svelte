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
  
  <div class="relative w-full flex items-center">
    <i class="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2"></i>
    <Input
      type="text"
      placeholder="Search for a country..."
      bind:value={searchQuery}
      on:input={handleInput}
      class="p-2 pl-10 shadow-xl border-none rounded-md w-full bg-[#2b3743] h-12"
    />
    </div>
  
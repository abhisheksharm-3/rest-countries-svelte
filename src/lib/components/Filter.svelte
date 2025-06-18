<script lang="ts">
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{ filter: { region: string } }>();
  let selectedRegion = 'All Regions';

  $: dispatch('filter', { region: selectedRegion });
</script>

<div class="w-full lg:w-64">
  <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild let:builder>
      <Button 
        variant="outline" 
        builders={[builder]} 
        class="w-full justify-between bg-card border-border h-12 px-4"
      >
        <span class="text-sm">{selectedRegion}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 h-4 w-4 opacity-50">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content class="w-56 bg-card border-border" align="end">
      <DropdownMenu.RadioGroup bind:value={selectedRegion}>
        <DropdownMenu.RadioItem value="All Regions" class="text-sm py-2.5">All Regions</DropdownMenu.RadioItem>
        <DropdownMenu.RadioItem value="Africa" class="text-sm py-2.5">Africa</DropdownMenu.RadioItem>
        <DropdownMenu.RadioItem value="Americas" class="text-sm py-2.5">Americas</DropdownMenu.RadioItem>
        <DropdownMenu.RadioItem value="Asia" class="text-sm py-2.5">Asia</DropdownMenu.RadioItem>
        <DropdownMenu.RadioItem value="Europe" class="text-sm py-2.5">Europe</DropdownMenu.RadioItem>
        <DropdownMenu.RadioItem value="Oceania" class="text-sm py-2.5">Oceania</DropdownMenu.RadioItem>
      </DropdownMenu.RadioGroup>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</div>
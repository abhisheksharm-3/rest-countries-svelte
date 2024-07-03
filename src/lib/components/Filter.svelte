<script lang="ts">
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{ filter: { region: string } }>();
  let selectedRegion = 'All Regions';

  $: dispatch('filter', { region: selectedRegion });
</script>

<DropdownMenu.Root >
  <DropdownMenu.Trigger asChild let:builder>
    <Button variant="outline" builders={[builder]} class="dark:bg-[#2b3743] shadow-2xl border-none h-12">Filter by Region: {selectedRegion}</Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="w-56 dark:bg-[#2b3743]">
    <DropdownMenu.Label>Select Region</DropdownMenu.Label>
    <DropdownMenu.Separator />
    <DropdownMenu.RadioGroup bind:value={selectedRegion}>
      <DropdownMenu.RadioItem value="All Regions">All Regions</DropdownMenu.RadioItem>
      <DropdownMenu.RadioItem value="Africa">Africa</DropdownMenu.RadioItem>
      <DropdownMenu.RadioItem value="Americas">Americas</DropdownMenu.RadioItem>
      <DropdownMenu.RadioItem value="Asia">Asia</DropdownMenu.RadioItem>
      <DropdownMenu.RadioItem value="Europe">Europe</DropdownMenu.RadioItem>
      <DropdownMenu.RadioItem value="Oceania">Oceania</DropdownMenu.RadioItem>
    </DropdownMenu.RadioGroup>
  </DropdownMenu.Content>
</DropdownMenu.Root>
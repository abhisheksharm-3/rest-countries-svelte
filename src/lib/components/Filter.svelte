<script lang="ts">
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { createEventDispatcher } from 'svelte';

  /**
   * The list of regions to display in the filter.
   * Passed in from the parent component.
   * @type {string[]}
   */
  export let regions: string[] = [];

  const dispatch = createEventDispatcher<{ filter: { region: string } }>();
  
  let selectedRegion = 'All Regions';
  let isOpen = false;

  // This map keeps the display logic (icons) encapsulated within this component.
  const regionIcons: Record<string, string> = {
    Africa: '🌍',
    Americas: '🌎',
    Asia: '🌏',
    Europe: '🇪🇺',
    Oceania: '🏝️'
  };

  // This reactive statement builds the full list for the dropdown.
  // It adds the "All Regions" option and maps the incoming `regions` prop
  // to the object structure needed for display, adding the correct icon.
  $: displayRegions = [
    { value: 'All Regions', label: 'All Regions', icon: '🌍' },
    ...regions.map(region => ({
      value: region,
      label: region,
      icon: regionIcons[region] ?? '❓' // Use a fallback icon for unknown regions
    }))
  ];

  // This computed property finds the full object for the selected region.
  // It's more efficient than calling a function repeatedly in the template.
  $: selectedRegionObject = displayRegions.find(r => r.value === selectedRegion) ?? displayRegions[0];

  // This reactive statement efficiently dispatches the filter event whenever the selection changes.
  $: dispatch('filter', { region: selectedRegion });
</script>

<div class="relative w-full sm:w-64">
  <DropdownMenu.Root bind:open={isOpen}>
    <DropdownMenu.Trigger asChild let:builder>
      <Button 
        variant="outline" 
        builders={[builder]} 
        class="h-12 w-full justify-between border-border/40 bg-card/50 px-4 backdrop-blur-sm transition-all duration-200 hover:border-border/80 hover:bg-card/70 data-[state=open]:border-primary/50 data-[state=open]:bg-card/80 data-[state=open]:shadow-lg data-[state=open]:shadow-primary/5"
      >
        <div class="flex items-center gap-3">
          <!-- Use the computed property for a cleaner template -->
          <span class="text-lg leading-none">{selectedRegionObject.icon}</span>
          <span class="text-sm font-medium">{selectedRegionObject.label}</span>
        </div>
        
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          class="opacity-50 transition-all duration-200 {isOpen ? 'rotate-180' : ''}"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </Button>
    </DropdownMenu.Trigger>
    
    <DropdownMenu.Content class="w-64 rounded-xl border-border/50 bg-popover/95 p-2 shadow-xl backdrop-blur-lg" align="end">
      <DropdownMenu.RadioGroup bind:value={selectedRegion}>
        <!-- Iterate over the dynamically generated list of regions -->
        {#each displayRegions as region}
          <DropdownMenu.RadioItem 
            value={region.value} 
            class="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-3 text-sm transition-all duration-200 hover:bg-accent/80 focus:bg-accent/80 data-[state=checked]:bg-primary/10 data-[state=checked]:font-medium data-[state=checked]:text-primary"
          >
            <span class="text-lg leading-none">{region.icon}</span>
            <span class="flex-1">{region.label}</span>
            
            {#if selectedRegion === region.value}
              <div class="h-2 w-2 rounded-full bg-primary"></div>
            {/if}
          </DropdownMenu.RadioItem>
        {/each}
      </DropdownMenu.RadioGroup>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
  
  <div class="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-primary/0 transition-all duration-200 {isOpen ? 'ring-primary/20' : ''}"></div>
</div>
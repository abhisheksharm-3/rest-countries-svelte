<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Input from "./ui/input/input.svelte";

  const dispatch = createEventDispatcher<{ search: { query: string } }>();
  export let searchQuery = "";

  let isFocused = false;
  $: dispatch("search", { query: searchQuery });

  function clearSearch() {
    searchQuery = "";
  }
</script>

<div class="relative w-full group">
  <Input
    type="text"
    placeholder="Search for a country..."
    bind:value={searchQuery}
    on:focus={() => (isFocused = true)}
    on:blur={() => (isFocused = false)}
    class="h-12 pl-8 pr-12 w-full bg-card/50 backdrop-blur-sm border-border/40 text-sm placeholder:text-muted-foreground/60 transition-all duration-200 focus:border-primary/50 focus:bg-card/80 focus:shadow-lg focus:shadow-primary/5 hover:border-border/80 hover:bg-card/70"
  />

  {#if searchQuery}
    <button
      type="button"
      class="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110 active:scale-95 opacity-0 animate-fade-in"
      style="animation-delay: 100ms"
      on:click={clearSearch}
      aria-label="Clear search"
    >
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
      >
        <path d="m18 6-12 12"></path>
        <path d="m6 6 12 12"></path>
      </svg>
    </button>
  {/if}

  <div
    class="absolute inset-0 rounded-lg ring-1 ring-primary/0 transition-all duration-200 pointer-events-none {isFocused
      ? 'ring-primary/20'
      : ''}"
  ></div>
</div>

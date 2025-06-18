<script lang="ts">
  import "../app.css";
  import Sun from "svelte-radix/Sun.svelte";
  import Moon from "svelte-radix/Moon.svelte";
  import { ModeWatcher, resetMode, setMode, mode } from "mode-watcher";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.ts";
  import Button from "$lib/components/ui/button/button.svelte";
  import { onMount } from "svelte";
  import 'remixicon/fonts/remixicon.css'

  type Mode = "light" | "dark";
  let currentMode: Mode = "dark";

  onMount(() => {
    const unsubscribe = mode.subscribe((value) => {
      currentMode = value || "dark";
    });

    return () => {
      unsubscribe();
    };
  });

  function handleSetMode(newMode: Mode) {
    setMode(newMode);
    currentMode = newMode;
  }

  function handleResetMode() {
    resetMode();
    currentMode = "dark";
  }
</script>

<svelte:head>
  <title>REST Countries - Svelte</title>
</svelte:head>

<div class="w-full dark:bg-neutral-900 light:bg-neutral-50 border-b border-neutral-200 dark:border-neutral-800">
  <nav class="flex justify-between py-6 container items-center max-w-6xl mx-auto px-4 sm:px-6">
    <h1 class="text-xl font-normal tracking-tight dark:text-neutral-100 light:text-neutral-900">
      <span class="font-medium">Where</span> in the world?
    </h1>
    
    <div class="flex items-center gap-2">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild let:builder>
          <Button 
            builders={[builder]} 
            variant="ghost" 
            size="sm" 
            class="h-9 w-9 rounded-full flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <Sun
              class="h-[1rem] w-[1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
            />
            <Moon
              class="absolute h-[1rem] w-[1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
            />
            <span class="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end" class="min-w-[120px] p-1 rounded-md border border-neutral-200 dark:border-neutral-800">
          <DropdownMenu.Item 
            class="flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors"
            on:click={() => handleSetMode("light")}
          >
            Light
          </DropdownMenu.Item>
          <DropdownMenu.Item 
            class="flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors"
            on:click={() => handleSetMode("dark")}
          >
            Dark
          </DropdownMenu.Item>
          <DropdownMenu.Item 
            class="flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors"
            on:click={() => handleResetMode()}
          >
            System
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      
      <span class="text-sm text-neutral-500 dark:text-neutral-400 capitalize">
        {currentMode}
      </span>
    </div>
  </nav>
</div>

<ModeWatcher />

<main class="max-w-6xl mx-auto px-4 sm:px-6 py-8">
  <slot></slot>
</main>
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

  
  

  // Update the mode based on the ModeWatcher
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

<div class="w-screen dark:bg-[#2b3743] mb-12 shadow-xl">
  <nav class="flex justify-between py-4 container items-center">
    <h1 class="text-2xl font-bold">Where in the world?</h1>
    <div class="flex items-center">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild let:builder>
          <Button builders={[builder]} variant="outline" size="icon">
            <Sun
              class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
            />
            <Moon
              class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
            />
            <span class="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end">
          <DropdownMenu.Item on:click={() => handleSetMode("light")}
            >Light</DropdownMenu.Item
          >
          <DropdownMenu.Item on:click={() => handleSetMode("dark")}
            >Dark</DropdownMenu.Item
          >
          <DropdownMenu.Item on:click={() => handleResetMode()}
            >System</DropdownMenu.Item
          >
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <span class="ml-4 capitalize font-light">{currentMode} Mode</span>
    </div>
  </nav>
</div>
<ModeWatcher />

<slot></slot>

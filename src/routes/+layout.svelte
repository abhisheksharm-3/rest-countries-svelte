<script lang="ts">
  import "../app.css";
  import 'remixicon/fonts/remixicon.css'
  import Sun from "svelte-radix/Sun.svelte";
  import Moon from "svelte-radix/Moon.svelte";
  import { ModeWatcher, resetMode, setMode } from "mode-watcher";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.ts";
  import Button from "$lib/components/ui/button/button.svelte";
</script>

<svelte:head>
  <title>Countries Explorer · Beautiful World Atlas</title>
  <meta name="description" content="Explore countries around the world with our beautiful, minimal interface">
</svelte:head>

<div class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
  <nav class="container mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
    <a href="/" class="group flex items-center space-x-3">
      <div class="flex flex-col">
        <h1 class="text-lg font-serif font-medium tracking-tight text-foreground transition-colors group-hover:text-foreground/80">
          Countries Explorer
        </h1>
        <p class="hidden text-xs text-muted-foreground sm:block">
          Discover the world
        </p>
      </div>
    </a>
    
    <div class="flex items-center gap-4">
      
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild let:builder>
          <Button 
            builders={[builder]} 
            variant="ghost" 
            size="sm" 
            class="relative h-9 w-9 rounded-lg transition-all duration-200 hover:bg-accent/50 hover:scale-105 active:scale-95"
          >
            <Sun class="h-4 w-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
            <Moon class="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
            <span class="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end" class="w-36 rounded-xl border border-border/50 bg-popover/95 p-1.5 shadow-xl backdrop-blur-lg">
          <DropdownMenu.Item 
            class="flex cursor-pointer items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-accent/80 focus:bg-accent/80"
            on:click={() => setMode("light")}
          >
            <Sun class="mr-2 h-4 w-4" />
            Light
          </DropdownMenu.Item>
          <DropdownMenu.Item 
            class="flex cursor-pointer items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-accent/80 focus:bg-accent/80"
            on:click={() => setMode("dark")}
          >
            <Moon class="mr-2 h-4 w-4" />
            Dark
          </DropdownMenu.Item>
          <DropdownMenu.Item 
            class="flex cursor-pointer items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-accent/80 focus:bg-accent/80"
            on:click={resetMode}
          >
            <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            System
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  </nav>
</div>

<ModeWatcher />

<main class="relative min-h-[calc(100vh-5rem)]">
  <div class="mx-auto max-w-7xl px-6 py-8 lg:px-8">
    <slot />
  </div>
  
  <div class="fixed inset-0 -z-10 opacity-[0.015] dark:opacity-[0.02]">
    <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgb(15 23 42) 1px, transparent 0); background-size: 20px 20px;"></div>
  </div>
</main>
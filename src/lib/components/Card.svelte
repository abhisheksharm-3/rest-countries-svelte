<script>
  import * as Card from "$lib/components/ui/card";
  export let name = "World";
  export let population = "7.9B";
  export let region = "Earth";
  export let capital = "Earth";
  export let image = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Flag_of_the_United_Nations.svg/1280px-Flag_of_the_United_Nations.svg.png";
  
  let imageLoaded = false;
  let imageError = false;
  
  function handleImageLoad() {
    imageLoaded = true;
  }
  
  function handleImageError() {
    imageError = true;
  }
</script>

<a 
  href={`/country/${encodeURIComponent(name)}`} 
  class="group block h-full transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
>
  <Card.Root class="relative flex flex-col h-full overflow-hidden border border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-300 group-hover:border-border/80 group-hover:bg-card/80 group-hover:shadow-xl group-hover:shadow-black/5 dark:group-hover:shadow-black/20">
    <!-- Flag image container with enhanced loading states -->
    <div class="relative aspect-[3/2] w-full overflow-hidden bg-muted/30">
      {#if !imageLoaded && !imageError}
        <!-- Loading skeleton -->
        <div class="absolute inset-0 bg-gradient-to-r from-muted via-muted/50 to-muted animate-pulse"></div>
      {/if}
      
      {#if !imageError}
        <img
          src={image}
          alt="{name} flag"
          class="w-full h-full object-cover transition-all duration-700 {imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'} group-hover:scale-110"
          loading="lazy"
          on:load={handleImageLoad}
          on:error={handleImageError}
        />
      {:else}
        <!-- Error state with elegant fallback -->
        <div class="absolute inset-0 bg-gradient-to-br from-muted via-muted/80 to-muted/60 flex items-center justify-center">
          <div class="text-center">
            <svg class="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <p class="text-xs text-muted-foreground/60 font-medium">{name}</p>
          </div>
        </div>
      {/if}
      
      <!-- Subtle overlay for better text contrast -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
    
    <!-- Content section with enhanced typography and spacing -->
    <div class="flex flex-col flex-grow p-6 space-y-4">
      <!-- Country name with enhanced styling -->
      <div class="space-y-1">
        <h3 class="text-lg font-semibold tracking-tight leading-tight group-hover:text-foreground/90 transition-colors line-clamp-2">
          {name}
        </h3>
        <div class="w-12 h-0.5 bg-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left"></div>
      </div>
      
      <!-- Information grid with better spacing and typography -->
      <div class="space-y-3 text-sm flex-grow">
        <div class="flex items-start justify-between">
          <span class="text-muted-foreground font-medium min-w-0 flex-shrink-0">Population</span>
          <span class="text-foreground font-semibold text-right ml-3 tabular-nums">{population}</span>
        </div>
        
        <div class="flex items-start justify-between">
          <span class="text-muted-foreground font-medium min-w-0 flex-shrink-0">Region</span>
          <span class="text-foreground font-semibold text-right ml-3">{region}</span>
        </div>
        
        <div class="flex items-start justify-between">
          <span class="text-muted-foreground font-medium min-w-0 flex-shrink-0">Capital</span>
          <span class="text-foreground font-semibold text-right ml-3 line-clamp-1">{capital}</span>
        </div>
      </div>
      
      <!-- Subtle call-to-action -->
      <div class="flex items-center justify-between pt-2 border-t border-border/30 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        <span class="text-xs text-muted-foreground font-medium">Learn more</span>
        <svg class="w-4 h-4 text-muted-foreground transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
        </svg>
      </div>
    </div>
    
    <!-- Hover effect ring -->
    <div class="absolute inset-0 rounded-lg ring-1 ring-primary/0 group-hover:ring-primary/20 transition-all duration-300"></div>
  </Card.Root>
</a>
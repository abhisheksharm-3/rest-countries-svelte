<script>
  import * as Card from "$lib/components/ui/card";
  export let name = "World";
  export let population = "7.9B";
  export let region = "Earth";
  export let capital = "Earth";
  export let image =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Flag_of_the_United_Nations.svg/1280px-Flag_of_the_United_Nations.svg.png";
</script>

<a 
  href={`/country/${encodeURIComponent(name)}`} 
  class="group block h-full"
>
  <Card.Root class="flex flex-col h-full overflow-hidden border-none bg-card relative transition-all duration-300">
    <div class="aspect-[3/2] w-full relative overflow-hidden">
      <img
        src={image}
        alt="{name} flag"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
    </div>
    
    <div class="flex flex-col grow p-5">
      <h3 class="text-base font-medium mb-3 tracking-tight">{name}</h3>
      
      <div class="grid gap-y-1 text-[13px]">
        <p class="flex">
          <span class="inline-block w-24 font-medium">Population:</span>
          <span class="text-muted-foreground">{population}</span>
        </p>
        <p class="flex">
          <span class="inline-block w-24 font-medium">Region:</span>
          <span class="text-muted-foreground">{region}</span>
        </p>
        <p class="flex">
          <span class="inline-block w-24 font-medium">Capital:</span>
          <span class="text-muted-foreground">{capital}</span>
        </p>
      </div>
    </div>
    
    <div class="absolute inset-0 border border-border opacity-0 group-hover:opacity-100 transition-opacity"></div>
  </Card.Root>
</a>
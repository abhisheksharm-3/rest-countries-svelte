<script>
  import * as Card from "$lib/components/ui/card";
  export let name = "World";
  export let population = "7.9B";
  export let region = "Earth";
  export let capital = "Earth";
  export let image = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Flag_of_the_United_Nations.svg/1280px-Flag_of_the_United_Nations.svg.png";
</script>

<Card.Root class="flex flex-col h-full rounded-lg shadow-lg">
  <img
    src={image}
    alt="{name} flag"
    class="h-1/2 rounded-t-lg object-cover"
  />
  <div class="h-1/2">
    <Card.Header>
      <Card.Title class="font-bold text-2xl tracking-wide">{name}</Card.Title>
    </Card.Header>
    <Card.Content class="text-sm font-semibold">
      <p>Population: <span class="text-gray-400 font-normal">{population}</span></p>
      <p>Region: <span class="text-gray-400 font-normal">{region}</span></p>
      <p>Capital: <span class="text-gray-400 font-normal">{capital}</span></p>
    </Card.Content>
  </div>
</Card.Root>

<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  const { country } = data;
</script>

<div class="container p-4 flex flex-col gap-20">
  <Button
    class="w-max dark:bg-[#2b3743] dark:text-gray-400 hover:scale-110 ease-linear duration-500 group"
    href="/"
    ><i
      class="ri-arrow-left-line mr-2 dark:text-gray-400 dark:group-hover:text-white ease-linear duration-500"
    ></i><span class="dark:group-hover:text-white ease-linear duration-500"
      >Back</span
    ></Button
  >
  <div class="flex justify-between items-center">
    <img
      src={country.flagUrl}
      alt={`Flag of ${country.name}`}
      class="mb-4 w-[40%] shadow-2xl object-cover"
    />
    <div class="w-1/2 flex flex-col gap-12">
      <h1 class="text-4xl font-bold mb-4 tracking-wide">{country.name}</h1>
      <div class="flex justify-between">
        <div class="flex flex-col gap-2">
          <p><strong>Official Name:</strong> {country.officialName}</p>
          <p>
            <strong>Population:</strong>
            {country.population.toLocaleString()}
          </p>
          <p><strong>Region:</strong> {country.region}</p>
          <p><strong>Sub-region:</strong> {country.subregion}</p>
          <p><strong>Capital:</strong> {country.capital}</p>
        </div>
        <div class="flex flex-col gap-2">
          <p><strong>Top Level Domain:</strong> {country.tld}</p>
          <p><strong>Currencies:</strong> {country.currencies}</p>
          <p><strong>Languages:</strong> {country.languages}</p>
        </div>
      </div>
      <p>
        <strong>Border Countries:</strong>
        {country.borderCountries.join(", ") || "None"}
      </p>
    </div>
  </div>
</div>

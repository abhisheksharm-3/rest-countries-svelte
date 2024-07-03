<script lang="ts">
    import { onMount } from "svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
    const { country } = data;
    onMount(async () => {
        try {
            const updatedBorderCountries = await Promise.all(
                country.borderCountries.map(async (borderCountryCode) => {
                    try {
                        const response = await fetch(`https://restcountries.com/v3.1/alpha/${borderCountryCode}`);
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        const [data] = await response.json(); // Destructure the array response

                        if (!data || !data.name || !data.name.common) {
                            throw new Error('Country name not found in API response');
                        }

                        return data.name.common;
                    } catch (error) {
                        console.error(`Error fetching country ${borderCountryCode}:`, error);
                        return 'Unknown';
                    }
                })
            );

            // Update the existing array elements instead of assigning a new array
            updatedBorderCountries.forEach((name, index) => {
                country.borderCountries[index] = name;
            });
        } catch (err) {
            console.error('Error fetching border countries:', err);
        }
    });
</script>

<div class="container p-4 flex flex-col gap-20">
    <Button
        class="w-max dark:bg-[#2b3743] dark:dark:text-gray-400 hover:scale-110 ease-linear duration-500 group"
        href="/"
        ><i
            class="ri-arrow-left-line mr-2 dark:dark:text-gray-400 dark:group-hover:text-white ease-linear duration-500"
        ></i><span class="dark:group-hover:text-white ease-linear duration-500"
            >Back</span
        ></Button
    >
    <div class="flex justify-between  items-center flex-col lg:flex-row">
        <img
            src={country.flagUrl}
            alt={`Flag of ${country.name}`}
            class="mb-4 lg:w-[40%] shadow-2xl object-cover aspect-[4/3]"
        />
        <div class="lg:w-1/2 flex flex-col gap-12 ">
            <h1 class="text-4xl font-bold mb-4 tracking-wide">{country.name}</h1>
            <div class="flex justify-between flex-col lg:flex-row gap-10 lg:gap-0">
                <div class="flex flex-col gap-2">
                    <p><strong class="dark:text-gray-200">Official Name:</strong> <span class="dark:text-gray-400">{country.officialName}</span></p>
                    <p>
                        <strong class="dark:text-gray-200">Population:</strong>
                        <span class="dark:text-gray-400">{country.population.toLocaleString()}</span>
                    </p>
                    <p><strong class="dark:text-gray-200">Region:</strong> <span class="dark:text-gray-400">{country.region}</span></p>
                    <p><strong class="dark:text-gray-200">Sub-region:</strong> <span class="dark:text-gray-400">{country.subregion}</span></p>
                    <p><strong class="dark:text-gray-200">Capital:</strong> <span class="dark:text-gray-400">{country.capital}</span></p>
                </div>
                <div class="flex flex-col gap-2">
                    <p><strong class="dark:text-gray-200">Top Level Domain:</strong> <span class="dark:text-gray-400">{country.tld}</span></p>
                    <p><strong class="dark:text-gray-200">Currencies:</strong> <span class="dark:text-gray-400">{country.currencies}</span></p>
                    <p><strong class="dark:text-gray-200">Languages:</strong> <span class="dark:text-gray-400">{country.languages}</span></p>
                </div>
            </div>
            <div class="flex flex-col lg:flex-row gap-2">
                {#if country.borderCountries.length > 0}
                    <strong class="dark:text-gray-200">Border Countries:</strong>
                    <div class="flex flex-wrap gap-2">
                        {#each country.borderCountries as borderCountry}
                            <p class="dark:text-gray-400 dark:bg-[#2b3743] border shadow-5xl px-4 rounded-sm py-1 text-xs">{borderCountry}</p>
                        {/each}
                    </div>
                {:else}
                    <p class="dark:text-gray-200">Border Countries: None</p>
                {/if}
            </div>
        </div>
    </div>
</div>

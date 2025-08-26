<script lang="ts">
  export let title: string;
</script>

<div class="card-minimal">
  <div class="flex items-center gap-3 mb-6">
    <div class="w-2 h-8 bg-primary rounded-full"></div>
    <h2 class="text-xl font-serif font-medium">{title}</h2>
  </div>
  <slot />
</div>
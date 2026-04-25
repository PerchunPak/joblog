<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";

  let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<main class="m-0 flex min-h-screen w-full flex-col items-center justify-center p-5">
  {@render children()}
</main>

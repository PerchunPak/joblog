<script lang="ts">
  import type { ValidationErrors } from "sveltekit-superforms";

  interface Props {
    id: string;
    name: string;
    type?: string;
    errors: ValidationErrors;
  }

  let { id, name, type = "text", errors, children, ...props }: Props = $props();
</script>

<label class="label">
  <span class="label-text">{name}</span>
  {#if children}
    {@render children()}
  {:else}
    <input
      name={id}
      {type}
      class="input"
      aria-invalid={errors[id] ? "true" : undefined}
      {...props}
    />
  {/if}
  {#if errors[id]}<span class="text-error-300">{errors[id]}</span>{/if}
</label>

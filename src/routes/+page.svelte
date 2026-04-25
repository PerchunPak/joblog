<script lang="ts">
  import { page } from "$app/state";
  import { enhance } from "$app/forms";

  let { form } = $props();

  let message = $derived(form?.form?.message);
  let errors = $derived(form?.form?.errors ?? {});

  $effect(() => {
    // Focus on first error
    if (Object.keys(errors).length) {
      document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
    }
  });
</script>

{#if message}
  <div class="status" class:error={page.status >= 400} class:success={page.status == 200}>
    {message}
  </div>
{/if}

<form method="POST" use:enhance class="w-full max-w-md space-y-4 p-4">
  <fieldset class="space-y-4">
    <!-- URL -->
    <label class="label">
      <span class="label-text">Job URL</span>
      <input
        name="url"
        type="url"
        class="input"
        placeholder="https://startupjobs.com/..."
        aria-invalid={errors.url ? "true" : undefined}
      />
      {#if errors.url}<span class="text-error-500">{errors.url}</span>{/if}
    </label>
    <!-- Textarea -->
    <label class="label">
      <span class="label-text">Textarea</span>
      <textarea
        name="introduction"
        class="textarea rounded-container"
        rows="4"
        aria-invalid={errors.introduction ? "true" : undefined}
      ></textarea>
      {#if errors.introduction}<span class="text-error-500">{errors.introduction}</span>{/if}
    </label>
  </fieldset>
  <fieldset class="flex justify-end">
    <!-- Button -->
    <button type="submit" class="btn preset-outlined-surface-300-700">Submit</button>
  </fieldset>
</form>

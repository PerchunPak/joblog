<script lang="ts">
  import { page } from "$app/state";
  import { enhance } from "$app/forms";
  import FormInput from "./FormInput.svelte";

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
  <div
    class="min-w-sm card p-4 text-center"
    class:preset-tonal-success={page.status < 400}
    class:preset-tonal-error={page.status >= 400}
  >
    {message}
  </div>
{/if}

<form method="POST" use:enhance class="w-full max-w-lg space-y-4 p-4">
  <fieldset class="space-y-4">
    <FormInput id="jobName" name="Job name" {errors} />
    <FormInput id="url" name="Job URL" type="url" {errors} />
    <FormInput id="companyName" name="Company name" {errors} />
    <FormInput id="description" name="Description" {errors}>
      <textarea
        name="description"
        class="textarea text-xs"
        rows="10"
        aria-invalid={errors.introduction ? "true" : undefined}
      ></textarea>
    </FormInput>
    <FormInput id="introduction" name="Introduction" {errors}>
      <textarea
        name="introduction"
        class="textarea text-xs"
        rows="5"
        aria-invalid={errors.introduction ? "true" : undefined}
      ></textarea>
    </FormInput>
  </fieldset>
  <fieldset class="flex justify-end">
    <button
      type="submit"
      class="btn preset-outlined-surface-300-700"
      onclick={() => (message = null)}>Submit</button
    >
  </fieldset>
</form>

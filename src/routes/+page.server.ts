import { superValidate, message } from "sveltekit-superforms";
import { valibot } from "sveltekit-superforms/adapters";
import { fail } from "@sveltejs/kit";
import * as v from "valibot";

const schema = v.object({
  jobName: v.string(),
  url: v.pipe(v.string(), v.url()),
  companyName: v.string(),
  description: v.string(),
  introduction: v.optional(v.string()),
});

export const load = async () => {
  const form = await superValidate(valibot(schema));
  return { form };
};

export const actions = {
  // @ts-expect-error request is any
  default: async ({ request }) => {
    const form = await superValidate(request, valibot(schema));

    if (!form.valid) {
      // Return { form } and things will just work.
      return fail(400, { form });
    }

    // TODO: Do something with the validated form.data

    // Return the form with a status message
    return message(form, "Saved successfully!");
  },
};

import * as fs from "node:fs/promises";
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
  default: async ({ request }) => {
    const form = await superValidate(request, valibot(schema));

    if (!form.valid) {
      // Return { form } and things will just work.
      return fail(400, { form });
    }
    const data = form.data;

    // 1. mkdir ~/persistent/jobs/log/$company
    const companyDir = `/home/perchun/persistent/jobs/log/${data.companyName}/`;
    await fs.mkdir(companyDir, { recursive: true });
    // 2. craft file
    const todayDate = new Date().toISOString().split("T")[0];
    let text = `\
${todayDate}
${data.url}

# ${data.jobName}

${data.description}`;
    if (data.introduction) {
      text += `\n\n${data.introduction}`;
    }
    // 3. write file
    await fs.writeFile(companyDir + data.jobName + ".txt", text + "\n");

    // Return the form with a status message
    return message(form, "Saved successfully!");
  },
};

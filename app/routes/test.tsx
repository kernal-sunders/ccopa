import { ActionFunction, json, Response } from "@remix-run/node";
import { z } from "zod";
import { makeDomainFunction } from "domain-functions";
// Learn how to create these files on "Get Started" 👇🏽
import { formAction } from "utils/remix-forms/form-action.sever";
import { Form } from "utils/remix-forms/form";

const schema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(10),
});

const mutation = makeDomainFunction(schema)(async (values) => values);

export const action: ActionFunction = async ({ request }) => {
  return formAction({
    request,
    schema,
    mutation,
    successPath: "/",
  });
};

export default () => <Form schema={schema} />;

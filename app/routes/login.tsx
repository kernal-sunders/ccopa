import { ActionArgs, json } from "@remix-run/node";
import { Form } from "@remix-run/react";
import supabaseServer from "utils/supabase/supabase.server";

export async function action({ request }: ActionArgs) {
  const response = new Response();
  const formData = await request.formData();
  const values = Object.fromEntries(formData);
  const supabase = supabaseServer({ request, response });
  const login = await supabase.auth.signInWithPassword(values);

  return json({ login }, { headers: response.headers });
}

export default function Login() {
  return (
    <>
      <Form method="post">
        <input type="email" name="email" placeholder="you@exp.com" />
        <input type="password" name="password" />
        <button type="submit">Login</button>
      </Form>
    </>
  );
}

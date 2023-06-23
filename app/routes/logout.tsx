import { ActionArgs, json } from "@remix-run/node";
import { Form } from "@remix-run/react";
import supabaseServer from "utils/supabase/supabase.server";

export async function action({ request }: ActionArgs) {
  const response = new Response();
  const supabase = supabaseServer({ request, response });
  const logout = await supabase.auth.signOut();

  return json({ logout }, { headers: response.headers });
}

export default function Logout() {
  return (
    <>
      <Form method="post">
        <button type="submit">Log Out</button>
      </Form>
    </>
  );
}

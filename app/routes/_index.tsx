import {
  Response,
  type LoaderArgs,
  type V2_MetaFunction,
  json,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import createServerSupabase from "utils/supabase/supabase.server";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "CCOPA" },
    { name: "description", content: "Welcome to CCOPA!" },
  ];
};

export const loader = async ({ request }: LoaderArgs) => {
  const response = new Response();
  const supabase = createServerSupabase({ request, response });
  const { data } = await supabase.from("test").select("*");
  return json({ messages: data ?? [] }, { headers: response.headers });
};

export default function Index() {
  const { messages } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen">
      <pre>{JSON.stringify(messages, null, 2)}</pre>
    </div>
  );
}

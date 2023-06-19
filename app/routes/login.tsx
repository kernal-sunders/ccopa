import supabaseServer from 'utils/supabase.server'
import { ActionArgs, Response, json } from "@remix-run/node";
import { Form } from "@remix-run/react";

export async function action({request}:ActionArgs) {
  const response = new Response()
  const supabase = supabaseServer({request, response})
  const formData = await request.formData()
  const values = Object.fromEntries(formData)
  const login = await supabase.auth.signInWithPassword({...values})
  
  return json({login}, {headers: response.headers})
}

export default function Login() {
    return(
        <>
         <Form method="post" className="min-h-screen">
            <input type="email" name="email" placeholder="you@foo.net" /> {" "}
            <input type="password" name="password" /> {" "}
            <button type="submit">Log In</button>
         </Form>
        </>
    )
}
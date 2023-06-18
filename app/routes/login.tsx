import { ActionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useOutletContext } from "@remix-run/react"
import type { SupabaseOutletContext } from 'app/root'

export async function action({request}:ActionArgs) {
    return null
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
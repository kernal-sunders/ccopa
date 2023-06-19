import { useOutletContext } from "@remix-run/react"

import type { SupabaseOutletContext } from "~/root"

export default function Authentication() {
    const {supabase} = useOutletContext<SupabaseOutletContext>()

    // const signIn = async () => {await supabase.auth.signInWithPassword({
    //     email: "admin@cuerocitizensonpatrol.org",
    //     password: "17718529Test"
    // })}

    const signOut = async () => {await supabase.auth.signOut()}

    return (
        <>
          {/* <button onClick={signIn} className="px-2">Sign In</button> */}
          <button onClick={signOut} className="px-2">Sign Out</button>
        </>
    )
}
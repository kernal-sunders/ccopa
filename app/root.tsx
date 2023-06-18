import CSS from '~/css/app.css'
import Menu from 'components/Nav'
import { json, Response, type LinksFunction, type LoaderArgs } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRevalidator,
} from "@remix-run/react";
import { SupabaseClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import createServerSupabase from "utils/supabase.server"
import { createBrowserClient } from '@supabase/auth-helpers-remix';
import Footer from 'components/Footer';


import type { Database } from 'db_types';
type TypedSupabaseClient = SupabaseClient<Database>

export type SupabaseOutletContext = {
  supabase: TypedSupabaseClient
}

export const links: LinksFunction = () => {
  return [{rel: 'stylesheet', href: CSS}]
}

export const loader = async ({request}: LoaderArgs) => {
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!
  }

  const response = new Response()
  const supabase = createServerSupabase({request, response})
  const {data: {session}} = await supabase.auth.getSession()
  
  return json({env, session}, {headers: response.headers})
}

export default function App() {
  const {env, session} = useLoaderData<typeof loader>()
  const [supabase] = useState(() => createBrowserClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY))
  const revalidator = useRevalidator()
  const serverAccessToken = session?.access_token

    useEffect(() => {
    const {
      data: { subscription }} = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== serverAccessToken) {
        revalidator.revalidate();
      }
    });

  return () => subscription.unsubscribe()
}, [serverAccessToken])
  
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className='bg-slate-300'>
        <Menu />
        <Outlet context={{supabase}} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <Footer />
      </body>
    </html>
  );
}

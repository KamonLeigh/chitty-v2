import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useFetcher,
  useCatch
} from "@remix-run/react";

import { useEffect } from 'react';
import supabase from '~/util/supabase'

import styles from "~/styles/app.css";
console.log(styles, 'nnnnn')

export function links() {
  return [{rel:'stylesheet', href: styles}]
}

export const meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const loader = () => {
  return {
    env: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY
    }
  }
}

export default function App() {
  const { env } = useLoaderData();
  const fetcher = useFetcher();
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        // call auth/login
        fetcher.submit({
          accessToken: session.access_token
        }, {
          method: 'post',
          action: '/auth/login'
        })
      }

      if (event === 'SIGNED_OUT') {
        fetcher.submit(null, {
          method: "post",
          action: "/auth/logout"
        })
      }
    })
  }, [])

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <script dangerouslySetInnerHTML={{
          __html: `window.env = ${JSON.stringify(env)}`
        }}/>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}





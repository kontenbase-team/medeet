import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { VechaiProvider } from "@vechaiui/react";
import { vechaiTheme } from "~/configs";

import styles from "~/styles/app.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  viewport: "width=device-width,initial-scale=1",
  title: "Medeet",
  description: "Medium + Twitter",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <VechaiProvider theme={vechaiTheme} colorScheme="night">
          <div className="container mx-auto">
            <Outlet />
          </div>
        </VechaiProvider>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

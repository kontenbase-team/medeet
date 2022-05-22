import {
  json,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { VechaiProvider } from "@vechaiui/react";
import { vechaiTheme } from "~/configs";

import styles from "~/styles/app.css";
import { NavigationBar } from "~/components";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  viewport: "width=device-width,initial-scale=1",
  title: "Medeet",
  description: "Medium + Twitter",
});

export const loader: LoaderFunction = async ({ request }) => {
  const user = null;

  return json({
    user,
  });
};

export default function App() {
  const data = useLoaderData();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <VechaiProvider theme={vechaiTheme} colorScheme="night">
          <div className="container mx-auto">
            <NavigationBar user={data?.user} />
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

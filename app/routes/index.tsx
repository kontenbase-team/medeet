import { LinkButton } from "~/components";

import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { kontenbaseServer } from "~/libs";
import { authenticator } from "~/services";

export const loader: LoaderFunction = async ({ request }) => {
  const { data, error } = await kontenbaseServer.service("posts").find();
  const user = await authenticator.isAuthenticated(request);

  if (error) {
    return json({ ok: false, error });
  }

  return json({
    ok: true,
    user,
    posts: data,
  });
};

export default function Index() {
  const loaderData = useLoaderData();

  return (
    <div className="stack gap-4">
      <div>
        <h1>Welcome to Medeet</h1>
      </div>

      <div className="prose-config">
        <pre>{JSON.stringify(loaderData, null, 2)}</pre>
      </div>
    </div>
  );
}

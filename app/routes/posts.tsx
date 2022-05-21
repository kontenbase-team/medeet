import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { kontenbase } from "~/libs";

export const loader: LoaderFunction = async () => {
  const { data, error } = await kontenbase.service("posts").find();

  if (error) {
    return json({ ok: false, error });
  }

  return json({ ok: true, posts: data });
};

export default function Posts() {
  const loaderData = useLoaderData();

  return (
    <div>
      <pre>{JSON.stringify(loaderData, null, 2)}</pre>
    </div>
  );
}

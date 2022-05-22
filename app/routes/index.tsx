import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getCompleteDateTime, kontenbaseServer } from "~/libs";
import { authenticator } from "~/services";
import type { Post } from "~/types";
import { getUserName } from "~/utils";

export const loader: LoaderFunction = async ({ request }) => {
  const { data: posts, error } = await kontenbaseServer.service("posts").find();
  const user = await authenticator.isAuthenticated(request);

  if (error) return json({ ok: false, error });

  return json({
    ok: true,
    user,
    posts,
  });
};

export default function Index() {
  const loaderData = useLoaderData();
  const { posts } = loaderData;

  return (
    <div className="stack gap-12">
      <div>
        <h1>Medeet</h1>
      </div>

      <div className="stack max-w-lg gap-8 divide-slate-400/25">
        {posts &&
          posts.map((post: Post) => {
            return (
              <Link className="hover:no-underline" key={post._id} to={post._id}>
                <div className="stack gap-2 rounded-base p-4 hover:bg-neutral-800">
                  <h3>{post.title}</h3>
                  <p className="font-normal">
                    by {getUserName(post.createdBy)} on{" "}
                    {getCompleteDateTime(post.createdAt)}
                  </p>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

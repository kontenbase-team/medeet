import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { kontenbaseServer } from "~/libs";
import { authenticator } from "~/services";

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await authenticator.isAuthenticated(request);

  const { data: post, error } = await kontenbaseServer
    .service("posts")
    .getById(params?.postId as string);

  if (error) return json({ error }, { status: 404 });
  if (!post) return json({ user, error: "Post not found" }, { status: 404 });
  return json({ user, post, error });
};

export default function PostId() {
  const loaderData = useLoaderData();
  const { user, post, error } = loaderData;

  return (
    <div className="cstack">
      {post && !error && (
        <div className="stack max-w-lg gap-4">
          <h1>{post.title}</h1>
          <div className="stack gap-1">
            <p>Posted at {post.createdAt}</p>
            <p>Posted by {post.createdBy.firstName}</p>
          </div>
          <div>
            <p className="break-words	text-2xl">{post.content}</p>
          </div>
        </div>
      )}

      {(!post || error) && (
        <div className="stack gap-2">
          {!post && <p>Sorry, post not found</p>}
          {error && <p>Error: {error?.message}</p>}
        </div>
      )}

      {/* <pre>{JSON.stringify(loaderData, null, 2)}</pre> */}
    </div>
  );
}

import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData, useTransition } from "@remix-run/react";
import { Button } from "@vechaiui/react";
import {
  getCompleteDateTime,
  kontenbaseApiUrl,
  kontenbaseServer,
} from "~/libs";
import { authenticator } from "~/services";
import { getUserName } from "~/utils";

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await authenticator.isAuthenticated(request);
  const postId = params.postId;

  const { data, error } = await kontenbaseServer
    .service("posts")
    .getById(postId as string);

  if (error) return json({ error }, { status: 404 });
  if (!data) return json({ user, error: "Post not found" }, { status: 404 });
  return json({ user, post: data, error });
};

export const action: ActionFunction = async ({ request, params }) => {
  const user = await authenticator.isAuthenticated(request);
  const headers = new Headers({ Authorization: `Bearer ${user?.token}` });
  const form = await request.formData();

  // Find about this Post, especially the owner
  const { data: post, error: postError } = await kontenbaseServer
    .service("posts")
    .getById(params?.postId as string);

  if (postError) return json({ error: postError }, { status: 400 });

  // Only the owner of the Post can do something
  const isOwned = user?._id === post?.createdBy?._id;
  const isMethodDelete = form.get("_method") === "delete";
  const isMethodEdit = form.get("_method") === "edit";

  if (isOwned && isMethodDelete) {
    const url = `${kontenbaseApiUrl}/posts/${params?.postId}`;
    const response = await fetch(url, { headers, method: "DELETE" });
    await response.json();
    return redirect(`/`, { headers });
  }

  if (isOwned && isMethodEdit) {
    return redirect(`/${params?.postId}/edit`, { headers });

    // const url = `${kontenbaseApiUrl}/posts/${params?.postId}`;
    // const response = await fetch(url, { headers, method: "PATCH" });
    // const data = await response.json();
  }

  return null;
};

export default function PostId() {
  const loaderData = useLoaderData();
  const transition = useTransition();

  const { user, post, error } = loaderData;
  const postOwner = post?.createdBy;
  const isOwned = user?._id === postOwner?._id;

  return (
    <div className="stack gap-4">
      {post && !error && (
        <div className="stack max-w-lg gap-4">
          <h1>{post.title}</h1>
          <p>
            Posted by {getUserName(post.createdBy)} on{" "}
            {getCompleteDateTime(post.createdAt)}
          </p>
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

      {isOwned && (
        <Form method="post">
          <input type="hidden" name="_method" value="delete" />

          <Button
            type="submit"
            variant="solid"
            color="red"
            size="xs"
            loading={transition.state === "submitting"}
            loadingText={
              transition.state === "submitting"
                ? "Deleting..."
                : transition.state === "loading"
                ? "Deleted!"
                : "Delete"
            }
          >
            Delete Post
          </Button>
        </Form>
      )}
    </div>
  );
}

import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useTransition } from "@remix-run/react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@vechaiui/react";
import { kontenbaseApiUrl } from "~/libs";
import { authenticator } from "~/services";

export const meta: MetaFunction = () => ({
  title: "Create a new Medeet post",
});

export const action: ActionFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  console.log({ user });

  const headers = new Headers({ Authorization: `Bearer ${user?.token}` });

  const form = await request.formData();
  const title = form.get("title");
  const content = form.get("content");

  try {
    const response = await fetch(`${kontenbaseApiUrl}/posts`, {
      headers,
      method: "POST",
      body: JSON.stringify({ title, content }),
    });

    const data = await response.json();

    console.log({ data });

    return redirect(`/${data._id}`, { headers });
  } catch (error) {
    return json({ error }, { status: 400 });
  }
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  return json({ user });
};

export default function New() {
  const loaderData = useLoaderData();
  const transition = useTransition();

  return (
    <div className="stack gap-8">
      <h1>Create new post</h1>

      <p>
        Author: {loaderData?.user?.firstName} {loaderData?.user?.lastName}
      </p>

      <Form method="post" action="/new">
        <div className="stack max-w-md gap-4">
          <FormControl>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              required
              size="lg"
              type="text"
              name="title"
              placeholder="Insert post title"
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="content">Content</FormLabel>
            <Textarea
              required
              name="content"
              placeholder="What's happening?"
              minLength={1}
              maxLength={280}
              className="min-h-[200px] text-lg"
            />
          </FormControl>

          <Button
            type="submit"
            color="primary"
            loading={transition.state === "submitting"}
            loadingText={
              transition.state === "submitting"
                ? "Creating..."
                : transition.state === "loading"
                ? "Created!"
                : "Create Post"
            }
          >
            Create Post
          </Button>
        </div>
      </Form>
    </div>
  );
}

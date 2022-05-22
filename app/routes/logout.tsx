import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useTransition } from "@remix-run/react";
import { Button } from "@vechaiui/react";
import { authenticator } from "~/services";

export const meta: MetaFunction = () => {
  return {
    title: "Logout from Medeet",
  };
};

export const action: ActionFunction = async ({ request }) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  await authenticator.logout(request, { redirectTo: "/" });
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });

  return json({ user });
};

export default function Logout() {
  const transition = useTransition();

  return (
    <div className="stack max-w-sm gap-8">
      <h1>Logout</h1>

      <p> Are you sure to log out?</p>

      <Form method="post" action="/logout">
        <input type="hidden" name="_method" value="logout" />

        <Button
          size="lg"
          color="primary"
          variant="solid"
          type="submit"
          loading={transition.state === "submitting"}
          loadingText={
            transition.state === "submitting"
              ? "Logging out..."
              : transition.state === "loading"
              ? "Logged out!"
              : "Logout"
          }
        >
          Logout
        </Button>
      </Form>
    </div>
  );
}

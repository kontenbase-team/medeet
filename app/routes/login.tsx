import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { Form, Link, useTransition } from "@remix-run/react";
import { Button, FormControl, FormLabel, Input } from "@vechaiui/react";
import { authenticator } from "~/services";

export const meta: MetaFunction = () => {
  return {
    title: "Login to Medeet",
  };
};

export const action: ActionFunction = async ({ request }) => {
  const user = await authenticator.authenticate("user-pass", request, {
    successRedirect: "/",
    failureRedirect: "/login",
  });

  return user;
};

export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });

  return null;
};

export default function Login() {
  const transition = useTransition();

  return (
    <div className="stack max-w-sm gap-8">
      <h1>Login</h1>

      <Form method="post" action="/login">
        <input type="hidden" name="_method" value="login" />

        <div className="stack gap-4">
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              required
              size="lg"
              name="email"
              type="email"
              placeholder="yourname@domain.com"
              autoComplete="email"
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              required
              size="lg"
              name="password"
              type="password"
              placeholder="Enter password"
              autoComplete="current-password"
            />
          </FormControl>

          <Button
            size="lg"
            color="primary"
            variant="solid"
            type="submit"
            loading={transition.state === "submitting"}
            loadingText={
              transition.state === "submitting"
                ? "Logging in..."
                : transition.state === "loading"
                ? "Logged in!"
                : "Login"
            }
          >
            Login
          </Button>
        </div>
      </Form>

      <p>
        New here? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

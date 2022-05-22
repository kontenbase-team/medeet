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
    title: "Register new Medeet account",
  };
};

export const action: ActionFunction = async ({ request }) => {
  const user = await authenticator.authenticate("user-pass", request, {
    successRedirect: "/login",
    failureRedirect: "/register",
  });

  return user;
};

export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });

  return null;
};

export default function Register() {
  const transition = useTransition();

  return (
    <div className="stack max-w-sm gap-8">
      <h1>Register</h1>

      <Form method="post" action="/register">
        <input type="hidden" name="_method" value="register" />

        <div className="stack gap-4">
          <div className="flex gap-2">
            <FormControl>
              <FormLabel htmlFor="firstName">First name</FormLabel>
              <Input
                required
                size="lg"
                name="firstName"
                type="text"
                placeholder="First"
                autoComplete="first-name"
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="lastName">Last name</FormLabel>
              <Input
                required
                size="lg"
                name="lastName"
                type="text"
                placeholder="Last"
                autoComplete="last-name"
              />
            </FormControl>
          </div>

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
                ? "Registering..."
                : transition.state === "loading"
                ? "Registered!"
                : "Register"
            }
          >
            Register
          </Button>
        </div>
      </Form>

      <p>
        Have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

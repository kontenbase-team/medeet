import invariant from "invariant";
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";

import { kontenbaseServer } from "~/libs";
import { sessionStorage } from "~/services/session.server";
import type { User } from "~/types";

// Create an instance of the authenticator
// Pass a generic with what strategies will return and will store in the session
export const authenticator = new Authenticator<User>(sessionStorage);

// Tell the Authenticator to use the form strategy
authenticator.use(
  new FormStrategy(async ({ form }) => {
    const formMethod = form.get("_method");

    if (formMethod === "login") {
      const email = form.get("email") as string;
      const password = form.get("password") as string;

      invariant(typeof email === "string", "email must be a string");
      invariant(typeof password === "string", "password must be a string");
      invariant(email.length > 0, "email must not be empty");
      invariant(password.length > 0, "password must not be empty");

      const { user, token, error } = await kontenbaseServer.auth.login({
        email,
        password,
      });

      if (error || !user || !token) {
        return { error };
      }
      // This will be the final user object with the token
      return {
        ...user,
        token,
      };
    }

    if (formMethod === "register") {
      const firstName = form.get("firstName") as string;
      const lastName = form.get("lastName") as string;
      const email = form.get("email") as string;
      const password = form.get("password") as string;

      invariant(typeof firstName === "string", "First name must be a string");
      invariant(typeof lastName === "string", "Last name must be a string");
      invariant(typeof email === "string", "Email must be a string");
      invariant(typeof password === "string", "Password must be a string");
      invariant(email.length > 0, "Email must not be empty");
      invariant(password.length > 0, "Password must not be empty");

      // Register user as normal
      const { user, token, error } = await kontenbaseServer.auth.register({
        firstName,
        lastName,
        email,
        password,
      });

      // If want to patch the user data
      // const headers = new Headers({ Authorization: `Bearer ${token}` });

      if (error || !user || !token) return { error };
      // This will be the final user object
      return {
        ...user, // Updated user with handle
        token, // Separated token
      };
    }

    return null;
  }),
  // Each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "user-pass"
);

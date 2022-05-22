import { Link } from "@remix-run/react";
import { LinkButton } from "~/components";

import type { FunctionComponent } from "react";
import type { User } from "~/types";

interface NavigationBarProps {
  user: User;
}

export const NavigationBar: FunctionComponent<NavigationBarProps> = ({
  user,
}) => {
  return (
    <nav className="mb-4 flex items-center gap-4 py-4">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>

      {!user && (
        <div className="button-group">
          <LinkButton to="/login" variant="outline">
            Login
          </LinkButton>
          <LinkButton to="/register">Register</LinkButton>
        </div>
      )}

      {user && (
        <div className="button-group">
          <LinkButton to="/logout" variant="outline" color="red">
            Logout
          </LinkButton>
          <LinkButton to="/new">New Post</LinkButton>
        </div>
      )}
    </nav>
  );
};

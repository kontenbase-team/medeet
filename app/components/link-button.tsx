import { Link } from "@remix-run/react";
import type { FunctionComponent, ReactNode } from "react";
import { clsx } from "~/libs";

interface LinkButtonProps {
  to: string;
  children: ReactNode;
  color?: "primary";
  variant?: "solid" | "outline";
}

export const LinkButton: FunctionComponent<LinkButtonProps> = ({
  to,
  children,
  color = "primary",
  variant = "solid",
}) => {
  return (
    <Link
      to={to}
      data-color={color}
      className={clsx(`btn-${variant} btn btn-md rounded-base`)}
    >
      {children}
    </Link>
  );
};

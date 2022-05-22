import type { User } from "~/types";

export const getUserName = (user: User) => {
  if (user?.firstName && user?.lastName) {
    return `${user?.firstName} ${user?.lastName}`;
  } else if (user?.firstName) {
    return user?.firstName;
  } else if (user?.lastName) {
    return user?.lastName;
  } else {
    return `No name`;
  }
};

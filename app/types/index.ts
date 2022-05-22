import type dayjs from "dayjs";

export type Post = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  createdBy: User;
};

export type User = {
  _id: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  token?: string;
};

export type Locale = string | "en";

export type DateTime = string | number | dayjs.Dayjs | Date | null | undefined;

import type { Post } from "~/types";

export const getPostURL = (post: Post) => `/${post?._id}`;

export const getTrimmedContent = (content: string) =>
  content?.length ? content?.substring(0, 42) : "";

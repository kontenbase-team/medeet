import { createCookieSessionStorage } from "@remix-run/node";
import { dateFns } from "~/libs";

const currentDate = Date.now();
const expiryInDays = 30;
const expiryInSeconds = dateFns.daysToSeconds(expiryInDays);
const expiryDate = dateFns.addDays(currentDate, expiryInDays);

// Export the whole sessionStorage object
export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "medeet_session", // use any name you want here
    sameSite: "lax", // this helps with CSRF
    path: "/", // remember to add this so the cookie will work in all routes
    maxAge: expiryInSeconds, // precede `expires`
    expires: expiryDate,
    httpOnly: true, // for security reasons, make this cookie http only
    secrets: [process.env.SESSION_SECRET as string],
    secure: process.env.NODE_ENV === "production", // enable this in prod only
  },
});

// Can also export the methods individually for individual usage
export const { getSession, commitSession, destroySession } = sessionStorage;

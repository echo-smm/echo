// app/sessions.js
import { createCookieSessionStorage } from "@remix-run/node";

require("dotenv").config();
const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      //firebase token
      name: "firebase:token",
      // all of these are optional
      expires: new Date(Date.now() + 7200),
      httpOnly: true,
      maxAge: 7200,
      path: "/",
      sameSite: "lax",
      secrets: [sessionSecret],
      secure: process.env.NODE_ENV === "production",
    },
  });

export { getSession, commitSession, destroySession };

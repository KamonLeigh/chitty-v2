import { createCookieSessionStorage } from "@remix-run/node"; // or "@remix-run/cloudflare"
const MAX_AGE = 60 * 60 * 8; // 8 hours
const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the same CookieOptions to create one
    cookie: {
      name: "sb:tokem",
      secrets: ["r3m1xr0ck5"],
      sameSite: "lax",
      maxAge: MAX_AGE,
      expires: new Date(Date.now() + MAX_AGE * 1000),
      domain: '',
      path: "/",
      httpOnly: true,
      secure: true
    },
  });

  export { getSession, commitSession, destroySession}
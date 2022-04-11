// import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
// import { auth } from "~/utils/db.server";
// import { commitSession, getSession } from "./utils/session.server";

export const meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

// export async function loader({ request }) {
//   const session = await getSession(request.headers.get("Cookie"));

//   if (session.has("access_token")) {
//     const data = { user: auth.currentUser, error: session.get("error") };
//     return json(data, {
//       headers: {
//         "Set-Cookie": await commitSession(session),
//       },
//     });
//   } else {
//     return null;
//   }
// }

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

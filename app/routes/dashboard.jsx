import { json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import {
  commitSession,
  destroySession,
  getSession,
} from "~/utils/sessions.server";

export async function loader({ request }) {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("access_token")) {
    return redirect("/login");
  }

  const data = { error: session.get("error") };

  return json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export let action = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("access_token")) {
    return redirect("/", {
      headers: { "Set-Cookie": await destroySession(session) },
    });
  }
  auth.signOut();
  return redirect("/");
};

export default function Dashboard() {
  return (
    <div>
      <nav aria-label="Main navigation">
        <Form method="post">
          <button type="submit">Logout</button>
        </Form>
      </nav>
      <h1>Dashboard</h1>
      <h2>Username</h2>
      <ul>
        <li>Tweet</li>
        <li>Username</li>
        <li>Date/Time</li>
      </ul>
    </div>
  );
}

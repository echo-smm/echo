import { json, redirect } from "@remix-run/node";
import { commitSession, getSession } from "~/utils/sessions.server";

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

export default function Dashboard() {
  return (
    <div>
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

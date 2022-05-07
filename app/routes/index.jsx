import { json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { auth } from "~/utils/firebase.server";
import { commitSession, destroySession, getSession } from "~/utils/sessions.server";

// use loader to check for existing session
export async function loader({ request }) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("access_token")) {
    //user is logged in
    const data = { user: auth.currentUser, error: session.get("error") };
    return json(data, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
  // user is not logged in
  return null;
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

export default function Index() {
  // let's grab our loader data to see if it's a sessioned user
  let data = useLoaderData();
  // let's check to see if we have a user, if so we will use it to update the greeting and link logic for Login/Logout in Nav
  let loggedIn = data?.user;
  return (
    <div>
      <header>
        <div>
          <Link to="/" title="Remix">
            EEKO
          </Link>
          <nav aria-label="Main navigation">
            {!loggedIn ? (
              <Link to="/login">Login</Link>
            ) : (
              <Form method="post">
                <button type="submit">Logout</button>
              </Form>
            )}
          </nav>
        </div>
      </header>
    </div>
  );
}

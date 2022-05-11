import { Form, Link, useActionData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { commitSession, getSession } from "~/utils/sessions.server";
import { auth } from "~/utils/firebase.server";
import echoBar from "public/echo-bar.svg";
import iPhoneMockup from "public/iPhone-mockup.png";
import { signInWithEmailAndPassword } from "firebase/auth";

// use loader to check for existing session, if found, send the user to the dashboard site
export async function loader({ request }) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("access_token")) {
    // Redirect to the dashboard page if they are already signed in.
    return redirect("/dashboard");
  }

  const data = { error: session.get("error") };

  return json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

// our action function will be launched when the submit button is clicked
// this will sign in our firebase user and create our session and cookie using user.getIDToken()
export let action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  const { user, error } = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  // if signin was successful then we have a user
  if (user) {
    // let's setup the session and cookie wth users idToken
    let session = await getSession(request.headers.get("Cookie"));
    session.set("access_token", await user.getIdToken());
    // let's send the user to the main page after login
    return redirect("/dashboard", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
  return { user, error };
};

export default function Login() {
  const actionData = useActionData();
  return (
    <div>
      <div className="w-screen h-screen grid grid-cols-2 justify-center items-center">
        <section className="h-full bg-yellow-400">
          <div className="grid grid-cols-1 h-full p-10 pb-0">
            <div className="flex flex-col gap-10">
              <img src={echoBar} alt="echo" />
              <h1 className="text-slate-900 text-6xl">
                Upload once.
                <br />
                Post everywhere.
                <br />
                Free.
              </h1>
              <p className="text-slate-700 text-xl">
                do the thing you love the most. no changes. go wild. post
                everywhere at the same time. effortless.
              </p>
            </div>
            <div className="relative">
              <img
                className="absolute bottom-0 right-0"
                src={iPhoneMockup}
                alt="iphone mockup"
              />
            </div>
          </div>
        </section>
        <main className="grid grid-cols-1 items-center h-full bg-gray-100">
          <div className="grid grid-cols-1 w-1/2 m-auto">
            <h2 className="text-4xl mb-6">Log in to your account</h2>
            <Form method="post">
              <div className="my-3">
                <label className="block text-base mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="w-full rounded border-2 border-slate-200 px-4 py-3"
                  name="email"
                  type="email"
                  placeholder="john.snow@gmail.com"
                  required
                />
              </div>
              <div className="my-3">
                <label className="block text-base mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="w-full rounded border-2 border-slate-200 px-4 py-3"
                  name="password"
                  type="password"
                  placeholder="******"
                  required
                />
              </div>
              <div className="my-3">
                <div className="flex justify-between">
                  <div className="inline-flex items-center">
                    <input
                      className="w-4 h-4"
                      type="checkbox"
                      name="remember me"
                    />
                    <span className="ml-2">Remember me</span>
                  </div>
                  <Link
                    className="text-blue-700 hover:text-blue-500 active:text-red-400"
                    to="/forgot"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-700 active:bg-blue-500 shadow hover:shadow-lg text-white my-2 px-5 py-3 rounded"
              >
                Sign in
              </button>
            </Form>
            <div>
              <div className="mt-6">
                <span>
                  Dont have an account?{" "}
                  <Link
                    className="text-blue-700 hover:text-blue-500 active:text-red-400"
                    to="/register"
                  >
                    Join free today
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div>{actionData?.error ? actionData?.error?.message : null}</div>
    </div>
  );
}

import { Form, Link, useActionData } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { commitSession, getSession } from "~/utils/sessions.server";
import { auth } from "~/utils/firebase.server";
import echoBar from "public/echo-bar.svg";
import iPhoneMockup from "public/iPhone-mockup.png";
import { createUserWithEmailAndPassword } from "firebase/auth";

// This will be the same as our Sign In but it will say Register and use createUser instead of signIn
export let action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");

  //perform a signout to clear any active sessions
  await auth.signOut();

  //setup user data
  let {
    session: sessionData,
    user,
    error: signUpError,
  } = await createUserWithEmailAndPassword(auth, email, password);

  if (!signUpError) {
    let session = await getSession(request.headers.get("Cookie"));
    session.set("access_token", await user.getIdToken());
    return redirect("/dashboard", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
  // perform firebase register
  return { user, signUpError };
};

export default function Register() {
  const [validate, setValidate] = React.useState({
    _length: false,
    _uppercase: false,
    _lowercase: false,
    _digit: false,
    _symbol: false,
    _active: "",
  });
  function validatePassword(event) {
    let length, lowercase, uppercase, digit, symbol;
    let pass = event.target.value;
    let copy = validate;
    if (pass.length >= 8) length = true;
    if (/[a-z]/.test(pass)) lowercase = true;
    if (/[A-Z]/.test(pass)) uppercase = true;
    if (/\d/.test(pass)) digit = true;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(pass)) symbol = true;

    setValidate({
      ...copy,
      _length: length,
      _uppercase: uppercase,
      _lowercase: lowercase,
      _digit: digit,
      _symbol: symbol,
      _active:
        validate._length &&
        validate._uppercase &&
        validate._lowercase &&
        validate._digit
          ? true
          : "",
    });
  }

  const actionData = useActionData();
  return (
    <div>
      <div className="w-screen h-screen grid grid-cols-2 justify-center items-center">
        <section className="h-full bg-yellow-400">
          <div className="grid grid-cols-1 h-full p-10 pb-0">
            <div className="flex flex-col gap-10 w-3/4">
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
            <h2 className="text-4xl mb-6">Create an account</h2>
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
                {/* <p>
                Please provide a valid email address.
              </p> */}
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
                  onChange={(e) => validatePassword(e)}
                />
                {/* <p>
                Please provide a valid email address.
              </p> */}
              </div>
              <div className="my-3">
                <span
                  className={
                    validate._length
                      ? "text-green-500 block text-sm"
                      : "" + "block text-sm text-slate-600"
                  }
                >
                  Contains at least 8 characters
                </span>
                <span
                  className={
                    validate._lowercase
                      ? "text-green-500 block text-sm"
                      : "" + "block text-sm text-slate-600"
                  }
                >
                  Contains at least 1 lowercase character
                </span>
                <span
                  className={
                    validate._uppercase
                      ? "text-green-500 block text-sm"
                      : "" + "block text-sm text-slate-600"
                  }
                >
                  Contains at least 1 uppercase character
                </span>
                <span
                  className={
                    validate._digit
                      ? "text-green-500 block text-sm"
                      : "" + "block text-sm text-slate-600"
                  }
                >
                  Contains at least 1 number
                </span>
                <span
                  className={
                    validate._symbol
                      ? "text-green-500 block text-sm"
                      : "" + "block text-sm text-slate-600"
                  }
                >
                  Contains at least 1 symbol
                </span>
              </div>
              <button
                disabled={!validate._active}
                type="submit"
                className="w-full bg-blue-700 active:bg-blue-500 shadow hover:shadow-lg text-white my-2 px-5 py-3 rounded"
              >
                Sign up
              </button>
            </Form>
            <div>
              <div className="mt-6">
                <span>
                  Already registered?{" "}
                  <Link
                    className="text-blue-700 hover:text-blue-500 active:text-red-400"
                    to="/login"
                  >
                    Login
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

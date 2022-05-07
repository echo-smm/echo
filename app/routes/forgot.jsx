import { redirect } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "~/utils/firebase.server";

export let action = async ({ request }) => {
  // pull in the form data from the request after the form is submitted
  let formData = await request.formData();
  let email = formData.get("email");

  // perform firebase send password reset email
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    console.log("Error: ", err.message);
  }
  // success, send user to /login page
  return redirect("/login");
};

export default function Login() {
  return (
    <div>
      <div className="bg-gray-100 w-screen h-screen grid grid-cols-1 justify-center items-center">
        <div className="w-max bg-white m-auto p-10 rounded">
          <div>
            <h2 className="text-4xl mb-6">Forgot Password?</h2>
          </div>
          <Form method="post">
            <div className="my-3">
              <label className="block text-base mb-2" htmlFor="email">
                Enter your associated email address.
              </label>
              <input
                className="w-full rounded border-2 border-slate-200 px-4 py-3"
                name="email"
                type="email"
                placeholder="john.snow@gmail.com"
                required
              />
            </div>
            <button
              // disabled={!validate._active}
              type="submit"
              className="w-full bg-blue-700 active:bg-blue-500 shadow hover:shadow-lg text-white my-2 px-5 py-3 rounded"
            >
              Send Email
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
      </div>
    </div>
  );
}

import { json } from "@remix-run/node";
import { useActionData, useSearchParams, Link } from "@remix-run/react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createUserSession } from "~/utils/session.server";
import { auth } from "~/utils/db.server";
// import stylesUrl from "~/styles/login.css";

// export const links = () => {
//   return [{ rel: "stylesheet", href: stylesUrl }];
// };

function validateUrl(url) {
  let urls = ["/dashboard", "/", "https://remix.run"];
  if (urls.includes(url)) {
    return url;
  }
  return "/dashboard";
}

const badRequest = (data) => json(data, { status: 400 });

export const action = async ({ request }) => {
  const form = await request.formData();
  const loginType = form.get("loginType");
  const email = form.get("email");
  const password = form.get("password");
  const redirectTo = validateUrl(form.get("redirectTo") || "/dashboard");
  if (
    typeof loginType !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof redirectTo !== "string"
  ) {
    return badRequest({
      formError: `Form not submitted correctly.`,
    });
  }

  const fields = { loginType, email, password };
  // const fieldErrors = {
  //   email: validateEmail(email),
  //   password: validatePassword(password),
  // };
  // if (Object.values(fieldErrors).some(Boolean))
  //   return badRequest({ fieldErrors, fields });

  switch (loginType) {
    case "login": {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          return createUserSession(user.id, redirectTo);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          return badRequest({
            errorCode,
            errorMessage,
            formError: `Email/Password combination is incorrect.`,
          });
        });
        break;
    }f
    case "register": {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          return createUserSession(user.id, redirectTo);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("LOGIN: ",errorCode, errorMessage);
          return badRequest({
            errorCode,
            errorMessage,
            formError: `Something went wrong trying to create a new user.`,
          });
        });
      // if (userExists) {
      //   return badRequest({
      //     fields,
      //     formError: `User with email ${email} already exists`,
      //   });
      // }
      break;
    }
    default: {
      console.log("Default");
      return badRequest({
        fields,
        formError: `Login type invalid`,
      });
    }
  }
};

export default function Login() {
  const actionData = useActionData();
  const [searchParams] = useSearchParams();
  return (
    <div>
      <div>
        <h1>Login</h1>
        <form method="POST">
          <input
            type="hidden"
            name="redirectTo"
            value={searchParams.get("redirectTo") ?? undefined}
          />
          <fieldset>
            <legend>Login or Register?</legend>
            <label>
              <input
                type="radio"
                name="loginType"
                value="login"
                defaultChecked={
                  !actionData?.fields?.loginType ||
                  actionData?.fields?.loginType === "login"
                }
              />{" "}
              Login
            </label>
            <label>
              <input
                type="radio"
                name="loginType"
                value="register"
                defaultChecked={actionData?.fields?.loginType === "register"}
              />{" "}
              Register
            </label>
          </fieldset>
          <div>
            <label htmlFor="email-input">Email</label>
            <input
              type="email"
              id="email-input"
              name="email"
              defaultValue={actionData?.fields?.email}
              aria-invalid={Boolean(actionData?.fieldErrors?.email)}
              aria-errormessage={
                actionData?.fieldErrors?.email ? "email-error" : undefined
              }
            />
            {actionData?.fieldErrors?.email ? (
              <p
                className="form-validation-error"
                role="alert"
                id="email-error"
              >
                {actionData.fieldErrors.email}
              </p>
            ) : null}
          </div>
          <div>
            <label htmlFor="password-input">Password</label>
            <input
              type="password"
              id="password-input"
              name="password"
              defaultValue={actionData?.fields?.password}
              aria-invalid={
                Boolean(actionData?.fieldErrors?.password) || undefined
              }
              aria-errormessage={
                actionData?.fieldErrors?.password ? "password-error" : undefined
              }
            />
            {actionData?.fieldErrors?.password ? (
              <p
                className="form-validation-error"
                role="alert"
                id="password-error"
              >
                {actionData.fieldErrors.password}
              </p>
            ) : null}
          </div>
          <div id="form-error-message">
            {actionData?.formError ? (
              <p className="form-validation-error" role="alert">
                {actionData.formError}
              </p>
            ) : null}
          </div>
          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </div>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {/* <li>
            <Link to="/jokes">Jokes</Link>
          </li> */}
        </ul>
      </div>
    </div>
  );
}

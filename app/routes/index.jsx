import { json } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { auth } from "~/utils/firebase.server";
import { commitSession, getSession } from "~/utils/sessions.server";
import echo from "public/echo.svg";
import arrowCurve from "public/arrow-curve.svg";
import arrowStraight from "public/arrow-straight.svg";
import oval from "public/oval.svg";
import iphoneMockup from "public/iphone-mockup-1.svg";
import sparkle from "public/sparkle.svg";
import squiggle from "public/squiggle.svg";
import question from "public/question.svg";
import exclamation from "public/exclamation.svg";
import {
  faInstagram,
  faLinkedinIn,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

export default function Index() {
  return (
    <div>
      <div className="grid grid-cols-1 justify-center">
        <header className="text-center m-10">
          <div className="p-8">
            <Link to="/" title="Remix">
              <img className="w-max m-auto" src={echo} alt="echo" />
            </Link>
          </div>
          <div className="m-36">
            <h1 className="text-slate-900 text-6xl">
              Manag
              <FontAwesomeIcon icon={faLinkedinIn} color="#0077b5" />
              g s
              <FontAwesomeIcon
                className="text-5xl"
                icon={faInstagram}
                color="#e1306c"
              />
              cials
              <br />
              <span className="relative">
                was never
                <img
                  className="absolute top-20 left-0"
                  src={arrowStraight}
                  alt="oval"
                />
                <FontAwesomeIcon
                  className="absolute top-16 left-0 text-5xl absolute top-full"
                  icon={faTwitter}
                  color="#1da1f2"
                />
              </span>{" "}
              <span className="relative">
                easier.
                <img
                  className="absolute top-[-15px] left-0"
                  src={oval}
                  alt="oval"
                />
                <FontAwesomeIcon
                  className="rotate-45 absolute top-[70px] left-10 text-5xl absolute top-full"
                  icon={faYoutube}
                  color="#ff0000"
                />
              </span>
            </h1>
          </div>
          <div className="w-max m-auto mt-10">
            <Link to="register">
              <button
                type="submit"
                className="w-40 border-2 border-blue-700 active:border-blue-500 bg-blue-700 active:bg-blue-500 shadow-lg hover:shadow-xl text-white m-2 px-5 py-3 rounded"
              >
                Get Started
              </button>
            </Link>
            <Link to="login">
              <button
                type="submit"
                className="w-40 border-2 border-blue-700 active:border-blue-300 active:bg-blue-300 shadow-lg hover:shadow-xl m-2 px-5 py-3 rounded"
              >
                Log in
              </button>
            </Link>
          </div>
        </header>
        <main className="m-10">
          <div className="text-center m-36">
            <h1 className="w-max relative text-slate-900 text-6xl m-auto p-4">
              We do the hard
              <br />
              part for you.
              <img
                className="absolute bottom-20 left-[90%]"
                src={sparkle}
                alt="sparkle"
              />
            </h1>
            <p className="relative text-lg font-medium p-4">
              It's as easy as 1..2..3.. &amp; Voila! - For real take a look.
              <img className="m-auto" src={squiggle} alt="squiggle" />
            </p>
          </div>
          <div className="w-2/3 grid grid-cols-2 justify-center items-center mx-auto my-36">
            <div className="flex flex-col gap-20">
              <div>
                <h2 className="text-4xl mb-6">Make and Upload content</h2>
                <p className="text-lg">
                  Do thing you love the most , no changes. go wild. post
                  everywhere at the same time. effortless.
                </p>
              </div>
              <div>
                <img src={iphoneMockup} alt="iPhone mockup" />
              </div>
              <div>
                <h2 className="text-4xl mb-6">Take your time and schedule</h2>
                <p className="text-lg">
                  Pick the time when your followers are the most active , or 3
                  in the morning we can post it anytime.
                </p>
              </div>
            </div>
            <div className="h-full flex flex-col justify-around">
              <img className="w-min" src={arrowCurve} alt="arrow curve" />
              <div>
                <h2 className="text-4xl mb-6">Pick'em and relax</h2>
                <p className="text-lg">
                  Choose and pick the platforms you'd like to post on.
                  Instagram,Youtube etc.
                </p>
              </div>
              <img
                className="w-min rotate-45"
                src={arrowCurve}
                alt="arrow curve"
              />
            </div>
          </div>
          <div className="text-center m-36">
            <h1 className="text-slate-900 text-6xl">
              <span className="inline-flex items-center">
                Best part
                <img src={question} alt="question" />
              </span>
              <br />
              <span className="inline-flex items-center">
                Forever Free
                <img src={exclamation} alt="exclamation" />
              </span>
            </h1>
            <div className="mt-10">
              <Link to="register">
                <button
                  type="submit"
                  className="w-40 border-2 border-blue-700 active:border-blue-500 bg-blue-700 active:bg-blue-500 shadow-lg hover:shadow-xl text-white m-2 px-5 py-3 rounded"
                >
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </main>
        <footer className="bg-gray-200 py-16">
          <nav className="flex flex-row justify-between px-20">
            <div>
              <img src={echo} alt="echo" />
            </div>
            <div>
              <h3 className="text-2xl mb-3">Legal</h3>
              <ul className="flex flex-col gap-1">
                <li>
                  <Link
                    className="text-blue-700 hover:text-blue-500 active:text-red-400"
                    to="privacy"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-blue-700 hover:text-blue-500 active:text-red-400"
                    to="terms-and-conditions"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl mb-3">Contact</h3>
              <ul className="flex flex-col gap-4">
                <li>
                  Email us:{" "}
                  <Link
                    className="text-blue-700 hover:text-blue-500 active:text-red-400"
                    to="mailto:contact@echo.com"
                  >
                    contact@echo.com
                  </Link>
                </li>
                <li className="flex flex-row gap-4">
                  <a href="https://twitter.com" target={"_blank"}>
                    <FontAwesomeIcon
                      icon={faTwitter}
                      color="#1da1f2"
                      size="2x"
                    />
                  </a>
                  <a href="https://instagram.com" target={"_blank"}>
                    <FontAwesomeIcon
                      icon={faInstagram}
                      color="#e1306c"
                      size="2x"
                    />
                  </a>
                  <a href="https://linkedin.com" target={"_blank"}>
                    <FontAwesomeIcon
                      icon={faLinkedinIn}
                      color="#0077b5"
                      size="2x"
                    />
                  </a>
                  <a href="https://youtube.com" target={"_blank"}>
                    <FontAwesomeIcon
                      icon={faYoutube}
                      color="#ff0000"
                      size="2x"
                    />
                  </a>
                </li>
              </ul>
              <p></p>
            </div>
          </nav>
        </footer>
      </div>
    </div>
  );
}

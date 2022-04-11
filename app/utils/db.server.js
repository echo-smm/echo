import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCOHXHdxaDsF09kuKGSaq43hOr5G3KXPwY",
  authDomain: "ripple-123.firebaseapp.com",
  projectId: "ripple-123",
  storageBucket: "ripple-123.appspot.com",
  messagingSenderId: "279045673577",
  appId: "1:279045673577:web:684c877823ebccf7acc8f8",
  measurementId: "G-SZNYKESEDY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// export { analytics, auth, db };
export { auth, db };

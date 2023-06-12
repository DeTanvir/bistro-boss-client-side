// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGQZhJvhEhGWvwcJ_kBz2HfccSdcHVEWM",
  authDomain: "bistro-boss-66303.firebaseapp.com",
  projectId: "bistro-boss-66303",
  storageBucket: "bistro-boss-66303.appspot.com",
  messagingSenderId: "760877911035",
  appId: "1:760877911035:web:da4734327da85766cfd95e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// alternative
// const app = initializeApp(firebaseConfig);
// export default app;
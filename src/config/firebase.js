import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB2sKGrSdg4dhSbpBUdxv0Mt9AL-Z0hAZs",
  authDomain: "mitumi-ae188.firebaseapp.com",
  projectId: "mitumi-ae188",
  storageBucket: "mitumi-ae188.firebasestorage.app",
  messagingSenderId: "834348395535",
  appId: "1:834348395535:web:ec4eabf75dc90899d7c77a"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
 


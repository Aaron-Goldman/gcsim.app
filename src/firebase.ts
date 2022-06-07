import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyA0AEptvc38EyeH9bxhnBwB_7VxmSDZPCo",
  authDomain: "gcsimdb.firebaseapp.com",
  projectId: "gcsimdb",
  storageBucket: "gcsimdb.appspot.com",
  messagingSenderId: "698927817545",
  appId: "1:698927817545:web:f297415f15fd7ed32fb098"
};

const firebaseApp = initializeApp(firebaseConfig);

export const firestore = getFirestore(firebaseApp);

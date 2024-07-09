import React, { useEffect } from "react";

import MainStack from "./Navigation/MainStack.js";
import initFireBase from "./src/services/firebase/firebaseAdmin.jsx";



export default function App() {

  useEffect(() => {
    try {
      const unsubscribe = initFireBase();
      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    } catch (error) {

    }
  }, []);

  return (
    <MainStack />
  );
}


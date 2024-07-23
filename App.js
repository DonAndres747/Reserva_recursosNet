import React, { useEffect } from "react";

import MainStack from "./Navigation/MainStack.js";
import initFireBase from "./src/services/firebase/firebaseAdmin.jsx";
import requestPermission from "./src/helpers/permissions.jsx";

export default function App() {
  const { requestNotificationsPermition } = requestPermission()
  const { unsubscribe } = initFireBase();

  useEffect(() => {
    try {
      requestNotificationsPermition();
      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <MainStack />
  );
}


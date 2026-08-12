// import {
//   checkUserLoggedIn,
//   setLoggedInUserDetails,
// } from "./Components/Store/Actions/userAction";
import { checkUserLoggedIn, setLoggedInUserDetails } from "./Components/Store/Actions/UserAction";
// import store from "./Components/Store";
import store from "./Components/Store/Index";
import { useEffect, useState } from "react";
import CommonRoutes from "./Components/Routes/CommonRoutes";
import Cookies from "js-cookie";
import { onMessageListener } from "./firebaseInit";

function App() {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  // console.log(show, notification);

  // onMessageListener()
  //   .then((payload) => {
  //     setShow(true);
  //     setNotification({
  //       title: payload.notification.title,
  //       body: payload.notification.body,
  //     });
  //     // console.log("notification payload", payload);

  //     console.log(payload);
  //   })
  //   .catch((err) => console.log("failed: ", err));
  // console.log("notification", show, notification);

  useEffect(() => {
    if (Cookies.get("isLoggedIn") === "true") {
      store.dispatch(checkUserLoggedIn(true));
    }
    if (Cookies.get("userDetails")) {
      store.dispatch(setLoggedInUserDetails(Cookies.get("userDetails")));
    }
  }, []);

  return (
    <>
      <CommonRoutes />
    </>
  );
}

export default App;

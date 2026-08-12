import firebase from "firebase/app";
import "firebase/messaging";
import { toast, ToastContainer } from "material-react-toastify";
// import { handleCallNotifications } from "./redux/action";
// import store from "./redux/store";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyWBgnEY8kXf36X0JnXs1nVDZY44x9yEE",
  authDomain: "floor-and-furniture.firebaseapp.com",
  projectId: "floor-and-furniture",
  storageBucket: "floor-and-furniture.appspot.com",
  messagingSenderId: "833206296315",
  appId: "1:833206296315:web:86bc1cb895d3783e9d5a5e",
  measurementId: "G-15N9ZDGD6G",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}
// firebase.initializeApp(firebaseConfig);
let messaging = null;
if (firebase.messaging.isSupported()) {
  messaging = firebase.messaging();
}
// const { REACT_APP_VAPID_KEY } = process.env;
// const publicKey = "BOI1sFKl5vi3yey7Bw_YVF4hOJ0gOS6slFnfICP9aalYxuUE3iSvbw8O-7T6qcaG9oapDNN9szr5-qGdmXrpQuk";

export const getToken = async (setTokenFound) => {
  let currentToken = "";

  try {
    currentToken = await messaging.getToken({
      vapidKey:
        "BK-MSBfW_V0RfrwpBXxqtvi6-3_7DYKsVudCe3i8EVR65VO1lDaxihZ02U5JO-QDxsnJSmzmKVcb7EOYD9FPnlU",
    });
    if (currentToken) {
      setTokenFound(true);
    } else {
      setTokenFound(false);
    }
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error);
  }

  return currentToken;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
    messaging.onMessage((payload) => {
      console.log("Message received. ", payload);
      //   store.dispatch(handleCallNotifications(true))
      toast.info(`${payload?.notification?.title}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    });
  });

// toast.success(`${payload.data?.title}, : ${payload.data?.body}`, {
//   position: toast.POSITION.TOP_RIGHT,
// });

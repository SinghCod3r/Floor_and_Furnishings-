// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyWBgnEY8kXf36X0JnXs1nVDZY44x9yEE",
  authDomain: "floor-and-furniture.firebaseapp.com",
  projectId: "floor-and-furniture",
  storageBucket: "floor-and-furniture.appspot.com",
  messagingSenderId: "833206296315",
  appId: "1:833206296315:web:86bc1cb895d3783e9d5a5e",
  measurementId: "G-15N9ZDGD6G",
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;

  console.log("message", messaging);
  if (typeof notification !== "undefined") {
    console.log("test");
    const notificationOptions = {
      body: payload.notification.body,
      icon: notification.icon,
    };
  }

  // eslint-disable-next-line no-restricted-globals
  return self.registration.showNotification(notificationTitle);
});

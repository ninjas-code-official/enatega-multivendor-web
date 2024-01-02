import { Box, CircularProgress } from "@mui/material";
import { useJsApiLoader } from "@react-google-maps/api";
import React, { useEffect, useState, useContext } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { getToken, onMessage } from "firebase/messaging";
import { initialize, isFirebaseSupported } from "./firebase";
import ConfigurableValues from "./config/constants";
import Checkout from "./screens/Checkout/Checkout";
import EmailSent from "./screens/EmailSent/EmailSent";
import Favourites from "./screens/Favourites/Favourites";
import ForgotPassword from "./screens/ForgotPassword/ForgotPassword";
import Home from "./screens/Home/Home";
import Login from "./screens/Login/Login";
import LoginEmail from "./screens/LoginEmail/LoginEmail";
import MyOrders from "./screens/MyOrders/MyOrders";
import NewLogin from "./screens/NewLogin/NewLogin";
import OrderDetail from "./screens/OrderDetail/OrderDetail";
import Paypal from "./screens/Paypal/Paypal";
import Privacy from "./screens/Privacy/Privacy";
import Profile from "./screens/Profile/Profile";
import Registration from "./screens/Registration/Registration";
import PhoneNumber from "./screens/PhoneNumber/PhoneNumber";
import VerifyEmail from "./screens/VerifyEmail/VerifyEmail";
import VerifyForgotOtp from "./screens/VerifyForgotOtp/VerifyForgotOtp";
import ResetPassword from "./screens/ResetPassword/ResetPassword";
import RestaurantDetail from "./screens/RestaurantDetail/RestaurantDetail";
import Restaurants from "./screens/Restaurants/Restaurants";
import Stripe from "./screens/Stripe/Stripe";
import Terms from "./screens/Terms/Terms";
import FlashMessage from "./components/FlashMessage";
import Pickup from "./screens/Pickup/Pickup";
import * as Sentry from "@sentry/react";
import AuthRoute from "./routes/AuthRoute";
import PrivateRoute from "./routes/PrivateRoute";
import VerifyPhone from "./screens/VerifyPhone/VerifyPhone";
import UserContext from "./context/User";
import Settings from "./screens/Settings/Settings";

const GoogleMapsLoader = ({ children, LIBRARIES, GOOGLE_MAPS_KEY }) => {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const initializeFirebase = async () => {
      if (await isFirebaseSupported()) {
        const messaging = initialize();
        Notification.requestPermission()
          .then(() => {
            getToken(messaging, {
              vapidKey:
                "BOpVOtmawD0hzOR0F5NQTz_7oTlNVwgKX_EgElDnFuILsaE_jWYPIExAMIIGS-nYmy1lhf2QWFHQnDEFWNG_Z5w",
            })
              .then((token) => {
                localStorage.setItem("messaging-token", token);
              })
              .catch((err) => {
                console.log("getToken error", err);
              });
          })
          .catch(console.log);

        onMessage(messaging, function (payload) {
          // Customize notification here
          const { title, body } = payload.notification;
          setMessage(`${title} ${body}`);
        });
      }
    };
    initializeFirebase();
  }, []);

  const handleClose = () => {
    setMessage(null);
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_KEY,
    libraries: LIBRARIES,
  });
  console.log("isLoaded ", isLoaded);
  if (!isLoaded) {
    return (
      <Box
        component="div"
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        width="100vw"
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <>
      {children}
      <FlashMessage
        severity={"info"}
        alertMessage={message}
        open={message !== null}
        handleClose={handleClose}
      />
    </>
  );
};

function App() {
  const { GOOGLE_MAPS_KEY, LIBRARIES } = ConfigurableValues();
  const { isLoggedIn } = useContext(UserContext);

  return GOOGLE_MAPS_KEY ? (
    <HashRouter>
      <GoogleMapsLoader GOOGLE_MAPS_KEY={GOOGLE_MAPS_KEY} LIBRARIES={LIBRARIES}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant-list" element={<Restaurants />} />
          <Route path="/restaurant/:slug" element={<RestaurantDetail />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/pickup" element={<Pickup />} />
          <Route
            path={"/login"}
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            }
          />
          <Route
            path={"/registration"}
            element={
              <AuthRoute>
                <Registration />
              </AuthRoute>
            }
          />
          <Route
            path={"/new-login"}
            element={
              <AuthRoute>
                <NewLogin />
              </AuthRoute>
            }
          />
          <Route
            path={"/login-email"}
            element={
              <AuthRoute>
                <LoginEmail />
              </AuthRoute>
            }
          />
          <Route
            path={"/verify-email"}
            element={
              <AuthRoute>
                <VerifyEmail />
              </AuthRoute>
            }
          />
          <Route
            path={"/new-password"}
            element={
              <AuthRoute>
                <ResetPassword />
              </AuthRoute>
            }
          />
          <Route
            path={"/phone-number"}
            element={
              <PrivateRoute>
                <PhoneNumber />
              </PrivateRoute>
            }
          />
          <Route
            path={"/verify-phone"}
            element={
              <PrivateRoute>
                <VerifyPhone />
              </PrivateRoute>
            }
          />
          <Route
            path={"/forgot-password"}
            element={
              <AuthRoute>
                <ForgotPassword />
              </AuthRoute>
            }
          />
          <Route
            path={"/verify-forgot-otp"}
            element={
              <AuthRoute>
                <VerifyForgotOtp />
              </AuthRoute>
            }
          />
          <Route
            path={"/email-sent"}
            element={
              <AuthRoute>
                <EmailSent />
              </AuthRoute>
            }
          />
          <Route
            path={"/orders"}
            element={
              <PrivateRoute>
                <MyOrders />
              </PrivateRoute>
            }
          />
          <Route
            path={"/profile"}
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path={"/checkout"}
            element={isLoggedIn ? <Checkout /> : <Login />}
          />
          <Route
            path={"/order-detail/:id"}
            element={
              <PrivateRoute>
                <OrderDetail />
              </PrivateRoute>
            }
          />
          <Route
            path={"/paypal"}
            element={
              <PrivateRoute>
                <Paypal />
              </PrivateRoute>
            }
          />
          <Route
            path={"/stripe"}
            element={
              <PrivateRoute>
                <Stripe />
              </PrivateRoute>
            }
          />
          <Route
            path={"/favourite"}
            element={
              <PrivateRoute>
                <Favourites />
              </PrivateRoute>
            }
          />
        </Routes>
      </GoogleMapsLoader>
    </HashRouter>
  ) : (
    <Box
      component="div"
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      width="100vw"
    >
      <CircularProgress color="primary" />
    </Box>

  );
}

export default Sentry.withProfiler(App);

// import { Box, CircularProgress } from "@mui/material";
// import { useJsApiLoader } from "@react-google-maps/api";
// import React, { useEffect, useState, useContext } from "react";
// import { HashRouter, Route, Routes } from "react-router-dom";
// import { getToken, onMessage } from "firebase/messaging";
// import { initialize, isFirebaseSupported } from "./firebase";
// import ConfigurableValues from "./config/constants";
// import Checkout from "./screens/Checkout/Checkout";
// import EmailSent from "./screens/EmailSent/EmailSent";
// import Favourites from "./screens/Favourites/Favourites";
// import ForgotPassword from "./screens/ForgotPassword/ForgotPassword";
// import Home from "./screens/Home/Home";
// import Login from "./screens/Login/Login";
// import LoginEmail from "./screens/LoginEmail/LoginEmail";
// import MyOrders from "./screens/MyOrders/MyOrders";
// import NewLogin from "./screens/NewLogin/NewLogin";
// import OrderDetail from "./screens/OrderDetail/OrderDetail";
// import Paypal from "./screens/Paypal/Paypal";
// import Privacy from "./screens/Privacy/Privacy";
// import Profile from "./screens/Profile/Profile";
// import Registration from "./screens/Registration/Registration";
// import PhoneNumber from "./screens/PhoneNumber/PhoneNumber";
// import VerifyEmail from "./screens/VerifyEmail/VerifyEmail";
// import VerifyForgotOtp from "./screens/VerifyForgotOtp/VerifyForgotOtp";
// import ResetPassword from "./screens/ResetPassword/ResetPassword";
// import RestaurantDetail from "./screens/RestaurantDetail/RestaurantDetail";
// import Restaurants from "./screens/Restaurants/Restaurants";
// import Stripe from "./screens/Stripe/Stripe";
// import Terms from "./screens/Terms/Terms";
// import FlashMessage from "./components/FlashMessage";
// import Pickup from "./screens/Pickup/Pickup";
// import * as Sentry from "@sentry/react";
// import AuthRoute from "./routes/AuthRoute";
// import PrivateRoute from "./routes/PrivateRoute";
// import VerifyPhone from "./screens/VerifyPhone/VerifyPhone";
// import UserContext from "./context/User";

// function App() {
//   const { GOOGLE_MAPS_KEY, LIBRARIES } = ConfigurableValues();
//   console.log("GOOGLE_MAPS_KEY", GOOGLE_MAPS_KEY);
//   const { isLoggedIn } = useContext(UserContext);
//   const [message, setMessage] = useState(null);
//   const [mapsKey, setMapsKey] = useState(null);

//   if (mapsKey === null) {
//     return <div>Loading maps key...</div>;
//   }
//   const { isLoaded } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: mapsKey,
//     libraries: LIBRARIES,
//   });
//   useEffect(() => {
//     if (GOOGLE_MAPS_KEY) {
//       setMapsKey(GOOGLE_MAPS_KEY);
//     }
//   }, [GOOGLE_MAPS_KEY]);
//   //const isLoaded = true;
//   useEffect(() => {
//     const initializeFirebase = async () => {
//       if (await isFirebaseSupported()) {
//         const messaging = initialize();
//         Notification.requestPermission()
//           .then(() => {
//             getToken(messaging, {
//               vapidKey:
//                 "BOpVOtmawD0hzOR0F5NQTz_7oTlNVwgKX_EgElDnFuILsaE_jWYPIExAMIIGS-nYmy1lhf2QWFHQnDEFWNG_Z5w",
//             })
//               .then((token) => {
//                 localStorage.setItem("messaging-token", token);
//               })
//               .catch((err) => {
//                 console.log("getToken error", err);
//               });
//           })
//           .catch(console.log);

//         onMessage(messaging, function (payload) {
//           // Customize notification here
//           const { title, body } = payload.notification;
//           // eslint-disable-next-line no-restricted-globals
//           setMessage(`${title} ${body}`);
//         });
//       }
//     };
//     initializeFirebase();
//   }, []);

//   const handleClose = () => {
//     setMessage(null);
//   };

//   return !isLoaded ? (
//     <Box
//       component="div"
//       display="flex"
//       alignItems="center"
//       justifyContent="center"
//       height="100vh"
//       width="100vw"
//     >
//       <CircularProgress color="primary" />
//     </Box>
//   ) : (
// <HashRouter>
//   <FlashMessage
//     severity={"info"}
//     alertMessage={message}
//     open={message !== null}
//     handleClose={handleClose}
//   />
//   ;
//   <Routes>
//     <Route path="/" element={<Home />} />
//     <Route path="/restaurant-list" element={<Restaurants />} />
//     <Route path="/restaurant/:slug" element={<RestaurantDetail />} />
//     <Route path="/privacy" element={<Privacy />} />
//     <Route path="/terms" element={<Terms />} />
//     <Route path="/pickup" element={<Pickup />} />
//     <Route
//       path={"/login"}
//       element={
//         <AuthRoute>
//           <Login />
//         </AuthRoute>
//       }
//     />
//     <Route
//       path={"/registration"}
//       element={
//         <AuthRoute>
//           <Registration />
//         </AuthRoute>
//       }
//     />
//     <Route
//       path={"/new-login"}
//       element={
//         <AuthRoute>
//           <NewLogin />
//         </AuthRoute>
//       }
//     />
//     <Route
//       path={"/login-email"}
//       element={
//         <AuthRoute>
//           <LoginEmail />
//         </AuthRoute>
//       }
//     />
//     <Route
//       path={"/verify-email"}
//       element={
//         <AuthRoute>
//           <VerifyEmail />
//         </AuthRoute>
//       }
//     />
//     <Route
//       path={"/new-password"}
//       element={
//         <AuthRoute>
//           <ResetPassword />
//         </AuthRoute>
//       }
//     />
//     <Route
//       path={"/phone-number"}
//       element={
//         <PrivateRoute>
//           <PhoneNumber />
//         </PrivateRoute>
//       }
//     />
//     <Route
//       path={"/verify-phone"}
//       element={
//         <PrivateRoute>
//           <VerifyPhone />
//         </PrivateRoute>
//       }
//     />
//     <Route
//       path={"/forgot-password"}
//       element={
//         <AuthRoute>
//           <ForgotPassword />
//         </AuthRoute>
//       }
//     />
//     <Route
//       path={"/verify-forgot-otp"}
//       element={
//         <AuthRoute>
//           <VerifyForgotOtp />
//         </AuthRoute>
//       }
//     />
//     <Route
//       path={"/email-sent"}
//       element={
//         <AuthRoute>
//           <EmailSent />
//         </AuthRoute>
//       }
//     />
//     <Route
//       path={"/orders"}
//       element={
//         <PrivateRoute>
//           <MyOrders />
//         </PrivateRoute>
//       }
//     />
//     <Route
//       path={"/profile"}
//       element={
//         <PrivateRoute>
//           <Profile />
//         </PrivateRoute>
//       }
//     />
//     <Route
//       path={"/checkout"}
//       element={isLoggedIn ? <Checkout /> : <Login />}
//     />
//     <Route
//       path={"/order-detail/:id"}
//       element={
//         <PrivateRoute>
//           <OrderDetail />
//         </PrivateRoute>
//       }
//     />
//     <Route
//       path={"/paypal"}
//       element={
//         <PrivateRoute>
//           <Paypal />
//         </PrivateRoute>
//       }
//     />
//     <Route
//       path={"/stripe"}
//       element={
//         <PrivateRoute>
//           <Stripe />
//         </PrivateRoute>
//       }
//     />
//     <Route
//       path={"/favourite"}
//       element={
//         <PrivateRoute>
//           <Favourites />
//         </PrivateRoute>
//       }
//     />
//   </Routes>
// </HashRouter>
//   );
// }

// export default Sentry.withProfiler(App);

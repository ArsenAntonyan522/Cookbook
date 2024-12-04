import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navigation from "../widgets/Navigation/Navigation";
import SignInPage from "../pages/SignInPage/SignInPage.jsx";
import SignUpPage from "../pages/SignUpPage/SignUpPage.jsx";
import { useEffect, useState } from "react";
import UserApi from "../entities/user/UserApi.js";
import { setAccessToken } from "../shared/lib/axiosInstance.js";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    UserApi.refreshTokens()
      .then(({ error, data, statusCode }) => {
        if (error) {
          setUser(null);
          return;
        }
        if (statusCode === 200) {
          setAccessToken(data.accessToken);
          setUser(data.user);
        }
      })
      .catch(({ message }) => {
        console.log(message);
      });
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigation user={user} setUser={setUser} />,
      children: [
        { path: "/signin", element: <SignInPage setUser={setUser} /> },
        { path: "/signup", element: <SignUpPage setUser={setUser} /> },
        {
          element: user && (
            <SignInPage setUser={setUser} />
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

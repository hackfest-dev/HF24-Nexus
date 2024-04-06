import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import CryptoRoute from "./Routes/Cryptos/Cryptos.route.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ViewCoin from "./Routes/ViewCoin/ViewCoin.component.jsx";
import AuthRoute from "./Routes/Auth/Auth.route.jsx";
import { UserProvider } from "./Contexts/user.context.jsx";
import ProfileRoute from "./Routes/Profile/Profile.route.jsx";
import DashboardRoute from "./Routes/Dashboard/Dashboard.component.jsx";
import { CreateDBUser } from "./Routes/CreateDBUser/CreateDBUser.route.jsx";
import AI_AssistantRoute from "./Routes/AI_Assistant/AI_Assistant.route.jsx";
import HomeRoute from "./Routes/Home/Home.route.jsx";
import Analyze_TradesRoute from "./Routes/Analyze_Trades/Analyze_Trades.route.jsx";
import Educational_Content from "./Routes/Educational_Content/Educational_Content.route.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "Cryptos",
        element: <CryptoRoute />,
      },
      {
        path: "Cryptos/:uid",
        element: <ViewCoin />,
      },
      {
        path: "Auth",
        element: <AuthRoute />,
      },
      {
        path: "Profile",
        element: <ProfileRoute />,
      },
      {
        path: "Dashboard",
        element: <DashboardRoute />,
      },
      {
        path: "CompleteRegisteration",
        element: <CreateDBUser />,
      },
      {
        path: "AI_Assistant",
        element: <AI_AssistantRoute />,
      },
      {
        path: "Analyze_Trades",
        element: <Analyze_TradesRoute />,
      },
      {
        path: "Educational_Content",
        element: <Educational_Content />
      },
      {
        path: "/",
        element: <HomeRoute />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <RouterProvider router={router} />,
  </UserProvider>
);

import { useRef, useState } from "react";
import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./MainPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
    },
]);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;

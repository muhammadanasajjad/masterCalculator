import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./MainPage";
import GraphCalculator from "./GraphCalculator";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
    },
    {
        path: "/graphing-calculator",
        element: <GraphCalculator />,
    },
]);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;

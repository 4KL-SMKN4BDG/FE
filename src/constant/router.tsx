import { createBrowserRouter } from "react-router-dom";
import { listed } from "./listed";
import SignIn from "@/pages/Login";

const Route: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: listed.signin,
    element: <SignIn />,
  }
]);

export default Route;

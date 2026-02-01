import { createBrowserRouter } from "react-router-dom";
import { listed } from "./listed";
import SignIn from "@/pages/USER/Login";
import ResetPass from "@/pages/USER/ResetPass";

const Route: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: listed.signin,
    element: <SignIn />,
  },
  {
    path: listed.resetpass,
    element: <ResetPass/>,
  },
  
]);

export default Route;

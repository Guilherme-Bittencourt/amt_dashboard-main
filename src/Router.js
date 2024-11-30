import { createBrowserRouter } from "react-router-dom";
import { Content } from "./App";
import { EventRegister } from "./pages/EventRegister";
// import { NavigationBar } from "./components/NavigationBar";

export const Router = createBrowserRouter([
  { path: "/", element: <Content />, index: true },
  { path: "/eventregister", element: <EventRegister /> },
]);

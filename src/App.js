import React from "react";
import { RouterProvider } from "react-router-dom";
import { NavigationBar } from "./components/NavigationBar";
import { Dashboard } from './pages/Dashboard'
import { Router } from "./Router";

export function Content() {
  return (
    <>
      <div className="flex">
        <NavigationBar />
        <Dashboard />
      </div>
    </>
  );
}

function App() {
  return <RouterProvider router={Router} />;
}

export default App;

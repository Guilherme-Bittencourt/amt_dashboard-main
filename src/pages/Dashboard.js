import React from "react";
import { DataDisplay } from "../components/DataDisplay";

export function Dashboard() {
  return (
    <div className="bg-secondary w-screen font-outfit font-bold">
      <div className="flex flex-col">
        <h1 className="mt-6 ml-8 text-white uppercase">Dashboard</h1>
      </div>
      <DataDisplay/>
    </div>
  );
}

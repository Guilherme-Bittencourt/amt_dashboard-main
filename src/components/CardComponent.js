import React from "react";

export const Card = ({ title, value, children }) => (
  <div className="bg-white mt-6 ml-8 rounded-md w-1/4 p-4">
    <h3 className="text-secondary text-sm font-outfit font-semibold lowercase">{title}</h3>
    {value && <p>{value}</p>}
    {children}
  </div>
);
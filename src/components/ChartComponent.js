import React from "react";
import { Line, Pie } from "react-chartjs-2";

export const Chart = ({ type, data, options }) => {
  if (type === "line") return <Line data={data} options={options} />;
  if (type === "pie") return <Pie data={data} options={options} />;
  return null;
};
import React from "react";

export function Event({ icon, option, user, date, hour }) {
  return (
    <div className="flex items-center mx-8 my-4 gap-6 py-4 px-4 rounded-md bg-white">
      <img src={icon} alt={`${option} icon`} />
      <div className="flex flex-col gap-2">
        <p className="text-primary text-sm font-outfit font-medium">{option}</p>
        <p className="text-primary opacity-60 text-sm font-outfit font-medium">
          {user}
        </p>
      </div>
      <div className="ml-auto self-end">
        <p className="text-primary text-sm font-outfit font-medium">
          {date} | {hour}
        </p>
      </div>
    </div>
  );
}

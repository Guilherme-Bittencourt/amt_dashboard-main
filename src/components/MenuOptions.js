import React from "react";
import { Link } from "react-router-dom";

export function MenuOptions({
  icon,
  option,
  to,
  showDivider,
  spaceBetween,
  onClick,
}) {
  return (
    <div onClick={onClick}>
      {" "}
      {to ? (
        <Link to={to}>
          <div className="flex items-center mx-4 my-4 gap-3 py-2 px-4 hover:bg-secondary hover:bg-opacity-30 hover:rounded-full cursor-pointer">
            <img src={icon} alt={`${option} icon`} />
            <p className="text-primary text-sm font-outfit font-medium">
              {option}
            </p>
          </div>
        </Link>
      ) : (
        <div className="flex items-center mx-4 my-4 gap-3 py-2 px-4 hover:bg-secondary hover:bg-opacity-30 hover:rounded-full cursor-pointer">
          <img src={icon} alt={`${option} icon`} />
          <p className="text-primary text-sm font-outfit font-medium">
            {option}
          </p>
        </div>
      )}
      {showDivider && (
        <div className="h-0.5 m-auto w-10/12 bg-secondary my-6" />
      )}
      {spaceBetween && <div className="mt-20" />}
    </div>
  );
}

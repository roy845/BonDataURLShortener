import React, { ReactNode } from "react";

interface TooltipProps {
  children: ReactNode;
  message: string;
}

const Tooltip = ({ children, message }: TooltipProps) => {
  return (
    <div className="relative flex items-center group">
      {children}
      <div
        className={`absolute left-12 top-1/4 transform -translate-y-1/4 p-2 rounded text-sm transition-opacity duration-200 group-hover:opacity-100 group-hover:block whitespace-nowrap ${"bg-gray-800 text-white"} hidden`}
      >
        {message}
        <div
          className={`absolute left-0 -ml-1 top-1/2 transform -translate-y-1/2 w-2 h-2 rotate-45 ${"bg-gray-800"}`}
        ></div>
      </div>
    </div>
  );
};

export default Tooltip;

"use client";
import React from "react";

interface ButtonProps {
  text?: string;
  onClick: () => void;
  className?: string;
  icon?: React.ReactNode;
}

const Button = ({ text, icon, onClick, className = "" }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`p-3  text-white rounded flex items-center ${className}`}
    >
      {icon && <div className="">{icon}</div>}
      {text && <p className=" text-sm">{text}</p>}
    </button>
  );
};

export default Button;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import React from "react";
interface ButtonProps {
  children?: ReactNode; // Button text or content
  size?: "sm" | "md"; // Button size
  variant?:
    | "primary"
    | "outline"
    | "secondary"
    | "white"
    | "green"
    | "gray"
    | "danger"; // Button variant
  startIcon?: ReactNode; // Icon before the text
  endIcon?: ReactNode; // Icon after the text
  onClick?: () => void; // Click handler
  disabled?: boolean; // Disabled state
  className?: string; // Disabled state
  type?: any;
  form?: any;
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = "md",
  variant = "primary",
  startIcon,
  endIcon,
  onClick,
  className = "",
  disabled = false,
  type,
  form,
}) => {
  // Size Classes
  const sizeClasses = {
    sm: "px-4 py-3 text-sm",
    md: "px-5 py-3.5 text-sm",
  };

  // Variant Classes
  const variantClasses = {
    primary:
      "bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300",
    outline:
      "bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300",
    secondary:
      "bg-yellow-600 shadow-md text-white dark:text-white shadow-theme-xs disabled:bg-brand-300 disabled:text-white",
    danger:
      "bg-red-600 shadow-md text-white dark:text-white shadow-theme-xs disabled:bg-red-300 disabled:text-white",
    white:
      "bg-white dark:border-gray-900 dark:border-2 shadow-md text-blue-900 dark:text-gray-700 shadow-theme-xs disabled:bg-brand-300 disabled:text-white",
    green:
      "bg-green-800  shadow-md text-white shadow-theme-xs disabled:bg-brand-300 disabled:text-white",
    gray: "bg-gray-900 border-gray-400 shadow-md text-white shadow-theme-xs disabled:bg-brand-300 disabled:text-white",
  };

  return (
    <button
      form={form}
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-lg transition ${className} ${
        sizeClasses[size]
      } ${variantClasses[variant]} ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {startIcon && <span className="flex items-center">{startIcon}</span>}
      {children}
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </button>
  );
};

export default Button;

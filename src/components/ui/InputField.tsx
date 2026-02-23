import { forwardRef } from "react";
import { FieldError } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { Message } from "./error.field";
import { RiSearchLine } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { IdCard, Lock, Phone, User } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import {JSX} from "react";


type InputProps = {
  error?: string | FieldError;
  type:
    | "date"
    | "datetime-local"
    | "email"
    | "number"
    | "search"
    | "tel"
    | "text"
    | "password"
    | "time";

  placeholder?: string;
  className?: string;
  icon?: string;
  direction?: "left" | "right";
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { error, className, placeholder, type, icon, direction = "left", ...rest },
    ref
  ) => {
    const errorMessage = typeof error === "string" ? error : error?.message;

    const [showPassword, setShowPassword] = useState(false);

    const selectedIcon: Record<string, JSX.Element> = {
      search: <RiSearchLine size={15} className="opacity-30 mx-1" />,
      email: <MdEmail size={15} className="opacity-30 mx-1" />,
      user: <User size={15} className="opacity-30 mx-1" />,
      password: <Lock size={15} className="opacity-30 mx-1" />,
      nik: <IdCard size={15} className="opacity-30 mx-1" />,
      phone: <Phone size={15} className="opacity-30 mx-1" />,
    };

    const isPassword = type === "password";
    const iconElement = icon ? selectedIcon[icon] : null;

    return (
  <div className="w-full">
    <div className="relative w-full">
      {direction === "left" && iconElement && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
          {iconElement}
        </div>
      )}
      
      <input
        ref={ref}
        type={isPassword ? (showPassword ? "text" : "password") : type}
        placeholder={placeholder}
        className={twMerge(
          `
          w-full px-4 py-3
          bg-white
          rounded-xl
          border
          ${error ? "border-red-600" : "border-gray-300"}
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          transition
          ${iconElement && direction === "left" ? "pl-10" : ""}
          ${iconElement && direction === "right" ? "pr-10" : ""}
          `,
          className
        )}
        {...rest}
      />

      {direction === "right" && iconElement && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
          {iconElement}
        </div>
      )}

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>

    <Message isError={Boolean(errorMessage)} message={errorMessage} />
  </div>
);

  }
);

Input.displayName = "Input";

export default Input;

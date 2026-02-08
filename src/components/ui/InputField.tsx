import { forwardRef } from "react";
import { FieldError } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { Message } from "./error.field";
import { RiSearchLine } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { IdCard, Lock, Phone, User } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";


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

    const selectedIcon = {
      search: <RiSearchLine size={15} className="opacity-30 mx-1" />,
      email: <MdEmail size={15} className="opacity-30 mx-1" />,
      user: <User size={15} className="opacity-30 mx-1" />,
      password: <Lock size={15} className="opacity-30 mx-1" />,
      nik: <IdCard size={15} className="opacity-30 mx-1" />,
      phone: <Phone size={15} className="opacity-30 mx-1" />,
    };

    const isPassword = type === "password";

    return (
      <div className="w-full">
        <label
          className={twMerge(
            icon || isPassword ? "input w-full relative" : "form-control w-full",
            className
          )}
        >
          {/* ICON KIRI */}
          {icon && direction === "left" && selectedIcon[icon as keyof typeof selectedIcon]}

          <input
            ref={ref}
            type={isPassword ? (showPassword ? "text" : "password") : type}
            placeholder={placeholder}
            onKeyDown={(e) => {
              if (type === "tel") {
                const allowedKeys = /[0-9]/;
                const specialKeys = [
                  "Backspace",
                  "Delete",
                  "ArrowLeft",
                  "ArrowRight",
                ];
                if (!allowedKeys.test(e.key) && !specialKeys.includes(e.key)) {
                  e.preventDefault();
                }
              }
            }}
            className={twMerge(
              `
              ${icon || isPassword ? "grow outline-none" : "input input-bordered"}
              w-full
              ${error ? "border-red-600" : ""}
              `,
              className
            )}
            {...rest}
          />

          {/* ICON PASSWORD (KANAN) */}
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

          {/* ICON KANAN */}
          {icon && direction === "right" && selectedIcon[icon as keyof typeof selectedIcon]}
        </label>

        <Message isError={Boolean(errorMessage)} message={errorMessage} />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;

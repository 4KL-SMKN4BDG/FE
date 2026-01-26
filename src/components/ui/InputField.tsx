import { forwardRef } from "react";
import { FieldError } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { Message } from "./error.field";
import { RiSearchLine } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { IdCard, Lock, Phone, User } from "lucide-react";

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

    const selectedIcon = {
      search: <RiSearchLine size={15} className="opacity-30 mx-1" />,
      email: <MdEmail size={15} className="opacity-30 mx-1" />,
      user: <User size={15} className="opacity-30 mx-1" />,
      password: <Lock size={15} className="opacity-30 mx-1" />,
      nik: <IdCard size={15} className="opacity-30 mx-1" />,
      phone: <Phone size={15} className="opacity-30 mx-1" />,
    };

    return (
      <div className="w-full">
        <label
          className={twMerge(
            icon ? "input w-full" : "form-control w-full",
            className
          )}
        >
          {icon && direction == "left"
            ? selectedIcon[icon as keyof typeof selectedIcon]
            : null}
          <input
            type={type}
            placeholder={placeholder}
            onKeyDown={(e) => {
              if (type == "tel") {
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
              `${
                icon ? "grow outline-none group" : "input input-bordered"
              } w-full ${error ? "border-red-600" : ""}`,
              className
            )}
            {...rest}
            ref={ref}
          />
          {icon && direction == "right"
            ? selectedIcon[icon as keyof typeof selectedIcon]
            : null}
        </label>
        <Message isError={Boolean(errorMessage)} message={errorMessage} />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;

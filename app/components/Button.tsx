"use client";

import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface ButtonProps {
  label: string;
  outline?: boolean;
  small?: boolean;
  icon?: React.ElementType;
  wide?: boolean;
}

const Button = ({
  label,
  outline,
  small,
  wide,
  icon: Icon,
  ...restProps
}: ButtonProps &
  Partial<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  >) => {
  return (
    <button
      {...restProps}
      className={`
        flex
        items-center
        justify-center
        border-[1px]
        px-4
        ring-offset-2
        transition
        duration-300 
        focus:outline-none
        focus:ring-2
        disabled:cursor-not-allowed
        disabled:opacity-70
        ${
          outline
            ? "border-slate-300 bg-white text-slate-900 hover:bg-slate-100 focus:ring-slate-900"
            : "border-rose-500 bg-rose-500 text-white hover:bg-rose-500/90 focus:ring-rose-400"
        }
        ${
          small
            ? "gap-1 rounded-md py-1.5 text-xs font-bold"
            : "text-md gap-2 rounded-lg py-2.5 font-semibold"
        }
        ${wide ? "w-full" : "w-auto"}
      `}
    >
      {Icon && (
        <Icon
          size={small ? 14 : 18}
          className={outline ? "text-slate-900" : "text-white"}
        />
      )}
      {label}
    </button>
  );
};

export default Button;

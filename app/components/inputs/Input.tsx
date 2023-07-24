"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

import { IconCurrencyDollar } from "@tabler/icons-react";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input = ({
  id,
  label,
  type,
  disabled,
  formatPrice,
  required,
  register,
  errors,
}: InputProps) => {
  return (
    <div className="relative w-full cursor-text">
      {formatPrice && (
        <div className="absolute left-0 flex h-full items-center justify-center pe-2 ps-3 text-slate-500">
          <IconCurrencyDollar size={20} stroke={1.75} />
        </div>
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`
          text-md
          peer
          w-full
          rounded-md
          border-[1px]
          bg-white
          px-5
          pb-2
          pt-5
          outline-none
          transition
          disabled:cursor-not-allowed
          disabled:opacity-70
          ${formatPrice ? "pl-10" : "pl-5"}
          ${
            errors[id]
              ? "border-rose-500 focus:border-rose-500"
              : "border-slate-300 focus:border-slate-900"
          }
        `}
      />
      <label
        htmlFor={id}
        className={`
        text-md
        absolute
        top-4
        z-10
        origin-[0]
        -translate-y-[14px]
        scale-[.80]
        transform
        cursor-text
        duration-150
        peer-placeholder-shown:translate-y-0
        peer-placeholder-shown:scale-100
        peer-focus:-translate-y-[14px]
        peer-focus:scale-[.80]
        ${formatPrice ? "left-10" : "left-5"}
        ${errors[id] ? "text-rose-500" : "text-slate-500"}
      `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;

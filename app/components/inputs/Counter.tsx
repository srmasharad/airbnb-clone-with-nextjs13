"use client";

import { useCallback } from "react";

import { IconMinus, IconPlus } from "@tabler/icons-react";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter = ({ title, subtitle, value, onChange }: CounterProps) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onMinus = useCallback(() => {
    if (value === 1) return;

    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className="flex flex-row items-center justify-between py-4 first:pt-0 last:pb-0">
      <div className="flex flex-col">
        <div className="font-semibold">{title}</div>
        <div className="text-sm font-medium text-slate-600">{subtitle}</div>
      </div>

      <div className="flex flex-row items-center gap-4">
        <div
          onClick={onMinus}
          className={`hover:bg-slate-5 flex h-10 w-10 items-center justify-center rounded-full border-[1px] border-slate-300 text-slate-900 transition hover:bg-slate-50 ${
            value === 1 ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <span className="sr-only">Minus</span>
          <IconMinus size={16} />
        </div>
        <div className="text-xl text-slate-900">{value}</div>
        <div
          onClick={onAdd}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-[1px] border-slate-300 text-slate-900 transition hover:bg-slate-50"
        >
          <IconPlus size={16} />
        </div>
      </div>
    </div>
  );
};

export default Counter;

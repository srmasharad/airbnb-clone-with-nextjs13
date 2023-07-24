"use client";

import { CategoryItemProps } from "../CategoryItem";

interface CategoryInputProps extends CategoryItemProps {
  onClick: (value: string) => void;
}

const CategoryInput = ({
  label,
  selected,
  icon: Icon,
  onClick,
}: CategoryInputProps) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`flex 
      cursor-pointer 
      flex-row 
      items-center 
      justify-center 
      gap-2 
      rounded-md
      px-3
      py-1.5 
      transition
      hover:bg-rose-50
      hover:text-rose-500
      ${
        selected
          ? "bg-rose-500 text-white hover:bg-rose-500 hover:text-white"
          : "bg-slate-100 text-slate-800"
      }`}
    >
      <Icon size={20} stroke={1.75} />
      <div className="text-sm font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;

"use client";

import { useCallback } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

export interface CategoryItemProps {
  label: string;
  icon: React.ElementType;
  description?: string;
  selected?: boolean;
}

const CategoryItem = ({ label, icon: Icon, selected }: CategoryItemProps) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleSelectCategory = useCallback(() => {
    let currentCategory = {};

    if (params) {
      currentCategory = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentCategory,
      category: label,
    };

    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleSelectCategory}
      className={`
      flex 
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
      }
    `}
    >
      <Icon size={20} stroke={1.75} />
      <div className="text-sm font-semibold">{label}</div>
    </div>
  );
};

export default CategoryItem;

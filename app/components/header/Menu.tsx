"use client";

import { DetailedHTMLProps, HTMLAttributes, LiHTMLAttributes } from "react";

interface GroupProps {
  children: React.ReactNode;
}

interface ItemProps {
  label: string;
  leftIcon?: React.ElementType;
  rightIcon?: React.ElementType;
  animateIcon?: boolean;
}

const Group = ({
  children,
  ...restProps
}: GroupProps &
  Partial<
    DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>
  >) => {
  return (
    <ul {...restProps} role="list" className="px-1 py-2">
      {children}
    </ul>
  );
};

const Item = ({
  label,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  animateIcon,
  ...restProps
}: ItemProps &
  Partial<
    DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>
  >) => {
  return (
    <li
      {...restProps}
      className="group/item my-0.5 flex cursor-pointer flex-row items-center justify-between rounded-md px-3 py-1.5 text-sm font-semibold transition hover:bg-neutral-100 hover:text-rose-500"
    >
      <div className="flex flex-row items-center justify-start gap-3">
        {LeftIcon && (
          <LeftIcon
            size={18}
            className={`         
              text-slate-600
              group-hover/item:text-rose-500
            `}
          />
        )}
        {label}
      </div>
      {RightIcon && (
        <RightIcon
          size={20}
          stroke={1.5}
          className={`         
          text-rose-500 
          transition-transform 
          ${
            animateIcon
              ? "invisible -translate-x-1 group-hover/item:visible group-hover/item:translate-x-0 "
              : "visible"
          }
          `}
        />
      )}
    </li>
  );
};

const Menu = {
  Group,
  Item,
};

export default Menu;

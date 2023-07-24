"use client";

import Image from "next/image";
import profilePlaceholder from "public/images/placeholder-profile.png";

import { IconUser } from "@tabler/icons-react";

interface AvatarProps {
  src: string | null | undefined;
}

const Avatar = ({ src }: AvatarProps) => {
  return (
    <div className="hidden h-[26px] w-[26px] items-center justify-center rounded-full border-[1px] bg-neutral-100 md:flex">
      {src === undefined ? (
        <IconUser size={18} className="text-slate-600" />
      ) : (
        <Image
          src={src || profilePlaceholder}
          height={26}
          width={26}
          className="rounded-full"
          alt="profile"
        />
      )}
    </div>
  );
};

export default Avatar;

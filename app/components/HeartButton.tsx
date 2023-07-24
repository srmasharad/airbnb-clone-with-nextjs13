"use client";

import useFavorite from "app/hooks/useFavotite";
import { SafeUser } from "app/types";

import { IconHeart } from "@tabler/icons-react";

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const HeartButton = ({ listingId, currentUser }: HeartButtonProps) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  return (
    <div
      onClick={toggleFavorite}
      className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/30 backdrop-blur-sm transition hover:opacity-80"
    >
      <IconHeart
        size={24}
        stroke={1.5}
        className={`text-white ${
          hasFavorited ? "fill-rose-500" : "fill-slate-900/10"
        }`}
      />
    </div>
  );
};

export default HeartButton;

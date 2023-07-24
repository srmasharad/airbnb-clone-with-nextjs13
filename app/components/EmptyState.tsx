"use client";

import { useRouter } from "next/navigation";

import Button from "./Button";
import Heading from "./Heading";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters",
  showReset,
}: EmptyStateProps) => {
  const router = useRouter();

  return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-2">
      <Heading title={title} subtitle={subtitle} center />
      <div className="mt-4 w-48">
        {showReset && (
          <Button
            outline
            label="Remove all filters"
            onClick={() => router.push("/")}
            wide
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;

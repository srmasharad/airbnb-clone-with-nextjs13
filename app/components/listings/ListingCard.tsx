"use client";

import { useCallback, useMemo } from "react";

import useCountries from "app/hooks/useCountries";
import { SafeListing, SafeReservation, SafeUser } from "app/types";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Button from "../Button";
import HeartButton from "../HeartButton";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId,
  currentUser,
}: ListingCardProps) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const onCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) return;

      onAction?.(String(actionId));
    },
    [actionId, disabled, onAction]
  );

  const price = useMemo(() => {
    if (reservation) return reservation.totalPrice;

    return data.price;
  }, [reservation, data]);

  const reservationDate = useMemo(() => {
    if (!reservation) return null;

    const startDate = new Date(reservation.startDate);
    // @ts-ignore
    const endDate = new Date(reservation.endDate);

    return `${format(startDate, "PP")} - ${format(endDate, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="group col-span-1 cursor-pointer"
    >
      <div className="flex w-full flex-col gap-3">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl">
          <Image
            alt="listing"
            src={data.imageSrc}
            className="group-hover:scale-10 h-full w-full object-cover transition"
            fill
          />
          <div className="absolute right-3 top-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>

        <div className="flex flex-col gap-0.5">
          <div className="text-lg font-bold">
            {location?.region}, {location?.label}
          </div>
          <div className="text-md font-semibold text-slate-500">
            {reservationDate || data.category}
          </div>
        </div>

        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && (
            <span className="text-sm font-semibold text-slate-600">
              / night
            </span>
          )}
        </div>

        {onAction && actionLabel && (
          <Button
            onClick={onCancel}
            label={actionLabel}
            disabled={disabled}
            small
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;

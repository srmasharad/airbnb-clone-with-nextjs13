"use client";

import useCountries from "app/hooks/useCountries";
import { SafeUser } from "app/types";
import dynamic from "next/dynamic";

import Avatar from "../Avatar";
import { CategoryItemProps } from "../CategoryItem";
import Divider from "../Divider";
import ListingCategory from "./ListingCategory";

const Map = dynamic(() => import("../Map"), {
  ssr: false,
});

interface ListingInfoProps {
  user: SafeUser;
  category: CategoryItemProps | undefined;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  location: string;
}

const ListingInfo = ({
  user,
  category,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  location,
}: ListingInfoProps) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(location)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2">
          <Avatar src={user.image} />
          <div className="text-slate-600">
            Hosted by{" "}
            <span className="font-semibold text-slate-900">{user?.name}</span>
          </div>
        </div>

        <div className="fex-row flex items-center gap-4 text-slate-600">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <Divider />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description as string}
        />
      )}
      <Divider />
      <div className="text-slate-600">{description}</div>
      <Divider />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;

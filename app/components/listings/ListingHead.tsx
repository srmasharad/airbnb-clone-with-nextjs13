"use client";

import useCountries from "app/hooks/useCountries";
import { SafeUser } from "app/types";
import Image from "next/image";

import Heading from "../Heading";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
  id: string;
  title: string;
  imageSrc: string;
  locationValue: string;
  currentUser?: SafeUser | null;
}

const ListingHead = ({
  id,
  title,
  imageSrc,
  locationValue,
  currentUser,
}: ListingHeadProps) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="relative h-[60vh] w-full overflow-hidden rounded-xl">
        <Image
          src={imageSrc}
          alt={`${title.toLocaleLowerCase().split(" ").join("-")}_image`}
          className="w-full object-cover object-center"
          priority
          fill
        />
        <div className="absolute right-3 top-3">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;

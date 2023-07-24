"use client";

import { useMemo } from 'react';

import useCountries from 'app/hooks/useCountries';
import useSearchModal from 'app/hooks/useSearchModal';
import { differenceInDays } from 'date-fns';
import { useSearchParams } from 'next/navigation';

import { IconSearch } from '@tabler/icons-react';

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const guest = params?.get("guestCount");
  const location = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");

  const locationLabel = useMemo(() => {
    if (location) {
      return getByValue(location as string)?.label;
    }

    return "Anywhere";
  }, [location, getByValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }

    return "Any Week";
  }, [endDate, startDate]);

  const guestLabel = useMemo(() => {
    if (guest) {
      return `${guest} Guests`;
    }

    return "Add Guests";
  }, [guest]);

  return (
    <div
      onClick={searchModal.onOpen}
      className="w-full cursor-pointer rounded-md border-[1px] py-[6px] md:w-auto"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="px-4 text-sm font-semibold">{locationLabel}</div>
        <div className="hidden flex-1 border-x-[1px] px-4 text-center text-sm font-semibold sm:block">
          {durationLabel}
        </div>
        <div className="flex flex-row items-center gap-3 pe-2 ps-4 text-sm font-semibold text-rose-500">
          <div className="hidden sm:block">{guestLabel}</div>
          <div className="flex items-center justify-center rounded-full bg-rose-500 p-1 text-white">
            <IconSearch size={14} stroke={2.5} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;

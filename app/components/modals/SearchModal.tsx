"use client";

import {
  useCallback,
  useMemo,
  useState,
} from 'react';

import useSearchModal from 'app/hooks/useSearchModal';
import { formatISO } from 'date-fns';
import dynamic from 'next/dynamic';
import {
  useRouter,
  useSearchParams,
} from 'next/navigation';
import qs from 'query-string';
import { Range } from 'react-date-range';

import Heading from '../Heading';
import Calendar from '../inputs/Calendar';
import Counter from '../inputs/Counter';
import CountrySelect, { CountrySelectValue } from '../inputs/CountrySelect';
import Modal from './Modal';

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const [step, setStep] = useState(STEPS.LOCATION);
  const [location, setLocation] = useState<CountrySelectValue>();
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(0),
    key: "selection",
  });

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const onBack = () => setStep((prev) => prev - 1);

  const onNext = () => setStep((prev) => prev + 1);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) return onNext();

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();

    router.push(url);
  }, [
    router,
    step,
    searchModal,
    location,
    bathroomCount,
    roomCount,
    guestCount,
    dateRange,
    params,
    onNext,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) return "Search";

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) return undefined;

    return "Back";
  }, [step]);

  return (
    <Modal
      isOpen={searchModal.isOpen}
      title="Filters"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
    >
      {/* Step 1 - Select Location */}
      {step === STEPS.LOCATION && (
        <div className="flex flex-col gap-8">
          <Heading
            title="Where do you wanna go?"
            subtitle="Find the perfect location!"
          />

          <CountrySelect
            value={location}
            onChange={(value) => setLocation(value as CountrySelectValue)}
          />

          <Map center={location?.latlng} />
        </div>
      )}

      {/* Step 2 - Select Date */}
      {step === STEPS.DATE && (
        <div className="flex flex-col gap-8">
          <Heading
            title="Where do you plan to go?"
            subtitle="Make sure everyone is free!"
          />

          <Calendar
            value={dateRange}
            onChange={(value) => setDateRange(value.selection)}
          />
        </div>
      )}

      {/* Step 3 - Add Info */}
      {step === STEPS.INFO && (
        <div className="flex flex-col gap-8">
          <Heading
            title="More Information"
            subtitle="Find your perfect place!"
          />

          <div role="list" className="divide-y divide-slate-200">
            <Counter
              title="Guests"
              subtitle="How many guests are coming?"
              value={guestCount}
              onChange={(value) => setGuestCount(value)}
            />
            <Counter
              title="Rooms"
              subtitle="How many rooms do you need?"
              value={roomCount}
              onChange={(value) => setRoomCount(value)}
            />
            <Counter
              title="Bathrooms"
              subtitle="How many bathrooms do you need?"
              value={bathroomCount}
              onChange={(value) => setBathroomCount(value)}
            />
          </div>
        </div>
      )}
    </Modal>
  );
};

export default SearchModal;

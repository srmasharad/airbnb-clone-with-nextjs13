"use client";

import { Range, RangeKeyDict } from "react-date-range";

import Button from "../Button";
import Divider from "../Divider";
import Calendar from "../inputs/Calendar";

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  dateRange: Range;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const ListingReservation = ({
  price,
  totalPrice,
  dateRange,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
}: ListingReservationProps) => {
  return (
    <div className="overflow-hidden rounded-md border-[1px] bg-white">
      <div className="flex flex-row items-center gap-1 p-4 pb-2">
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="text-slate-600">night</div>
      </div>
      <Divider />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value: RangeKeyDict) => onChangeDate(value.selection)}
      />
      <Divider />
      <div className="p-4 pt-2">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} wide />
      </div>
      <div className="text-md flex flex-row items-center justify-between p-4 pt-0 font-semibold">
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;

"use client";

import useCountries from "app/hooks/useCountries";
import Select from "react-select";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect = ({ value, onChange }: CountrySelectProps) => {
  const { getAll } = useCountries();

  return (
    <div>
      <Select
        isClearable
        placeholder="Anywhere"
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: CountrySelectValue) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label},
              <span className="ml-1 text-slate-500">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "px-3 py-2 border-slate-300 rounded-md cursor-text",
          placeholder: () => "text-md text-slate-500",
          input: () => "text-md",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "#0f172a",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;

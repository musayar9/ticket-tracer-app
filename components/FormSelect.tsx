import { FromStationList } from "@/utils/types";
import React from "react";
type FormSelectProps = {
  item: FromStationList[] | undefined;
  label: string;
  selectedValue: string;
  value: string;
  checkFromStation?:boolean,
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; // Select öğesi için doğru event tipi
};
const FormSelect: React.FC<FormSelectProps> = ({
  item,
  onChange,
  label,
  selectedValue,
  value,
  checkFromStation
}) => {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <select
        className="select select-bordered"
        value={value}
        onChange={onChange}
        disabled={checkFromStation}
      >
        <option value={""} disabled>
          {selectedValue}
        </option>
        {item?.map((station) => (
          <option key={station.stationID} value={station.stationName}>
            {station.stationViewName || station.stationName}
          </option>
        ))}
      </select>
    </label>
  );
};

export default FormSelect;

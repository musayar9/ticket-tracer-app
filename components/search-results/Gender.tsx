import React from "react";

type GenderProps = {
  value: string;
  gender: boolean;
  label: string;
  icon: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Gender = ({ value, gender, label, icon, onChange }: GenderProps) => {
  return (
    <div className="form-control">
      <label className="cursor-pointer label gap-2">
        <div className="flex items-center gap-1">
          {icon}
          <span className="label-text">{label}</span>
        </div>
        <input
          type="checkbox"
          value={value}
          checked={gender}
          onChange={onChange}
          className="checkbox checkbox-success"
        />
      </label>
    </div>
  );
};

export default Gender;

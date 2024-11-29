import React from "react";

type FormInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLDataElement>) => void;
  minDate: Date;
  label: string;
  error: boolean;
};

const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChange,
  minDate,
  error,
}) => {
  const minDateString = minDate.toISOString().split("T")[0];
  return (
    <label className="form-control w-full ">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type="date"
        className={` input input-bordered w-full  ${error && " input-error"}`}
        value={value}
        onChange={onChange}
        min={minDateString}
      />
    </label>
  );
};

export default FormInput;

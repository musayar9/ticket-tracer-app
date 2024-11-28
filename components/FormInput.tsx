import React from "react";

type FormInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLDataElement>) => void;
  minDate: Date;
  label: string;
};

const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChange,
  minDate,
}) => {
  const minDateString = minDate.toISOString().split("T")[0];
  return (
    <label className="form-control w-full ">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type="date"
        className="input input-bordered w-full "
        value={value}
        onChange={onChange}
        min={minDateString}
      />
    </label>
  );
};

export default FormInput;

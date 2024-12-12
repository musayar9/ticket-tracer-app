import React from "react";

type FormInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLDataElement | HTMLInputElement>) => void;
  minDate?: Date;
  label: string;
  error: boolean | string;
  type: string;
  name: string;
  placeholder?: string;
  minLength?: number;
  maxLength?:number
};

const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChange,
  minDate,
  error,
  name,
  type,
  placeholder,
  minLength,
  maxLength
}) => {
  const minDateString = minDate?.toISOString().split("T")[0];
  return (
    <label className="form-control w-full ">
      <div className="label">
        <span className={"label-text capitalize"}>{label}</span>
      </div>
      <input
        name={name}
        type={type}
        className={` input input-bordered w-full  ${error && " input-error"}`}
        value={value}
        onChange={onChange}
        min={type === "date" ? minDateString : minLength}
        maxLength={maxLength}
        placeholder={placeholder}
      />
    </label>
  );
};

export default FormInput;

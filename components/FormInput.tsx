import React from "react";

type FormInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLDataElement | HTMLInputElement>) => void;
  minDate?: Date;
  label: string;
  error: boolean | string;
  type:string;
  name:string;
  placeholder?:string
};

const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChange,
  minDate,
  error,
  name, type,
  placeholder
}) => {
  const minDateString = minDate?.toISOString().split("T")[0];
  return (
    <label className="form-control w-full ">
      <div className="label">
        <span
          className={`${
            type === "text" && "capitalize text-xl text-slate-700"
          } label-text`}
        >
          {label}
        </span>
      </div>
      <input
        name={name}
        type={type}
        className={` input input-bordered w-full  ${error && " input-error"}`}
        value={value}
        onChange={onChange}
        min={minDateString}
        placeholder={placeholder}
      />
    </label>
  );
};

export default FormInput;

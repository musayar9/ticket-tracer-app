import React from "react";
type FormIconInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLDataElement | HTMLInputElement>) => void;
  minDate?: Date;
  label: string;
  error: boolean | string;
  type: string;
  name: string;
  placeholder?: string;
  min?: number;
  maxLength?: number;
  icon: React.ReactNode;
  styles?:string
};
const FormIconInput = ({
  value,
  onChange,
  error,
  name,
  type,
  placeholder,
  min,
  maxLength,
  icon,
  styles
}: FormIconInputProps) => {
  return (
    <label className="input input-bordered w-full flex items-center  gap-2">
      {icon}

      <input
        name={name}
        type={type}
        className={`w-full grow placeholder:text-xs placeholder:capitalize ${styles}  ${error && " input-error"}`}
        value={value}
        onChange={onChange}
        min={min}
        maxLength={maxLength}
        placeholder={placeholder}
      />
    </label>
  );
};

export default FormIconInput;

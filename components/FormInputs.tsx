import React from "react";

type FormInputsProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: React.FocusEventHandler<HTMLInputElement>;
  id?: string;
  label: string;
  icon: React.ReactNode;
  arrowIcon?: React.ReactNode;
  disabled?: boolean;
  message?: string | null
};

const FormInputs = ({
  onChange,
  onFocus,
  id,
  label,
  icon,
  arrowIcon,
  value,
  disabled,
  message,

}: FormInputsProps) => {
  return (
    <>
      <div className="flex items-start flex-col w-full">
        <div className="relative w-full" >
          <input
            type="text"
            id={id}
            className="disabled:border-slate-100 disabled:cursor-not-allowed flex w-full rounded-lg border border-slate-300 px-2.5 pb-1.5 pt-5  text-sm text-gray-900
    bg-[#fff] focus:outline-none focus:ring-0 focus:border-slate-600 peer"
            placeholder=" "
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            disabled={disabled}
          />
          <label
            htmlFor={id}
            className="absolute flex items-center  text-sm text-gray-700  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5
    peer-focus:text-slate-400  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            {icon}
            {arrowIcon}
            <span className="pl-1">{label}</span>
          </label>
        </div>
 
          <div className="h-5 pt-2">
            <p className="text-red-600 text-xs">{message}</p>
          </div>

      </div>
    </>
  );
};

export default FormInputs;

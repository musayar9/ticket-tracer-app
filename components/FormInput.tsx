
import React from "react";

type FormInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLDataElement>) => void;
  minDate: Date ;
};

const FormInput: React.FC<FormInputProps> = ({ value, onChange, minDate }) => {
 const minDateString = minDate.toISOString().split("T")[0];
  return (
    <label className="form-control w-full ">
      <div className="label">
        <span className="label-text">Gidiş Tarihi</span>
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

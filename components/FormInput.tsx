import React from "react";

const FormInput = () => {
  return (
    <label className="form-control w-full ">
      <div className="label">
        <span className="label-text">Gidiş Tarihi</span>
      </div>
      <input type="date" className="input input-bordered w-full " />
    </label>
  );
};

export default FormInput;

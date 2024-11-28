import React from 'react'

const FormSelect = () => {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">Gidiş Yeri</span>
      </div>
      <select className="select select-bordered">
        <option disabled selected>
          Pick one
        </option>
        <option>Star Wars</option>
        <option>Harry Potter</option>
        <option>Lord of the Rings</option>
        <option>Planet of the Apes</option>
        <option>Star Trek</option>
      </select>
    </label>
  );
}

export default FormSelect
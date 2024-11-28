import React from "react";
import FormInput from "../FormInput";
import FormSelect from "../FormSelect";

const FormArea = () => {
  return (
    <div className="py-4 space-y-3">
      <h3 className="text-slate-600 text-center text-2xl font-semibold">
        Tren <span className="text-slate-700">Bileti</span> Sorgulama
      </h3>
      <form>
        <div className="flex items-center justify-center gap-4">
          <FormSelect />
          <FormSelect />
        </div>
        <FormInput />
      </form>
      <button className="w-full px-4 py-2 border border-blue-500 rounded-lg  font-semibold hover:bg-blue-600  hover:text-white transition  duration-200 ease-linear ">Sorgula</button>
    </div>
  );
};

export default FormArea;

import React from "react";

const EmailArea = () => {
  return (
    <div className="p-4 bg-[#fff] rounded-2xl shadow-lg">
      <h3 className="text-slate-600 text-2xl px-4 py-2">
        Enter your email to view your tickets
      </h3>
      <div className="px-3 py-2">
        <form className="relative ">
          <input
            name="email"
            type="text"
            placeholder="E-mail Adresiniz Girin"
            className=" peer w-full  flex px-2.5 pb-2.5 pt-4 text-sm bg-transparent rounded-md border-2 border-emerald-600 appearance-none  
                  focus:ring-0 focus:border-emerald-600 placeholder:capitalize outline-none"
          />

          <label className="flex  absolute text-sm   bg-base-100  capitalize duration-300 transform -translate-y-4 scale-75 top-0 z-10 origin-[0] px-4 peer-focus:px-4 peer-focus:text-emerald-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
            E-mail Addresinizi Girin
          </label>
        </form>
      </div>
    </div>
  );
};

export default EmailArea;

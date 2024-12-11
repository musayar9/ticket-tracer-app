"use client";
import { useGlobalContext } from "@/context/ticket-tracer-context";
import { ticketRequest } from "@/utils/api";
// import customFetch from "@/utils/axios";
// import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const EmailArea = () => {
  const { email, setEmail, setSelectedTrainTickets, setLoading } =
    useGlobalContext();
  const [emailError, setEmailError] = useState("");
  const handleEmailValidation = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Geçerli bir email adresi girin.");

      return false;
    }
    setEmailError("");
    return true;
  };
  useEffect(() => {
    if (emailError) {
      setTimeout(() => {
        setEmailError("");
      }, 3000);
    }
  }, [emailError]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (handleEmailValidation()) {
   
        setLoading(true);
        const data = await ticketRequest({email})

        setSelectedTrainTickets(data);
        setLoading(false);
  
    }
  };


  return (
    <div className="p-4 bg-[#fff] rounded-2xl shadow-lg">
      <h3 className="text-slate-600  text-lg md:text-2xl px-4 py-2">
        Biletlerinizi görüntülemek için e-postanızı girin
      </h3>
      <div className="px-3 py-2">
        <form className="relative " onSubmit={handleSubmit}>
          <div className="relative">
            <button
              type="submit"
              className="absolute inset-y-0 end-0 flex items-center pr-3.5 pointer-events-auto text-emerald-600"
            >
              <FaSearch className="w-5 h-5 " />
            </button>
            <input
              type="text"
              className="peer w-full  flex px-2.5 pb-2.5 pt-4 text-sm bg-transparent rounded-md border-2 border-emerald-600 appearance-none  
                  focus:ring-0 focus:border-emerald-600 placeholder:capitalize outline-none"
              placeholder="E-mail Adresiniz Girin"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="E-mail Adresiniz Girin"
            className=" peer w-full  flex px-2.5 pb-2.5 pt-4 text-sm bg-transparent rounded-md border-2 border-emerald-600 appearance-none  
                  focus:ring-0 focus:border-emerald-600 placeholder:capitalize outline-none"
          /> */}

          <label
            className="absolute text-md duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-base-100 text-emerald-600
            px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            E-mail Addresinizi Girin
          </label>
        </form>
      </div>
    </div>
  );
};

export default EmailArea;

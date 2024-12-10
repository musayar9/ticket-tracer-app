import React, { useState } from "react";
import FormInput from "../FormInput";
import { useGlobalContext } from "@/context/ticket-tracer-context";

const SearchMyTickets = () => {
  const { email, setEmail } = useGlobalContext();
  const [emailError, setEmailError] = useState("");
  return (
    <>
      <FormInput
        value={email}
        name={"email"}
        type={"text"}
        error={emailError}
        onChange={(e) => setEmail(e.target.value)}
        label={"e-mail"}
        placeholder="E-mail Adresinizi Girin"
      />
      <button
        type="submit"
        className=" w-full px-4 py-2 border rounded-lg mt-4  font-semibold text-[#fff] bg-[#de2619] hover:bg-[#dc3545]
transition  duration-200 ease-linear "
      >
        Sorgula
      </button>
    </>
  );
};

export default SearchMyTickets;

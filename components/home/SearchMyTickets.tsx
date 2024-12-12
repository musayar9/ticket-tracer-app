import React, { useEffect, useState } from "react";
import FormInput from "../FormDateInput";
import { useGlobalContext } from "@/context/ticket-tracer-context";
import { ticketRequest } from "@/utils/api";
import { useRouter } from "next/navigation";

const SearchMyTickets = () => {
  const { email, setEmail, setSelectedTrainTickets, setLoading, loading } =
    useGlobalContext();
  const [emailError, setEmailError] = useState("");
  const router = useRouter();
  const handleEmailValidation = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Geçerli bir email adresi girin.");

      return false;
    }
    setEmailError("");
    return true;
  };

  const localEmail = localStorage.getItem("email");

  useEffect(() => {
    if (localEmail) {
      setEmail(localEmail);
    }

    if (emailError) {
      setTimeout(() => {
        setEmailError("");
      }, 3000);
    }
  }, [emailError, localEmail]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (handleEmailValidation()) {
      setLoading(true);
      // const res = await customFetch.get(`/ticket-request/mail/${email}`);
      // console.log(res);
      // const data = await res.data;
      // console.log(data);
      const data = await ticketRequest({ email });

      setSelectedTrainTickets(data);
      // setLoading(false);
      router.push("/my-tickets");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
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
        {loading ? "Sorgulanıyor" : "Sorgula"}
      </button>
    </form>
  );
};

export default SearchMyTickets;

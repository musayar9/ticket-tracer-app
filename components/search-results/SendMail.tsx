import { useGlobalContext } from '@/context/ticket-tracer-context';
import customFetch from '@/utils/axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { MdEmail } from 'react-icons/md';


type SendMailProps = {
  setShowSuccessMsg: React.Dispatch<React.SetStateAction<boolean>>;
};

const SendMail:React.FC<SendMailProps> = ({ setShowSuccessMsg }) => {
  const { email, setEmail, selectTrain } = useGlobalContext();
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

  const handleAddedTicket = async () => {
    if (handleEmailValidation()) {
      const selectedTickets = selectTrain.map((train) => ({
        trainID: train.trainID,
        tourID: train.tourID,
        gidisTarih: train.departureDate,
        inisTarih: train.arrivalDate,
        binisIstasyon: train.departureStation,
        inisIstasyonu: train.arrivalStation,
        email,
        binisIstasyonId: train.departureStationID,
        inisIstasyonId: train.arrivalStationID,
      }));

      try {
        const res = await customFetch.post("/tcdd/add", {
          request: selectedTickets,
        });
        console.log(res, "res");
        setShowSuccessMsg(true);
      } catch (error) {
        console.log(error);

        toast.error("ekleme sırasında bir hata oluştu");
      }
    }
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center">
        <MdEmail className="bg-emerald-700 w-20 h-20 text-white rounded-full p-4 " />
      </div>

      <>
        <div className="relative">
          <input
            name="email"
            value={email}
            type="text"
            placeholder="E-mail Adresiniz Girin"
            className=" peer w-full  flex px-2.5 pb-2.5 pt-4 text-sm bg-transparent rounded-md border-2 border-emerald-600 appearance-none  
                  focus:ring-0 focus:border-emerald-600 placeholder:capitalize outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="flex  absolute text-sm   bg-base-100  capitalize duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-emerald-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
            E-mail Addresinizi Girin
          </label>
        </div>
        {emailError && (
          <p className="alert alert-error rounded-lg px-4 py-2 text-xs text-white my-4">
            {emailError}
          </p>
        )}
        <div className="modal-action flex  ">
          <button
            onClick={handleAddedTicket}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg self-end text-xs hover:opacity-85 duration-200 ease-in"
          >
            Mail Gönder
          </button>
        </div>
      </>
    </div>
  );
};

export default SendMail
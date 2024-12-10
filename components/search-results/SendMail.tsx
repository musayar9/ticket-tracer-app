import { useGlobalContext } from "@/context/ticket-tracer-context";
import customFetch from "@/utils/axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdFemale, IoMdMale } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import FormInput from "../FormInput";
import Gender from "./Gender";

type SendMailProps = {
  setShowSuccessMsg: React.Dispatch<React.SetStateAction<boolean>>;
};

const SendMail: React.FC<SendMailProps> = ({ setShowSuccessMsg }) => {
  const { email, setEmail, selectTrain } = useGlobalContext();
  const [emailError, setEmailError] = useState("");
  const [gender, setGender] = useState("");
  const [male, setMale] = useState(false);
  const [women, setWomen] = useState(false);

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
        departureDate: train.departureDate,
        arrivalDate: train.arrivalDate,
        email,
        departureStationID: train.departureStationID,
        arrivalStationID: train.arrivalStationID,
        gender: gender,
      }));

      try {
        const res = await customFetch.post("/v2/tcdd/add", {
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

  console.log("fender", gender);
  const handleMale = (e:React.ChangeEvent<HTMLInputElement>)=>{
   setGender(e.target.value);
   setMale(!male);
   setWomen(false);
  
  }
  
  const handleWomen =   (e:React.ChangeEvent<HTMLInputElement>)=>{
  setGender(e.target.value);
  setMale(false);
  setWomen(!women);
  }
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center">
        <MdEmail className="bg-emerald-700 w-20 h-20 text-white rounded-full p-4 " />
      </div>

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
        <div className="flex items-center justify-center gap-4">
 
          <Gender
            value="M"
            gender={male}
            label={"Erkek"}
            icon={<IoMdMale />}
            onChange={handleMale}
          />
          <Gender
            value="W"
            gender={women}
            label={"Kadın"}
            icon={<IoMdFemale />}
            onChange={handleWomen}
          />

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

export default SendMail;

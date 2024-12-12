import { useGlobalContext } from "@/context/ticket-tracer-context";
import customFetch from "@/utils/axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdFemale, IoMdMale, IoMdPerson } from "react-icons/io";

import Gender from "./Gender";
import axios from "axios";
import FormIconInput from "../FormIconInput";
import { HiMiniIdentification } from "react-icons/hi2";
import { FaBirthdayCake, FaPhoneAlt } from "react-icons/fa";
import { IoPersonAdd } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

type SendMailProps = {
  setShowSuccessMsg: React.Dispatch<React.SetStateAction<boolean>>;
};

const SendMail: React.FC<SendMailProps> = ({ setShowSuccessMsg }) => {
  const { email, setEmail, selectTrain } = useGlobalContext();
  const [formatData, setFormatData] = useState({
    name: "",
    lastName: "",
    birthDate: "",
    phone: "",
    identityNumber: "",
  });
  const [emailError, setEmailError] = useState("");
  const [gender, setGender] = useState("");
  const [male, setMale] = useState(false);
  const [women, setWomen] = useState(false);
  const [loading, setLoading] = useState(false);
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
  const handleMale = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value);
    setMale(!male);
    setWomen(false);
  };

  const handleWomen = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value);
    setMale(false);
    setWomen(!women);
  };
  const handleAddedTicket = async () => {
    const missingFields = [];
    if (!formatData.name) missingFields.push("İsim");
    if (!formatData.lastName) missingFields.push("Soyisim");
    if (!formatData.phone) missingFields.push("Telefton");
    if (!formatData.birthDate) missingFields.push("Doğum Tarihi");

    if (missingFields.length > 0) {
      setEmailError(
        `Lütfen yukarıdaki  alanları doldurun: ${missingFields.join(", ")}`
      );
      return;
    }
    const formatBirthDate = formatData.birthDate.split("-").join("");
    if (handleEmailValidation()) {
      const selectedTickets = selectTrain.map((train) => ({
        trainID: train.trainID,
        departureDate: train.departureDate,
        arrivalDate: train.arrivalDate,
        email,
        name: formatData.name,
        lastName: formatData.lastName,
        birthDate: formatBirthDate,
        phone: formatData.phone,
        identityNumber: formatData.identityNumber,
        departureStationID: train.departureStationID,
        arrivalStationID: train.arrivalStationID,
        gender: gender,
      }));

      try {
        setLoading(true);
        const res = await customFetch.post("/v2/tcdd/add", {
          request: selectedTickets,
        });
        localStorage.setItem("email", email);
        setShowSuccessMsg(true);
        setLoading(false);
     console.log(res, "res")
     return res
      } catch (error) {
        setLoading(false);
        if (axios.isAxiosError(error)) {
          
          toast.error(error?.response?.data.errorMessage);
          return error.response?.data.errorMessage;
        } else {
          return "Request failed";
        }
      }
    }
  };


  console.log("selected", selectTrain);
  return (
    <div className="-mt-3">
      <h2 className="text-center text-xl text-slate-700 font-semibold py-3">
        Kişisel Bilgiler
      </h2>

      <div className="space-y-3">
        <div className="flex items-center flex-col lg:flex-row md:justify-between gap-2">
          <FormIconInput
            value={formatData.name}
            name={"name"}
            type={"text"}
            error={emailError}
            onChange={(e) =>
              setFormatData({ ...formatData, name: e.target.value })
            }
            label={"Ad"}
            placeholder="Adınız"
            icon={<IoMdPerson />}
            styles={"capitalize"}
          />
          <FormIconInput
            value={formatData.lastName}
            name={"lastName"}
            type={"text"}
            error={emailError}
            onChange={(e) =>
              setFormatData({ ...formatData, lastName: e.target.value })
            }
            label={"Soyad"}
            placeholder="Soyadınız"
            icon={<IoPersonAdd />}
            styles={"capitalize"}
          />
        </div>
        <div className="flex items-center flex-col lg:flex-row md:justify-between gap-2">
          <FormIconInput
            value={formatData.identityNumber}
            name={"identityNumber"}
            type="text"
            min={0}
            maxLength={11}
            error={emailError}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value) && Number(value) >= 0) {
                setFormatData({
                  ...formatData,
                  identityNumber: value,
                });
              }
            }}
            label={"TC Kimlik Numarası"}
            placeholder="TC Kimlik Numaranız"
            icon={<HiMiniIdentification />}
          />
          <FormIconInput
            value={formatData.birthDate}
            name={"birthDate"}
            type={"date"}
            error={emailError}
            onChange={(e) =>
              setFormatData({ ...formatData, birthDate: e.target.value })
            }
            label={"Doğum Tarihi"}
            placeholder="Doğum Tarihiniz"
            icon={<FaBirthdayCake />}
          />
        </div>

        <div className="flex items-center flex-col lg:flex-row md:justify-betweenn gap-2">
          <FormIconInput
            value={email}
            name={"email"}
            type={"text"}
            error={emailError}
            onChange={(e) => setEmail(e.target.value)}
            label={"e-mail"}
            placeholder="E-mail Adresinizi Girin"
            icon={<MdEmail />}
            styles={"lowercase"}
          />
          <FormIconInput
            value={formatData.phone}
            name={"phone"}
            type="text"
            min={0}
            maxLength={11}
            error={emailError}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value) && Number(value) >= 0) {
                setFormatData({ ...formatData, phone: value });
              }
            }}
            label={"Telefon"}
            placeholder="Telefon Numaranızı  Girin"
            icon={<FaPhoneAlt />}
          />
        </div>

        <div className="flex items-center justify-center gap-4 pt-2">
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
            {loading ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendMail;

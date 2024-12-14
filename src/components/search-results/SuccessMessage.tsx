"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/ticket-tracer-context";

type SuccessMessageProps = {
  setShowSuccessMsg: React.Dispatch<React.SetStateAction<boolean>>;
};

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  setShowSuccessMsg,
}) => {
  const router = useRouter();
  const { setShowModal } = useGlobalContext();
  return (
    <div className="flex flex-col items-center justify-center p-6 gap-4">
      <h3 className="font-semibold text-emerald-600 text-center text-3xl">
        Talebiniz başarı ile alındı
      </h3>
      <p className="text-[#444763] text-md text-center">
        Uygun yer bulunması durumunda mail adresinize bilgilendirme
        yapılacaktır.
      </p>
      <button
        onClick={() => {
          setShowModal(false);
          setShowSuccessMsg(false);
          router.replace("/");
        }}
        className="px-4 py-2 bg-emerald-600 text-white rounded-lg self-end  md:text-xs hover:opacity-85 duration-200 ease-in"
      >
        Tamam
      </button>
    </div>
  );
};

export default SuccessMessage;

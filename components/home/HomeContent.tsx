"use client";
import React, { useEffect } from "react";
import FormArea from "./FormArea";
import { Station } from "@/utils/types";
import { usePathname } from "next/navigation";
import { useGlobalContext } from "@/context/ticket-tracer-context";


type HomeContentProps = {
  data: Station[];
};
const HomeContent: React.FC<HomeContentProps> = ({ data }) => {
  const { setLoading, setEmail, setSelectTrain, setSelectedTrainTickets } =
    useGlobalContext();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      setEmail("");
      setLoading(false);
      setSelectTrain([]);
      setSelectedTrainTickets([]);
    }
    if (pathname === "/search-ticket") {
      setLoading(false);
    }
  }, [pathname, setLoading, setEmail, setSelectTrain, setSelectedTrainTickets]);


  return (
    <section className="max-w-lg mx-auto  shadow-xl   bg-white p-8 rounded-xl">
      <FormArea data={data} />
    </section>
  );
};

export default HomeContent;

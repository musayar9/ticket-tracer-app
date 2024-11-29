"use client";
import React from "react";
import InfoArea from "./InfoArea";
import FormArea from "./FormArea";
import { useGlobalContext } from "@/context/ticket-tracer-context";
import LoadingPage from "../LoadingPage";
import { Station } from "@/utils/types";

type HomeContentProps = {
  data: Station[];
};
const HomeContent: React.FC<HomeContentProps> = ({ data }) => {
  const { loading } = useGlobalContext();

  // if (loading) return <LoadingPage />;
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-10  bg-white p-8 rounded-lg">
      <InfoArea />
      <FormArea data={data} />
    </section>
  );
};

export default HomeContent;

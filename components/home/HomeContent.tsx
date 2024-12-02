"use client";
import React, { useEffect } from "react";
import InfoArea from "./InfoArea";
import FormArea from "./FormArea";
// import { useGlobalContext } from "@/context/ticket-tracer-context";
// import LoadingPage from "../LoadingPage";
import { Station } from "@/utils/types";
import { usePathname } from "next/navigation";

import { useGlobalContext } from "@/context/ticket-tracer-context";

type HomeContentProps = {
  data: Station[];
};
const HomeContent: React.FC<HomeContentProps> = ({ data }) => {
  const { setLoading } = useGlobalContext();
  const pathname = usePathname();
  console.log("pathname", pathname);

  useEffect(() => {
    if (pathname === "/") {
      localStorage.removeItem("ticket");
      setLoading(false);
    }
  }, [pathname, setLoading]);
  // if (loading) return <LoadingPage />;
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-10  bg-white p-8 rounded-lg">
      <InfoArea />
      <FormArea data={data} />
    </section>
  );
};

export default HomeContent;

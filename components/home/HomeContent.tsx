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
  const { setLoading } = useGlobalContext();
  const pathname = usePathname();
  console.log("pathname", pathname);

  useEffect(() => {
    if (pathname === "/") {
      localStorage.removeItem("ticket");
      setLoading(false);
    }
  }, [pathname, setLoading]);

  return (
    <section className="max-w-lg mx-auto  shadow-xl   bg-white p-8 rounded-lg">
      <FormArea data={data} />
    </section>
  );
};

export default HomeContent;

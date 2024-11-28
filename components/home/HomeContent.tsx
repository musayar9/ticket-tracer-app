import React from "react";
import InfoArea from "./InfoArea";
import FormArea from "./FormArea";

const HomeContent = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-10  bg-white p-8 rounded-lg">
      <InfoArea />
      <FormArea />
    </section>
  );
};

export default HomeContent;

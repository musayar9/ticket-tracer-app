import EmailArea from "@/components/my-tickets-list/EmailArea";
import MyTickets from "@/components/my-tickets-list/MyTickets";
import React from "react";

const page = () => {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <EmailArea />
      <MyTickets />
    </div>
  );
};

export default page;

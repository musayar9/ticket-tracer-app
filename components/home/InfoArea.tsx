import React from "react";
import { FaTrainSubway } from "react-icons/fa6";
const InfoArea = () => {
  return (
    <div className="border border-slate-300 rounded-lg p-4 hidden md:block">
      <div className="flex items-center justify-between">
        <div className="flex items-center ">
          <span className="flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full">
            <FaTrainSubway className="text-white" size={24} />
          </span>

          <p className="text-slate-600 w-24 text-center text-sm font-semibold tracking-wider">
            Ticket <span className="text-slate-700">Tracer</span> App
          </p>
        </div>
        <video
          className="rounded-full w-16 h-16  "
          src={"/video/trainAnimation2.mp4"}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      <div className="my-10">
        <h6 className="font-bold  tracking-wider">Sayın yolcularımız;</h6>
        <p className="text-sm text-slate-600 indent-9 my-8 leading-8 tracking-wider">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
          atque suscipit officia non corporis amet, voluptatem dignissimos
          voluptatum dolores laudantium?
        </p>
      </div>
    </div>
  );
};

export default InfoArea;

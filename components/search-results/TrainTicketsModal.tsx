import { useGlobalContext } from '@/context/ticket-tracer-context';
import React, { useState } from 'react'
import { FaXmark } from 'react-icons/fa6';
import SuccessMessage from './SuccessMessage';
import SendMail from './SendMail';

const TrainTicketsModal = () => {
const { setShowModal} = useGlobalContext()
const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  return (
    <div className=" fixed  z-50 inset-0 bg-black bg-opacity-75 flex justify-center items-center w-full ">
      <div className=" absolute top-20 p-4 w-full max-w-xl max-h-full ">
        <div className="relative bg-[#ffffff] p-6 rounded-lg shadow">
          <div className="flex justify-end mb-4">
            <button onClick={() => setShowModal(false)} className="self-end">
              <FaXmark
                size={20}
                className="text-red-600 hover:opacity-85 duration-200 ease-in"
              />
            </button>
          </div>
          {
            <>
              {showSuccessMsg ? (
                // Success Message Content
                <SuccessMessage setShowSuccessMsg={setShowSuccessMsg} />
              ) : (
                // Email Message Content
                <SendMail setShowSuccessMsg={setShowSuccessMsg}/>
              )}
            </>
          }
        </div>
      </div>
    </div>
  );
}

export default TrainTicketsModal
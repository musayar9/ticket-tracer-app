import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa6'

const CheckTrain = () => {
  return (
    <div className="maw-5xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-4">
          {" "}
          <Image
            src="/images/train.webp"
            alt="Not Content"
            width={300}
            height={300}
            className="rounded-full w-72 h-72 object-center"
          />
          <p className="text-2xl font-semibold text-red-600">Tren Seferi Bulunamadı </p>
          <Link
            href="/"
            className= "flex gap-2 items-center underline font-semibold text-blue-700 hover:text-blue-800 duration-200 ease-in"
          >
            <FaArrowLeft />
            <span> Arama Ekranına Dön</span>
          </Link>
        </div>
      </div>
  )
}

export default CheckTrain
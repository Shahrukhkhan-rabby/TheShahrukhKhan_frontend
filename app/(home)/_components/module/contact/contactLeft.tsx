"use client";

import Image from "next/image";
import React from "react";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
import NavButtons from "../../ui/navButtons";
import skillImage from "../../../../../assets/mainIconsdark.svg";

export default function ContactLeft() {
  return (
    <div className="p-4 border border-default-200 rounded-md">
      <div className="flex items-center space-x-2 mb-2">
        <FaWhatsapp className="text-green-500" size={22} />
        <p className="text-default-700">WhatsApp: +8801797660947</p>
      </div>
      <div className="flex items-center space-x-2">
        <Image
          className="size-5"
          src={
            "https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg"
          }
          width={500}
          height={500}
          alt="gmail"
        />
        <p className="text-default-700">Email: rijwanjannat36@gmail.com</p>
      </div>
      <div className="my-5">
        <NavButtons />
      </div>

      <div className="flex items-center justify-center">
        <Image
          className="w-1/2"
          src={skillImage}
          width={500}
          height={500}
          alt="gmail"
        />
      </div>
    </div>
  );
}

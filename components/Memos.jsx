"use client";

import { useContractRead, useContractEvent } from "wagmi";
import BUYMECOFFEE_ABI from "@/abi/buymecoffee.json";
import Image from "next/image";

import { useState } from "react";

const Memos = () => {
  //fetch memos from chain
  const { data, isError, isLoading } = useContractRead({
    address: "0x25230a7fc0b534c0147Bb442A28100F6648dDe5b",
    abi: BUYMECOFFEE_ABI,
    functionName: "getMemos",
  });

  const [memos, setMemos] = useState(data);

  // console.log("10238103281093801238019328",data)

  useContractEvent({
    address: "0x25230a7fc0b534c0147Bb442A28100F6648dDe5b",
    abi: BUYMECOFFEE_ABI,
    eventName: "NewMemo",
    listener(log) {
      console.log("New memo: ",log)
    },
  });

  //hideMiddle
  function hideMiddle(address, start = 4, end = 4) {
    const middle = "...";
    if (address.length > 16) {
      return (
        address.substring(0, start) +
        middle +
        address.substring(address.length - end)
      );
    }

    return address;
  }

  //defaultMemo
  function defaultMemo(memo) {
    if (!memo) {
      return "👍👍👍";
    }
    return memo;
  }

  return (
    <div className="h-full rounded-lg w-2/6 flex flex-col p-6 border border-[rgba(34,34,34,.1)] bg-white">
      <div className="flex justify-between">
        <div className="text-lg font-extrabold">Memos received</div>
        <div className="flex items-center">
          <button className="h-8 w-8 hover:bg-[#F1F0F1] rounded-full flex items-center justify-center mr-2">
            <Image
              src={"/prev0.png"}
              width={25}
              height={25}
            />
          </button>
          <div className="mr-1">1</div>
          <div className="mr-1">/</div>
          <div className="mr-2">9</div>
          <button className="h-8 w-8 hover:bg-[#F1F0F1] rounded-full flex items-center justify-center">
            <Image
              src={"/next1.png"}
              width={25}
              height={25}
            />
          </button>
        </div>
      </div>

      <div className="flex flex-col mt-3">
        {isLoading ? (
          <div>Loading memos...</div>
        ) : (
          memos.map((memo) => (
            <div
              key={memo.timestamp}
              className="flex flex-col border relative border-[rgba(34,34,34,.1)] pt-2.5 pb-2.5 bg-[#FFFCE6] p-2 rounded-lg mt-4"
            >
              <div className="w-5 h-5 absolute top-[-10px] right-[30px] bg-[#7d4533] rounded-full shadow-sm shadow-slate-700"></div>
              <div className="flex flex-row justify-between">
                <p className="font-extrabold">{hideMiddle(memo.name)}</p>
                {/* <p className=" text-gray-400">{stampToDate(Number(memo.timestamp))}</p> */}
              </div>
              <p className="pt-3 pb-3">{defaultMemo(memo.message)}</p>
            </div>
          ))
        )}
      </div>

      
    </div>
  );
};

export default Memos;

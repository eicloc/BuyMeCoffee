"use client";

import { useContractEvent } from "wagmi";
import BUYMECOFFEE_ABI from "@/abi/buymecoffee.json";
import Image from "next/image";
import { getContract } from "viem";
import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";

import { useState, useEffect } from "react";

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});

const contract = getContract({
  address: "0x25230a7fc0b534c0147Bb442A28100F6648dDe5b",
  abi: BUYMECOFFEE_ABI,
  publicClient,
});

const Memos = () => {
  const [memos, setMemos] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [memoLen, setMemoLen] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  //When the app is mounted, call useEffect------------
  useEffect(() => {
    async function fetchMemo() {
      const mmm = await contract.read.getMemos();

      console.log("全部memo如下：", mmm)

      setMemos(paginator(mmm));
      setIsLoading(false);
    }
    fetchMemo();

    return () => {
      console.log("exit");
    };
  }, []);

  //分页器，根据当前页数来切割留言
  function paginator(memos, curP = curPage) {
    // console.log("--------memos", memos)
    // console.log("能不能在useEffect期间获取到状态变量", curPage);
    const len = memos.length;
    setMemoLen(Math.floor(len/5) + (len%5 > 0 ? 1 : len%5));
    // console.log("长度", len)
    const arr = [];
    console.log("当前页面为：", curP)
    const startIdx = len - 1 - (curP - 1) * 5;
    for (let i = startIdx; i > startIdx - 5 && i >= 0; i--) {
      console.log("下标为：", i)
      arr.push(memos[i]);
    }

    return arr;
  }

  //翻页函数
  function turnPage(next) {
    //重新获取memos列表，考虑到多人使用时，其他人可能更新了memos
    async function refetchMemos(curP) {
      const mmm = await contract.read.getMemos();
      setMemos(paginator(mmm, curP));
      setIsLoading(false);
    }

    if (next) {
      setIsLoading(true);
      setCurPage(curPage + 1);
      refetchMemos(curPage + 1);
    } else {
      setIsLoading(true);
      setCurPage(curPage - 1);
      refetchMemos(curPage - 1);
    }
  }

  //监听合约事件，并刷新留言组件
  useContractEvent({
    address: "0x25230a7fc0b534c0147Bb442A28100F6648dDe5b",
    abi: BUYMECOFFEE_ABI,
    eventName: "NewMemo",
    async listener(log) {
      setIsLoading(true);
      console.log("--------");
      console.log("New memo: ", log);
      const mmm = await contract.read.getMemos();
      console.log("memos: ", mmm);
      setMemos(paginator(mmm));
      setIsLoading(false);
    },
  });

  //Transfer the middle string into '...'
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
        {!isLoading && (
          <div className="flex items-center">
            <button
              className="h-8 w-8 hover:bg-[#F1F0F1] rounded-full flex items-center justify-center mr-2 disabled:bg-transparent"
              onClick={() => turnPage(false)}
              disabled={curPage===1}
            >
              <Image alt="prev" src={curPage === 1 ? "/prev0.png" : "/prev1.png"} width={25} height={25} />
            </button>
            <div className="mr-1 text-4xl">{curPage}</div>
            <div className="mr-1">/</div>
            <div className="mr-2">{memoLen && memoLen}</div>
            <button
              className="h-8 w-8 hover:bg-[#F1F0F1] rounded-full flex items-center justify-center disabled:bg-transparent"
              onClick={() => turnPage(true)}
              disabled={curPage===memoLen}
            >
              <Image alt="next" src={curPage === 3 ? "/next0.png" : "/next1.png"} width={25} height={25} />
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col mt-3">
        {isLoading ? (
          <div className="flex h-[50vh] justify-center items-center">Loading memos...</div>
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

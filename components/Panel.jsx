"use client";

import { useState, useEffect } from "react";
import { parseEther } from "viem";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import BUYMECOFFEE_ABI from "@/abi/buymecoffee.json";

import {
  usePrepareContractWrite,
  useContractWrite,
  useAccount,
  useWaitForTransaction,
} from "wagmi";

const Panel = () => {
  //Name
  const [tipper, setTipper] = useState("");
  //Message
  const [messg, setMessg] = useState("");
  //Amount
  const [amount, setAmount] = useState(1);
  //Input amount
  const [inputNum, setInputNum] = useState("");

  //Current Account
  const { isConnected, address } = useAccount();

  //making transaction
  const [isPending, setIsPending] = useState(false);

  //before mounted
  const [isCreate, setIsCreate] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsCreate(true);
    }, 800);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  //---------------usePreparedWrite
  const { config } = usePrepareContractWrite({
    address: "0x25230a7fc0b534c0147Bb442A28100F6648dDe5b",
    abi: BUYMECOFFEE_ABI,
    functionName: "buyCoffee",
    args: [tipper.length > 0 ? tipper : address, messg.length > 0 ? messg : ""],
    value: parseEther(`${0.01 * amount}`),
  });

  // console.log("config---->", config)

  //------------------------------useContractWrite
  const { data, write, writeAsync } = useContractWrite(config);

  // console.log("write---->", write)
  // console.log("error---->", error)

  //------------------------------useWaitForTransaction
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  //Handle with the transaction
  function handleSubmit(e) {
    //Check if the use has logged in.

    e.preventDefault();
    async function makeTx() {
      setIsPending(true);
      await writeAsync()
        .then(() => {
          setIsPending(false);

          setTipper("");
          setMessg("");
        })
        .catch(() => {
          setIsPending(false);
        });
    }

    makeTx();

    // write?.();

    // e.preventDefault()
    // write?.({
    //     args: [tipper.length > 0 ? tipper : ],
    //     value: parseEther(`${0.01 * amount}`)
    // })
  }

  return (
    <div className="h-full rounded-lg w-3/6 flex flex-col p-6 border border-[rgba(34,34,34,.1)] bg-white">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center">
          <div className="text-3xl font-extrabold">
            Buy <strong className="text-[#6F4E37]">Eixoln</strong> a coffee ☕
          </div>

          {isCreate ? (
            <>
              <div className="flex flex-row p-4 items-center mt-3">
                <div className="text-4xl">☕</div>
                <div className="text-[rgba(0,0,0,.3)] text-[21px]">x</div>

                <div
                  className={`ml-3 w-10 h-10 relative text-center leading-10 ${
                    amount === 1 ? "bg-[#6F4E37] text-white" : "text-[#6F4E37]"
                  } hover:border-[#6F4E37]  rounded-full border border-[rgba(34,34,34,.3)]`}
                >
                  <span className="text-[17px] font-extrabold ">1</span>
                  <input
                    checked={amount === 1}
                    onChange={() => {
                      setAmount(1);
                      setInputNum(1);
                    }}
                    className="absolute top-0 left-0 w-full h-full opacity-0"
                    type="radio"
                    value="0.01"
                  />
                </div>

                <div
                  className={`ml-3 w-10 h-10 relative text-center leading-10 ${
                    amount === 3 ? "bg-[#6f4e37] text-white" : "text-[#6f4e37]"
                  } hover:border-[#6f4e37]  rounded-full border border-[rgba(34,34,34,.3)]`}
                >
                  <span className="text-[17px] font-extrabold">3</span>
                  <input
                    checked={amount === 3}
                    onChange={() => {
                      setAmount(3);
                      setInputNum(3);
                    }}
                    className="absolute top-0 left-0 w-full h-full opacity-0"
                    type="radio"
                    value="0.03"
                  />
                </div>

                <div
                  className={`ml-3 w-10 h-10 relative text-center leading-10 ${
                    amount === 5 ? "bg-[#6f4e37] text-white" : "text-[#6f4e37]"
                  } hover:border-[#6f4e37]  rounded-full border border-[rgba(34,34,34,.3)]`}
                >
                  <span className="text-[17px] font-extrabold">5</span>
                  <input
                    checked={amount === 5}
                    onChange={() => {
                      setAmount(5);
                      setInputNum(5);
                    }}
                    className="absolute top-0 left-0 w-full h-full opacity-0"
                    type="radio"
                    value="0.05"
                  />
                </div>

                <input
                  className={`${
                    amount !== 1 && amount !== 3 && amount !== 5
                      ? "outline-none border-[#6f4e37] border-2 text-[#6f4e37] font-extrabold"
                      : ""
                  } w-10 ml-3 h-10 text-center border border-[rgba(34,34,34,.1.5)] focus:outline-none focus:border-2 focus:text-[#6f4e37] focus:font-extrabold focus:border-[#6f4e37]`}
                  name="coffees"
                  placeholder={amount}
                  value={inputNum}
                  type="number"
                  onBlur={(e) => {
                    const num = Number(e.target.value);
                    if (num <= 0) {
                      setInputNum(1);
                      setAmount(1);
                    }
                  }}
                  onChange={(e) => {
                    const num = Number(e.target.value);
                    if (num > 100) {
                      setInputNum(100);
                      setAmount(100);
                    } else {
                      setInputNum(Number(num));
                      setAmount(Number(num));
                    }
                  }}
                />
              </div>

              <input
                type="text"
                placeholder={
                  isConnected
                    ? "Your name(optional)"
                    : "Please connect your wallet first"
                }
                disabled={!isConnected || isPending || isLoading}
                onChange={(e) => setTipper(e.target.value)}
                value={tipper}
                className="mt-2 w-4/5 bg-[#F1F0F1] rounded-xl p-3 focus:outline-none focus:border-amber-900 border-2"
              />
              <textarea
                name="memo"
                cols="27"
                rows="10"
                disabled={!isConnected || isPending || isLoading}
                value={messg}
                onChange={(e) => setMessg(e.target.value)}
                className="resize-none bg-[#F1F0F1] p-3 w-4/5 mt-3 focus:outline-none rounded-xl focus:border-amber-900 border-2"
                placeholder={
                  isConnected
                    ? "Say something nice...(optional)"
                    : "Please connect your wallet first"
                }
              />

              {isConnected ? (
                <button
                  className={`w-4/5 mt-5 rounded-3xl p-3 ${
                    !write || isLoading || isPending
                      ? "bg-[#706b68]"
                      : "bg-[#6f4e37]"
                  }  text-white font-extrabold`}
                  disabled={!write || isLoading || isPending}
                >
                  {isLoading
                    ? "Processing..."
                    : isPending
                    ? "Pending..."
                    : `Support ${0.01 * amount} ether`}
                </button>
              ) : (
                <div className="mt-3 flex flex-row items-center">
                  <ConnectButton />{" "}
                  <span className="ml-3 text-orange-400 font-extrabold">
                    to support Eixoln
                  </span>
                </div>
              )}

              {isSuccess && (
                <div className="mt-3 ml-1 text-gray-900 font-extrabold">
                  Successfully supported Eixoln!!!❤
                  <div className="flex justify-center">
                    <a
                      className="underline"
                      href={`https://sepolia.etherscan.io/tx/${data?.hash}`}
                    >
                      View on Sepolia
                    </a>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex h-[50vh] justify-center items-center">
              Loading panel...
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Panel;

"use client";

import { useState } from "react";
import {
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from "wagmi";
import { parseEther } from "viem";

export default function SendTx() {
  const [to, setTo] = useState("");

  const [amount, setAmount] = useState("");

  const { config } = usePrepareSendTransaction({
    to: to,
    value: parseEther(amount),
  });

  const { data, sendTransaction } = useSendTransaction(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendTransaction?.();
      }}
    >
      <input
        onChange={(e) => setTo(e.target.value)}
        value={to}
        aria-label="Recipient"
        placeholder="0xA0Cf…251e"
      />
      <input
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
        aria-label="Amount (ether)"
        placeholder="0.05"
      />
      <button disabled={isLoading || !sendTransaction || !to || !amount}>
        {isLoading ? "Sending..." : "Send"}
      </button>
      {isSuccess && (
        <div>
          Successfully sent {amount} ether to {to}
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
    </form>
  );
}

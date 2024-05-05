"use client";

import React from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
  const { isConnected } = useAccount();

  return (
    <div className="fixed top-0 mt-6">{isConnected && <ConnectButton />}</div>
  );
}

"use client";
import Panel from "@/components/Panel";
import Memos from "@/components/Memos";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="flex h-screen w-full flex-row items-center justify-around p-[88px] bg-[#6F4E37]">
      <Header />
      <Panel />
      <Memos />
    </div>
  );
}

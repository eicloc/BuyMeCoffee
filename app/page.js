import Panel from "@/components/Panel";
import Memos from "@/components/Memos";

export default function Home() {
  return (
    <main className="flex h-screen w-full flex-row items-center justify-around p-24">
      <div className="text-3xl fixed top-0 mt-6 text-black">Buy Eixoln A Coffee</div>
        <Panel />
        <Memos />
    </main>
  )
}

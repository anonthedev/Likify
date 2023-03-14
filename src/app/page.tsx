import Image from "next/image";
import { Inter } from "next/font/google";
import Login from "@/Components/Login";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="bg-black text-white w-screen h-screen items-center flex justify-center">
      <Login />
    </main>
  );
}

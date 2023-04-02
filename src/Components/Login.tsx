"use client";

import { useSession, signIn } from "next-auth/react";
import spotifyLogo from "./resources/spotifyLogo.png";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Login() {
  const { data: session } = useSession();
  if (session) {
    redirect("/converter");
  }
  
  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col text-center gap-4 justify-center">
        <h1 className="text-5xl text-[#fdc22c] font-raleway font-bold">
          Likify
        </h1>
        <p className="max-w-[40ch] text-gray-300">
          Now you can share your spotify liked songs collection
        </p>
        <p className="text-gray-300">
          Made by{" "}
          <a
            target={"_blank"}
            className="underline"
            href="https://twitter.com/anonthedev_2"
          >
            Anon
          </a>
        </p>
      </div>
      <button
        className="flex flex-row py-2 px-6 items-center bg-[#1bc257] rounded text-black font-[500] font-raleway"
        onClick={() => {
          signIn("spotify");
        }}
      >
        <Image src={spotifyLogo} alt="" width={50} height={50}></Image>Sign in
        with Spotify
      </button>
    </section>
  );
}

"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import spotifyLogo from "./resources/spotifyLogo.png";
import Image from "next/image";
import { redirect } from "next/navigation";
import SignOut from "./SignOut";

export default function Login() {
  const { data: session } = useSession();
  if (session) {
    redirect("/converter");
  }
  // if (session) {
  //   console.log(session);
  //   return (
  //     <section className="flex flex-col gap-4 items-center">
  //     <p>Signed in as <b>{session.user?.name}</b></p>
  //       <Link href={"/converter"}>
  //         <button className="flex flex-row py-4 px-8 items-center font-[600] bg-[#1bc257] rounded text-black">
  //           Continue with this Account
  //         </button>
  //       </Link>
  //       <SignOut/>
  //       {/* <GetLikedSongs/> */}
  //     </section>
  //   );
  // }
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

        <p className="text-[red] max-w-[40ch]">
          This app is not public yet please leave your mail under this{" "}
          <a
            href="https://twitter.com/anonthedev_2/status/1636736624598851586?s=20"
            target={"_blank"}
          >
            <span className="underline text-blue-600">tweet</span>
          </a>
          , when you get a reply then you can use this app. <br /> (if you have
          got a reply please proceed)
        </p>
      </div>
      <button
        className="flex flex-row py-2 px-6 items-center bg-[#1bc257] rounded text-black font-[500] font-raleway"
        onClick={() => {
          signIn();
        }}
      >
        <Image src={spotifyLogo} alt="" width={50} height={50}></Image>Sign in
        with Spotify
      </button>
    </section>
  );
}

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
    <section className="flex flex-col items-center gap-4">
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

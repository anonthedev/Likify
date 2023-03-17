"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "@/app/contextProvider";
import CreatePlaylist from "./CreatePlaylist";
import Image from "next/image";
import { redirect } from "next/navigation";
import spotifyLogo2 from "./resources/spotifyLogo2.png";

export default function GetLikedSongs() {
  const { data: session, status } = useSession();
  const context = useContext(GlobalContext);
  let Artists = [];
  const [Loading, setLoading] = useState(true);
  // const [DisplaySongs, setDisplaySongs] = useState<any>([]);
  const [AllSongsRecieved, setAllSongsRecieved] = useState(false);

  let DisplaySongs = [];

  if (!session) {
    redirect("/");
  }

  const accessToken = session.user?.accessToken;

  console.log(status);

  useEffect(() => {
    const getAllPages = async (url) => {
      var userParams = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };
      await fetch(`${url}`, userParams)
        .then((data) => data.json())
        .then(async (resp) => {
          // console.log(resp);
          context.setLikedSongs((prev) => [...prev, ...resp.items]);
          if (resp.next) {
            getAllPages(resp.next);
          } else {
            setAllSongsRecieved(true);
            setLoading(false);
          }
        });
    };
    getAllPages("https://api.spotify.com/v1/me/tracks?limit=40");
  }, [accessToken]);

  if (context.LikedSongs.length !== 0) {
    context.LikedSongs.map((LikedSong) => {
      LikedSong.track.artists.map((artist) => {
        Artists.push(artist.name);
      });
    });
  }

if (Loading) {
    return <div>Loading...</div>;
} else {
    return (
      <>
        {AllSongsRecieved ? (
          <section className="mt-[20vh] gap-12 flex flex-col items-center">
            <div className="flex flex-col text-center gap-4">
              <h1 className="text-5xl text-[#fdc22c] font-raleway font-bold">
                Likify
              </h1>
              <p className="max-w-[30ch] text-gray-300">
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
            <CreatePlaylist />
            <div className="grid grid-cols-3 pl-20 md:flex md:flex-col lg:pl-8 gap-10 mt-10 font-nunito">
              {context.LikedSongs.length !== 0
                ? context.LikedSongs.map((LikedSong) => (
                    <a
                      className="flex flex-row w-fit gap-4"
                      href={LikedSong.track.external_urls.spotify}
                      target="_blank"
                      key={LikedSong.uri}
                    >
                      <Image
                        className="self-center"
                        src={spotifyLogo2}
                        alt="spotify Logo"
                        width={40}
                        height={40}
                      ></Image>
                      <div className="flex flex-row items-center gap-2">
                        <Image
                          src={LikedSong.track.album.images[0].url}
                          alt=""
                          width={64}
                          height={64}
                          className=""
                        ></Image>
                        <div className="flex flex-col">
                          <div className="flex flex-row gap-4">
                            <p className="max-w-[25ch]">
                              {LikedSong.track.name}
                            </p>
                          </div>
                          <div className="flex flex-row flex-wrap">
                            {LikedSong.track.artists.map((artist, index) => (
                              <a
                                className=""
                                href={artist.external_urls.spotify}
                                key={artist.id}
                                target="_blank"
                              >
                                <p
                                  key={artist.id}
                                  className="text-sm text-[#868484] flex flex-row gap-1"
                                >
                                  {index ? ", " : ""}
                                  <span className="underline">
                                    {artist.name}
                                  </span>
                                </p>
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </a>
                  ))
                : ""}

              {DisplaySongs.length === 20 ? <div>More...</div> : ""}
            </div>
          </section>
        ) : (
          ""
        )}
      </>
    );
  }
}

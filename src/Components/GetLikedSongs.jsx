"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "@/app/contextProvider";
import CreatePlaylist from "./CreatePlaylist";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function GetLikedSongs() {
  const { data: session } = useSession();
  const context = useContext(GlobalContext);
  let Artists = [];
  const [Loading, setLoading] = useState(true);
  // const [DisplaySongs, setDisplaySongs] = useState<any>([]);
  const [AllSongsRecieved, setAllSongsRecieved] = useState(false);

  let DisplaySongs = [];

  if (!session) {
    redirect("/");
  }

  const getAllPages = async (url) => {
    var userParams = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + session.user?.accessToken,
      },
    };
    await fetch(`${url}`, userParams)
      .then((data) => data.json())
      .then(async (resp) => {
        // console.log(resp);
        context.setLikedSongs((prev) => [...prev, ...resp.items]);
        if (resp.next) {
          getAllPages(resp.next);
          setLoading(false);
        } else {
          setAllSongsRecieved(true);
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    getAllPages("https://api.spotify.com/v1/me/tracks?limit=40");
  }, []);

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
          <section className=" mt-[40vh] gap-10 flex flex-col items-center">
            <CreatePlaylist />
            <div className="flex flex-col gap-4 font-nunito">
              {context.LikedSongs.length !== 0
                ? context.LikedSongs.map((LikedSong) => (
                    <a
                      href={LikedSong.track.external_urls.spotify}
                      target="_blank"
                      key={LikedSong.uri}
                    >
                      <div className="flex flex-row items-center gap-2">
                        <Image
                          src={LikedSong.track.album.images[0].url}
                          alt=""
                          width={64}
                          height={64}
                          className="rounded"
                        ></Image>
                        <div className="flex flex-col">
                          <p>{LikedSong.track.name}</p>
                          <div className="flex flex-row">
                            {LikedSong.track.artists.map(
                              (artist, index) => (
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
                              )
                            )}
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

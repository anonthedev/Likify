"use client";

import { useContext } from "react";
import { GlobalContext } from "@/app/contextProvider";
import { useSession } from "next-auth/react";

export default function CreatePlaylist() {
  const { data: session } = useSession();
  const context = useContext(GlobalContext);

  const trackURIs = [];
  const tooManyTracks = [];
  context.LikedSongs.map((track) => {
    trackURIs.push(track.track.uri);
  });
  if (trackURIs.length > 99) {
    while (trackURIs.length > 0) {
      const x = trackURIs.splice(0, 98);
      tooManyTracks.push(x);
      // console.log(tooManyTracks);
    }
  }

  function addTracksToPlaylist(tracks, playlistId) {
    fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + session?.user?.accessToken,
      },
      body: JSON.stringify({
        uris: tracks,
        position: 0,
      }),
    });
  }

  async function CreatePlaylistFunc() {
    var createPlaylistParams = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + session?.user?.accessToken,
      },
      body: JSON.stringify({
        name: "Your liked songs playlist by Likify",
        description: "By Likify",
        public: true,
      }),
    };

    const URL = `https://api.spotify.com/v1/users/${session?.user?.username}/playlists`;

    fetch(URL, createPlaylistParams)
      .then((data) => {
        return data.json();
      })
      .then((resp) => {
        // console.log(resp);
        return resp.id;
      })
      .then((id) => {
        if (tooManyTracks.length != 0) {
          tooManyTracks.map((chunksOfTrackURIs, index) => {
            setTimeout(() => {
              addTracksToPlaylist(chunksOfTrackURIs, id);
            }, index * 1000);
          });
        } else {
          addTracksToPlaylist(trackURIs, id);
        }
      });
  }
  return (
    <div>
      <button
        className="flex flex-row py-2 px-6 items-center bg-[#1bc257] rounded text-black font-[500] font-raleway"
        onClick={CreatePlaylistFunc}
      >
        Create Playlist
      </button>
    </div>
  );
}

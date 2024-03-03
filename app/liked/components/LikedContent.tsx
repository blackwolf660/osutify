"use client";
import { LikeButton } from "@/components/LikeButton";
import { Song } from "@/types";
import { useEffect, useState } from "react";
import { MediaItem } from "@/components/MediaItem";
import useOnPlay from "@/app/hooks/useOnPlay";

export function LikedContent() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const onPlay = useOnPlay(songs);

  useEffect(() => {
    async function fetchData() {
      const likedSongs = localStorage.getItem("liked_songs");
      if (!likedSongs || likedSongs.length === 0) return;

      const songs = await fetch("/api/getSongsByIds", {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        credentials: "same-origin",
        body: JSON.stringify({
          ids: JSON.parse(likedSongs),
        }),
      }).then((res) => res.json());
      setLoading(false);

      if (songs.message) return; // Means we got an error
      setSongs(songs);
    }

    fetchData();
  }, []);

  if (!songs || songs.length === 0 || loading) {
    return (
      <div
        className="
          flex 
          flex-col 
          gap-y-2 
          w-full px-6 
          text-neutral-400
        "
      >
        {loading ? "Loading..." : "No liked songs"}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      {songs.map((song: any) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem onClick={(id: string) => onPlay(id)} data={song} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
}

export default LikedContent;

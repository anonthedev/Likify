"use client";

import { createContext, useState } from "react";

export const GlobalContext = createContext<any>(null);

export default function ContextProvider({ children }: { children: any }) {
  const [LikedSongs, setLikedSongs] = useState<any>([]);

  return (
    <GlobalContext.Provider value={{ LikedSongs, setLikedSongs }}>
      {children}
    </GlobalContext.Provider>
  );
}

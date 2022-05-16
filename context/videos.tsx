import { ReactNode, useContext, createContext } from "react";
import { QueryKeys, Video } from "../types";
import { useQuery, RefetchOptions, RefetchQueryFilters } from "react-query";
import { getVideos } from "../api";

const VideoContext = createContext<{
  videos: Video[];
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => any;
  //@ts-ignore
}>(null);

function VideoContextProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, refetch } = useQuery(QueryKeys.videos, getVideos);

  return (
    <VideoContext.Provider value={{ videos: data, refetch }}>
      {children}
    </VideoContext.Provider>
  );
}

const useVideo = () => useContext(VideoContext);

export { VideoContextProvider, useVideo };

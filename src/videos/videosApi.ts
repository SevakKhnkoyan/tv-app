import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import videosData from '../data/videos.json';

type VideosResponse = typeof videosData;

export const videosApi = createApi({
  reducerPath: 'videosApi',
  baseQuery: fakeBaseQuery<VideosResponse>(),
  endpoints: (builder) => ({
    getVideos: builder.query<VideosResponse, void>({
      queryFn: async () => ({ data: videosData }),
    }),
  }),
});

export const { useGetVideosQuery } = videosApi;

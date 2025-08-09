import { configureStore } from '@reduxjs/toolkit';
import videosReducer from '../videos/videosSlice';
import { videosApi } from '../videos/videosApi';

export const store = configureStore({
  reducer: {
    videos: videosReducer,
    [videosApi.reducerPath]: videosApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(videosApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

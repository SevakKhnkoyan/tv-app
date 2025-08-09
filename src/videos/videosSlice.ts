import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../models/movie';

interface VideosState {
  lastSeenId: Movie['Id'] | null;
}

const initialState: VideosState = {
  lastSeenId: sessionStorage.getItem("lastSeen") as Movie['Id'] || null,
};

const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    setLastSeen(state, action: PayloadAction<Movie['Id']>) {
      state.lastSeenId = action.payload;
      sessionStorage.setItem('lastSeen', action.payload);
    },
  },
});

export const { setLastSeen } = videosSlice.actions;
export default videosSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VideosState {
  lastSeenId: string | null;
}

const initialState: VideosState = {
  lastSeenId: sessionStorage.getItem("lastSeen") || null,
};

const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    setLastSeen(state, action: PayloadAction<string>) {
      state.lastSeenId = action.payload;
      sessionStorage.setItem("lastSeen", action.payload);
    },
  },
});

export const { setLastSeen } = videosSlice.actions;
export default videosSlice.reducer;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ILoadingState {
  genres: boolean;
  user: boolean;
  subgenres: boolean;
}

const initialState: ILoadingState = {
  genres: true,
  user: true,
  subgenres: true,
};

export const LoadingSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {
    loadUser: (state, action: PayloadAction<boolean>) => {
      state.user = action.payload;
    },
    loadGenres: (state, action: PayloadAction<boolean>) => {
      state.genres = action.payload;
    },
    loadSubgenres: (state, action: PayloadAction<boolean>) => {
      state.subgenres = action.payload;
    },
  },
});

export default LoadingSlice.reducer;
export const { loadGenres, loadUser, loadSubgenres } = LoadingSlice.actions;

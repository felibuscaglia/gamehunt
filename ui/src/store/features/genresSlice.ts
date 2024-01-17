import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAuthUser, IGenre } from "lib/interfaces";

interface IGenreState {
  genres: IGenre[];
  loading: boolean;
}

const initialState: IGenreState = {
  genres: [],
  loading: true,
};

export const GenresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {
    saveGenres: (state, action: PayloadAction<IGenre[]>) => {
      state.genres = action.payload;
      state.loading = false;
    },
  },
});

export default GenresSlice.reducer;
export const { saveGenres } = GenresSlice.actions;

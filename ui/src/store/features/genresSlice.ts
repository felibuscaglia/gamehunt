import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IGenre } from "lib/interfaces";

interface IGenreState {
  genres: IGenre[];
}

const initialState: IGenreState = {
  genres: [],
};

export const GenresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {
    saveGenres: (state, action: PayloadAction<IGenre[]>) => {
      state.genres = action.payload;
    },
  },
});

export default GenresSlice.reducer;
export const { saveGenres } = GenresSlice.actions;

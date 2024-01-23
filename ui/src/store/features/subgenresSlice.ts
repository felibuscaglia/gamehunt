import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IGenre, ISubgenre } from "lib/interfaces";

interface ISubgenreState {
  all: ISubgenre[];
}

const initialState: ISubgenreState = {
  all: [],
};

export const SubgenresSlice = createSlice({
  name: "subgenres",
  initialState,
  reducers: {
    saveSubgenres: (state, action: PayloadAction<ISubgenre[]>) => {
      state.all = action.payload;
    },
  },
});

export default SubgenresSlice.reducer;
export const { saveSubgenres } = SubgenresSlice.actions;

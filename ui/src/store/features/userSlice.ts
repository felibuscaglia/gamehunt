import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAuthUser } from "lib/interfaces";

interface IUserState {
  user: IAuthUser | null;
}

const initialState: IUserState = {
  user: null,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IAuthUser | null>) => {
      state.user = action.payload;
    },
  },
});

export default UserSlice.reducer;
export const { addUser } = UserSlice.actions;

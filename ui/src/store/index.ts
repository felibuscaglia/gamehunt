import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import genresReducer from "./features/genresSlice";
import loadingReducer from "./features/loadingSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    user: userReducer,
    genres: genresReducer,
    loading: loadingReducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;

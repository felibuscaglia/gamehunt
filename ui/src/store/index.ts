import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import genresReducer from "./features/genresSlice";
import loadingReducer from "./features/loadingSlice";
import subgenresReducer from "./features/subgenresSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    user: userReducer,
    genres: genresReducer,
    loading: loadingReducer,
    subgenres: subgenresReducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
